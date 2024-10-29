import { addTransferDB, getTransfersDB } from "@/utils/db/db-transfers"

export async function GET() {
    try {
        const transfers = await getTransfersDB()

        return new Response(JSON.stringify({ transfers }), { status: 200 })
    } catch (error) {
        return new Response("Error al obtener transferencias", { status: 500 })
    }
}

export async function POST(request: Request) {
    try {
        const { amount, description, type, id } = await request.json()
        if (!amount || !description || !type) {
            return new Response("Los campos son requeridos", { status: 400 })
        }
        const transferId = await addTransferDB({ amount, description, type, id })

        return new Response(JSON.stringify(transferId), { status: 201 })
    } catch (error) {
        return new Response("Error al crear transferencia", { status: 500 })
    }
}
