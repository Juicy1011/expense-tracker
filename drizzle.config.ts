import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url:"postgresql://Expense%20tracker%20app_owner:b5klV0fJUAsB@ep-still-surf-a51wled8.us-east-2.aws.neon.tech/Expense%20tracker%20app?sslmode=require",
  },
});


//process.env.NEXT_PUBLIC_DATABASE_URL