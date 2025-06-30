"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type TipoPerfil = "pessoal" | "profissional"

interface PerfilContextType {
  perfilAtivo: TipoPerfil
  alternarPerfil: (perfil: TipoPerfil) => void
  isLoading: boolean
}

const PerfilContext = createContext<PerfilContextType | undefined>(undefined)

interface PerfilProviderProps {
  children: ReactNode
}

export function PerfilProvider({ children }: PerfilProviderProps) {
  const [perfilAtivo, setPerfilAtivo] = useState<TipoPerfil>("pessoal")
  const [isLoading, setIsLoading] = useState(false)

  // Carregar perfil salvo no localStorage
  useEffect(() => {
    const perfilSalvo = localStorage.getItem("perfil_ativo") as TipoPerfil
    if (perfilSalvo && (perfilSalvo === "pessoal" || perfilSalvo === "profissional")) {
      setPerfilAtivo(perfilSalvo)
    }
  }, [])

  const alternarPerfil = async (novoPerfil: TipoPerfil) => {
    if (novoPerfil === perfilAtivo) return

    setIsLoading(true)

    try {
      // Salvar no localStorage
      localStorage.setItem("perfil_ativo", novoPerfil)

      // Simular delay para feedback visual
      await new Promise((resolve) => setTimeout(resolve, 500))

      setPerfilAtivo(novoPerfil)

      // Disparar evento customizado para notificar componentes
      window.dispatchEvent(
        new CustomEvent("perfilAlterado", {
          detail: { perfil: novoPerfil },
        }),
      )
    } catch (error) {
      console.error("Erro ao alterar perfil:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return <PerfilContext.Provider value={{ perfilAtivo, alternarPerfil, isLoading }}>{children}</PerfilContext.Provider>
}

export function usePerfil() {
  const context = useContext(PerfilContext)
  if (context === undefined) {
    throw new Error("usePerfil deve ser usado dentro de um PerfilProvider")
  }
  return context
}
