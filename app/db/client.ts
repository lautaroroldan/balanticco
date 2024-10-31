import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client'
import { users } from './schema/user';
import { transferTable } from './schema/transfer';

const client = createClient({
    url: process.env.NEXT_PUBLIC_DATABASE_URL!,
    authToken: process.env.NEXT_PUBLIC_DATABASE_API_KEY!
})

export const db = drizzle({ client, schema: {
    users,
        transferTable
    }
});