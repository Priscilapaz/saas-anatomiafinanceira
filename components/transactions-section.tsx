"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ArrowUpDown, Plus } from "lucide-react"

export function TransactionsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const transactions = [
    {
      id: 1,
      description: "Salário - Empresa XYZ",
      amount: 8500.0,
      type: "receita",
      category: "Salário",
      date: "2025-06-25",
      account: "Conta Corrente",
    },
    {
      id: 2,
      description: "Supermercado ABC",
      amount: -450.8,
      type: "despesa",
      category: "Alimentação",
      date: "2025-06-24",
      account: "Cartão Nubank",
    },
    {
      id: 3,
      description: "Freelance - Cliente Y",
      amount: 2800.0,
      type: "receita",
      category: "Freelance",
      date: "2025-06-23",
      account: "Conta Corrente",
    },
    {
      id: 4,
      description: "Aluguel",
      amount: -2800.0,
      type: "despesa",
      category: "Moradia",
      date: "2025-06-22",
      account: "Conta Corrente",
    },
    {
      id: 5,
      description: "Posto de Gasolina",
      amount: -180.5,
      type: "despesa",
      category: "Transporte",
      date: "2025-06-21",
      account: "Cartão Itaú",
    },
  ]

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || transaction.type === filterType
    return matchesSearch && matchesFilter
  })

  const getTypeColor = (type: string) => {
    switch (type) {
      case "receita":
        return "bg-green-100 text-green-800"
      case "despesa":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transações Recentes</CardTitle>
          <Button variant="outline" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Nova Transação
          </Button>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar transações..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="receita">Receitas</SelectItem>
              <SelectItem value="despesa">Despesas</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Ordenar
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div>
                    <h4 className="font-medium">{transaction.description}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={getTypeColor(transaction.type)}>
                        {transaction.type === "receita" ? "Receita" : "Despesa"}
                      </Badge>
                      <span className="text-sm text-gray-600">{transaction.category}</span>
                      <span className="text-sm text-gray-600">•</span>
                      <span className="text-sm text-gray-600">{transaction.account}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className={`font-bold ${transaction.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {transaction.amount >= 0 ? "+" : ""}R${" "}
                  {Math.abs(transaction.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </div>
                <div className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString("pt-BR")}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline">Ver Todas as Transações</Button>
        </div>
      </CardContent>
    </Card>
  )
}
