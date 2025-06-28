"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { usePerfil } from "@/contexts/perfil-context"
import { User, Building2, ArrowLeftRight } from "lucide-react"
import { useState } from "react"

export function PerfilSwitcher() {
  const { perfilAtivo, alternarPerfil } = usePerfil()
  const [isChanging, setIsChanging] = useState(false)

  const handleTrocarPerfil = async () => {
    setIsChanging(true)
    const novoPerfil = perfilAtivo === "pessoal" ? "profissional" : "pessoal"

    // Simular delay para feedback visual
    await new Promise((resolve) => setTimeout(resolve, 500))

    alternarPerfil(novoPerfil)
    setIsChanging(false)
  }

  const getPerfilConfig = (perfil: string) => {
    if (perfil === "pessoal") {
      return {
        label: "Pessoal",
        icon: User,
        color: "bg-green-500 hover:bg-green-600",
        badgeColor: "bg-green-100 text-green-800",
      }
    }
    return {
      label: "Profissional",
      icon: Building2,
      color: "bg-blue-500 hover:bg-blue-600",
      badgeColor: "bg-blue-100 text-blue-800",
    }
  }

  const configAtual = getPerfilConfig(perfilAtivo)
  const configProximo = getPerfilConfig(perfilAtivo === "pessoal" ? "profissional" : "pessoal")
  const IconeAtual = configAtual.icon
  const IconeProximo = configProximo.icon

  return (
    <div className="flex items-center gap-3">
      {/* Badge do perfil atual */}
      <Badge className={`${configAtual.badgeColor} px-3 py-1 font-medium`}>
        <IconeAtual className="w-4 h-4 mr-2" />
        {configAtual.label}
      </Badge>

      {/* Botão de troca */}
      <Button
        onClick={handleTrocarPerfil}
        disabled={isChanging}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 transition-all duration-200 bg-transparent"
      >
        {isChanging ? (
          <ArrowLeftRight className="w-4 h-4 animate-spin" />
        ) : (
          <>
            <IconeProximo className="w-4 h-4" />
            <span>Trocar para {configProximo.label}</span>
          </>
        )}
      </Button>
    </div>
  )
}
