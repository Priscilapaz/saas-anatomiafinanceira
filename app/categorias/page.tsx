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
import { CategoriaModal } from "@/components/categoria-modal"

interface Categoria {
  id: string
  nome: string
  grupo: string
  icone: string
  cor: string
}

export default function CategoriasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGrupo, setSelectedGrupo] = useState("todos")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategoria, setEditingCategoria] = useState<Categoria | null>(null)

  const grupos = [
    "MORADIA",
    "ALIMENTAÇÃO",
    "SAÚDE",
    "BELEZA",
    "TRANSPORTE",
    "FILHOS",
    "EXTRAS",
    "OUTROS",
    "LAZER SEM CULPA",
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
    { id: "47", nome: "Cinema/Passeios", grupo: "LAZER SEM CULPA", icone: "Smile", cor: "bg-teal-500" },
    { id: "48", nome: "Bar", grupo: "LAZER SEM CULPA", icone: "Smile", cor: "bg-teal-600" },
    { id: "49", nome: "Brusinha", grupo: "LAZER SEM CULPA", icone: "Smile", cor: "bg-teal-700" },
  ]

  const filteredCategorias = categorias.filter((categoria) => {
    const matchesSearch = categoria.nome.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrupo = selectedGrupo === "todos" || categoria.grupo === selectedGrupo
    return matchesSearch && matchesGrupo
  })

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

  const handleEdit = (categoria: Categoria) => {
    setEditingCategoria(categoria)
    setIsModalOpen(true)
  }

  const handleNew = () => {
    setEditingCategoria(null)
    setIsModalOpen(true)
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
              <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
              <p className="text-gray-600">Gerencie as categorias de despesas</p>
            </div>
          </div>

          <div className="ml-auto px-4">
            <Button onClick={handleNew}>
              <Plus className="w-4 h-4 mr-2" />
              Nova Categoria
            </Button>
          </div>
        </header>

        {/* Stats Card */}
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900">{filteredCategorias.length}</div>
              <div className="text-sm text-gray-600">
                {selectedGrupo === "todos" ? "Total de Categorias" : `Categorias em ${selectedGrupo}`}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select value={selectedGrupo} onValueChange={setSelectedGrupo}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por grupo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os grupos</SelectItem>
              {grupos.map((grupo) => (
                <SelectItem key={grupo} value={grupo}>
                  {grupo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar categorias..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories List */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedGrupo === "todos"
                ? `Todas as Categorias (${filteredCategorias.length})`
                : `${selectedGrupo} (${filteredCategorias.length})`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCategorias.map((categoria) => (
                <div
                  key={categoria.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-8 h-8 ${categoria.cor} rounded-full flex items-center justify-center text-white`}
                    >
                      {getIconComponent(categoria.icone)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{categoria.nome}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {categoria.grupo}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(categoria)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredCategorias.length === 0 && (
                <div className="text-center py-8 text-gray-500">Nenhuma categoria encontrada</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <CategoriaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} categoria={editingCategoria} />
    </DashboardLayout>
  )
}
