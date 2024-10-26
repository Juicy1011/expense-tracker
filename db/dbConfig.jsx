import { neon } from "@neondatabase/serverless";
import { drizzle} from 'drizzle-orm/neon-http';
import * as schema from './schema';
const sql= neon('postgresql://Expense%20tracker%20app_owner:b5klV0fJUAsB@ep-still-surf-a51wled8.us-east-2.aws.neon.tech/Expense%20tracker%20app?sslmode=require');
export const db = drizzle(sql,{schema});