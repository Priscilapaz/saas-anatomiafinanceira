"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { PerfilSwitcher } from "@/components/perfil-switcher"
import PainelFinanceiro from "@/components/painel-financeiro"
import { usePerfil } from "@/contexts/perfil-context"
import { Loader2 } from "lucide-react"

export default function HomePage() {
  const { isLoading } = usePerfil()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header com switcher de perfil */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Financeiro</h1>
            <p className="text-gray-600">Gerencie suas finanças de forma inteligente</p>
          </div>
          <PerfilSwitcher />
        </div>

        {/* Painel financeiro adaptativo */}
        <PainelFinanceiro />
      </div>
    </DashboardLayout>
  )
}
