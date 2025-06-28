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
import { Search, Filter, MoreHorizontal, UserPlus, Mail, Ban, CheckCircle, Download, Eye } from "lucide-react"
import Link from "next/link"

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [planFilter, setPlanFilter] = useState("all")

  const users = [
    {
      id: "1",
      name: "Priscila Ferreira",
      email: "priscila@orcamentopoderoso.com",
      plan: "Premium",
      status: "active",
      lastLogin: "2025-01-15",
      totalPaid: 899.7,
      joinDate: "2024-03-15",
    },
    {
      id: "2",
      name: "Maria Santos",
      email: "maria@email.com",
      plan: "Basic",
      status: "active",
      lastLogin: "2025-01-14",
      totalPaid: 99.9,
      joinDate: "2024-05-20",
    },
    {
      id: "3",
      name: "Pedro Costa",
      email: "pedro@email.com",
      plan: "Premium",
      status: "suspended",
      lastLogin: "2025-01-10",
      totalPaid: 599.4,
      joinDate: "2024-01-10",
    },
    {
      id: "4",
      name: "Ana Oliveira",
      email: "ana@email.com",
      plan: "Pro",
      status: "active",
      lastLogin: "2025-01-15",
      totalPaid: 899.7,
      joinDate: "2024-02-28",
    },
    {
      id: "5",
      name: "Carlos Lima",
      email: "carlos@email.com",
      plan: "Basic",
      status: "inactive",
      lastLogin: "2024-12-20",
      totalPaid: 199.8,
      joinDate: "2024-08-15",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Ativo</Badge>
      case "inactive":
        return <Badge className="bg-gray-100 text-gray-800">Inativo</Badge>
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspenso</Badge>
      default:
        return <Badge>Desconhecido</Badge>
    }
  }

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Basic":
        return <Badge variant="outline">Basic</Badge>
      case "Pro":
        return <Badge className="bg-blue-100 text-blue-800">Pro</Badge>
      case "Premium":
        return <Badge className="bg-purple-100 text-purple-800">Premium</Badge>
      default:
        return <Badge variant="outline">{plan}</Badge>
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesPlan = planFilter === "all" || user.plan === planFilter

    return matchesSearch && matchesStatus && matchesPlan
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestão de Usuários</h1>
            <p className="text-gray-600">Gerencie todos os usuários da plataforma</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button>
              <UserPlus className="w-4 h-4 mr-2" />
              Novo Usuário
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
                    placeholder="Buscar por nome ou email..."
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
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                  <SelectItem value="suspended">Suspenso</SelectItem>
                </SelectContent>
              </Select>

              <Select value={planFilter} onValueChange={setPlanFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Plano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Planos</SelectItem>
                  <SelectItem value="Basic">Basic</SelectItem>
                  <SelectItem value="Pro">Pro</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Estatísticas Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-sm text-gray-600">Total de Usuários</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">892</div>
              <div className="text-sm text-gray-600">Usuários Ativos</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">234</div>
              <div className="text-sm text-gray-600">Novos este Mês</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">68.5%</div>
              <div className="text-sm text-gray-600">Taxa de Retenção</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Usuários */}
        <Card>
          <CardHeader>
            <CardTitle>Lista de Usuários ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Plano</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Último Login</TableHead>
                  <TableHead>Total Pago</TableHead>
                  <TableHead>Data de Cadastro</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getPlanBadge(user.plan)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>R$ {user.totalPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/users/${user.id}`} className="flex items-center">
                              <Eye className="w-4 h-4 mr-2" />
                              Ver Detalhes
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Mail className="w-4 h-4 mr-2" />
                            Enviar Email
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Ativar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Ban className="w-4 h-4 mr-2" />
                            Suspender
                          </DropdownMenuItem>
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
