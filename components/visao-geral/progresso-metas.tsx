"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Target, Calendar, TrendingUp } from "lucide-react"

export default function ProgressoMetas() {
  const metas = [
    {
      nome: "Economia Mensal",
      atual: 2500,
      objetivo: 3000,
      percentual: 83.3,
      prazo: "15 dias restantes",
      cor: "bg-green-500",
    },
    {
      nome: "Redução de Gastos",
      atual: 11656,
      objetivo: 10000,
      percentual: 85.7,
      prazo: "Meta para Dezembro",
      cor: "bg-orange-500",
    },
    {
      nome: "Reserva de Emergência",
      atual: 15000,
      objetivo: 20000,
      percentual: 75,
      prazo: "6 meses restantes",
      cor: "bg-blue-500",
    },
  ]

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Target className="w-6 h-6 mr-2 text-blue-600" />
          Progresso das Metas
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metas.map((meta, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">{meta.nome}</h3>
                <span className="text-sm text-gray-600 flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  {meta.prazo}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>R$ {meta.atual.toLocaleString("pt-BR")}</span>
                  <span>R$ {meta.objetivo.toLocaleString("pt-BR")}</span>
                </div>
                <Progress value={meta.percentual} className="h-3" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{meta.percentual.toFixed(1)}% concluído</span>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    No prazo
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
