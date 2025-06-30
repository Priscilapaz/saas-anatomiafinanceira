"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, Car, Utensils, Heart, Palette, Baby, Gift, MoreHorizontal, Smile } from "lucide-react"

interface Categoria {
  id: string
  nome: string
  grupo: string
  icone: string
  cor: string
}

interface CategoriaModalProps {
  isOpen: boolean
  onClose: () => void
  categoria?: Categoria | null
}

export function CategoriaModal({ isOpen, onClose, categoria }: CategoriaModalProps) {
  const [nome, setNome] = useState("")
  const [grupo, setGrupo] = useState("")
  const [icone, setIcone] = useState("MoreHorizontal")
  const [cor, setCor] = useState("bg-gray-500")

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

  const icones = [
    { name: "Home", component: Home },
    { name: "Car", component: Car },
    { name: "Utensils", component: Utensils },
    { name: "Heart", component: Heart },
    { name: "Palette", component: Palette },
    { name: "Baby", component: Baby },
    { name: "Gift", component: Gift },
    { name: "Smile", component: Smile },
    { name: "MoreHorizontal", component: MoreHorizontal },
  ]

  const cores = [
    "bg-blue-500",
    "bg-green-500",
    "bg-red-500",
    "bg-yellow-500",
    "bg-teal-500",
    "bg-gray-500",
    "bg-indigo-500",
    "bg-pink-500",
  ]

  useEffect(() => {
    if (categoria) {
      setNome(categoria.nome)
      setGrupo(categoria.grupo)
      setIcone(categoria.icone)
      setCor(categoria.cor)
    } else {
      setNome("")
      setGrupo("")
      setIcone("MoreHorizontal")
      setCor("bg-gray-500")
    }
  }, [categoria])

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar a categoria
    console.log("Salvando categoria:", { nome, grupo, icone, cor })
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{categoria ? "Editar Categoria" : "Nova Categoria"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da categoria" />
          </div>

          <div>
            <Label htmlFor="grupo">Grupo</Label>
            <Select value={grupo} onValueChange={setGrupo}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione um grupo" />
              </SelectTrigger>
              <SelectContent>
                {grupos.map((grupoOption) => (
                  <SelectItem key={grupoOption} value={grupoOption}>
                    {grupoOption}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Ícone</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {icones.map((iconeOption) => {
                const IconComponent = iconeOption.component
                return (
                  <button
                    key={iconeOption.name}
                    type="button"
                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center ${
                      icone === iconeOption.name ? "border-gray-900 bg-gray-100" : "border-gray-300"
                    }`}
                    onClick={() => setIcone(iconeOption.name)}
                  >
                    <IconComponent className="w-5 h-5" />
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <Label>Cor</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {cores.map((corOption) => (
                <button
                  key={corOption}
                  type="button"
                  className={`w-8 h-8 ${corOption} rounded-full border-2 ${
                    cor === corOption ? "border-gray-900" : "border-gray-300"
                  }`}
                  onClick={() => setCor(corOption)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={!nome.trim() || !grupo}>
              {categoria ? "Salvar" : "Criar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
