export default {
  dialect: "postgresql",
  schema: "./utils/db/schema.ts",
  out: "./drizzle",

  dbCredentials: {
    url: "postgresql://neondb_owner:xyDszWq49UJh@ep-soft-violet-a5vv99sd.us-east-2.aws.neon.tech/http3?sslmode=require",
    connectionString:
      "postgresql://neondb_owner:xyDszWq49UJh@ep-soft-violet-a5vv99sd.us-east-2.aws.neon.tech/http3?sslmode=require",
  },
};
