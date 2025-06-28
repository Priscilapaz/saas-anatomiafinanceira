"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { PieChart, Home, Car, Utensils, ShoppingBag, Heart, Gamepad2 } from "lucide-react"

export default function DistribuicaoGastos() {
  const dadosDistribuicao = [
    { categoria: "Moradia", valor: 4079.6, percentual: 35, icon: <Home className="w-4 h-4" />, cor: "#ef4444" },
    { categoria: "Alimentação", valor: 2331.2, percentual: 20, icon: <Utensils className="w-4 h-4" />, cor: "#f97316" },
    { categoria: "Transporte", valor: 1165.6, percentual: 10, icon: <Car className="w-4 h-4" />, cor: "#eab308" },
    { categoria: "Compras", valor: 1048.04, percentual: 9, icon: <ShoppingBag className="w-4 h-4" />, cor: "#22c55e" },
    { categoria: "Saúde", valor: 932.48, percentual: 8, icon: <Heart className="w-4 h-4" />, cor: "#3b82f6" },
    { categoria: "Lazer", valor: 699.36, percentual: 6, icon: <Gamepad2 className="w-4 h-4" />, cor: "#8b5cf6" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <PieChart className="w-6 h-6 mr-2 text-purple-600" />
          Distribuição de Gastos por Categoria
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Barras */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dadosDistribuicao}
                layout="horizontal"
                margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(value) => `${value}%`} />
                <YAxis dataKey="categoria" type="category" width={60} />
                <Tooltip
                  formatter={(value: number, name: string, props: any) => [
                    `R$ ${props.payload.valor.toLocaleString("pt-BR")}`,
                    `${value}%`,
                  ]}
                />
                <Bar dataKey="percentual" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Lista Detalhada */}
          <div className="space-y-3">
            {dadosDistribuicao.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <div className="p-2 rounded-lg mr-3" style={{ backgroundColor: `${item.cor}20`, color: item.cor }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-medium">{item.categoria}</p>
                    <p className="text-sm text-gray-600">{item.percentual}% do total</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">R$ {item.valor.toLocaleString("pt-BR")}</p>
                  <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${item.percentual * 2.86}%`, backgroundColor: item.cor }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumo */}
        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600">Total Gasto</p>
              <p className="text-lg font-bold">R$ 11.656</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Maior Categoria</p>
              <p className="text-lg font-bold text-red-600">Moradia</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Menor Categoria</p>
              <p className="text-lg font-bold text-green-600">Lazer</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Média por Categoria</p>
              <p className="text-lg font-bold">R$ 1.943</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
