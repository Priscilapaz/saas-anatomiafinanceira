"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"

export default function InsightsSystem() {
  const insights = [
    {
      tipo: "economia",
      titulo: "Economia Excepcional!",
      descricao: "Você economizou 18% a mais este mês comparado ao anterior",
      valor: "R$ 624,00",
      icon: <TrendingUp className="w-5 h-5" />,
      cor: "text-green-600",
      badge: "Positivo",
    },
    {
      tipo: "alerta",
      titulo: "Atenção aos Gastos com Alimentação",
      descricao: "Seus gastos com alimentação aumentaram 12% nas últimas 2 semanas",
      valor: "R$ 280,00",
      icon: <AlertCircle className="w-5 h-5" />,
      cor: "text-orange-600",
      badge: "Atenção",
    },
    {
      tipo: "meta",
      titulo: "Meta de Economia Quase Atingida",
      descricao: "Faltam apenas R$ 500 para atingir sua meta mensal de economia",
      valor: "83,3%",
      icon: <CheckCircle className="w-5 h-5" />,
      cor: "text-blue-600",
      badge: "Progresso",
    },
    {
      tipo: "oportunidade",
      titulo: "Oportunidade de Investimento",
      descricao: "Com seu saldo atual, você pode investir em CDB com rendimento de 12% a.a.",
      valor: "R$ 3.624",
      icon: <Lightbulb className="w-5 h-5" />,
      cor: "text-purple-600",
      badge: "Dica",
    },
  ]

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Positivo":
        return "bg-green-100 text-green-800"
      case "Atenção":
        return "bg-orange-100 text-orange-800"
      case "Progresso":
        return "bg-blue-100 text-blue-800"
      case "Dica":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-yellow-600" />
          Insights do Sistema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gray-50 ${insight.cor}`}>{insight.icon}</div>
                <Badge className={getBadgeColor(insight.badge)}>{insight.badge}</Badge>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900">{insight.titulo}</h3>
                <p className="text-sm text-gray-600">{insight.descricao}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className={`font-bold text-lg ${insight.cor}`}>{insight.valor}</span>
                  {insight.tipo === "economia" && (
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +18%
                    </div>
                  )}
                  {insight.tipo === "alerta" && (
                    <div className="flex items-center text-sm text-orange-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12%
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo dos Insights */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Insights Positivos</p>
              <p className="text-2xl font-bold text-green-600">2</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Alertas</p>
              <p className="text-2xl font-bold text-orange-600">1</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Oportunidades</p>
              <p className="text-2xl font-bold text-purple-600">1</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Score Financeiro</p>
              <p className="text-2xl font-bold text-blue-600">8.5</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
