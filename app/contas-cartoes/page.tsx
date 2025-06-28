"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CadastroContasModal } from "@/components/cadastro-contas-modal"
import { Plus, CreditCard, Building2, Edit, Trash2, Eye, EyeOff, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { ContaBancaria, CartaoCredito } from "@/types/financial"

export default function ContasCartoesPage() {
  const { toast } = useToast()
  const [itemRecemCriado, setItemRecemCriado] = useState<string | null>(null)

  const [contas, setContas] = useState<ContaBancaria[]>([
    {
      id: "1",
      nome: "Conta Corrente Principal",
      banco: "Nu Pagamentos S.A",
      tipo: "corrente",
      saldo: 5280.0,
      ativa: true,
      cor: "bg-purple-500",
    },
    {
      id: "2",
      nome: "Poupança Itaú",
      banco: "Itaú Unibanco S.A",
      tipo: "poupanca",
      saldo: 12450.0,
      ativa: true,
      cor: "bg-blue-500",
    },
    {
      id: "3",
      nome: "Conta Inter",
      banco: "Banco Inter S.A",
      tipo: "corrente",
      saldo: -19.19,
      ativa: true,
      cor: "bg-orange-500",
    },
  ])

  const [cartoes, setCartoes] = useState<CartaoCredito[]>([
    {
      id: "1",
      nome: "Nubank Roxinho",
      banco: "Nu Pagamentos S.A",
      diaFechamento: 15,
      diaVencimento: 22,
      limite: 8000.0,
      ativo: true,
      cor: "bg-purple-500",
    },
    {
      id: "2",
      nome: "Itaú Click",
      banco: "Itaú Unibanco S.A",
      diaFechamento: 5,
      diaVencimento: 12,
      limite: 15000.0,
      ativo: true,
      cor: "bg-blue-500",
    },
    {
      id: "3",
      nome: "C6 Carbon",
      banco: "Banco C6 S.A",
      diaFechamento: 10,
      diaVencimento: 17,
      limite: 5000.0,
      ativo: false,
      cor: "bg-gray-500",
    },
  ])

  const [modalOpen, setModalOpen] = useState(false)
  const [modalTipo, setModalTipo] = useState<"conta" | "cartao">("conta")
  const [itemEditando, setItemEditando] = useState<ContaBancaria | CartaoCredito | undefined>()

  const handleNovaConta = () => {
    setModalTipo("conta")
    setItemEditando(undefined)
    setModalOpen(true)
  }

  const handleNovoCartao = () => {
    setModalTipo("cartao")
    setItemEditando(undefined)
    setModalOpen(true)
  }

  const handleEditarItem = (item: ContaBancaria | CartaoCredito, tipo: "conta" | "cartao") => {
    setModalTipo(tipo)
    setItemEditando(item)
    setModalOpen(true)
  }

  const handleSalvarItem = (item: ContaBancaria | CartaoCredito) => {
    const isEdicao = !!itemEditando

    if (modalTipo === "conta") {
      const conta = item as ContaBancaria
      if (isEdicao) {
        setContas((prev) => prev.map((c) => (c.id === conta.id ? conta : c)))
        toast({
          variant: "success",
          title: "Conta atualizada!",
          description: `A conta "${conta.nome}" foi atualizada com sucesso.`,
        })
      } else {
        setContas((prev) => [...prev, conta])
        setItemRecemCriado(conta.id)
        toast({
          variant: "success",
          title: "Conta criada!",
          description: `A conta "${conta.nome}" foi criada com sucesso.`,
        })
        // Remove o destaque após 3 segundos
        setTimeout(() => setItemRecemCriado(null), 3000)
      }
    } else {
      const cartao = item as CartaoCredito
      if (isEdicao) {
        setCartoes((prev) => prev.map((c) => (c.id === cartao.id ? cartao : c)))
        toast({
          variant: "success",
          title: "Cartão atualizado!",
          description: `O cartão "${cartao.nome}" foi atualizado com sucesso.`,
        })
      } else {
        setCartoes((prev) => [...prev, cartao])
        setItemRecemCriado(cartao.id)
        toast({
          variant: "success",
          title: "Cartão criado!",
          description: `O cartão "${cartao.nome}" foi criado com sucesso.`,
        })
        // Remove o destaque após 3 segundos
        setTimeout(() => setItemRecemCriado(null), 3000)
      }
    }

    setModalOpen(false)
    setItemEditando(undefined)
  }

  const handleToggleAtivo = (id: string, tipo: "conta" | "cartao") => {
    if (tipo === "conta") {
      const conta = contas.find((c) => c.id === id)
      setContas((prev) => prev.map((c) => (c.id === id ? { ...c, ativa: !c.ativa } : c)))
      toast({
        variant: "default",
        title: conta?.ativa ? "Conta desativada" : "Conta ativada",
        description: `A conta "${conta?.nome}" foi ${conta?.ativa ? "desativada" : "ativada"}.`,
      })
    } else {
      const cartao = cartoes.find((c) => c.id === id)
      setCartoes((prev) => prev.map((c) => (c.id === id ? { ...c, ativo: !c.ativo } : c)))
      toast({
        variant: "default",
        title: cartao?.ativo ? "Cartão desativado" : "Cartão ativado",
        description: `O cartão "${cartao?.nome}" foi ${cartao?.ativo ? "desativado" : "ativado"}.`,
      })
    }
  }

  const handleRemoverItem = (id: string, tipo: "conta" | "cartao") => {
    const item = tipo === "conta" ? contas.find((c) => c.id === id) : cartoes.find((c) => c.id === id)
    const nomeItem = item?.nome || ""

    if (confirm(`Tem certeza que deseja remover ${tipo === "conta" ? "a conta" : "o cartão"} "${nomeItem}"?`)) {
      if (tipo === "conta") {
        setContas((prev) => prev.filter((c) => c.id !== id))
      } else {
        setCartoes((prev) => prev.filter((c) => c.id !== id))
      }

      toast({
        variant: "destructive",
        title: `${tipo === "conta" ? "Conta" : "Cartão"} removido`,
        description: `${tipo === "conta" ? "A conta" : "O cartão"} "${nomeItem}" foi removido permanentemente.`,
      })
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contas e Cartões</h1>
          <p className="text-gray-600">Gerencie suas contas bancárias e cartões de crédito</p>
        </div>

        {/* Contas Bancárias */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Building2 className="w-5 h-5" />
                <span>Contas Bancárias</span>
                <Badge variant="secondary">{contas.length}</Badge>
              </div>
              <Button onClick={handleNovaConta}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Conta
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contas.map((conta) => (
                <div
                  key={conta.id}
                  className={`p-4 border rounded-lg transition-all duration-300 ${
                    conta.ativa ? "bg-white" : "bg-gray-50 opacity-75"
                  } ${
                    itemRecemCriado === conta.id
                      ? "border-green-500 bg-green-50 shadow-lg scale-105"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${conta.cor} rounded-full flex items-center justify-center relative`}>
                        <Building2 className="w-5 h-5 text-white" />
                        {itemRecemCriado === conta.id && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{conta.nome}</h4>
                        <p className="text-sm text-gray-600">{conta.banco}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleToggleAtivo(conta.id, "conta")}>
                        {conta.ativa ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditarItem(conta, "conta")}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoverItem(conta.id, "conta")}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Tipo:</span>
                      <Badge variant="outline">
                        {conta.tipo === "corrente"
                          ? "Corrente"
                          : conta.tipo === "poupanca"
                            ? "Poupança"
                            : "Investimento"}
                      </Badge>
                    </div>
                    {conta.saldo !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span>Saldo:</span>
                        <span className={`font-medium ${conta.saldo >= 0 ? "text-green-600" : "text-red-600"}`}>
                          R$ {conta.saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <Badge variant={conta.ativa ? "default" : "secondary"}>{conta.ativa ? "Ativa" : "Inativa"}</Badge>
                    </div>
                  </div>

                  {itemRecemCriado === conta.id && (
                    <div className="mt-3 text-center">
                      <Badge variant="default" className="bg-green-500">
                        ✓ Conta criada com sucesso!
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cartões de Crédito */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Cartões de Crédito</span>
                <Badge variant="secondary">{cartoes.length}</Badge>
              </div>
              <Button onClick={handleNovoCartao}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Cartão
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {cartoes.map((cartao) => (
                <div
                  key={cartao.id}
                  className={`p-4 border rounded-lg transition-all duration-300 ${
                    cartao.ativo ? "bg-white" : "bg-gray-50 opacity-75"
                  } ${
                    itemRecemCriado === cartao.id
                      ? "border-green-500 bg-green-50 shadow-lg scale-105"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${cartao.cor} rounded-full flex items-center justify-center relative`}>
                        <CreditCard className="w-5 h-5 text-white" />
                        {itemRecemCriado === cartao.id && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{cartao.nome}</h4>
                        <p className="text-sm text-gray-600">{cartao.banco}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleToggleAtivo(cartao.id, "cartao")}>
                        {cartao.ativo ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditarItem(cartao, "cartao")}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoverItem(cartao.id, "cartao")}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Fechamento:</span>
                      <span className="font-medium">Dia {cartao.diaFechamento}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Vencimento:</span>
                      <span className="font-medium">Dia {cartao.diaVencimento}</span>
                    </div>
                    {cartao.limite && (
                      <div className="flex justify-between text-sm">
                        <span>Limite:</span>
                        <span className="font-medium text-blue-600">
                          R$ {cartao.limite.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <Badge variant={cartao.ativo ? "default" : "secondary"}>
                        {cartao.ativo ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                  </div>

                  {itemRecemCriado === cartao.id && (
                    <div className="mt-3 text-center">
                      <Badge variant="default" className="bg-green-500">
                        ✓ Cartão criado com sucesso!
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Resumo das Contas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total de Contas:</span>
                  <span className="font-medium">{contas.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Contas Ativas:</span>
                  <span className="font-medium">{contas.filter((c) => c.ativa).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Saldo Total:</span>
                  <span
                    className={`font-medium ${
                      contas.reduce((acc, c) => acc + (c.saldo || 0), 0) >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    R${" "}
                    {contas
                      .reduce((acc, c) => acc + (c.saldo || 0), 0)
                      .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resumo dos Cartões</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Total de Cartões:</span>
                  <span className="font-medium">{cartoes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cartões Ativos:</span>
                  <span className="font-medium">{cartoes.filter((c) => c.ativo).length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Limite Total:</span>
                  <span className="font-medium text-blue-600">
                    R${" "}
                    {cartoes
                      .filter((c) => c.ativo)
                      .reduce((acc, c) => acc + (c.limite || 0), 0)
                      .toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <CadastroContasModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        tipo={modalTipo}
        item={itemEditando}
        onSave={handleSalvarItem}
      />
    </DashboardLayout>
  )
}
