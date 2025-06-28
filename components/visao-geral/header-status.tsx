"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Target, DollarSign, Wallet } from "lucide-react"

export function HeaderStatus() {
  const statusData = [
    {
      title: "Saldo Atual",
      value: "R$ 3.624,00",
      change: "+8.2%",
      trend: "up",
      icon: Wallet,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Receita do Mês",
      value: "R$ 15.280,00",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Despesa do Mês",
      value: "R$ 11.656,00",
      change: "+3.1%",
      trend: "up",
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
    },
    {
      title: "Meta do Mês",
      value: "83.3%",
      change: "R$ 2.500 / R$ 3.000",
      trend: "up",
      icon: Target,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Resultado do Mês",
      value: "R$ 3.624,00",
      change: "+23.8%",
      trend: "up",
      icon: DollarSign,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {statusData.map((item, index) => {
        const IconComponent = item.icon
        return (
          <Card key={index} className={`${item.borderColor} border-l-4 hover:shadow-md transition-shadow`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-600 mb-1">{item.title}</p>
                  <p className={`text-2xl font-bold ${item.color} mb-1`}>{item.value}</p>
                  <div className="flex items-center gap-1">
                    {item.trend === "up" ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span className="text-xs text-gray-500">{item.change}</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${item.bgColor} rounded-full flex items-center justify-center`}>
                  <IconComponent className={`w-6 h-6 ${item.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
