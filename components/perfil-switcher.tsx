"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { User, Building2, Loader2 } from "lucide-react"
import { usePerfil } from "@/contexts/perfil-context"

export function PerfilSwitcher() {
  const { perfilAtivo, alternarPerfil, isLoading } = usePerfil()

  const handlePerfilChange = (perfil: "pessoal" | "profissional") => {
    alternarPerfil(perfil)
  }

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg p-1 border shadow-sm">
      <Button
        variant={perfilAtivo === "pessoal" ? "default" : "ghost"}
        size="sm"
        onClick={() => handlePerfilChange("pessoal")}
        disabled={isLoading}
        className={`flex items-center gap-2 transition-all ${
          perfilAtivo === "pessoal" ? "bg-green-600 hover:bg-green-700 text-white" : "hover:bg-green-50 text-green-700"
        }`}
      >
        {isLoading && perfilAtivo === "profissional" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <User className="h-4 w-4" />
        )}
        Pessoal
      </Button>

      <Button
        variant={perfilAtivo === "profissional" ? "default" : "ghost"}
        size="sm"
        onClick={() => handlePerfilChange("profissional")}
        disabled={isLoading}
        className={`flex items-center gap-2 transition-all ${
          perfilAtivo === "profissional" ? "bg-blue-600 hover:bg-blue-700 text-white" : "hover:bg-blue-50 text-blue-700"
        }`}
      >
        {isLoading && perfilAtivo === "pessoal" ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Building2 className="h-4 w-4" />
        )}
        Profissional
      </Button>

      <Badge
        variant="outline"
        className={`ml-2 ${
          perfilAtivo === "pessoal"
            ? "border-green-200 text-green-700 bg-green-50"
            : "border-blue-200 text-blue-700 bg-blue-50"
        }`}
      >
        {perfilAtivo === "pessoal" ? "Pessoa Física" : "Pessoa Jurídica"}
      </Badge>
    </div>
  )
}
