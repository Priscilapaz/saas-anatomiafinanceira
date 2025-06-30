"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, CheckCircle, X } from "lucide-react"
import { useState } from "react"

interface Alert {
  id: string
  tipo: "vencimento" | "vencido" | "lembrete"
  titulo: string
  descricao: string
  valor: number
  dataVencimento: string
  diasRestantes: number
  categoria: string
  status: "pendente" | "pago" | "atrasado"
}

export function AlertsSection() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      tipo: "vencido",
      titulo: "Aluguel - Apartamento",
      descricao: "Pagamento do aluguel está em atraso",
      valor: 2800,
      dataVencimento: "2025-06-05",
      diasRestantes: -23,
      categoria: "Moradia",
      status: "atrasado",
    },
    {
      id: "2",
      tipo: "vencimento",
      titulo: "Cartão de Crédito - Nubank",
      descricao: "Fatura do cartão vence em 2 dias",
      valor: 1450.8,
      dataVencimento: "2025-06-30",
      diasRestantes: 2,
      categoria: "Cartão",
      status: "pendente",
    },
    {
      id: "3",
      tipo: "vencimento",
      titulo: "Plano de Saúde - Unimed",
      descricao: "Mensalidade vence em 5 dias",
      valor: 680.0,
      dataVencimento: "2025-07-03",
      diasRestantes: 5,
      categoria: "Saúde",
      status: "pendente",
    },
    {
      id: "4",
      tipo: "lembrete",
      titulo: "IPTU - 2ª Parcela",
      descricao: "Lembrete: IPTU vence em 10 dias",
      valor: 450.0,
      dataVencimento: "2025-07-08",
      diasRestantes: 10,
      categoria: "Impostos",
      status: "pendente",
    },
  ])

  const marcarComoPago = (alertId: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, status: "pago" as const } : alert)))
  }

  const removerAlert = (alertId: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId))
  }

  const alertsAtivos = alerts.filter((alert) => alert.status !== "pago")

  const getAlertIcon = (tipo: string) => {
    switch (tipo) {
      case "vencido":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      case "vencimento":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "lembrete":
        return <Clock className="w-5 h-5 text-blue-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getAlertColor = (tipo: string) => {
    switch (tipo) {
      case "vencido":
        return "border-red-200 bg-red-50"
      case "vencimento":
        return "border-yellow-200 bg-yellow-50"
      case "lembrete":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getBadgeColor = (tipo: string) => {
    switch (tipo) {
      case "vencido":
        return "bg-red-100 text-red-800"
      case "vencimento":
        return "bg-yellow-100 text-yellow-800"
      case "lembrete":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (alertsAtivos.length === 0) {
    return null
  }

  return (
    <Card className="border-l-4 border-l-yellow-500">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          Alertas e Vencimentos ({alertsAtivos.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alertsAtivos.map((alert) => (
          <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.tipo)}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3 flex-1">
                {getAlertIcon(alert.tipo)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{alert.titulo}</h4>
                    <Badge className={`text-xs ${getBadgeColor(alert.tipo)}`}>
                      {alert.tipo === "vencido"
                        ? "Vencido"
                        : alert.tipo === "vencimento"
                          ? "Vence em breve"
                          : "Lembrete"}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{alert.descricao}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="font-medium">R$ {alert.valor.toFixed(2)}</span>
                    <span className="text-gray-500">
                      Vencimento: {new Date(alert.dataVencimento).toLocaleDateString("pt-BR")}
                    </span>
                    <span
                      className={`font-medium ${
                        alert.diasRestantes < 0
                          ? "text-red-600"
                          : alert.diasRestantes <= 3
                            ? "text-yellow-600"
                            : "text-blue-600"
                      }`}
                    >
                      {alert.diasRestantes < 0
                        ? `${Math.abs(alert.diasRestantes)} dias em atraso`
                        : alert.diasRestantes === 0
                          ? "Vence hoje"
                          : `${alert.diasRestantes} dias restantes`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => marcarComoPago(alert.id)}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Marcar como Pago
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removerAlert(alert.id)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
