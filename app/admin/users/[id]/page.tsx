"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, User, CreditCard, FileText, Settings, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function UserDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  // Dados simulados do usuário
  const user = {
    id: params.id,
    name: "Priscila Ferreira",
    email: "priscila@orcamentopoderoso.com",
    phone: "+55 (45) 9921-1532",
    cpf: "000.000.000-00",
    birthDate: "13/03/1991",
    gender: "Feminino",
    nationality: "Brasileira",
    cep: "85863-756",
    state: "PR",
    city: "Foz do Iguaçu",
    plan: "Premium",
    status: "active",
    joinDate: "2024-03-15",
    lastLogin: "2025-01-15 14:30",
    totalPaid: 899.7,
    loginCredentials: {
      email: "priscila@orcamentopoderoso.com",
      password: "minhasenha123",
      lastPasswordChange: "2024-12-01",
    },
    professionalInfo: {
      incomeSource: "Consultório Médico",
      specialty: "Cardiologia",
      monthlyIncome: "R$ 15.000 - R$ 25.000",
    },
    financialData: {
      currentBalance: "R$ 3.247,89",
      reserveAmount: "R$ 12.580,45",
      monthlyExpenses: "R$ 11.456,78",
      monthlyIncome: "R$ 15.280,00",
    },
  }

  const transactions = [
    { id: 1, date: "2025-01-15", description: "Aluguel", category: "Moradia", amount: -2800, status: "Pago" },
    { id: 2, date: "2025-01-14", description: "Consultório", category: "Receita", amount: 8500, status: "Recebido" },
    { id: 3, date: "2025-01-13", description: "Supermercado", category: "Alimentação", amount: -450, status: "Pago" },
    { id: 4, date: "2025-01-12", description: "Hospital A", category: "Receita", amount: 4200, status: "Recebido" },
    {
      id: 5,
      date: "2025-01-10",
      description: "Restaurante",
      category: "Gastei Sem Culpa",
      amount: -180,
      status: "Pago",
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

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => router.back()}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Detalhes do Usuário</h1>
              <p className="text-gray-600">Informações completas e dados financeiros</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(user.status)}
            {getPlanBadge(user.plan)}
          </div>
        </div>

        {/* Informações Básicas */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informações Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="text-sm font-medium text-gray-600">Nome Completo</label>
                <p className="text-lg font-medium">{user.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Email</label>
                <p className="text-lg">{user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Telefone</label>
                <p className="text-lg">{user.phone}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">CPF</label>
                <p className="text-lg">{user.cpf}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Data de Nascimento</label>
                <p className="text-lg">{user.birthDate}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Gênero</label>
                <p className="text-lg">{user.gender}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Nacionalidade</label>
                <p className="text-lg">{user.nationality}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">CEP</label>
                <p className="text-lg">{user.cep}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Cidade/Estado</label>
                <p className="text-lg">
                  {user.city}, {user.state}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs com informações detalhadas */}
        <Tabs defaultValue="login" className="space-y-4">
          <TabsList>
            <TabsTrigger value="login">Credenciais de Login</TabsTrigger>
            <TabsTrigger value="professional">Dados Profissionais</TabsTrigger>
            <TabsTrigger value="financial">Dados Financeiros</TabsTrigger>
            <TabsTrigger value="transactions">Transações</TabsTrigger>
          </TabsList>

          {/* Credenciais de Login */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Credenciais de Acesso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Email de Login</label>
                    <p className="text-lg font-mono bg-gray-50 p-2 rounded">{user.loginCredentials.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Senha</label>
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-mono bg-gray-50 p-2 rounded flex-1">
                        {showPassword ? user.loginCredentials.password : "••••••••••••"}
                      </p>
                      <Button variant="outline" size="sm" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Último Login</label>
                    <p className="text-lg">{user.lastLogin}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Última Alteração de Senha</label>
                    <p className="text-lg">{user.loginCredentials.lastPasswordChange}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dados Profissionais */}
          <TabsContent value="professional">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Informações Profissionais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Fonte de Renda</label>
                    <p className="text-lg">{user.professionalInfo.incomeSource}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Especialidade</label>
                    <p className="text-lg">{user.professionalInfo.specialty}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Faixa de Renda Mensal</label>
                    <p className="text-lg">{user.professionalInfo.monthlyIncome}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Data de Cadastro</label>
                    <p className="text-lg">{user.joinDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Dados Financeiros */}
          <TabsContent value="financial">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Situação Financeira Atual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <label className="text-sm font-medium text-gray-600">Saldo Atual</label>
                    <p className="text-2xl font-bold text-gray-800">{user.financialData.currentBalance}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <label className="text-sm font-medium text-green-700">Reserva</label>
                    <p className="text-2xl font-bold text-green-800">{user.financialData.reserveAmount}</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <label className="text-sm font-medium text-red-700">Despesas Mensais</label>
                    <p className="text-2xl font-bold text-red-800">{user.financialData.monthlyExpenses}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <label className="text-sm font-medium text-blue-700">Receita Mensal</label>
                    <p className="text-2xl font-bold text-blue-800">{user.financialData.monthlyIncome}</p>
                  </div>
                </div>
                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-600">Total Pago na Plataforma</label>
                  <p className="text-xl font-bold text-purple-700">
                    R$ {user.totalPaid.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Transações */}
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Últimas Transações</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Valor</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.date}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.category}</TableCell>
                        <TableCell className={transaction.amount > 0 ? "text-green-600" : "text-red-600"}>
                          R$ {Math.abs(transaction.amount).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transaction.status === "Pago" || transaction.status === "Recebido"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {transaction.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
