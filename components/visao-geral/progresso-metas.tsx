"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, TrendingUp } from "lucide-react"

export function ProgressoMetas() {
  const metas = [
    {
      nome: "Meta de Economia Mensal",
      atual: 2500,
      objetivo: 3000,
      percentual: 83.3,
      status: "em-andamento",
      prazo: "Faltam 5 dias",
    },
    {
      nome: "Reserva de Emergência",
      atual: 12580,
      objetivo: 50000,
      percentual: 25.2,
      status: "em-andamento",
      prazo: "Meta anual",
    },
    {
      nome: "Viagem Europa",
      atual: 3200,
      objetivo: 15000,
      percentual: 21.3,
      status: "em-andamento",
      prazo: "Dezembro 2025",
    },
    {
      nome: "Carro Novo",
      atual: 8500,
      objetivo: 45000,
      percentual: 18.9,
      status: "em-andamento",
      prazo: "Junho 2026",
    },
  ]

  const getStatusColor = (percentual: number) => {
    if (percentual >= 80) return "text-green-600"
    if (percentual >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressColor = (percentual: number) => {
    if (percentual >= 80) return "bg-green-500"
    if (percentual >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5 text-purple-600" />
          Progresso das Metas Financeiras
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metas.map((meta, index) => (
            <div key={index} className="space-y-3 p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm">{meta.nome}</h4>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className={`text-sm font-bold ${getStatusColor(meta.percentual)}`}>
                    {meta.percentual.toFixed(1)}%
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Progress value={meta.percentual} className="h-2" />
                <div className="flex justify-between text-xs text-gray-600">
                  <span>R$ {meta.atual.toLocaleString("pt-BR")}</span>
                  <span>R$ {meta.objetivo.toLocaleString("pt-BR")}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{meta.prazo}</span>
                <span className="text-xs font-medium text-gray-700">
                  Faltam R$ {(meta.objetivo - meta.atual).toLocaleString("pt-BR")}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
