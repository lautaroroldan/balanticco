
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'turso',
    schema: './app/db/schema/*',
    out: './drizzle',
    dbCredentials: {
        url: process.env.NEXT_PUBLIC_TURSO_DATABASE_URL!,
        authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN!
    }
})