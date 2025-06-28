"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Save, X } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface Transaction {
  id: string
  description: string
  amount: number
  type: "receita" | "despesa"
  category: string
  date: Date
  account: string
  status: "pago" | "pendente" | "cancelado"
  notes?: string
}

interface EditarLancamentoModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
  onSave: (transaction: Transaction) => void
}

const CATEGORIES = ["Alimentação", "Transporte", "Moradia", "Saúde", "Educação", "Lazer", "Investimentos", "Outros"]

const ACCOUNTS = ["Conta Corrente", "Poupança", "Cartão de Crédito", "Dinheiro"]

export function EditarLancamentoModal({ isOpen, onClose, transaction, onSave }: EditarLancamentoModalProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<Transaction>({
    id: "",
    description: "",
    amount: 0,
    type: "despesa",
    category: "",
    date: new Date(),
    account: "",
    status: "pendente",
    notes: "",
  })
  const [date, setDate] = useState<Date>()

  useEffect(() => {
    if (transaction) {
      setFormData(transaction)
      setDate(transaction.date)
    }
  }, [transaction])

  const handleSave = () => {
    if (!formData.description || !formData.amount || !formData.category || !formData.account || !date) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      })
      return
    }

    const updatedTransaction = {
      ...formData,
      date: date,
      amount: Number(formData.amount),
    }

    onSave(updatedTransaction)
    toast({
      title: "Sucesso",
      description: "Transação atualizada com sucesso!",
    })
    onClose()
  }

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, "")
    const formattedValue = (Number(numericValue) / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })
    return formattedValue
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Save className="h-5 w-5" />
            Editar Transação
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Preview da transação original */}
          {transaction && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Dados Atuais:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>
                  <strong>Descrição:</strong> {transaction.description}
                </span>
                <span>
                  <strong>Valor:</strong>{" "}
                  {transaction.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
                <span>
                  <strong>Tipo:</strong> {transaction.type}
                </span>
                <span>
                  <strong>Categoria:</strong> {transaction.category}
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="description">Descrição *</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ex: Compra no supermercado"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Valor *</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                placeholder="0,00"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Tipo *</Label>
              <Select
                value={formData.type}
                onValueChange={(value: "receita" | "despesa") => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Categoria *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP", { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Conta *</Label>
              <Select value={formData.account} onValueChange={(value) => setFormData({ ...formData, account: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ACCOUNTS.map((account) => (
                    <SelectItem key={account} value={account}>
                      {account}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value: "pago" | "pendente" | "cancelado") => setFormData({ ...formData, status: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Observações</Label>
            <Textarea
              id="notes"
              value={formData.notes || ""}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Observações adicionais..."
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Salvar Alterações
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
