"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import PainelFinanceiro from "@/components/painel-financeiro"
import { Header } from "@/components/header"
import { usePerfil } from "@/contexts/perfil-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search } from "lucide-react"
import { GrupoModal } from "@/components/grupo-modal"
import { CategoriaModal } from "@/components/categoria-modal"
import { PerfilProvider } from "@/contexts/perfil-context"
import { Suspense } from "react"

interface Grupo {
  id: string
  nome: string
  tipo: "vbsp" | "gsc" | "ser"
  categorias: number
  cor: string
}

interface Categoria {
  id: string
  nome: string
  grupo: string
  icone: string
  cor: string
}

export default function DashboardPage() {
  return (
    <PerfilProvider>
      <div className="min-h-screen bg-gray-50 container mx-auto p-6">
        <Header />
        <DashboardLayout>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">
                  Dashboard {usePerfil().perfilAtivo === "pessoal" ? "Pessoal" : "Profissional"}
                </h1>
                <p className="text-gray-600">
                  {usePerfil().perfilAtivo === "pessoal"
                    ? "Acompanhe suas finanças pessoais e metas"
                    : "Gerencie suas finanças empresariais e indicadores"}
                </p>
              </div>
            </div>

            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              }
            >
              <PainelFinanceiro />
            </Suspense>

            {/* Layout de 3 Colunas */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Coluna 1: Timeline (Resumo) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Timeline Financeira</h2>
                </div>

                {/* Informações Gerais */}
                <div className="grid grid-cols-1 gap-3">
                  <Card className="bg-slate-50 border-slate-200">
                    <CardContent className="p-3">
                      <div className="text-xs text-slate-600 mb-1">Saldo atual em caixa</div>
                      <div className="text-lg font-bold text-slate-700">R$ 3.247,89</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-emerald-50 border-emerald-200">
                    <CardContent className="p-3">
                      <div className="text-xs text-emerald-600 mb-1">Valor em reserva</div>
                      <div className="text-lg font-bold text-emerald-700">R$ 12.580,45</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-rose-50 border-rose-200">
                    <CardContent className="p-3">
                      <div className="text-xs text-rose-600 mb-1">Despesa do mês</div>
                      <div className="text-lg font-bold text-rose-700">R$ 11.456,78</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-violet-50 border-violet-200">
                    <CardContent className="p-3">
                      <div className="text-xs text-violet-600 mb-1">Receita do mês</div>
                      <div className="text-lg font-bold text-violet-700">R$ 15.280,00</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Resumo Mensal Compacto */}
                <Card></Card>
              </div>

              {/* Coluna 2: Grupos */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Grupos</h2>
                  <Button size="sm" onClick={() => {}}>
                    <Plus className="w-4 h-4 mr-1" />
                    Novo
                  </Button>
                </div>

                {/* Busca Grupos */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input placeholder="Buscar grupos..." value="" onChange={() => {}} className="pl-10" />
                </div>

                {/* Stats Grupos */}
                <div className="grid grid-cols-3 gap-2">
                  <Card>
                    <CardContent className="p-2 text-center">
                      <div className="text-lg font-bold text-blue-600">0</div>
                      <div className="text-xs text-gray-600">VBSP</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-2 text-center">
                      <div className="text-lg font-bold text-purple-600">0</div>
                      <div className="text-xs text-gray-600">GSC</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-2 text-center">
                      <div className="text-lg font-bold text-green-600">0</div>
                      <div className="text-xs text-gray-600">SER</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Lista de Grupos */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Todos os Grupos (0)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                    <div className="text-center py-4 text-gray-500 text-sm">Nenhum grupo encontrado</div>
                  </CardContent>
                </Card>
              </div>

              {/* Coluna 3: Categorias */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Categorias</h2>
                  <Button size="sm" onClick={() => {}}>
                    <Plus className="w-4 h-4 mr-1" />
                    Nova
                  </Button>
                </div>

                {/* Filtros Categorias */}
                <div className="space-y-2">
                  <Select value="todos" onValueChange={() => {}}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filtrar por grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os grupos</SelectItem>
                    </SelectContent>
                  </Select>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Buscar categorias..." value="" onChange={() => {}} className="pl-10" />
                  </div>
                </div>

                {/* Stats Categorias */}
                <Card>
                  <CardContent className="p-3">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">0</div>
                      <div className="text-sm text-gray-600">Total de Categorias</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Lista de Categorias */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Todas as Categorias (0)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                    <div className="text-center py-4 text-gray-500 text-sm">Nenhuma categoria encontrada</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </DashboardLayout>
        <GrupoModal isOpen={false} onClose={() => {}} grupo={null} />
        <CategoriaModal isOpen={false} onClose={() => {}} categoria={null} />
      </div>
    </PerfilProvider>
  )
}
