"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { FolderOpen, Tags, Users, Settings, CreditCard, Target } from "lucide-react"
import Link from "next/link"

export default function OpcoesPage() {
  const opcoes = [
    {
      title: "Grupos",
      description: "Gerencie os grupos de categorias (VBSP, GSC, SER)",
      icon: FolderOpen,
      href: "/grupos",
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Categorias",
      description: "Organize suas categorias de receitas e despesas",
      icon: Tags,
      href: "/categorias",
      color: "bg-green-50 border-green-200 hover:bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Contas e Cartões",
      description: "Configure suas contas bancárias e cartões de crédito",
      icon: CreditCard,
      href: "/contas-cartoes",
      color: "bg-teal-50 border-teal-200 hover:bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      title: "Sonhar e Realizar",
      description: "Defina e acompanhe seus objetivos financeiros",
      icon: Target,
      href: "/sonhar-realizar",
      color: "bg-indigo-50 border-indigo-200 hover:bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "Perfil",
      description: "Gerencie suas informações pessoais e preferências",
      icon: Users,
      href: "/perfil",
      color: "bg-gray-50 border-gray-200 hover:bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      title: "Configurações",
      description: "Ajuste as configurações do sistema",
      icon: Settings,
      href: "/configuracoes",
      color: "bg-slate-50 border-slate-200 hover:bg-slate-100",
      iconColor: "text-slate-600",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mais Opções</h1>
              <p className="text-gray-600">Configure e personalize seu sistema financeiro</p>
            </div>
          </div>
        </header>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opcoes.map((opcao) => {
            const IconComponent = opcao.icon
            return (
              <Link key={opcao.title} href={opcao.href}>
                <Card className={`${opcao.color} transition-colors cursor-pointer h-full`}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-2">
                      <IconComponent className={`w-6 h-6 ${opcao.iconColor}`} />
                      <CardTitle className="text-lg">{opcao.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">{opcao.description}</p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
