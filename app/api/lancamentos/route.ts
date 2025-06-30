import { NextResponse } from "next/server"

const dados = [
  {
    id: "1",
    description: "Supermercado",
    amount: 150,
    type: "despesa",
    category: "Alimentação",
    date: new Date(),
    account: "Conta Corrente Principal",
    status: "pago",
    notes: "Compras da semana"
  }
]

export async function GET() {
  return NextResponse.json(dados)
}
