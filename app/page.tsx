"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { HeaderStatus } from "@/components/visao-geral/header-status"
import { DestaquesInteligentes } from "@/components/visao-geral/destaques-inteligentes"
import { ProgressoMetas } from "@/components/visao-geral/progresso-metas"
import { GraficoFluxo } from "@/components/visao-geral/grafico-fluxo"
import { DistribuicaoGastos } from "@/components/visao-geral/distribuicao-gastos"
import { InsightsSystem } from "@/components/visao-geral/insights-system"
import { AlertsSection } from "@/components/alerts-section"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

export default function HomePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-3">
              <Image
                src="/images/anatomia-logo.png"
                alt="Anatomia Financeira"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="text-sm text-gray-600">Boa tarde,</div>
                <h1 className="text-lg font-bold text-gray-900">Priscila Ferreira!</h1>
                <p className="text-sm text-gray-500">Visão Geral - Dashboard Financeiro</p>
              </div>
            </div>
          </div>
        </header>

        {/* Alertas Importantes */}
        <AlertsSection />

        {/* Cards de Status Financeiro */}
        <HeaderStatus />

        {/* Destaques Inteligentes */}
        <DestaquesInteligentes />

        {/* Progresso das Metas */}
        <ProgressoMetas />

        {/* Gráficos - Layout Responsivo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GraficoFluxo />
          <DistribuicaoGastos />
        </div>

        {/* Insights do Sistema */}
        <InsightsSystem />
      </div>
    </DashboardLayout>
  )
}
