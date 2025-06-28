"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Home, Utensils, Car, Heart, Palette, Baby, Gift, MoreHorizontal } from "lucide-react"

export function DistribuicaoGastos() {
  const distribuicao = [
    { categoria: "Moradia", valor: 4068, percentual: 34.9, cor: "bg-blue-500", icon: Home },
    { categoria: "Alimentação", valor: 2331, percentual: 20.0, cor: "bg-green-500", icon: Utensils },
    { categoria: "Transporte", valor: 1166, percentual: 10.0, cor: "bg-yellow-500", icon: Car },
    { categoria: "Saúde", valor: 1050, percentual: 9.0, cor: "bg-red-500", icon: Heart },
    { categoria: "Beleza", valor: 932, percentual: 8.0, cor: "bg-pink-500", icon: Palette },
    { categoria: "Filhos", valor: 815, percentual: 7.0, cor: "bg-purple-500", icon: Baby },
    { categoria: "Extras", valor: 699, percentual: 6.0, cor: "bg-indigo-500", icon: Gift },
    { categoria: "Outros", valor: 595, percentual: 5.1, cor: "bg-gray-500", icon: MoreHorizontal },
  ]

  const total = distribuicao.reduce((sum, item) => sum + item.valor, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="w-5 h-5 text-purple-600" />
          Distribuição de Gastos por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Gráfico de Pizza Simplificado */}
          <div className="relative">
            <div className="flex flex-wrap gap-2 mb-4">
              {distribuicao.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <div className={`w-3 h-3 ${item.cor} rounded-full`}></div>
                    <IconComponent className="w-3 h-3 text-gray-600" />
                    <span className="text-gray-700">{item.categoria}</span>
                  </div>
                )
              })}
            </div>

            {/* Barras Horizontais como alternativa ao gráfico de pizza */}
            <div className="space-y-3">
              {distribuicao.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center gap-2 w-32">
                      <div className={`w-4 h-4 ${item.cor} rounded-full flex items-center justify-center`}>
                        <IconComponent className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.categoria}</span>
                    </div>

                    <div className="flex-1 flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className={`h-2 ${item.cor} rounded-full`} style={{ width: `${item.percentual}%` }}></div>
                      </div>
                      <div className="text-right min-w-[80px]">
                        <div className="text-sm font-bold text-gray-900">R$ {item.valor.toLocaleString("pt-BR")}</div>
                        <div className="text-xs text-gray-500">{item.percentual}%</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Total */}
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">Total de Gastos:</span>
              <span className="text-xl font-bold text-gray-900">R$ {total.toLocaleString("pt-BR")}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
