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
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Carregar perfil salvo do localStorage
    const perfilSalvo = localStorage.getItem("perfil_ativo") as TipoPerfil
    if (perfilSalvo && (perfilSalvo === "pessoal" || perfilSalvo === "profissional")) {
      setPerfilAtivo(perfilSalvo)
    }
    setIsLoading(false)
  }, [])

  const alternarPerfil = (novoPerfil: TipoPerfil) => {
    setPerfilAtivo(novoPerfil)
    localStorage.setItem("perfil_ativo", novoPerfil)

    // Notificar mudança de perfil
    window.dispatchEvent(
      new CustomEvent("perfilAlterado", {
        detail: { perfil: novoPerfil },
      }),
    )
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
