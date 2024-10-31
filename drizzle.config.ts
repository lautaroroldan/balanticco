import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'turso',
    schema: './app/db/schema/*',
    out: './drizzle',
    dbCredentials: {
        url: "libsql://balanticco-lautaroroldan.turso.io",
        authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzAyMjQ1MDksImlkIjoiYTI5ZTgzZDItYjVlOC00MDM5LWIwNjgtYzAxOTc0OWZmOTZiIn0.ePbKZ9WiU8CPGMpmjq5l7X4lEYBZaFmVvyzYvDy5voDvFEqq8zN0J-2Tnon9QPxgrf4t586A0xF7ZGCbuWEHAA"
    }
})