"use client"

import { useState } from "react"
import {
  CreditCard,
  DollarSign,
  PlusCircle,
  TrendingDown,
  TrendingUp,
  User,
  Settings,
  BarChart3,
  FileText,
  Target,
  Home,
  Users,
  Tag,
  AlertTriangle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function FinancialDashboard() {
  const [activeTab, setActiveTab] = useState("pessoal")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900">Anatomia Financeira</h2>
          <p className="text-sm text-gray-600">Priscila Ferreira</p>
        </div>

        <nav className="space-y-2">
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Menu Principal</p>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-3 h-4 w-4" />
                Visão Geral
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <BarChart3 className="mr-3 h-4 w-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-3 h-4 w-4" />
                Resumo
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <PlusCircle className="mr-3 h-4 w-4" />
                Lançamentos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <TrendingUp className="mr-3 h-4 w-4" />
                Fluxo Financeiro
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <FileText className="mr-3 h-4 w-4" />
                Relatórios
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <CreditCard className="mr-3 h-4 w-4" />
                Contas e Cartões
              </Button>
            </div>
          </div>

          <Separator />

          <div className="mt-6">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">Mais opções</p>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-3 h-4 w-4" />
                Grupos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Tag className="mr-3 h-4 w-4" />
                Categorias
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <User className="mr-3 h-4 w-4" />
                Perfil
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Settings className="mr-3 h-4 w-4" />
                Opções
              </Button>
            </div>
          </div>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button variant="ghost" className="w-full justify-start">
            <Settings className="mr-3 h-4 w-4" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Financeiro</h1>
              <p className="text-gray-600">Gerencie suas finanças de forma inteligente</p>
            </div>
            <div className="flex items-center gap-4">
              {/* Quick Launch Button - Prominent placement */}
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                <PlusCircle className="mr-2 h-5 w-5" />
                Lançamento Rápido
              </Button>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <Button
                  variant={activeTab === "pessoal" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("pessoal")}
                  className="text-sm"
                >
                  <User className="mr-2 h-4 w-4" />
                  Pessoal
                </Button>
                <Button
                  variant={activeTab === "profissional" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("profissional")}
                  className="text-sm"
                >
                  Profissional
                </Button>
                <Button
                  variant={activeTab === "fisica" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveTab("fisica")}
                  className="text-sm"
                >
                  Pessoa Física
                </Button>
              </div>
            </div>
          </div>

          {/* Personal Panel Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Painel Pessoal</h2>
                <p className="text-gray-600">Controle suas finanças pessoais</p>
              </div>
            </div>
            <Button variant="outline" className="bg-blue-600 text-white border-blue-600 hover:bg-blue-700">
              Criar 1 Lançamento
            </Button>
          </div>

          {/* Financial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Receitas</CardTitle>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-1">R$ 8.500,00</div>
                <p className="text-xs text-gray-500">+12% em relação ao mês anterior</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Despesas</CardTitle>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600 mb-1">R$ 6.200,00</div>
                <p className="text-xs text-gray-500">+5% em relação ao mês anterior</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Saldo</CardTitle>
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600 mb-1">R$ 2.300,00</div>
                <p className="text-xs text-gray-500">Superávit mensal</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-600">Meta Mensal</CardTitle>
                  <Target className="h-4 w-4 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600 mb-2">85%</div>
                <Progress value={85} className="h-2 mb-2" />
                <p className="text-xs text-gray-500">R$ 10.000,00 meta</p>
              </CardContent>
            </Card>
          </div>

          {/* Important Alerts */}
          <Card className="mb-8 border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-lg font-semibold">Alertas Importantes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  <span className="text-red-800 font-medium">Cartão de crédito vence em 3 dias</span>
                </div>
                <Badge variant="destructive" className="text-xs">
                  Vencimento
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                  <span className="text-yellow-800 font-medium">Você está 15% abaixo da meta mensal</span>
                </div>
                <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800">
                  Meta
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Expense Distribution */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-gray-600" />
                <CardTitle className="text-lg font-semibold">Distribuição de Gastos</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-medium">Alimentação</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">R$ 1.200,00</div>
                    <div className="text-sm text-gray-500">(19.4%)</div>
                  </div>
                </div>
                <Progress value={19.4} className="h-2" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="font-medium">Transporte</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">R$ 800,00</div>
                    <div className="text-sm text-gray-500">(12.9%)</div>
                  </div>
                </div>
                <Progress value={12.9} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
