"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, TrendingDown } from "lucide-react"

export function ChartSection() {
  const monthlyData = [
    { month: "Jan", receitas: 12500, despesas: 10000, saldo: 2500 },
    { month: "Fev", receitas: 13200, despesas: 10750, saldo: 2450 },
    { month: "Mar", receitas: 14500, despesas: 11300, saldo: 3200 },
    { month: "Abr", receitas: 13800, despesas: 11000, saldo: 2800 },
    { month: "Mai", receitas: 14100, despesas: 11180, saldo: 2920 },
    { month: "Jun", receitas: 15280, despesas: 11656, saldo: 3624 },
  ]

  const maxValue = Math.max(...monthlyData.flatMap((d) => [d.receitas, d.despesas]))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>Fluxo de Caixa - Últimos 6 Meses</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Gráfico de Barras Simples */}
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span>{data.month}</span>
                  <div className="flex space-x-4">
                    <span className="text-green-600">R$ {data.receitas.toLocaleString("pt-BR")}</span>
                    <span className="text-red-600">R$ {data.despesas.toLocaleString("pt-BR")}</span>
                    <span className={data.saldo >= 0 ? "text-blue-600" : "text-red-600"}>
                      R$ {data.saldo.toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>

                <div className="relative h-8 bg-gray-100 rounded">
                  {/* Barra de Receitas */}
                  <div
                    className="absolute top-0 left-0 h-4 bg-green-500 rounded-t"
                    style={{ width: `${(data.receitas / maxValue) * 100}%` }}
                  />
                  {/* Barra de Despesas */}
                  <div
                    className="absolute bottom-0 left-0 h-4 bg-red-500 rounded-b"
                    style={{ width: `${(data.despesas / maxValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Resumo */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-green-600 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Receitas</span>
              </div>
              <div className="text-lg font-bold text-green-600">
                R$ {monthlyData[monthlyData.length - 1].receitas.toLocaleString("pt-BR")}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-red-600 mb-1">
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium">Despesas</span>
              </div>
              <div className="text-lg font-bold text-red-600">
                R$ {monthlyData[monthlyData.length - 1].despesas.toLocaleString("pt-BR")}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-blue-600 mb-1">
                <BarChart3 className="w-4 h-4" />
                <span className="text-sm font-medium">Saldo</span>
              </div>
              <div className="text-lg font-bold text-blue-600">
                R$ {monthlyData[monthlyData.length - 1].saldo.toLocaleString("pt-BR")}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
