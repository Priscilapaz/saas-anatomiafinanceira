"use client"

import { useState, useMemo } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { TrendingDown, TrendingUp, ArrowRightLeft, X, Calendar, AlertCircle } from "lucide-react"
import type { ContaBancaria, CartaoCredito } from "@/types/financial"

interface NovoLancamentoModalProps {
  isOpen: boolean
  onClose: () => void
}

type TipoLancamento = "despesa" | "receita" | "transferencia" | null
type FormaPagamento = "pix" | "debito" | "boleto" | "credito_vista" | "credito_parcelado"

interface LancamentoFuturo {
  data: string
  dataVencimento?: string
  valor: number
  descricao: string
  parcela?: number
  totalParcelas?: number
  status: "pendente" | "pago"
}

export function NovoLancamentoModal({ isOpen, onClose }: NovoLancamentoModalProps) {
  const [step, setStep] = useState<"tipo" | "form">("tipo")
  const [tipoLancamento, setTipoLancamento] = useState<TipoLancamento>(null)

  // Mock data - em produção, isso viria de um contexto ou API
  const contas: ContaBancaria[] = [
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
  ]

  const cartoes: CartaoCredito[] = [
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
  ]

  // Form states
  const [dataPagamento, setDataPagamento] = useState("")
  const [dataVencimento, setDataVencimento] = useState("")
  const [descricao, setDescricao] = useState("")
  const [valor, setValor] = useState("")
  const [categoria, setCategoria] = useState("")
  const [isRecorrente, setIsRecorrente] = useState(false)
  const [isFixa, setIsFixa] = useState(false)
  const [mesesRecorrencia, setMesesRecorrencia] = useState("")
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>("pix")
  const [numeroParcelas, setNumeroParcelas] = useState("")
  const [contaSelecionada, setContaSelecionada] = useState("")
  const [cartaoSelecionado, setCartaoSelecionado] = useState("")
  const [contaDestino, setContaDestino] = useState("")

  // Obter cartão selecionado para pegar data de fechamento
  const cartaoAtual = cartoes.find((c) => c.id === cartaoSelecionado)

  // Calcular lançamentos futuros
  const lancamentosFuturos = useMemo((): LancamentoFuturo[] => {
    if (!dataPagamento || !valor) return []

    const valorNumerico = Number.parseFloat(valor)
    if (isNaN(valorNumerico)) return []

    const dataInicial = new Date(dataPagamento)
    const lancamentos: LancamentoFuturo[] = []

    if (formaPagamento === "credito_parcelado" && numeroParcelas && cartaoAtual) {
      // Lógica para cartão parcelado usando dados do cartão cadastrado
      const totalParcelas = Number.parseInt(numeroParcelas)
      const valorParcela = valorNumerico / totalParcelas
      const diaFechamento = cartaoAtual.diaFechamento

      for (let i = 0; i < totalParcelas; i++) {
        const dataVenc = new Date(dataInicial)

        // Se a compra foi feita antes do fechamento, primeira parcela vence no mês seguinte
        // Se foi depois do fechamento, primeira parcela vence em 2 meses
        let mesesParaSomar = i + 1
        if (dataInicial.getDate() > diaFechamento) {
          mesesParaSomar = i + 2
        } else {
          mesesParaSomar = i + 1
        }

        dataVenc.setMonth(dataVenc.getMonth() + mesesParaSomar)
        dataVenc.setDate(cartaoAtual.diaVencimento)

        lancamentos.push({
          data: dataInicial.toISOString().split("T")[0],
          dataVencimento: dataVenc.toISOString().split("T")[0],
          valor: valorParcela,
          descricao: `${descricao} (${i + 1}/${totalParcelas})`,
          parcela: i + 1,
          totalParcelas: totalParcelas,
          status: "pendente",
        })
      }
    } else if (isRecorrente && mesesRecorrencia) {
      // Lógica para recorrência (PIX, boleto, débito)
      const totalMeses = Math.min(Number.parseInt(mesesRecorrencia), 12) // Máximo 12 meses

      for (let i = 0; i < totalMeses; i++) {
        const dataRecorrencia = new Date(dataInicial)
        dataRecorrencia.setMonth(dataRecorrencia.getMonth() + i)

        const dataVenc = dataVencimento ? new Date(dataVencimento) : new Date(dataRecorrencia)
        if (dataVencimento && i > 0) {
          dataVenc.setMonth(dataVenc.getMonth() + i)
        }

        lancamentos.push({
          data: dataRecorrencia.toISOString().split("T")[0],
          dataVencimento: dataVenc.toISOString().split("T")[0],
          valor: valorNumerico,
          descricao: i === 0 ? descricao : `${descricao} (${i + 1}/${totalMeses})`,
          status: "pendente",
        })
      }
    } else {
      // Lançamento único
      lancamentos.push({
        data: dataPagamento,
        dataVencimento: dataVencimento || dataPagamento,
        valor: valorNumerico,
        descricao: descricao,
        status: "pendente",
      })
    }

    return lancamentos
  }, [
    dataPagamento,
    dataVencimento,
    valor,
    descricao,
    formaPagamento,
    numeroParcelas,
    isRecorrente,
    mesesRecorrencia,
    cartaoAtual,
  ])

  const resetForm = () => {
    setStep("tipo")
    setTipoLancamento(null)
    setDataPagamento("")
    setDataVencimento("")
    setDescricao("")
    setValor("")
    setCategoria("")
    setIsRecorrente(false)
    setIsFixa(false)
    setMesesRecorrencia("")
    setFormaPagamento("pix")
    setNumeroParcelas("")
    setContaSelecionada("")
    setCartaoSelecionado("")
    setContaDestino("")
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const handleTipoSelect = (tipo: TipoLancamento) => {
    setTipoLancamento(tipo)
    setStep("form")
    // Set today's date as default
    const today = new Date().toISOString().split("T")[0]
    setDataPagamento(today)
    setDataVencimento(today)
  }

  const handleSubmit = () => {
    // Aqui você salvaria todos os lançamentos futuros
    console.log("Lançamentos a serem criados:", {
      tipo: tipoLancamento,
      categoria,
      conta: contaSelecionada,
      cartao: cartaoSelecionado,
      formaPagamento,
      isFixa,
      lancamentos: lancamentosFuturos,
    })

    // Reset and close
    resetForm()
    onClose()
  }

  const categoriasDespesa = [
    "Alimentação",
    "Transporte",
    "Moradia",
    "Saúde",
    "Educação",
    "Lazer",
    "Compras",
    "Serviços",
    "Outros",
  ]

  const categoriasReceita = ["Salário", "Freelances", "Consultoria", "Investimentos", "Vendas", "Outros"]

  // Filtrar apenas contas/cartões ativos
  const contasAtivas = contas.filter((c) => c.ativa)
  const cartoesAtivos = cartoes.filter((c) => c.ativo)

  // Verificar se é parcelamento ou recorrência
  const isParcelamento = formaPagamento === "credito_parcelado"
  const isRecorrenciaAtiva = isRecorrente && !isParcelamento

  if (step === "tipo") {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Novo Lançamento</span>
              <Button variant="ghost" size="sm" onClick={handleClose}>
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <Button
              variant="outline"
              className="w-full justify-start h-12 text-left bg-transparent"
              onClick={() => handleTipoSelect("despesa")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-red-600" />
                </div>
                <span>Despesa</span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-12 text-left bg-transparent"
              onClick={() => handleTipoSelect("receita")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <span>Receita</span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-12 text-left bg-transparent"
              onClick={() => handleTipoSelect("transferencia")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowRightLeft className="w-4 h-4 text-blue-600" />
                </div>
                <span>Transferência</span>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={() => setStep("tipo")}>
                ←
              </Button>
              <span>
                Nova{" "}
                {tipoLancamento === "despesa" ? "Despesa" : tipoLancamento === "receita" ? "Receita" : "Transferência"}
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Formulário */}
          <div className="space-y-4">
            {/* Data do Pagamento */}
            <div className="space-y-2">
              <Label htmlFor="data">Data do {tipoLancamento === "receita" ? "Recebimento" : "Pagamento"}</Label>
              <Input id="data" type="date" value={dataPagamento} onChange={(e) => setDataPagamento(e.target.value)} />
            </div>

            {/* Data de Vencimento - apenas para despesas */}
            {tipoLancamento === "despesa" && (
              <div className="space-y-2">
                <Label htmlFor="dataVencimento">Data de Vencimento</Label>
                <Input
                  id="dataVencimento"
                  type="date"
                  value={dataVencimento}
                  onChange={(e) => setDataVencimento(e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Para despesas fixas, esta será a data que gerará alertas de vencimento
                </p>
              </div>
            )}

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Input
                id="descricao"
                placeholder="Ex: Supermercado, Salário, etc."
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            {/* Valor */}
            <div className="space-y-2">
              <Label htmlFor="valor">Valor</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">R$</span>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  placeholder="0,00"
                  className="pl-10"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                />
              </div>
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={categoria} onValueChange={setCategoria}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {(tipoLancamento === "despesa" ? categoriasDespesa : categoriasReceita).map((cat) => (
                    <SelectItem key={cat} value={cat.toLowerCase()}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Despesa Fixa - apenas para despesas */}
            {tipoLancamento === "despesa" && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="fixa">É uma despesa fixa?</Label>
                  <Switch id="fixa" checked={isFixa} onCheckedChange={setIsFixa} />
                </div>
                {isFixa && (
                  <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-700">
                    <AlertCircle className="w-4 h-4 inline mr-2" />
                    Despesas fixas geram alertas automáticos baseados na data de vencimento
                  </div>
                )}
              </div>
            )}

            {/* Transferência - Contas */}
            {tipoLancamento === "transferencia" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="conta-origem">Conta de Origem</Label>
                  <Select value={contaSelecionada} onValueChange={setContaSelecionada}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a conta de origem" />
                    </SelectTrigger>
                    <SelectContent>
                      {contasAtivas.map((conta) => (
                        <SelectItem key={conta.id} value={conta.id}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 ${conta.cor} rounded-full`}></div>
                            <span>{conta.nome}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="conta-destino">Conta de Destino</Label>
                  <Select value={contaDestino} onValueChange={setContaDestino}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a conta de destino" />
                    </SelectTrigger>
                    <SelectContent>
                      {contasAtivas
                        .filter((conta) => conta.id !== contaSelecionada)
                        .map((conta) => (
                          <SelectItem key={conta.id} value={conta.id}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 ${conta.cor} rounded-full`}></div>
                              <span>{conta.nome}</span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Forma de Pagamento - apenas para despesas */}
            {tipoLancamento === "despesa" && (
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="forma-pagamento">Forma de Pagamento</Label>
                  <Select
                    value={formaPagamento}
                    onValueChange={(value: FormaPagamento) => {
                      setFormaPagamento(value)
                      // Reset related fields when changing payment method
                      setNumeroParcelas("")
                      setCartaoSelecionado("")
                      setIsRecorrente(false)
                      setMesesRecorrencia("")
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="debito">Cartão de Débito</SelectItem>
                      <SelectItem value="boleto">Boleto</SelectItem>
                      <SelectItem value="credito_vista">Cartão de Crédito à Vista</SelectItem>
                      <SelectItem value="credito_parcelado">Cartão de Crédito Parcelado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Seleção de Cartão para crédito */}
                {(formaPagamento === "credito_vista" || formaPagamento === "credito_parcelado") && (
                  <div className="space-y-2">
                    <Label htmlFor="cartao">Cartão de Crédito</Label>
                    <Select value={cartaoSelecionado} onValueChange={setCartaoSelecionado}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cartão" />
                      </SelectTrigger>
                      <SelectContent>
                        {cartoesAtivos.map((cartao) => (
                          <SelectItem key={cartao.id} value={cartao.id}>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 ${cartao.cor} rounded-full`}></div>
                              <span>{cartao.nome}</span>
                              <span className="text-xs text-gray-500">(Fecha dia {cartao.diaFechamento})</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Parcelas para cartão de crédito */}
                {formaPagamento === "credito_parcelado" && cartaoSelecionado && (
                  <div className="space-y-2">
                    <Label htmlFor="parcelas">Número de Parcelas</Label>
                    <Select value={numeroParcelas} onValueChange={setNumeroParcelas}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o número de parcelas" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num}x de R$ {valor ? (Number.parseFloat(valor) / num).toFixed(2) : "0,00"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            )}

            {/* Recorrente - apenas para não-cartão parcelado */}
            {tipoLancamento !== "transferencia" && !isParcelamento && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="recorrente">É recorrente?</Label>
                  <Switch id="recorrente" checked={isRecorrente} onCheckedChange={setIsRecorrente} />
                </div>

                {isRecorrente && (
                  <div className="space-y-2">
                    <Label htmlFor="meses-recorrencia">Quantos meses? (máx. 12)</Label>
                    <Input
                      id="meses-recorrencia"
                      type="number"
                      min="1"
                      max="12"
                      placeholder="Ex: 12"
                      value={mesesRecorrencia}
                      onChange={(e) => {
                        const value = Number.parseInt(e.target.value)
                        if (value <= 12) {
                          setMesesRecorrencia(e.target.value)
                        }
                      }}
                    />
                    {Number.parseInt(mesesRecorrencia) > 12 && (
                      <div className="flex items-center space-x-2 text-amber-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        <span>Máximo de 12 meses para não sobrecarregar o sistema</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Conta - para receitas e despesas não cartão de crédito */}
            {tipoLancamento !== "transferencia" &&
              formaPagamento !== "credito_vista" &&
              formaPagamento !== "credito_parcelado" && (
                <div className="space-y-2">
                  <Label htmlFor="conta">Conta</Label>
                  <Select value={contaSelecionada} onValueChange={setContaSelecionada}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a conta" />
                    </SelectTrigger>
                    <SelectContent>
                      {contasAtivas.map((conta) => (
                        <SelectItem key={conta.id} value={conta.id}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 ${conta.cor} rounded-full`}></div>
                            <span>{conta.nome}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
          </div>

          {/* Preview dos Lançamentos */}
          <div className="space-y-4">
            {/* Resumo */}
            {valor && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Resumo:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Tipo:</span>
                    <Badge
                      variant={
                        tipoLancamento === "despesa"
                          ? "destructive"
                          : tipoLancamento === "receita"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {tipoLancamento === "despesa"
                        ? "Despesa"
                        : tipoLancamento === "receita"
                          ? "Receita"
                          : "Transferência"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Valor Total:</span>
                    <span className="font-medium">R$ {Number.parseFloat(valor || "0").toFixed(2)}</span>
                  </div>
                  {isParcelamento && numeroParcelas && (
                    <div className="flex justify-between">
                      <span>Parcelas:</span>
                      <span>
                        {numeroParcelas}x de R${" "}
                        {(Number.parseFloat(valor || "0") / Number.parseInt(numeroParcelas)).toFixed(2)}
                      </span>
                    </div>
                  )}
                  {isRecorrenciaAtiva && mesesRecorrencia && (
                    <div className="flex justify-between">
                      <span>Recorrência:</span>
                      <span>{Math.min(Number.parseInt(mesesRecorrencia), 12)} meses</span>
                    </div>
                  )}
                  {isFixa && (
                    <div className="flex justify-between">
                      <span>Despesa Fixa:</span>
                      <Badge variant="outline" className="text-blue-600">
                        Sim
                      </Badge>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Total de Lançamentos:</span>
                    <span className="font-medium">{lancamentosFuturos.length}</span>
                  </div>
                  {cartaoAtual && (
                    <div className="flex justify-between">
                      <span>Cartão:</span>
                      <span className="font-medium">{cartaoAtual.nome}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Preview dos Lançamentos Futuros */}
            {lancamentosFuturos.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Lançamentos que serão criados:</h4>
                </div>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {lancamentosFuturos.map((lancamento, index) => (
                    <div key={index} className="flex justify-between items-center text-sm bg-white p-2 rounded">
                      <div>
                        <div className="font-medium">{lancamento.descricao}</div>
                        <div className="text-gray-500">
                          Pagamento: {new Date(lancamento.data).toLocaleDateString("pt-BR")}
                        </div>
                        {lancamento.dataVencimento && lancamento.dataVencimento !== lancamento.data && (
                          <div className="text-orange-600 text-xs">
                            Vencimento: {new Date(lancamento.dataVencimento).toLocaleDateString("pt-BR")}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-medium">R$ {lancamento.valor.toFixed(2)}</div>
                        {lancamento.parcela && (
                          <div className="text-xs text-gray-500">
                            Parcela {lancamento.parcela}/{lancamento.totalParcelas}
                          </div>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {lancamento.status === "pendente" ? "Pendente" : "Pago"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                {isParcelamento && cartaoAtual && (
                  <div className="mt-2 text-xs text-blue-600">
                    * Datas calculadas baseadas no cartão {cartaoAtual.nome} (fecha dia {cartaoAtual.diaFechamento},
                    vence dia {cartaoAtual.diaVencimento})
                  </div>
                )}
                {isFixa && (
                  <div className="mt-2 text-xs text-orange-600">
                    * Despesa fixa gerará alertas automáticos baseados na data de vencimento
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-3 pt-4">
          <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1"
            disabled={
              !dataPagamento ||
              !descricao ||
              !valor ||
              !categoria ||
              lancamentosFuturos.length === 0 ||
              (formaPagamento === "credito_parcelado" && !cartaoSelecionado) ||
              (tipoLancamento === "transferencia" && (!contaSelecionada || !contaDestino))
            }
          >
            Criar {lancamentosFuturos.length} Lançamento{lancamentosFuturos.length > 1 ? "s" : ""}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
