"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { TrendingUp } from "lucide-react"

export default function GraficoFluxo() {
  const dadosFluxo = [
    { mes: "Out", receitas: 14200, despesas: 12800, saldo: 1400 },
    { mes: "Nov", receitas: 15100, despesas: 11200, saldo: 3900 },
    { mes: "Dez", receitas: 15280, despesas: 11656, saldo: 3624 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
          Fluxo de Caixa - Últimos 3 Meses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dadosFluxo} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(value: number) => [`R$ ${value.toLocaleString("pt-BR")}`, ""]}
                labelFormatter={(label) => `Mês: ${label}`}
              />
              <Bar dataKey="receitas" fill="#10b981" name="Receitas" />
              <Bar dataKey="despesas" fill="#ef4444" name="Despesas" />
              <Bar dataKey="saldo" fill="#3b82f6" name="Saldo" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-gray-600">Receitas Médias</p>
            <p className="text-lg font-bold text-green-600">R$ 14.860</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Despesas Médias</p>
            <p className="text-lg font-bold text-red-600">R$ 11.886</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Saldo Médio</p>
            <p className="text-lg font-bold text-blue-600">R$ 2.975</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
