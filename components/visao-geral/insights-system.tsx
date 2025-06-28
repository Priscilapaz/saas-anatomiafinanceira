"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, TrendingUp, TrendingDown, AlertCircle, CheckCircle } from "lucide-react"

export function InsightsSystem() {
  const insights = [
    {
      tipo: "economia",
      titulo: "Você economizou 18% a mais este mês!",
      descricao: "Comparado ao mês anterior, seus gastos com alimentação diminuíram significativamente.",
      impacto: "positivo",
      valor: "R$ 420",
      categoria: "Alimentação",
    },
    {
      tipo: "alerta",
      titulo: "Gastos com transporte aumentaram 15%",
      descricao: "Considere revisar seus deslocamentos ou buscar alternativas mais econômicas.",
      impacto: "atencao",
      valor: "R$ 180",
      categoria: "Transporte",
    },
    {
      tipo: "oportunidade",
      titulo: "Meta de economia quase atingida!",
      descricao: "Faltam apenas R$ 500 para atingir sua meta mensal. Você está no caminho certo!",
      impacto: "positivo",
      valor: "R$ 500",
      categoria: "Metas",
    },
    {
      tipo: "tendencia",
      titulo: "Receitas em crescimento constante",
      descricao: "Suas receitas cresceram 12% nos últimos 3 meses. Excelente progresso!",
      impacto: "positivo",
      valor: "R$ 1.680",
      categoria: "Receitas",
    },
  ]

  const getInsightIcon = (tipo: string) => {
    switch (tipo) {
      case "economia":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "alerta":
        return <AlertCircle className="w-4 h-4 text-yellow-600" />
      case "oportunidade":
        return <TrendingUp className="w-4 h-4 text-blue-600" />
      case "tendencia":
        return <TrendingUp className="w-4 h-4 text-purple-600" />
      default:
        return <Lightbulb className="w-4 h-4 text-gray-600" />
    }
  }

  const getInsightColor = (impacto: string) => {
    switch (impacto) {
      case "positivo":
        return "bg-green-50 border-green-200"
      case "atencao":
        return "bg-yellow-50 border-yellow-200"
      case "neutro":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "economia":
        return "bg-green-100 text-green-800"
      case "alerta":
        return "bg-yellow-100 text-yellow-800"
      case "oportunidade":
        return "bg-blue-100 text-blue-800"
      case "tendencia":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          Insights do Sistema
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className={`p-4 rounded-lg border ${getInsightColor(insight.impacto)}`}>
              <div className="flex items-start gap-3">
                {getInsightIcon(insight.tipo)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium text-sm">{insight.titulo}</h4>
                    <Badge className={`text-xs ${getBadgeColor(insight.tipo)}`}>{insight.categoria}</Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{insight.descricao}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-gray-900">{insight.valor}</span>
                    {insight.impacto === "positivo" && <TrendingUp className="w-4 h-4 text-green-500" />}
                    {insight.impacto === "atencao" && <TrendingDown className="w-4 h-4 text-yellow-500" />}
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
