"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react"

export function FinancialSummary() {
  const currentMonth = new Date().getMonth()
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"]

  // Mostrar apenas 3 meses
  const getVisibleMonths = () => {
    const start = Math.max(0, currentMonth - 1)
    const end = Math.min(11, start + 2)
    return months.slice(start, end + 1)
  }

  const visibleMonths = getVisibleMonths()

  // Dados de exemplo para os últimos 3 meses
  const cashFlowData = [
    { month: "Abr", receitas: 13800, despesas: 11000, saldo: 2800 },
    { month: "Mai", receitas: 14100, despesas: 11180, saldo: 2920 },
    { month: "Jun", receitas: 15280, despesas: 11656, saldo: 3624 },
  ]

  return (
    <div className="space-y-6">
      {/* Resumo Financeiro */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-[#EAE6DA] border-[#9E815F]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#2A3829] mb-1">Saldo Atual</p>
                <p className="text-2xl font-bold text-[#2A3829]">R$ 3.624</p>
              </div>
              <DollarSign className="w-8 h-8 text-[#4C5B48]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-700 mb-1">Receitas do Mês</p>
                <p className="text-2xl font-bold text-green-800">R$ 15.280</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 mb-1">Despesas do Mês</p>
                <p className="text-2xl font-bold text-red-800">R$ 11.656</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#EAE6DA] border-[#4C5B48]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#4C5B48] mb-1">Meta do Mês</p>
                <p className="text-2xl font-bold text-[#2A3829]">76%</p>
              </div>
              <Target className="w-8 h-8 text-[#4C5B48]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fluxo de Caixa - Últimos 3 Meses */}
      <Card>
        <CardHeader className="bg-[#2A3829] text-white my-0 mr-0">
          <CardTitle className="flex items-center gap-2 text-base">
            <TrendingUp className="w-5 h-5" />
            Fluxo de Caixa - Últimos 3 Meses
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {cashFlowData.map((data, index) => (
              <div key={data.month} className="space-y-2">
                <div className="flex justify-between items-center tracking-normal text-xs">
                  <span className="font-semibold text-sm">{data.month}</span>
                  <div className="flex gap-6 text-sm">
                    <span className="text-green-600 font-medium">R$ {data.receitas.toLocaleString("pt-BR")}</span>
                    <span className="text-red-600 font-medium">R$ {data.despesas.toLocaleString("pt-BR")}</span>
                    <span className="text-blue-600 font-bold">R$ {data.saldo.toLocaleString("pt-BR")}</span>
                  </div>
                </div>

                <div className="relative">
                  {/* Barra de Receitas (Verde) */}
                  <div className="h-6 bg-gray-200 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-lg"
                      style={{ width: `${(data.receitas / 16000) * 100}%` }}
                    />
                  </div>

                  {/* Barra de Despesas (Vermelha) sobreposta */}
                  <div className="absolute top-0 h-6 rounded-lg overflow-hidden" style={{ width: "100%" }}>
                    <div
                      className="h-full bg-red-500 rounded-lg"
                      style={{ width: `${(data.despesas / 16000) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span>Receitas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span>Despesas</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded"></div>
                <span>Saldo</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metas e Progresso */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="bg-[#4C5B48] text-white">
            <CardTitle className="text-base">Metas do Mês</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Economia</span>
                <span className="text-sm text-gray-600">R$ 2.500 / R$ 3.000</span>
              </div>
              <Progress value={83} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Investimentos</span>
                <span className="text-sm text-gray-600">R$ 1.800 / R$ 2.000</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Reserva de Emergência</span>
                <span className="text-sm text-gray-600">R$ 12.580 / R$ 15.000</span>
              </div>
              <Progress value={84} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-[#9E815F] text-white">
            <CardTitle className="text-base">Distribuição de Gastos</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Moradia</span>
                <span className="text-sm font-medium">35%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Alimentação</span>
                <span className="text-sm font-medium">20%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Transporte</span>
                <span className="text-sm font-medium">15%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Lazer</span>
                <span className="text-sm font-medium">12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Outros</span>
                <span className="text-sm font-medium">18%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
