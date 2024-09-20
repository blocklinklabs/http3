import {
  integer,
  varchar,
  pgTable,
  serial,
  text,
  timestamp,
  decimal,
} from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: serial("id").primaryKey(),
  address: varchar("address", { length: 42 }).notNull().unique(),
  email: varchar("email", { length: 255 }).unique(),
  username: varchar("username", { length: 50 }).unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const Webpages = pgTable("webpages", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  domain: varchar("domain", { length: 255 }).notNull().unique(),
  cid: text("cid").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const Tokens = pgTable("tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  balance: decimal("balance", { precision: 18, scale: 8 })
    .notNull()
    .default("0"),
  stakedAmount: decimal("staked_amount", { precision: 18, scale: 8 })
    .notNull()
    .default("0"),
  rewardsEarned: decimal("rewards_earned", { precision: 18, scale: 8 })
    .notNull()
    .default("0"),
});

export const Deployments = pgTable("deployments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => Users.id)
    .notNull(),
  webpageId: integer("webpage_id")
    .references(() => Webpages.id)
    .notNull(),
  transactionHash: varchar("transaction_hash", { length: 66 }).notNull(),
  deployedAt: timestamp("deployed_at").defaultNow().notNull(),
});
