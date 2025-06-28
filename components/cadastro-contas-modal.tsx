"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { X, CreditCard, Building2, Plus, Edit } from "lucide-react"
import type { ContaBancaria, CartaoCredito } from "@/types/financial"

interface CadastroContasModalProps {
  isOpen: boolean
  onClose: () => void
  tipo: "conta" | "cartao"
  item?: ContaBancaria | CartaoCredito
  onSave: (item: ContaBancaria | CartaoCredito) => void
}

const cores = [
  { nome: "Azul", valor: "bg-blue-500" },
  { nome: "Verde", valor: "bg-green-500" },
  { nome: "Vermelho", valor: "bg-red-500" },
  { nome: "Roxo", valor: "bg-purple-500" },
  { nome: "Laranja", valor: "bg-orange-500" },
  { nome: "Rosa", valor: "bg-pink-500" },
  { nome: "Amarelo", valor: "bg-yellow-500" },
  { nome: "Cinza", valor: "bg-gray-500" },
]

const bancos = [
  "Nu Pagamentos S.A",
  "Itaú Unibanco S.A",
  "Banco Inter S.A",
  "Banco C6 S.A",
  "Bradesco S.A",
  "Banco do Brasil S.A",
  "Santander Brasil S.A",
  "Caixa Econômica Federal",
  "Banco Safra S.A",
  "Banco Original S.A",
  "Outros",
]

export function CadastroContasModal({ isOpen, onClose, tipo, item, onSave }: CadastroContasModalProps) {
  const [nome, setNome] = useState(item?.nome || "")
  const [banco, setBanco] = useState(item?.banco || "")
  const [cor, setCor] = useState(item?.cor || "bg-blue-500")
  const [ativo, setAtivo] = useState(item ? (item as any).ativo || (item as any).ativa : true)

  // Campos específicos para conta
  const [tipoConta, setTipoConta] = useState((item as ContaBancaria)?.tipo || "corrente")
  const [saldo, setSaldo] = useState((item as ContaBancaria)?.saldo?.toString() || "")

  // Campos específicos para cartão
  const [diaFechamento, setDiaFechamento] = useState((item as CartaoCredito)?.diaFechamento?.toString() || "5")
  const [diaVencimento, setDiaVencimento] = useState((item as CartaoCredito)?.diaVencimento?.toString() || "10")
  const [limite, setLimite] = useState((item as CartaoCredito)?.limite?.toString() || "")

  const handleSubmit = () => {
    if (tipo === "conta") {
      const conta: ContaBancaria = {
        id: item?.id || Date.now().toString(),
        nome,
        banco,
        tipo: tipoConta as "corrente" | "poupanca" | "investimento",
        saldo: saldo ? Number.parseFloat(saldo) : undefined,
        ativa: ativo,
        cor,
      }
      onSave(conta)
    } else {
      const cartao: CartaoCredito = {
        id: item?.id || Date.now().toString(),
        nome,
        banco,
        diaFechamento: Number.parseInt(diaFechamento),
        diaVencimento: Number.parseInt(diaVencimento),
        limite: limite ? Number.parseFloat(limite) : undefined,
        ativo: ativo,
        cor,
      }
      onSave(cartao)
    }

    onClose()
  }

  const resetForm = () => {
    setNome("")
    setBanco("")
    setCor("bg-blue-500")
    setAtivo(true)
    setTipoConta("corrente")
    setSaldo("")
    setDiaFechamento("5")
    setDiaVencimento("10")
    setLimite("")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {tipo === "cartao" ? <CreditCard className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
              <div>
                <span className="text-lg font-semibold">
                  {item ? "Editar" : "Criar Nova"} {tipo === "cartao" ? "Cartão de Crédito" : "Conta Bancária"}
                </span>
                <div className="text-sm text-gray-500 font-normal">
                  {item ? "Modifique as informações abaixo" : "Preencha as informações abaixo"}
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="nome">Nome {tipo === "cartao" ? "do Cartão" : "da Conta"}</Label>
            <Input
              id="nome"
              placeholder={tipo === "cartao" ? "Ex: Cartão Nubank" : "Ex: Conta Corrente Itaú"}
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          {/* Banco */}
          <div className="space-y-2">
            <Label htmlFor="banco">Banco/Instituição</Label>
            <Select value={banco} onValueChange={setBanco}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o banco" />
              </SelectTrigger>
              <SelectContent>
                {bancos.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Campos específicos para Conta */}
          {tipo === "conta" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="tipo-conta">Tipo de Conta</Label>
                <Select value={tipoConta} onValueChange={setTipoConta}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="corrente">Conta Corrente</SelectItem>
                    <SelectItem value="poupanca">Conta Poupança</SelectItem>
                    <SelectItem value="investimento">Conta Investimento</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="saldo">Saldo Atual (opcional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                  <Input
                    id="saldo"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    className="pl-10"
                    value={saldo}
                    onChange={(e) => setSaldo(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* Campos específicos para Cartão */}
          {tipo === "cartao" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dia-fechamento">Dia de Fechamento</Label>
                  <Select value={diaFechamento} onValueChange={setDiaFechamento}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 28 }, (_, i) => i + 1).map((dia) => (
                        <SelectItem key={dia} value={dia.toString()}>
                          Dia {dia}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dia-vencimento">Dia de Vencimento</Label>
                  <Select value={diaVencimento} onValueChange={setDiaVencimento}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 28 }, (_, i) => i + 1).map((dia) => (
                        <SelectItem key={dia} value={dia.toString()}>
                          Dia {dia}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="limite">Limite (opcional)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                  <Input
                    id="limite"
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    className="pl-10"
                    value={limite}
                    onChange={(e) => setLimite(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {/* Cor */}
          <div className="space-y-2">
            <Label>Cor de Identificação</Label>
            <div className="grid grid-cols-4 gap-2">
              {cores.map((c) => (
                <button
                  key={c.valor}
                  type="button"
                  className={`w-full h-10 rounded-md border-2 ${c.valor} ${
                    cor === c.valor ? "border-gray-900" : "border-gray-300"
                  }`}
                  onClick={() => setCor(c.valor)}
                  title={c.nome}
                />
              ))}
            </div>
          </div>

          {/* Ativo */}
          <div className="flex items-center justify-between">
            <Label htmlFor="ativo">{tipo === "cartao" ? "Cartão Ativo" : "Conta Ativa"}</Label>
            <Switch id="ativo" checked={ativo} onCheckedChange={setAtivo} />
          </div>
        </div>

        {/* Preview dos Dados */}
        {nome && banco && (
          <div className="bg-gray-50 p-4 rounded-lg border">
            <h4 className="font-medium mb-3 text-gray-800">Preview:</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 ${cor} rounded-full flex items-center justify-center`}>
                  {tipo === "cartao" ? (
                    <CreditCard className="w-4 h-4 text-white" />
                  ) : (
                    <Building2 className="w-4 h-4 text-white" />
                  )}
                </div>
                <div>
                  <div className="font-medium text-gray-900">{nome}</div>
                  <div className="text-sm text-gray-600">{banco}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mt-3">
                {tipo === "conta" ? (
                  <>
                    <div>
                      Tipo:{" "}
                      {tipoConta === "corrente" ? "Corrente" : tipoConta === "poupanca" ? "Poupança" : "Investimento"}
                    </div>
                    {saldo && <div>Saldo: R$ {Number.parseFloat(saldo).toFixed(2)}</div>}
                  </>
                ) : (
                  <>
                    <div>Fechamento: Dia {diaFechamento}</div>
                    <div>Vencimento: Dia {diaVencimento}</div>
                    {limite && <div>Limite: R$ {Number.parseFloat(limite).toFixed(2)}</div>}
                  </>
                )}
                <div>Status: {ativo ? "Ativo" : "Inativo"}</div>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col space-y-3 pt-6 border-t">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Confirme os dados antes de salvar</span>
            {nome && banco && (
              <span className="text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                Pronto para salvar
              </span>
            )}
          </div>

          <div className="flex space-x-3">
            <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
              <X className="w-4 h-4 mr-2" />
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={!nome || !banco}
            >
              {item ? (
                <>
                  <Edit className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Criar {tipo === "cartao" ? "Cartão" : "Conta"}
                </>
              )}
            </Button>
          </div>

          {(!nome || !banco) && (
            <div className="text-xs text-amber-600 text-center">Preencha os campos obrigatórios para continuar</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
