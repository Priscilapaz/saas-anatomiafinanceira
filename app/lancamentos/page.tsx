"use client"

import { useState, useCallback } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { NovoLancamentoModal } from "@/components/novo-lancamento-modal"
import { EditarLancamentoModal } from "@/components/editar-lancamento-modal"
import { ConfirmarExclusaoModal } from "@/components/confirmar-exclusao-modal"
import { Plus, Search, Filter, Edit, Trash2, TrendingUp, TrendingDown } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

interface Transaction {
  id: string
  description: string
  amount: number
  type: "receita" | "despesa"
  category: string
  date: Date
  account: string
  status: "pago" | "pendente" | "cancelado"
  notes?: string
}

// Dados de exemplo
const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    description: "Salário",
    amount: 8500,
    type: "receita",
    category: "Salário",
    date: new Date(2025, 5, 1),
    account: "Conta Corrente",
    status: "pago",
  },
  {
    id: "2",
    description: "Supermercado",
    amount: 450,
    type: "despesa",
    category: "Alimentação",
    date: new Date(2025, 5, 15),
    account: "Cartão de Crédito",
    status: "pago",
  },
  {
    id: "3",
    description: "Consulta médica",
    amount: 200,
    type: "despesa",
    category: "Saúde",
    date: new Date(2025, 5, 20),
    account: "Conta Corrente",
    status: "pendente",
  },
  {
    id: "4",
    description: "Freelance",
    amount: 1200,
    type: "receita",
    category: "Trabalho Extra",
    date: new Date(2025, 5, 25),
    account: "Conta Corrente",
    status: "pago",
  },
]

export default function LancamentosPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(SAMPLE_TRANSACTIONS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("todos")
  const [filterCategory, setFilterCategory] = useState<string>("todas")

  // Filtrar transações
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "todos" || transaction.type === filterType
    const matchesCategory = filterCategory === "todas" || transaction.category === filterCategory
    return matchesSearch && matchesType && matchesCategory
  })

  // Calcular totais
  const totalReceitas = filteredTransactions.filter((t) => t.type === "receita").reduce((sum, t) => sum + t.amount, 0)

  const totalDespesas = filteredTransactions.filter((t) => t.type === "despesa").reduce((sum, t) => sum + t.amount, 0)

  const saldo = totalReceitas - totalDespesas

  const handleAddTransaction = (newTransaction: Omit<Transaction, "id">) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: Date.now().toString(),
    }
    setTransactions([transaction, ...transactions])
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsEditModalOpen(true)
  }

  const handleSaveTransaction = (updatedTransaction: Transaction) => {
    setTransactions(transactions.map((t) => (t.id === updatedTransaction.id ? updatedTransaction : t)))
  }

  const handleDeleteTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setIsDeleteModalOpen(true)
  }

  const handleConfirmDelete = (transactionId: string) => {
    setTransactions(transactions.filter((t) => t.id !== transactionId))
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      pago: "default",
      pendente: "secondary",
      cancelado: "destructive",
    } as const

    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  const categories = Array.from(new Set(transactions.map((t) => t.category)))

  // BOTÃO DE TESTE TEMPORÁRIO
  const handleTestLancamento = useCallback(async () => {
    try {
      const response = await fetch("/api/lancamentos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: "Teste direto no botão",
          value: 123.45,
          date: new Date().toISOString(),
        }),
      })

      const result = await response.json()
      console.log("Response:", result)
      alert("Lançamento enviado!")
    } catch (error) {
      console.error("Erro ao enviar lançamento:", error)
      alert("Erro ao enviar lançamento")
    }
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-bold">Lançamentos</h1>
          </div>
          <div className="ml-auto px-3">
            <Button onClick={() => setIsModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Lançamento
            </Button>
          </div>
        </header>

        {/* Resumo */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Receitas</p>
                  <p className="text-2xl font-bold text-green-600">
                    {totalReceitas.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Despesas</p>
                  <p className="text-2xl font-bold text-red-600">
                    {totalDespesas.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Saldo</p>
                  <p className={`text-2xl font-bold ${saldo >= 0 ? "text-blue-600" : "text-red-600"}`}>
                    {saldo.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    saldo >= 0 ? "bg-blue-100" : "bg-red-100"
                  }`}
                >
                  {saldo >= 0 ? "+" : "-"}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os tipos</SelectItem>
                  <SelectItem value="receita">Receitas</SelectItem>
                  <SelectItem value="despesa">Despesas</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas as categorias</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Transações */}
        <Card>
          <CardHeader>
            <CardTitle>Transações Recentes ({filteredTransactions.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredTransactions.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                <p>Nenhuma transação encontrada</p>
                <p className="text-sm">Tente ajustar os filtros ou adicione uma nova transação</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between rounded-lg border p-4 hover:bg-gray-50"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-3 w-3 rounded-full ${
                            transaction.type === "receita" ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <div>
                          <h3 className="font-medium">{transaction.description}</h3>
                          <p className="text-sm text-gray-600">
                            {transaction.category} • {transaction.account} •{" "}
                            {transaction.date.toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p
                          className={`font-bold ${transaction.type === "receita" ? "text-green-600" : "text-red-600"}`}
                        >
                          {transaction.type === "receita" ? "+" : "-"}
                          {transaction.amount.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                        {getStatusBadge(transaction.status)}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditTransaction(transaction)}
                          className="text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTransaction(transaction)}
                          className="text-red-600 hover:bg-red-50 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* BOTÃO DE TESTE TEMPORÁRIO */}
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
          <p className="mb-2 text-sm text-gray-600">🧪 Área de desenvolvimento</p>
          <Button onClick={handleTestLancamento} className="bg-blue-600 text-white hover:bg-blue-700">
            Testar Lançamento
          </Button>
        </div>
      </div>

      {/* Modais */}
      <NovoLancamentoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddTransaction} />

      <EditarLancamentoModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        transaction={selectedTransaction}
        onSave={handleSaveTransaction}
      />

      <ConfirmarExclusaoModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        transaction={selectedTransaction}
        onConfirm={handleConfirmDelete}
      />
    </DashboardLayout>
  )
}
