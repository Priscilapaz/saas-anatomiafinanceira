"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  MoreHorizontal,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  Mail,
  Eye,
} from "lucide-react"

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const payments = [
    {
      id: "pay_123456789",
      user: "João Silva",
      email: "joao@email.com",
      amount: 99.9,
      status: "paid",
      method: "credit_card",
      date: "2025-01-15",
      dueDate: "2025-01-15",
      asaasId: "cus_000005492",
    },
    {
      id: "pay_123456790",
      user: "Maria Santos",
      email: "maria@email.com",
      amount: 199.9,
      status: "pending",
      method: "boleto",
      date: "2025-01-15",
      dueDate: "2025-01-17",
      asaasId: "cus_000005493",
    },
    {
      id: "pay_123456791",
      user: "Pedro Costa",
      email: "pedro@email.com",
      amount: 99.9,
      status: "overdue",
      method: "credit_card",
      date: "2025-01-10",
      dueDate: "2025-01-12",
      asaasId: "cus_000005494",
    },
    {
      id: "pay_123456792",
      user: "Ana Oliveira",
      email: "ana@email.com",
      amount: 299.9,
      status: "paid",
      method: "pix",
      date: "2025-01-14",
      dueDate: "2025-01-14",
      asaasId: "cus_000005495",
    },
    {
      id: "pay_123456793",
      user: "Carlos Lima",
      email: "carlos@email.com",
      amount: 99.9,
      status: "failed",
      method: "credit_card",
      date: "2025-01-13",
      dueDate: "2025-01-13",
      asaasId: "cus_000005496",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Pago
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pendente
          </Badge>
        )
      case "overdue":
        return (
          <Badge className="bg-red-100 text-red-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Vencido
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <XCircle className="w-3 h-3 mr-1" />
            Falhou
          </Badge>
        )
      default:
        return <Badge>Desconhecido</Badge>
    }
  }

  const getMethodBadge = (method: string) => {
    switch (method) {
      case "credit_card":
        return <Badge variant="outline">Cartão</Badge>
      case "boleto":
        return <Badge variant="outline">Boleto</Badge>
      case "pix":
        return <Badge variant="outline">PIX</Badge>
      default:
        return <Badge variant="outline">{method}</Badge>
    }
  }

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0)
  const paidAmount = filteredPayments
    .filter((p) => p.status === "paid")
    .reduce((sum, payment) => sum + payment.amount, 0)

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestão de Pagamentos</h1>
            <p className="text-gray-600">Monitore e gerencie todos os pagamentos via Asaas</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Sincronizar
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Filtros */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por usuário, email ou ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="paid">Pago</SelectItem>
                  <SelectItem value="pending">Pendente</SelectItem>
                  <SelectItem value="overdue">Vencido</SelectItem>
                  <SelectItem value="failed">Falhou</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="week">Esta Semana</SelectItem>
                  <SelectItem value="month">Este Mês</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">
                R$ {totalAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-600">Total em Pagamentos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">
                R$ {paidAmount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </div>
              <div className="text-sm text-gray-600">Pagamentos Confirmados</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">
                {filteredPayments.filter((p) => p.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">Pagamentos Pendentes</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">
                {filteredPayments.filter((p) => p.status === "overdue").length}
              </div>
              <div className="text-sm text-gray-600">Pagamentos Vencidos</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Pagamentos */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Pagamentos ({filteredPayments.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID / Usuário</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Vencimento</TableHead>
                  <TableHead>Asaas ID</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-xs text-gray-500">{payment.id}</div>
                        <div className="font-medium">{payment.user}</div>
                        <div className="text-sm text-gray-500">{payment.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        R$ {payment.amount.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell>{getMethodBadge(payment.method)}</TableCell>
                    <TableCell>{payment.date}</TableCell>
                    <TableCell>
                      <div className={payment.status === "overdue" ? "text-red-600 font-medium" : ""}>
                        {payment.dueDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs text-gray-500 font-mono">{payment.asaasId}</div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <RefreshCw className="w-4 h-4 mr-2" />
                            Atualizar Status
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Enviar Lembrete
                          </DropdownMenuItem>
                          {payment.status === "pending" && (
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="w-4 h-4 mr-2" />
                              Cancelar
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
