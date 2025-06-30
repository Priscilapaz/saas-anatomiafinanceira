"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Plus, Edit, Trash2, Search } from "lucide-react"
import { useState } from "react"
import { GrupoModal } from "@/components/grupo-modal"

interface Grupo {
  id: string
  nome: string
  tipo: "vbsp" | "gsc" | "ser"
  categorias: number
  cor: string
}

export default function GruposPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingGrupo, setEditingGrupo] = useState<Grupo | null>(null)

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

  const filteredGrupos = grupos.filter((grupo) => grupo.nome.toLowerCase().includes(searchTerm.toLowerCase()))

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
        return "bg-teal-100 text-teal-800"
      case "ser":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleEdit = (grupo: Grupo) => {
    setEditingGrupo(grupo)
    setIsModalOpen(true)
  }

  const handleNew = () => {
    setEditingGrupo(null)
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
              <h1 className="text-2xl font-bold text-gray-900">Grupos</h1>
              <p className="text-gray-600">Gerencie os grupos de categorias</p>
            </div>
          </div>

          <div className="ml-auto px-4">
            <Button onClick={handleNew}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Grupo
            </Button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{grupos.filter((g) => g.tipo === "vbsp").length}</div>
              <div className="text-sm text-gray-600">Viver Bem Sem se Privar</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-teal-600">{grupos.filter((g) => g.tipo === "gsc").length}</div>
              <div className="text-sm text-gray-600">Gastar Sem Culpa</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{grupos.filter((g) => g.tipo === "ser").length}</div>
              <div className="text-sm text-gray-600">Sonhar e Realizar</div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Buscar grupos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Groups List */}
        <Card>
          <CardHeader>
            <CardTitle>Todos os Grupos ({filteredGrupos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredGrupos.map((grupo) => (
                <div
                  key={grupo.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 ${grupo.cor} rounded-full`}></div>
                    <div>
                      <h3 className="font-medium text-gray-900">{grupo.nome}</h3>
                      <p className="text-sm text-gray-500">
                        {grupo.categorias} categoria{grupo.categorias !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge className={getTipoBadgeColor(grupo.tipo)}>{getTipoLabel(grupo.tipo)}</Badge>
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(grupo)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {filteredGrupos.length === 0 && (
                <div className="text-center py-8 text-gray-500">Nenhum grupo encontrado</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <GrupoModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} grupo={editingGrupo} />
    </DashboardLayout>
  )
}
