"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, TrendingUp, TrendingDown, Star } from "lucide-react"

export function DestaquesInteligentes() {
  const topGastos = [
    { categoria: "Moradia", valor: 4068, percentual: 34.9, trend: "stable" },
    { categoria: "Alimentação", valor: 2331, percentual: 20.0, trend: "up" },
    { categoria: "Transporte", valor: 1166, percentual: 10.0, trend: "down" },
  ]

  const topReceitas = [
    { fonte: "Salário Principal", valor: 8500, percentual: 55.6, trend: "stable" },
    { fonte: "Freelances", valor: 4200, percentual: 27.5, trend: "up" },
    { fonte: "Investimentos", valor: 2580, percentual: 16.9, trend: "up" },
  ]

  const alertas = [
    {
      tipo: "warning",
      titulo: "Meta de Economia",
      descricao: "Faltam R$ 500 para atingir a meta mensal",
      urgencia: "media",
    },
    {
      tipo: "success",
      titulo: "Gastos Controlados",
      descricao: "Alimentação 15% abaixo da média",
      urgencia: "baixa",
    },
    {
      tipo: "info",
      titulo: "Oportunidade",
      descricao: "Receitas 12% acima do mês anterior",
      urgencia: "baixa",
    },
  ]

  const getAlertIcon = (tipo: string) => {
    switch (tipo) {
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />
      case "success":
        return <TrendingUp className="w-4 h-4 text-green-600" />
      case "info":
        return <Star className="w-4 h-4 text-blue-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const getAlertColor = (tipo: string) => {
    switch (tipo) {
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "success":
        return "bg-green-50 border-green-200"
      case "info":
        return "bg-blue-50 border-blue-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Top 3 Gastos */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingDown className="w-4 h-4 text-red-600" />
            Maiores Gastos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topGastos.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{item.categoria}</span>
                  <Badge variant="secondary" className="text-xs">
                    {item.percentual}%
                  </Badge>
                </div>
                <div className="text-lg font-bold text-red-600">R$ {item.valor.toLocaleString("pt-BR")}</div>
              </div>
              <div className="text-right">
                {item.trend === "up" && <TrendingUp className="w-4 h-4 text-red-500" />}
                {item.trend === "down" && <TrendingDown className="w-4 h-4 text-green-500" />}
                {item.trend === "stable" && <div className="w-4 h-4" />}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top 3 Receitas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            Principais Receitas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topReceitas.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{item.fonte}</span>
                  <Badge variant="secondary" className="text-xs">
                    {item.percentual}%
                  </Badge>
                </div>
                <div className="text-lg font-bold text-green-600">R$ {item.valor.toLocaleString("pt-BR")}</div>
              </div>
              <div className="text-right">
                {item.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                {item.trend === "down" && <TrendingDown className="w-4 h-4 text-red-500" />}
                {item.trend === "stable" && <div className="w-4 h-4" />}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Alertas Visuais */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            Alertas Inteligentes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alertas.map((alerta, index) => (
            <div key={index} className={`p-3 rounded-lg border ${getAlertColor(alerta.tipo)}`}>
              <div className="flex items-start gap-2">
                {getAlertIcon(alerta.tipo)}
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{alerta.titulo}</h4>
                  <p className="text-xs text-gray-600">{alerta.descricao}</p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
