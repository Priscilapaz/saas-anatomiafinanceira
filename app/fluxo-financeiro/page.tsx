"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  TrendingUp,
  TrendingDown,
  Target,
  Heart,
  Home,
  Car,
  Utensils,
  ShoppingBag,
  Gamepad2,
  GraduationCap,
  Stethoscope,
  ChevronDown,
  ChevronRight,
  Filter,
  Calendar,
  PieChart,
  BarChart3,
  Eye,
} from "lucide-react"
import { useState } from "react"

export default function FluxoFinanceiroPage() {
  const [selectedMonth, setSelectedMonth] = useState("junho")
  const [selectedYear, setSelectedYear] = useState("2025")
  const [viewMode, setViewMode] = useState("categorias") // categorias, grupos, timeline
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["grupo1", "sonhos"])

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => (prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]))
  }

  // Dados simulados baseados na estrutura da planilha
  const resumoMensal = {
    receita: 15280.0,
    totalInvestido: 2500.0,
    totalGasto: 11456.0,
    saldoFinal: 1324.0,
    gasteiSemCulpa: 1200.0,
  }

  const categoriasSonhos = [
    {
      id: "reserva-emergencia",
      nome: "Reserva de Emergência",
      valor: 2500.0,
      meta: 10000.0,
      progresso: 25,
      icon: Target,
      cor: "bg-green-500",
    },
    {
      id: "viagem",
      nome: "Viagem Europa",
      valor: 800.0,
      meta: 8000.0,
      progresso: 10,
      icon: Heart,
      cor: "bg-pink-500",
    },
  ]

  const gruposVBSP = [
    {
      id: "grupo1",
      nome: "Essenciais",
      total: 4200.0,
      orcamento: 4500.0,
      categorias: [
        { nome: "Moradia", valor: 2800.0, icon: Home, cor: "bg-blue-500" },
        { nome: "Alimentação", valor: 1400.0, icon: Utensils, cor: "bg-orange-500" },
      ],
    },
    {
      id: "grupo2",
      nome: "Transporte",
      total: 1200.0,
      orcamento: 1500.0,
      categorias: [
        { nome: "Combustível", valor: 600.0, icon: Car, cor: "bg-red-500" },
        { nome: "Manutenção", valor: 400.0, icon: Car, cor: "bg-red-400" },
        { nome: "Transporte Público", valor: 200.0, icon: Car, cor: "bg-red-300" },
      ],
    },
    {
      id: "grupo3",
      nome: "Estilo de Vida",
      total: 2800.0,
      orcamento: 3000.0,
      categorias: [
        { nome: "Compras", valor: 800.0, icon: ShoppingBag, cor: "bg-purple-500" },
        { nome: "Lazer", valor: 600.0, icon: Gamepad2, cor: "bg-indigo-500" },
        { nome: "Educação", valor: 400.0, icon: GraduationCap, cor: "bg-cyan-500" },
        { nome: "Saúde", valor: 1000.0, icon: Stethoscope, cor: "bg-emerald-500" },
      ],
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header com Filtros */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Fluxo Financeiro</h1>
            <p className="text-gray-600">Visualize para onde vai e de onde vem seu dinheiro</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-32">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junho">Junho</SelectItem>
                <SelectItem value="maio">Maio</SelectItem>
                <SelectItem value="abril">Abril</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
              </SelectContent>
            </Select>

            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-36">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="categorias">Por Categorias</SelectItem>
                <SelectItem value="grupos">Por Grupos</SelectItem>
                <SelectItem value="timeline">Linha do Tempo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Resumo Executivo */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Receita</p>
                  <p className="text-xl font-bold text-green-600">
                    R$ {resumoMensal.receita.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Investido (SER)</p>
                  <p className="text-xl font-bold text-blue-600">
                    R$ {resumoMensal.totalInvestido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Gasto (VBSP)</p>
                  <p className="text-xl font-bold text-orange-600">
                    R$ {resumoMensal.totalGasto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <TrendingDown className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Sem Culpa</p>
                  <p className="text-xl font-bold text-purple-600">
                    R$ {resumoMensal.gasteiSemCulpa.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                <Heart className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className={`border-l-4 ${resumoMensal.saldoFinal >= 0 ? "border-l-green-500" : "border-l-red-500"}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Saldo Final</p>
                  <p
                    className={`text-xl font-bold ${resumoMensal.saldoFinal >= 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    R$ {resumoMensal.saldoFinal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </p>
                </div>
                {resumoMensal.saldoFinal >= 0 ? (
                  <TrendingUp className="w-8 h-8 text-green-500" />
                ) : (
                  <TrendingDown className="w-8 h-8 text-red-500" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs para diferentes visualizações */}
        <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="categorias" className="flex items-center gap-2">
              <PieChart className="w-4 h-4" />
              Categorias
            </TabsTrigger>
            <TabsTrigger value="grupos" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Grupos
            </TabsTrigger>
            <TabsTrigger value="timeline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Timeline
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categorias" className="space-y-6">
            {/* Sonhar e Realizar (SER) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    <span>Sonhar e Realizar (SER)</span>
                    <Badge variant="secondary">
                      R$ {resumoMensal.totalInvestido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => toggleGroup("sonhos")}>
                    {expandedGroups.includes("sonhos") ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </Button>
                </CardTitle>
              </CardHeader>
              {expandedGroups.includes("sonhos") && (
                <CardContent>
                  <div className="space-y-4">
                    {categoriasSonhos.map((sonho) => {
                      const IconComponent = sonho.icon
                      return (
                        <div key={sonho.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 ${sonho.cor} rounded-full flex items-center justify-center`}>
                                <IconComponent className="w-5 h-5 text-white" />
                              </div>
                              <div>
                                <h4 className="font-medium">{sonho.nome}</h4>
                                <p className="text-sm text-gray-600">
                                  R$ {sonho.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} de R${" "}
                                  {sonho.meta.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-blue-600">{sonho.progresso}%</div>
                              <div className="text-sm text-gray-500">concluído</div>
                            </div>
                          </div>
                          <Progress value={sonho.progresso} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Viver Bem Sem se Privar (VBSP) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-orange-600" />
                    <span>Viver Bem Sem se Privar (VBSP)</span>
                    <Badge variant="secondary">
                      R$ {resumoMensal.totalGasto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {gruposVBSP.map((grupo) => {
                    const percentualGasto = (grupo.total / grupo.orcamento) * 100
                    const isOverBudget = percentualGasto > 100

                    return (
                      <div key={grupo.id} className="border rounded-lg">
                        <div className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => toggleGroup(grupo.id)}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              {expandedGroups.includes(grupo.id) ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                              <div>
                                <h4 className="font-medium">{grupo.nome}</h4>
                                <p className="text-sm text-gray-600">
                                  R$ {grupo.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} de R${" "}
                                  {grupo.orcamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-lg font-bold ${isOverBudget ? "text-red-600" : "text-green-600"}`}>
                                {percentualGasto.toFixed(1)}%
                              </div>
                              <div className="text-sm text-gray-500">do orçamento</div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <Progress value={Math.min(percentualGasto, 100)} className="h-2" />
                            {isOverBudget && (
                              <p className="text-xs text-red-600 mt-1">
                                Excedeu em R${" "}
                                {(grupo.total - grupo.orcamento).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                              </p>
                            )}
                          </div>
                        </div>

                        {expandedGroups.includes(grupo.id) && (
                          <div className="border-t bg-gray-50 p-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {grupo.categorias.map((categoria, index) => {
                                const IconComponent = categoria.icon
                                return (
                                  <div key={index} className="flex items-center space-x-3 p-3 bg-white rounded border">
                                    <div
                                      className={`w-8 h-8 ${categoria.cor} rounded-full flex items-center justify-center`}
                                    >
                                      <IconComponent className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1">
                                      <div className="font-medium">{categoria.nome}</div>
                                      <div className="text-sm text-gray-600">
                                        R$ {categoria.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="grupos" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {gruposVBSP.map((grupo) => {
                const percentualGasto = (grupo.total / grupo.orcamento) * 100
                const isOverBudget = percentualGasto > 100

                return (
                  <Card key={grupo.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>{grupo.nome}</span>
                        <Badge variant={isOverBudget ? "destructive" : "secondary"}>
                          {percentualGasto.toFixed(1)}%
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Gasto: R$ {grupo.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                          <span>
                            Orçamento: R$ {grupo.orcamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <Progress value={Math.min(percentualGasto, 100)} className="h-3" />

                        <div className="space-y-2">
                          {grupo.categorias.map((categoria, index) => {
                            const IconComponent = categoria.icon
                            const percentualCategoria = (categoria.valor / grupo.total) * 100

                            return (
                              <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <div className={`w-4 h-4 ${categoria.cor} rounded-full`}></div>
                                  <span className="text-sm">{categoria.nome}</span>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">
                                    R$ {categoria.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                  </div>
                                  <div className="text-xs text-gray-500">{percentualCategoria.toFixed(1)}%</div>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            {/* Saldo Anterior */}
            <Card>
              <CardHeader>
                <CardTitle>Saldo Anterior</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 w-48"></th>
                        <th className="text-right p-3 min-w-24">Jan</th>
                        <th className="text-right p-3 min-w-24">Fev</th>
                        <th className="text-right p-3 min-w-24">Mar</th>
                        <th className="text-right p-3 min-w-24">Abr</th>
                        <th className="text-right p-3 min-w-24">Mai</th>
                        <th className="text-right p-3 min-w-24 bg-blue-50 font-bold">Jun</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b bg-gray-50">
                        <td className="p-3 font-medium">Saldo Anterior</td>
                        <td className="p-3 text-right">R$ 1.200</td>
                        <td className="p-3 text-right">R$ 1.850</td>
                        <td className="p-3 text-right">R$ 2.100</td>
                        <td className="p-3 text-right">R$ 1.750</td>
                        <td className="p-3 text-right">R$ 2.380</td>
                        <td className="p-3 text-right bg-blue-50 font-bold">R$ 1.324</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Origem das Receitas */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <span>Origem das Receitas</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 w-48">Categoria</th>
                        <th className="text-right p-3 min-w-24">Jan</th>
                        <th className="text-right p-3 min-w-24">Fev</th>
                        <th className="text-right p-3 min-w-24">Mar</th>
                        <th className="text-right p-3 min-w-24">Abr</th>
                        <th className="text-right p-3 min-w-24">Mai</th>
                        <th className="text-right p-3 min-w-24 bg-green-50 font-bold">Jun</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-green-100 border-b">
                        <td className="p-3 font-bold">TOTAL RECEITAS</td>
                        <td className="p-3 text-right font-bold">R$ 12.500</td>
                        <td className="p-3 text-right font-bold">R$ 13.200</td>
                        <td className="p-3 text-right font-bold">R$ 14.500</td>
                        <td className="p-3 text-right font-bold">R$ 13.800</td>
                        <td className="p-3 text-right font-bold">R$ 14.100</td>
                        <td className="p-3 text-right font-bold bg-green-50">R$ 15.280</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-6">Salário</td>
                        <td className="p-3 text-right">R$ 8.500</td>
                        <td className="p-3 text-right">R$ 8.500</td>
                        <td className="p-3 text-right">R$ 8.500</td>
                        <td className="p-3 text-right">R$ 8.500</td>
                        <td className="p-3 text-right">R$ 8.500</td>
                        <td className="p-3 text-right bg-green-50">R$ 8.500</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-6">Consultoria</td>
                        <td className="p-3 text-right">R$ 2.000</td>
                        <td className="p-3 text-right">R$ 2.500</td>
                        <td className="p-3 text-right">R$ 3.500</td>
                        <td className="p-3 text-right">R$ 2.800</td>
                        <td className="p-3 text-right">R$ 3.200</td>
                        <td className="p-3 text-right bg-green-50">R$ 4.200</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-6">Freelances</td>
                        <td className="p-3 text-right">R$ 1.500</td>
                        <td className="p-3 text-right">R$ 1.800</td>
                        <td className="p-3 text-right">R$ 2.000</td>
                        <td className="p-3 text-right">R$ 2.000</td>
                        <td className="p-3 text-right">R$ 1.900</td>
                        <td className="p-3 text-right bg-green-50">R$ 2.080</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-6">Investimentos</td>
                        <td className="p-3 text-right">R$ 500</td>
                        <td className="p-3 text-right">R$ 400</td>
                        <td className="p-3 text-right">R$ 500</td>
                        <td className="p-3 text-right">R$ 500</td>
                        <td className="p-3 text-right">R$ 500</td>
                        <td className="p-3 text-right bg-green-50">R$ 500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Destino do Dinheiro - Sonhar e Realizar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span>Destino do Dinheiro - Sonhar e Realizar (SER)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 w-48">Categoria</th>
                        <th className="text-right p-3 min-w-24">Jan</th>
                        <th className="text-right p-3 min-w-24">Fev</th>
                        <th className="text-right p-3 min-w-24">Mar</th>
                        <th className="text-right p-3 min-w-24">Abr</th>
                        <th className="text-right p-3 min-w-24">Mai</th>
                        <th className="text-right p-3 min-w-24 bg-blue-50 font-bold">Jun</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-blue-100 border-b">
                        <td className="p-3 font-bold">TOTAL INVESTIDO (SER)</td>
                        <td className="p-3 text-right font-bold">R$ 2.000</td>
                        <td className="p-3 text-right font-bold">R$ 2.200</td>
                        <td className="p-3 text-right font-bold">R$ 2.500</td>
                        <td className="p-3 text-right font-bold">R$ 2.300</td>
                        <td className="p-3 text-right font-bold">R$ 2.400</td>
                        <td className="p-3 text-right font-bold bg-blue-50">R$ 2.500</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-6">Reserva de Emergência</td>
                        <td className="p-3 text-right">R$ 1.500</td>
                        <td className="p-3 text-right">R$ 1.700</td>
                        <td className="p-3 text-right">R$ 2.000</td>
                        <td className="p-3 text-right">R$ 1.800</td>
                        <td className="p-3 text-right">R$ 1.900</td>
                        <td className="p-3 text-right bg-blue-50">R$ 2.000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-6">Viagem Europa</td>
                        <td className="p-3 text-right">R$ 300</td>
                        <td className="p-3 text-right">R$ 300</td>
                        <td className="p-3 text-right">R$ 300</td>
                        <td className="p-3 text-right">R$ 300</td>
                        <td className="p-3 text-right">R$ 300</td>
                        <td className="p-3 text-right bg-blue-50">R$ 300</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-6">Carro Novo</td>
                        <td className="p-3 text-right">R$ 200</td>
                        <td className="p-3 text-right">R$ 200</td>
                        <td className="p-3 text-right">R$ 200</td>
                        <td className="p-3 text-right">R$ 200</td>
                        <td className="p-3 text-right">R$ 200</td>
                        <td className="p-3 text-right bg-blue-50">R$ 200</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Destino do Dinheiro - Viver Bem Sem se Privar */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-orange-600" />
                  <span>Destino do Dinheiro - Viver Bem Sem se Privar (VBSP)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 w-48">Categoria</th>
                        <th className="text-right p-3 min-w-24">Jan</th>
                        <th className="text-right p-3 min-w-24">Fev</th>
                        <th className="text-right p-3 min-w-24">Mar</th>
                        <th className="text-right p-3 min-w-24">Abr</th>
                        <th className="text-right p-3 min-w-24">Mai</th>
                        <th className="text-right p-3 min-w-24 bg-orange-50 font-bold">Jun</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-orange-100 border-b">
                        <td className="p-3 font-bold">TOTAL VBSP</td>
                        <td className="p-3 text-right font-bold">R$ 9.200</td>
                        <td className="p-3 text-right font-bold">R$ 9.800</td>
                        <td className="p-3 text-right font-bold">R$ 10.200</td>
                        <td className="p-3 text-right font-bold">R$ 9.950</td>
                        <td className="p-3 text-right font-bold">R$ 10.100</td>
                        <td className="p-3 text-right font-bold bg-orange-50">R$ 10.456</td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="p-3 font-medium">Grupo 1 - Essenciais</td>
                        <td className="p-3 text-right font-medium">R$ 4.000</td>
                        <td className="p-3 text-right font-medium">R$ 4.100</td>
                        <td className="p-3 text-right font-medium">R$ 4.200</td>
                        <td className="p-3 text-right font-medium">R$ 4.150</td>
                        <td className="p-3 text-right font-medium">R$ 4.180</td>
                        <td className="p-3 text-right font-medium bg-orange-50">R$ 4.200</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-8">Moradia</td>
                        <td className="p-3 text-right">R$ 2.800</td>
                        <td className="p-3 text-right">R$ 2.800</td>
                        <td className="p-3 text-right">R$ 2.800</td>
                        <td className="p-3 text-right">R$ 2.800</td>
                        <td className="p-3 text-right">R$ 2.800</td>
                        <td className="p-3 text-right bg-orange-50">R$ 2.800</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-8">Alimentação</td>
                        <td className="p-3 text-right">R$ 1.200</td>
                        <td className="p-3 text-right">R$ 1.300</td>
                        <td className="p-3 text-right">R$ 1.400</td>
                        <td className="p-3 text-right">R$ 1.350</td>
                        <td className="p-3 text-right">R$ 1.380</td>
                        <td className="p-3 text-right bg-orange-50">R$ 1.400</td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="p-3 font-medium">Grupo 2 - Transporte</td>
                        <td className="p-3 text-right font-medium">R$ 1.100</td>
                        <td className="p-3 text-right font-medium">R$ 1.150</td>
                        <td className="p-3 text-right font-medium">R$ 1.200</td>
                        <td className="p-3 text-right font-medium">R$ 1.180</td>
                        <td className="p-3 text-right font-medium">R$ 1.190</td>
                        <td className="p-3 text-right font-medium bg-orange-50">R$ 1.200</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-8">Combustível</td>
                        <td className="p-3 text-right">R$ 600</td>
                        <td className="p-3 text-right">R$ 620</td>
                        <td className="p-3 text-right">R$ 650</td>
                        <td className="p-3 text-right">R$ 630</td>
                        <td className="p-3 text-right">R$ 640</td>
                        <td className="p-3 text-right bg-orange-50">R$ 600</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-8">Manutenção</td>
                        <td className="p-3 text-right">R$ 300</td>
                        <td className="p-3 text-right">R$ 330</td>
                        <td className="p-3 text-right">R$ 350</td>
                        <td className="p-3 text-right">R$ 350</td>
                        <td className="p-3 text-right">R$ 350</td>
                        <td className="p-3 text-right bg-orange-50">R$ 400</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-8">Transporte Público</td>
                        <td className="p-3 text-right">R$ 200</td>
                        <td className="p-3 text-right">R$ 200</td>
                        <td className="p-3 text-right">R$ 200</td>
                        <td className="p-3 text-right">R$ 200</td>
                        <td className="p-3 text-right">R$ 200</td>
                        <td className="p-3 text-right bg-orange-50">R$ 200</td>
                      </tr>
                      <tr className="bg-gray-50 border-b">
                        <td className="p-3 font-medium">Grupo 3 - Estilo de Vida</td>
                        <td className="p-3 text-right font-medium">R$ 2.600</td>
                        <td className="p-3 text-right font-medium">R$ 2.750</td>
                        <td className="p-3 text-right font-medium">R$ 2.900</td>
                        <td className="p-3 text-right font-medium">R$ 2.820</td>
                        <td className="p-3 text-right font-medium">R$ 2.880</td>
                        <td className="p-3 text-right font-medium bg-orange-50">R$ 2.856</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-8">Saúde</td>
                        <td className="p-3 text-right">R$ 800</td>
                        <td className="p-3 text-right">R$ 850</td>
                        <td className="p-3 text-right">R$ 900</td>
                        <td className="p-3 text-right">R$ 880</td>
                        <td className="p-3 text-right">R$ 890</td>
                        <td className="p-3 text-right bg-orange-50">R$ 1.000</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-8">Educação</td>
                        <td className="p-3 text-right">R$ 400</td>
                        <td className="p-3 text-right">R$ 400</td>
                        <td className="p-3 text-right">R$ 450</td>
                        <td className="p-3 text-right">R$ 420</td>
                        <td className="p-3 text-right">R$ 430</td>
                        <td className="p-3 text-right bg-orange-50">R$ 400</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-8">Lazer</td>
                        <td className="p-3 text-right">R$ 600</td>
                        <td className="p-3 text-right">R$ 650</td>
                        <td className="p-3 text-right">R$ 700</td>
                        <td className="p-3 text-right">R$ 680</td>
                        <td className="p-3 text-right">R$ 690</td>
                        <td className="p-3 text-right bg-orange-50">R$ 600</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-8">Compras</td>
                        <td className="p-3 text-right">R$ 800</td>
                        <td className="p-3 text-right">R$ 850</td>
                        <td className="p-3 text-right">R$ 850</td>
                        <td className="p-3 text-right">R$ 840</td>
                        <td className="p-3 text-right">R$ 870</td>
                        <td className="p-3 text-right bg-orange-50">R$ 856</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Gastei Sem Culpa */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="w-5 h-5 text-purple-600" />
                  <span>Gastei Sem Culpa (GSC)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 w-48">Categoria</th>
                        <th className="text-right p-3 min-w-24">Jan</th>
                        <th className="text-right p-3 min-w-24">Fev</th>
                        <th className="text-right p-3 min-w-24">Mar</th>
                        <th className="text-right p-3 min-w-24">Abr</th>
                        <th className="text-right p-3 min-w-24">Mai</th>
                        <th className="text-right p-3 min-w-24 bg-purple-50 font-bold">Jun</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-purple-100 border-b">
                        <td className="p-3 font-bold">TOTAL GSC</td>
                        <td className="p-3 text-right font-bold">R$ 800</td>
                        <td className="p-3 text-right font-bold">R$ 950</td>
                        <td className="p-3 text-right font-bold">R$ 1.100</td>
                        <td className="p-3 text-right font-bold">R$ 1.050</td>
                        <td className="p-3 text-right font-bold">R$ 1.080</td>
                        <td className="p-3 text-right font-bold bg-purple-50">R$ 1.200</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-6">Restaurantes</td>
                        <td className="p-3 text-right">R$ 400</td>
                        <td className="p-3 text-right">R$ 500</td>
                        <td className="p-3 text-right">R$ 600</td>
                        <td className="p-3 text-right">R$ 550</td>
                        <td className="p-3 text-right">R$ 580</td>
                        <td className="p-3 text-right bg-purple-50">R$ 700</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-6">Compras Extras</td>
                        <td className="p-3 text-right">R$ 300</td>
                        <td className="p-3 text-right">R$ 350</td>
                        <td className="p-3 text-right">R$ 400</td>
                        <td className="p-3 text-right">R$ 400</td>
                        <td className="p-3 text-right">R$ 400</td>
                        <td className="p-3 text-right bg-purple-50">R$ 400</td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-3 pl-6">Entretenimento</td>
                        <td className="p-3 text-right">R$ 100</td>
                        <td className="p-3 text-right">R$ 100</td>
                        <td className="p-3 text-right">R$ 100</td>
                        <td className="p-3 text-right">R$ 100</td>
                        <td className="p-3 text-right">R$ 100</td>
                        <td className="p-3 text-right bg-purple-50">R$ 100</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Resumo Final */}
            <Card className="border-2 border-gray-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5 text-gray-700" />
                  <span>Resumo Final do Orçamento</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-gray-100">
                        <th className="text-left p-3 w-48 font-bold">Resumo</th>
                        <th className="text-right p-3 min-w-24 font-bold">Jan</th>
                        <th className="text-right p-3 min-w-24 font-bold">Fev</th>
                        <th className="text-right p-3 min-w-24 font-bold">Mar</th>
                        <th className="text-right p-3 min-w-24 font-bold">Abr</th>
                        <th className="text-right p-3 min-w-24 font-bold">Mai</th>
                        <th className="text-right p-3 min-w-24 bg-gray-200 font-bold">Jun</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b bg-green-50">
                        <td className="p-3 font-bold text-green-700">Receita</td>
                        <td className="p-3 text-right font-bold text-green-700">R$ 12.500</td>
                        <td className="p-3 text-right font-bold text-green-700">R$ 13.200</td>
                        <td className="p-3 text-right font-bold text-green-700">R$ 14.500</td>
                        <td className="p-3 text-right font-bold text-green-700">R$ 13.800</td>
                        <td className="p-3 text-right font-bold text-green-700">R$ 14.100</td>
                        <td className="p-3 text-right font-bold text-green-700 bg-green-100">R$ 15.280</td>
                      </tr>
                      <tr className="border-b bg-blue-50">
                        <td className="p-3 font-bold text-blue-700">Total Investido (SER)</td>
                        <td className="p-3 text-right font-bold text-blue-700">R$ 2.000</td>
                        <td className="p-3 text-right font-bold text-blue-700">R$ 2.200</td>
                        <td className="p-3 text-right font-bold text-blue-700">R$ 2.500</td>
                        <td className="p-3 text-right font-bold text-blue-700">R$ 2.300</td>
                        <td className="p-3 text-right font-bold text-blue-700">R$ 2.400</td>
                        <td className="p-3 text-right font-bold text-blue-700 bg-blue-100">R$ 2.500</td>
                      </tr>
                      <tr className="border-b bg-red-50">
                        <td className="p-3 font-bold text-red-700">Total Gasto (VBSP + GSC)</td>
                        <td className="p-3 text-right font-bold text-red-700">R$ 10.000</td>
                        <td className="p-3 text-right font-bold text-red-700">R$ 10.750</td>
                        <td className="p-3 text-right font-bold text-red-700">R$ 11.300</td>
                        <td className="p-3 text-right font-bold text-red-700">R$ 11.000</td>
                        <td className="p-3 text-right font-bold text-red-700">R$ 11.180</td>
                        <td className="p-3 text-right font-bold text-red-700 bg-red-100">R$ 11.656</td>
                      </tr>
                      <tr className="border-b-2 border-gray-400 bg-gray-100">
                        <td className="p-3 font-bold text-gray-900 text-lg">Saldo Final</td>
                        <td className="p-3 text-right font-bold text-gray-900 text-lg">R$ 1.700</td>
                        <td className="p-3 text-right font-bold text-gray-900 text-lg">R$ 1.650</td>
                        <td className="p-3 text-right font-bold text-gray-900 text-lg">R$ 2.200</td>
                        <td className="p-3 text-right font-bold text-gray-900 text-lg">R$ 1.800</td>
                        <td className="p-3 text-right font-bold text-gray-900 text-lg">R$ 2.320</td>
                        <td className="p-3 text-right font-bold text-gray-900 text-lg bg-gray-200">R$ 1.324</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Insights e Alertas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="w-5 h-5" />
                <span>Insights do Mês</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-green-50 border border-green-200 rounded">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Meta de Poupança Atingida</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Você conseguiu poupar R$ 1.324 este mês, superando sua meta!
                  </p>
                </div>

                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-4 h-4 text-yellow-600" />
                    <span className="text-sm font-medium text-yellow-800">Atenção: Grupo Transporte</span>
                  </div>
                  <p className="text-sm text-yellow-700 mt-1">
                    Gastos com transporte estão 80% do orçamento. Monitore os próximos gastos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Próximas Metas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Reserva de Emergência</span>
                  <span className="text-sm font-medium">25% concluída</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Viagem Europa</span>
                  <span className="text-sm font-medium">10% concluída</span>
                </div>
                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  Ver Todas as Metas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Análise de Tendências - Movida do Resumo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Análise de Tendências</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">Receitas em Alta</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Suas receitas aumentaram 8,5% este mês, principalmente devido aos freelances.
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-yellow-600" />
                    <span className="font-medium text-yellow-800">Gastos Controlados</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    Despesas aumentaram apenas 3,2%, mostrando bom controle financeiro.
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-800">Meta Quase Atingida</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Você está a apenas R$ 176 de atingir sua meta de economia mensal!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Metas Gerais</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Reserva de Emergência</span>
                    <span>R$ 2.824 / R$ 10.000</span>
                  </div>
                  <Progress value={28.24} className="h-2" />
                  <div className="text-sm text-gray-600 mt-1">28% da meta atingida</div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Viagem Europa</span>
                    <span>R$ 800 / R$ 8.000</span>
                  </div>
                  <Progress value={10} className="h-2" />
                  <div className="text-sm text-gray-600 mt-1">10% da meta atingida</div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Carro Novo</span>
                    <span>R$ 1.200 / R$ 15.000</span>
                  </div>
                  <Progress value={8} className="h-2" />
                  <div className="text-sm text-gray-600 mt-1">8% da meta atingida</div>
                </div>

                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  <Target className="w-4 h-4 mr-2" />
                  Gerenciar Todas as Metas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
