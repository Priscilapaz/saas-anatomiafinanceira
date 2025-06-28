"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  Edit,
  Trash2,
  Search,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  Car,
  Utensils,
  Heart,
  Palette,
  Baby,
  Gift,
  MoreHorizontal,
  Smile,
} from "lucide-react"
import { useState } from "react"
import { GrupoModal } from "@/components/grupo-modal"
import { CategoriaModal } from "@/components/categoria-modal"

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
  const [currentMonth, setCurrentMonth] = useState(5) // Junho (index 5)
  const [selectedYear, setSelectedYear] = useState("2025")
  const [searchTermGrupos, setSearchTermGrupos] = useState("")
  const [searchTermCategorias, setSearchTermCategorias] = useState("")
  const [selectedGrupo, setSelectedGrupo] = useState("todos")
  const [isGrupoModalOpen, setIsGrupoModalOpen] = useState(false)
  const [isCategoriaModalOpen, setIsCategoriaModalOpen] = useState(false)
  const [editingGrupo, setEditingGrupo] = useState<Grupo | null>(null)
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null)

  const months = [
    { name: "Janeiro", short: "Jan" },
    { name: "Fevereiro", short: "Fev" },
    { name: "Março", short: "Mar" },
    { name: "Abril", short: "Abr" },
    { name: "Maio", short: "Mai" },
    { name: "Junho", short: "Jun" },
    { name: "Julho", short: "Jul" },
    { name: "Agosto", short: "Ago" },
    { name: "Setembro", short: "Set" },
    { name: "Outubro", short: "Out" },
    { name: "Novembro", short: "Nov" },
    { name: "Dezembro", short: "Dez" },
  ]

  const grupos: Grupo[] = [
    { id: "1", nome: "MORADIA", tipo: "vbsp", categorias: 9, cor: "bg-blue-500" },
    { id: "2", nome: "ALIMENTAÇÃO", tipo: "vbsp", categorias: 5, cor: "bg-green-500" },
    { id: "3", nome: "SAÚDE", tipo: "vbsp", categorias: 7, cor: "bg-red-500" },
    { id: "4", nome: "BELEZA", tipo: "vbsp", categorias: 4, cor: "bg-pink-500" },
    { id: "5", nome: "TRANSPORTE", tipo: "vbsp", categorias: 8, cor: "bg-yellow-500" },
    { id: "6", nome: "FILHOS", tipo: "vbsp", categorias: 5, cor: "bg-purple-500" },
    { id: "7", nome: "EXTRAS", tipo: "vbsp", categorias: 6, cor: "bg-indigo-500" },
    { id: "8", nome: "OUTROS", tipo: "vbsp", categorias: 4, cor: "bg-gray-500" },
    { id: "9", nome: "LAZER SEM CULPA", tipo: "gsc", categorias: 4, cor: "bg-orange-500" },
  ]

  const categorias: Categoria[] = [
    // MORADIA
    { id: "1", nome: "Aluguel", grupo: "MORADIA", icone: "Home", cor: "bg-blue-500" },
    { id: "2", nome: "Condomínio", grupo: "MORADIA", icone: "Home", cor: "bg-blue-600" },
    { id: "3", nome: "IPTU", grupo: "MORADIA", icone: "Home", cor: "bg-blue-700" },
    { id: "4", nome: "Água/Luz/Gás", grupo: "MORADIA", icone: "Home", cor: "bg-blue-400" },
    { id: "5", nome: "Internet", grupo: "MORADIA", icone: "Home", cor: "bg-blue-300" },
    { id: "6", nome: "Pet", grupo: "MORADIA", icone: "Heart", cor: "bg-blue-800" },
    { id: "7", nome: "Funcionária", grupo: "MORADIA", icone: "Home", cor: "bg-blue-200" },
    { id: "8", nome: "Manutenção da Casa", grupo: "MORADIA", icone: "Home", cor: "bg-blue-900" },
    { id: "9", nome: "Eletrônicos", grupo: "MORADIA", icone: "Home", cor: "bg-blue-100" },

    // ALIMENTAÇÃO
    { id: "10", nome: "Mercado", grupo: "ALIMENTAÇÃO", icone: "Utensils", cor: "bg-green-500" },
    { id: "11", nome: "Lanches", grupo: "ALIMENTAÇÃO", icone: "Utensils", cor: "bg-green-600" },
    { id: "12", nome: "Padaria", grupo: "ALIMENTAÇÃO", icone: "Utensils", cor: "bg-green-700" },
    { id: "13", nome: "Ifood", grupo: "ALIMENTAÇÃO", icone: "Utensils", cor: "bg-green-400" },
    { id: "14", nome: "Restaurante", grupo: "ALIMENTAÇÃO", icone: "Utensils", cor: "bg-green-300" },

    // SAÚDE
    { id: "15", nome: "Farmácia", grupo: "SAÚDE", icone: "Heart", cor: "bg-red-500" },
    { id: "16", nome: "Consultas/Exames/Terapia", grupo: "SAÚDE", icone: "Heart", cor: "bg-red-600" },
    { id: "17", nome: "Suplementos", grupo: "SAÚDE", icone: "Heart", cor: "bg-red-700" },
    { id: "18", nome: "Academia/Personal", grupo: "SAÚDE", icone: "Heart", cor: "bg-red-400" },
    { id: "19", nome: "Seguro de Vida", grupo: "SAÚDE", icone: "Heart", cor: "bg-red-300" },
    { id: "20", nome: "Plano de Saúde", grupo: "SAÚDE", icone: "Heart", cor: "bg-red-800" },

    // BELEZA
    { id: "21", nome: "Cosméticos", grupo: "BELEZA", icone: "Palette", cor: "bg-pink-500" },
    { id: "22", nome: "Estética", grupo: "BELEZA", icone: "Palette", cor: "bg-pink-600" },
    { id: "23", nome: "Salão de Beleza", grupo: "BELEZA", icone: "Palette", cor: "bg-pink-700" },
    { id: "24", nome: "Vestuário e Acessórios", grupo: "BELEZA", icone: "Palette", cor: "bg-pink-400" },

    // TRANSPORTE
    { id: "25", nome: "Sem Parar/Estacionamento", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-500" },
    { id: "26", nome: "Combustível", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-600" },
    { id: "27", nome: "Manutenção do Carro", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-700" },
    { id: "28", nome: "Financiamento do Carro", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-400" },
    { id: "29", nome: "IPVA", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-300" },
    { id: "30", nome: "Seguro do Carro", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-800" },
    { id: "31", nome: "Uber", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-200" },

    // FILHOS
    { id: "32", nome: "Escola", grupo: "FILHOS", icone: "Baby", cor: "bg-purple-500" },
    { id: "33", nome: "Babá", grupo: "FILHOS", icone: "Baby", cor: "bg-purple-600" },
    { id: "34", nome: "Vestuário e Acessório Filhos", grupo: "FILHOS", icone: "Baby", cor: "bg-purple-700" },
    { id: "35", nome: "Brinquedos", grupo: "FILHOS", icone: "Baby", cor: "bg-purple-400" },
    { id: "36", nome: "Transporte Escolar", grupo: "FILHOS", icone: "Baby", cor: "bg-purple-300" },

    // EXTRAS
    { id: "37", nome: "Presentes", grupo: "EXTRAS", icone: "Gift", cor: "bg-indigo-500" },
    { id: "38", nome: "Assinaturas", grupo: "EXTRAS", icone: "Gift", cor: "bg-indigo-600" },
    { id: "39", nome: "Livros", grupo: "EXTRAS", icone: "Gift", cor: "bg-indigo-700" },
    { id: "40", nome: "Cursos e Mentorias", grupo: "EXTRAS", icone: "Gift", cor: "bg-indigo-400" },
    { id: "41", nome: "Viagens", grupo: "EXTRAS", icone: "Gift", cor: "bg-indigo-300" },
    { id: "42", nome: "Festas", grupo: "EXTRAS", icone: "Gift", cor: "bg-indigo-800" },

    // OUTROS
    { id: "43", nome: "Tarifas Bancárias", grupo: "OUTROS", icone: "MoreHorizontal", cor: "bg-gray-500" },
    { id: "44", nome: "Impostos", grupo: "OUTROS", icone: "MoreHorizontal", cor: "bg-gray-600" },
    { id: "45", nome: "Juros/Multas", grupo: "OUTROS", icone: "MoreHorizontal", cor: "bg-gray-700" },
    { id: "46", nome: "CRM", grupo: "OUTROS", icone: "MoreHorizontal", cor: "bg-gray-400" },

    // GASTAR SEM CULPA
    { id: "47", nome: "Cinema/Passeios", grupo: "LAZER SEM CULPA", icone: "Smile", cor: "bg-orange-500" },
    { id: "48", nome: "Bar", grupo: "LAZER SEM CULPA", icone: "Smile", cor: "bg-orange-600" },
    { id: "49", nome: "Brusinha", grupo: "LAZER SEM CULPA", icone: "Smile", cor: "bg-orange-700" },
  ]

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev" && currentMonth > 0) {
      setCurrentMonth(currentMonth - 1)
    } else if (direction === "next" && currentMonth < 11) {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const getVisibleMonths = () => {
    const start = Math.max(0, currentMonth - 2)
    const end = Math.min(11, start + 5)
    return months.slice(start, end + 1)
  }

  const visibleMonths = getVisibleMonths()

  const filteredGrupos = grupos.filter((grupo) => grupo.nome.toLowerCase().includes(searchTermGrupos.toLowerCase()))

  const filteredCategorias = categorias.filter((categoria) => {
    const matchesSearch = categoria.nome.toLowerCase().includes(searchTermCategorias.toLowerCase())
    const matchesGrupo = selectedGrupo === "todos" || categoria.grupo === selectedGrupo
    return matchesSearch && matchesGrupo
  })

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "vbsp":
        return "Viver Bem Sem se Privar"
      case "gsc":
        return "Gastar Sem Culpa"
      case "ser":
        return "Sonhar e Realizar"
      default:
        return tipo
    }
  }

  const getTipoBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "vbsp":
        return "bg-blue-100 text-blue-800"
      case "gsc":
        return "bg-purple-100 text-purple-800"
      case "ser":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getIconComponent = (iconName: string) => {
    const icons = {
      Home,
      Car,
      Utensils,
      Heart,
      Palette,
      Baby,
      Gift,
      MoreHorizontal,
      Smile,
    }
    const IconComponent = icons[iconName as keyof typeof icons] || MoreHorizontal
    return <IconComponent className="w-4 h-4" />
  }

  const handleEditGrupo = (grupo: Grupo) => {
    setEditingGrupo(grupo)
    setIsGrupoModalOpen(true)
  }

  const handleNewGrupo = () => {
    setEditingGrupo(null)
    setIsGrupoModalOpen(true)
  }

  const handleEditCategoria = (categoria: Categoria) => {
    setEditingCategoria(categoria)
    setIsCategoriaModalOpen(true)
  }

  const handleNewCategoria = () => {
    setEditingCategoria(null)
    setIsCategoriaModalOpen(true)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Financeiro</h1>
              <p className="text-gray-600">Timeline, Grupos e Categorias</p>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-2 px-4">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")} disabled={currentMonth === 0}>
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="text-sm font-medium min-w-[100px] text-center">{months[currentMonth].name}</div>

            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")} disabled={currentMonth === 11}>
              <ChevronRight className="w-4 h-4" />
            </Button>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              {months[currentMonth].short} {selectedYear}
            </Button>
          </div>
        </header>

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
            <Card>
              
              
            </Card>
          </div>

          {/* Coluna 2: Grupos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Grupos</h2>
              <Button size="sm" onClick={handleNewGrupo}>
                <Plus className="w-4 h-4 mr-1" />
                Novo
              </Button>
            </div>

            {/* Busca Grupos */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar grupos..."
                value={searchTermGrupos}
                onChange={(e) => setSearchTermGrupos(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Stats Grupos */}
            <div className="grid grid-cols-3 gap-2">
              <Card>
                <CardContent className="p-2 text-center">
                  <div className="text-lg font-bold text-blue-600">
                    {grupos.filter((g) => g.tipo === "vbsp").length}
                  </div>
                  <div className="text-xs text-gray-600">VBSP</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-2 text-center">
                  <div className="text-lg font-bold text-purple-600">
                    {grupos.filter((g) => g.tipo === "gsc").length}
                  </div>
                  <div className="text-xs text-gray-600">GSC</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-2 text-center">
                  <div className="text-lg font-bold text-green-600">
                    {grupos.filter((g) => g.tipo === "ser").length}
                  </div>
                  <div className="text-xs text-gray-600">SER</div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Grupos */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Todos os Grupos ({filteredGrupos.length})</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                {filteredGrupos.map((grupo) => (
                  <div key={grupo.id} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 ${grupo.cor} rounded-full`}></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{grupo.nome}</div>
                        <div className="text-xs text-gray-500">
                          {grupo.categorias} categoria{grupo.categorias !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Badge className={`text-xs ${getTipoBadgeColor(grupo.tipo)}`}>{getTipoLabel(grupo.tipo)}</Badge>
                      <Button variant="ghost" size="sm" onClick={() => handleEditGrupo(grupo)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredGrupos.length === 0 && (
                  <div className="text-center py-4 text-gray-500 text-sm">Nenhum grupo encontrado</div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Coluna 3: Categorias */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Categorias</h2>
              <Button size="sm" onClick={handleNewCategoria}>
                <Plus className="w-4 h-4 mr-1" />
                Nova
              </Button>
            </div>

            {/* Filtros Categorias */}
            <div className="space-y-2">
              <Select value={selectedGrupo} onValueChange={setSelectedGrupo}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por grupo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os grupos</SelectItem>
                  {grupos.map((grupo) => (
                    <SelectItem key={grupo.id} value={grupo.nome}>
                      {grupo.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar categorias..."
                  value={searchTermCategorias}
                  onChange={(e) => setSearchTermCategorias(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Stats Categorias */}
            <Card>
              <CardContent className="p-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{filteredCategorias.length}</div>
                  <div className="text-sm text-gray-600">
                    {selectedGrupo === "todos" ? "Total de Categorias" : `Categorias em ${selectedGrupo}`}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Categorias */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">
                  {selectedGrupo === "todos"
                    ? `Todas as Categorias (${filteredCategorias.length})`
                    : `${selectedGrupo} (${filteredCategorias.length})`}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-96 overflow-y-auto">
                {filteredCategorias.map((categoria) => (
                  <div
                    key={categoria.id}
                    className="flex items-center justify-between p-2 border rounded hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-6 h-6 ${categoria.cor} rounded-full flex items-center justify-center text-white`}
                      >
                        {getIconComponent(categoria.icone)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{categoria.nome}</div>
                        <Badge variant="secondary" className="text-xs">
                          {categoria.grupo}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEditCategoria(categoria)}>
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                {filteredCategorias.length === 0 && (
                  <div className="text-center py-4 text-gray-500 text-sm">Nenhuma categoria encontrada</div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <GrupoModal isOpen={isGrupoModalOpen} onClose={() => setIsGrupoModalOpen(false)} grupo={editingGrupo} />
      <CategoriaModal
        isOpen={isCategoriaModalOpen}
        onClose={() => setIsCategoriaModalOpen(false)}
        categoria={editingCategoria}
      />
    </DashboardLayout>
  )
}
