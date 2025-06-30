"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Target, PiggyBank } from "lucide-react"

interface StatusCard {
  title: string
  value: string
  change: string
  trend: "up" | "down" | "neutral"
  icon: React.ReactNode
  color: string
}

export default function HeaderStatus() {
  const statusCards: StatusCard[] = [
    {
      title: "Saldo Atual",
      value: "R$ 3.624,00",
      change: "+2,5%",
      trend: "up",
      icon: <DollarSign className="w-5 h-5" />,
      color: "text-blue-600",
    },
    {
      title: "Receita do Mês",
      value: "R$ 15.280,00",
      change: "+8,2%",
      trend: "up",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      title: "Despesa do Mês",
      value: "R$ 11.656,00",
      change: "-3,1%",
      trend: "down",
      icon: <TrendingDown className="w-5 h-5" />,
      color: "text-red-600",
    },
    {
      title: "Meta do Mês",
      value: "83,3%",
      change: "R$ 2.500/3.000",
      trend: "up",
      icon: <Target className="w-5 h-5" />,
      color: "text-orange-600",
    },
    {
      title: "Resultado do Mês",
      value: "R$ 3.624,00",
      change: "+18,5%",
      trend: "up",
      icon: <PiggyBank className="w-5 h-5" />,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {statusCards.map((card, index) => (
        <Card key={index} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg bg-gray-50 ${card.color}`}>{card.icon}</div>
              <div
                className={`flex items-center text-sm ${
                  card.trend === "up" ? "text-green-600" : card.trend === "down" ? "text-red-600" : "text-gray-600"
                }`}
              >
                {card.trend === "up" ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : card.trend === "down" ? (
                  <TrendingDown className="w-3 h-3 mr-1" />
                ) : null}
                {card.change}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{card.title}</p>
              <p className="text-xl font-bold">{card.value}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
