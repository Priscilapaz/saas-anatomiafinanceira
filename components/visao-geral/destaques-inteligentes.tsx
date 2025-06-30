"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, TrendingUp, Home, Car, Utensils } from "lucide-react"

export default function DestaquesInteligentes() {
  const topGastos = [
    { categoria: "Moradia", valor: "R$ 4.079,60", percentual: "35%", icon: <Home className="w-4 h-4" /> },
    { categoria: "Alimentação", valor: "R$ 2.331,20", percentual: "20%", icon: <Utensils className="w-4 h-4" /> },
    { categoria: "Transporte", valor: "R$ 1.165,60", percentual: "10%", icon: <Car className="w-4 h-4" /> },
  ]

  const topReceitas = [
    { fonte: "Salário Principal", valor: "R$ 12.000,00", percentual: "78%" },
    { fonte: "Freelances", valor: "R$ 2.280,00", percentual: "15%" },
    { fonte: "Investimentos", valor: "R$ 1.000,00", percentual: "7%" },
  ]

  const alertas = [
    { tipo: "warning", mensagem: "Meta de economia 83% atingida", icon: <AlertTriangle className="w-4 h-4" /> },
    {
      tipo: "success",
      mensagem: "Gastos com alimentação -15% vs mês anterior",
      icon: <TrendingUp className="w-4 h-4" />,
    },
    { tipo: "info", mensagem: "Próximo vencimento: Cartão em 5 dias", icon: <AlertTriangle className="w-4 h-4" /> },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      {/* Top 3 Gastos */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
            Top 3 Gastos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topGastos.map((gasto, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg text-red-600 mr-3">{gasto.icon}</div>
                <div>
                  <p className="font-medium">{gasto.categoria}</p>
                  <p className="text-sm text-gray-600">{gasto.percentual} do total</p>
                </div>
              </div>
              <p className="font-bold text-red-600">{gasto.valor}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top 3 Receitas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Top 3 Receitas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topReceitas.map((receita, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{receita.fonte}</p>
                <p className="text-sm text-gray-600">{receita.percentual} do total</p>
              </div>
              <p className="font-bold text-green-600">{receita.valor}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Alertas */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
            Alertas Importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {alertas.map((alerta, index) => (
            <div key={index} className="flex items-start p-3 bg-gray-50 rounded-lg">
              <div
                className={`p-1 rounded mr-3 ${
                  alerta.tipo === "warning"
                    ? "bg-orange-100 text-orange-600"
                    : alerta.tipo === "success"
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                }`}
              >
                {alerta.icon}
              </div>
              <p className="text-sm flex-1">{alerta.mensagem}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
