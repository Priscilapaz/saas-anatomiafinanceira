"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp } from "lucide-react"

export function GraficoFluxo() {
  const dadosFluxo = [
    { mes: "Abr", receitas: 13800, despesas: 11000, saldo: 2800 },
    { mes: "Mai", receitas: 14100, despesas: 11180, saldo: 2920 },
    { mes: "Jun", receitas: 15280, despesas: 11656, saldo: 3624 },
  ]

  const maxValue = Math.max(...dadosFluxo.flatMap((d) => [d.receitas, d.despesas]))

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          Fluxo de Caixa - Últimos 3 Meses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Gráfico de Barras Horizontais */}
          <div className="space-y-4">
            {dadosFluxo.map((data, index) => (
              <div key={data.mes} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-sm">{data.mes}</span>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className={`text-sm font-bold ${data.saldo >= 0 ? "text-green-600" : "text-red-600"}`}>
                      R$ {data.saldo.toLocaleString("pt-BR")}
                    </span>
                  </div>
                </div>

                <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
                  {/* Barra de Receitas */}
                  <div
                    className="absolute top-0 left-0 h-6 bg-green-500 rounded-t-lg flex items-center justify-end pr-2"
                    style={{ width: `${(data.receitas / maxValue) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">R$ {(data.receitas / 1000).toFixed(1)}k</span>
                  </div>
                  {/* Barra de Despesas */}
                  <div
                    className="absolute bottom-0 left-0 h-6 bg-red-500 rounded-b-lg flex items-center justify-end pr-2"
                    style={{ width: `${(data.despesas / maxValue) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">R$ {(data.despesas / 1000).toFixed(1)}k</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumo */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm font-medium">Receitas</span>
              </div>
              <div className="text-lg font-bold text-green-600">
                R$ {dadosFluxo[dadosFluxo.length - 1].receitas.toLocaleString("pt-BR")}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-red-600 mb-1">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm font-medium">Despesas</span>
              </div>
              <div className="text-lg font-bold text-red-600">
                R$ {dadosFluxo[dadosFluxo.length - 1].despesas.toLocaleString("pt-BR")}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                <TrendingUp className="w-3 h-3" />
                <span className="text-sm font-medium">Saldo</span>
              </div>
              <div className="text-lg font-bold text-blue-600">
                R$ {dadosFluxo[dadosFluxo.length - 1].saldo.toLocaleString("pt-BR")}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
