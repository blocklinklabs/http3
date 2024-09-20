import { config } from "dotenv";
config();

import { db } from "./dbConfig";
import { Users, Webpages, Tokens, Deployments } from "./schema";
import { eq, sql, desc } from "drizzle-orm";
import { create } from "@web3-storage/w3up-client";
import { ethers } from "ethers";
import WebpageStorageABI from "../WebpageStorage.json";

console.log("ETHEREUM_RPC_URL:", process.env.ETHEREUM_RPC_URL);
console.log("PRIVATE_KEY:", process.env.PRIVATE_KEY);

const web3StorageClient = await create();
const provider = new ethers.providers.JsonRpcProvider("https://pre-rpc.bt.io/");
const signer = new ethers.Wallet(
  "2f34d72c40a47e574ed54bbd14723d7753e8cf53434a180f67ef2f73187ef811",
  provider
);
const contract = new ethers.Contract(
  "0x4eEAEB9C96951Fc1BE43f34c42A002B58FB774Ff",
  WebpageStorageABI.abi,
  signer
);

export async function getUserTokens(userId: number) {
  try {
    const tokens = await db
      .select()
      .from(Tokens)
      .where(eq(Tokens.userId, userId))
      .execute();
    return tokens[0];
  } catch (error) {
    console.error("Error fetching user tokens:", error);
    return null;
  }
}

export async function updateUserTokens(
  userId: number,
  balance: number,
  stakedAmount: number,
  rewardsEarned: number
) {
  try {
    const [updatedTokens] = await db
      .update(Tokens)
      .set({ balance, stakedAmount, rewardsEarned })
      .where(eq(Tokens.userId, userId))
      .returning()
      .execute();
    return updatedTokens;
  } catch (error) {
    console.error("Error updating user tokens:", error);
    return null;
  }
}

export async function createOrUpdateUser(
  address: string,
  email: string,
  username: string
) {
  try {
    const existingUser = await db
      .select()
      .from(Users)
      .where(eq(Users.address, address))
      .execute();

    if (existingUser.length > 0) {
      const [updatedUser] = await db
        .update(Users)
        .set({ email, username })
        .where(eq(Users.address, address))
        .returning()
        .execute();
      return updatedUser;
    } else {
      const [newUser] = await db
        .insert(Users)
        .values({ address, email, username })
        .returning()
        .execute();

      // Initialize tokens for new user
      await db
        .insert(Tokens)
        .values({
          userId: newUser.id,
          balance: 0,
          stakedAmount: 0,
          rewardsEarned: 0,
        })
        .execute();

      return newUser;
    }
  } catch (error) {
    console.error("Error creating or updating user:", error);
    return null;
  }
}

export async function uploadToWeb3Storage(content: string, filename: string) {
  const file = new File([content], filename, { type: "text/html" });
  const cid = await web3StorageClient.uploadFile(file);
  return cid.toString();
}

export async function storeWebpageOnChain(domain: string, content: string) {
  const cid = await uploadToWeb3Storage(content, "index.html");
  const tx = await contract.storeWebpage(domain, cid);
  await tx.wait();
  return { txHash: tx.hash, cid };
}

export async function createWebpage(
  userId: number,
  domain: string,
  content: string
) {
  const { txHash, cid } = await storeWebpageOnChain(domain, content);

  const [webpage] = await db
    .insert(Webpages)
    .values({
      userId,
      domain,
      cid,
    })
    .returning()
    .execute();

  await db
    .insert(Deployments)
    .values({
      userId,
      webpageId: webpage.id,
      transactionHash: txHash,
    })
    .execute();

  return { webpage, txHash, cid };
}

export async function getUserWebpages(userId: number) {
  return db
    .select()
    .from(Webpages)
    .where(eq(Webpages.userId, userId))
    .execute();
}

export async function getWebpageDeployments(webpageId: number) {
  return db
    .select()
    .from(Deployments)
    .where(eq(Deployments.webpageId, webpageId))
    .orderBy(desc(Deployments.deployedAt))
    .execute();
}

export async function createProposal(userId: number, description: string) {
  const user = await db
    .select()
    .from(Users)
    .where(eq(Users.id, userId))
    .execute();
  if (user.length === 0) throw new Error("User not found");

  const tx = await contract.createProposal(description);
  await tx.wait();
  return tx.hash;
}

export async function voteOnProposal(
  userId: number,
  proposalId: number,
  support: boolean
) {
  const user = await db
    .select()
    .from(Users)
    .where(eq(Users.id, userId))
    .execute();
  if (user.length === 0) throw new Error("User not found");

  const tx = await contract.vote(proposalId, support);
  await tx.wait();
  return tx.hash;
}

export async function executeProposal(proposalId: number) {
  const tx = await contract.executeProposal(proposalId);
  await tx.wait();
  return tx.hash;
}
