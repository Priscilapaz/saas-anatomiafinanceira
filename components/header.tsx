"use client"

import { Bell, User, Settings, LogOut, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function Header() {
  // Dados de exemplo para alertas
  const alerts = [
    {
      id: 1,
      title: "Aluguel",
      amount: "R$ 2.800,00",
      dueDate: "2025-06-30",
      daysLeft: -2,
      type: "overdue",
      status: "pending",
    },
    {
      id: 2,
      title: "Cartão de Crédito",
      amount: "R$ 1.250,00",
      dueDate: "2025-07-01",
      daysLeft: 1,
      type: "urgent",
      status: "pending",
    },
    {
      id: 3,
      title: "Internet",
      amount: "R$ 120,00",
      dueDate: "2025-07-05",
      daysLeft: 5,
      type: "reminder",
      status: "pending",
    },
  ]

  const urgentAlerts = alerts.filter((alert) => alert.daysLeft <= 3 && alert.status === "pending")

  const getAlertColor = (type: string) => {
    switch (type) {
      case "overdue":
        return "text-red-600 bg-red-50"
      case "urgent":
        return "text-yellow-600 bg-yellow-50"
      case "reminder":
        return "text-blue-600 bg-blue-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getAlertText = (daysLeft: number) => {
    if (daysLeft < 0) return `${Math.abs(daysLeft)} dias em atraso`
    if (daysLeft === 0) return "Vence hoje"
    if (daysLeft === 1) return "Vence amanhã"
    return `Vence em ${daysLeft} dias`
  }

  const markAsPaid = (alertId: number) => {
    // Implementar lógica para marcar como pago
    console.log(`Marcando alerta ${alertId} como pago`)
  }

  const removeAlert = (alertId: number) => {
    // Implementar lógica para remover alerta
    console.log(`Removendo alerta ${alertId}`)
  }

  return (
    <header className="flex h-16 items-center justify-between px-6 border-b bg-white">
      {/* Logo e Saudação */}
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
          <h1 className="text-lg font-bold text-[#2A3829]">Priscila Ferreira!</h1>
        </div>
      </div>

      {/* Notificações e Perfil */}
      <div className="flex items-center gap-4">
        {/* Notificações */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5 text-[#2A3829]" />
              {urgentAlerts.length > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {urgentAlerts.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-[#2A3829]">Alertas de Vencimento</h3>
              <p className="text-sm text-gray-600">{alerts.length} alertas pendentes</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-4 border-b last:border-b-0 ${getAlertColor(alert.type)}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{alert.title}</h4>
                      <p className="text-lg font-bold">{alert.amount}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => markAsPaid(alert.id)} className="h-6 w-6 p-0">
                        <Check className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => removeAlert(alert.id)} className="h-6 w-6 p-0">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm">Vencimento: {new Date(alert.dueDate).toLocaleDateString("pt-BR")}</p>
                  <p className="text-sm font-medium">{getAlertText(alert.daysLeft)}</p>
                </div>
              ))}
            </div>
            {alerts.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Nenhum alerta pendente</p>
              </div>
            )}
          </PopoverContent>
        </Popover>

        {/* Menu do Perfil */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-[#EAE6DA] text-[#2A3829] font-semibold">PF</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex flex-col space-y-1 p-2">
              <p className="text-sm font-medium leading-none">Priscila Ferreira</p>
              <p className="text-xs leading-none text-muted-foreground">priscila@anatomiafinanceira.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Configurações</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
