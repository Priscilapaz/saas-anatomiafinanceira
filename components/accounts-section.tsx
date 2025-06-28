"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Building2, Plus, Eye, EyeOff } from "lucide-react"
import { CadastroContasModal } from "@/components/cadastro-contas-modal"

export function AccountsSection() {
  const [showBalances, setShowBalances] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const accounts = [
    {
      id: 1,
      name: "Conta Corrente",
      type: "Banco do Brasil",
      balance: 15420.5,
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      id: 2,
      name: "Poupança",
      type: "Caixa Econômica",
      balance: 8750.3,
      icon: Building2,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Cartão Nubank",
      type: "Crédito",
      balance: -2340.8,
      icon: CreditCard,
      color: "bg-purple-500",
    },
    {
      id: 4,
      name: "Cartão Itaú",
      type: "Crédito",
      balance: -1890.25,
      icon: CreditCard,
      color: "bg-orange-500",
    },
  ]

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Contas e Cartões</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setShowBalances(!showBalances)}>
                {showBalances ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Conta
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Saldo Total</h3>
                <p className="text-sm text-gray-600">Todas as contas</p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${totalBalance >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {showBalances ? `R$ ${totalBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "••••••"}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {accounts.map((account) => {
                const IconComponent = account.icon
                return (
                  <div key={account.id} className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                    <div className={`w-10 h-10 ${account.color} rounded-full flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{account.name}</h4>
                          <p className="text-sm text-gray-600">{account.type}</p>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${account.balance >= 0 ? "text-green-600" : "text-red-600"}`}>
                            {showBalances
                              ? `R$ ${Math.abs(account.balance).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`
                              : "••••••"}
                          </div>
                          {account.balance < 0 && (
                            <Badge variant="destructive" className="text-xs mt-1">
                              Fatura
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <CadastroContasModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
