"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Grupo {
  id: string
  nome: string
  tipo: "vbsp" | "gsc" | "ser"
  categorias: number
  cor: string
}

interface GrupoModalProps {
  isOpen: boolean
  onClose: () => void
  grupo?: Grupo | null
}

export function GrupoModal({ isOpen, onClose, grupo }: GrupoModalProps) {
  const [nome, setNome] = useState("")
  const [tipo, setTipo] = useState<"vbsp" | "gsc" | "ser">("vbsp")
  const [cor, setCor] = useState("bg-blue-500")

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
    if (grupo) {
      setNome(grupo.nome)
      setTipo(grupo.tipo)
      setCor(grupo.cor)
    } else {
      setNome("")
      setTipo("vbsp")
      setCor("bg-blue-500")
    }
  }, [grupo])

  const handleSave = () => {
    // Aqui você implementaria a lógica para salvar o grupo
    console.log("Salvando grupo:", { nome, tipo, cor })
    onClose()
  }

  const handleCancel = () => {
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{grupo ? "Editar Grupo" : "Novo Grupo"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do grupo" />
          </div>

          <div>
            <Label htmlFor="tipo">Tipo</Label>
            <Select value={tipo} onValueChange={(value: "vbsp" | "gsc" | "ser") => setTipo(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vbsp">Viver Bem Sem se Privar</SelectItem>
                <SelectItem value="gsc">Gastar Sem Culpa</SelectItem>
                <SelectItem value="ser">Sonhar e Realizar</SelectItem>
              </SelectContent>
            </Select>
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
            <Button onClick={handleSave} disabled={!nome.trim()}>
              {grupo ? "Salvar" : "Criar"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
