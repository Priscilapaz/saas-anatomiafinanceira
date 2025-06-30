"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Trash2, X } from "lucide-react"
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

interface ConfirmarExclusaoModalProps {
  isOpen: boolean
  onClose: () => void
  transaction: Transaction | null
  onConfirm: (transactionId: string) => void
}

export function ConfirmarExclusaoModal({ isOpen, onClose, transaction, onConfirm }: ConfirmarExclusaoModalProps) {
  const { toast } = useToast()

  const handleConfirm = () => {
    if (transaction) {
      onConfirm(transaction.id)
      toast({
        title: "Transação excluída",
        description: "A transação foi removida com sucesso",
      })
      onClose()
    }
  }

  if (!transaction) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Confirmar Exclusão
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.
          </p>

          {/* Preview da transação */}
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-red-800">Transação a ser excluída:</h4>
            <div className="space-y-1 text-sm">
              <div>
                <strong>Descrição:</strong> {transaction.description}
              </div>
              <div>
                <strong>Valor:</strong>{" "}
                {transaction.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <div>
                <strong>Tipo:</strong> {transaction.type}
              </div>
              <div>
                <strong>Categoria:</strong> {transaction.category}
              </div>
              <div>
                <strong>Data:</strong> {transaction.date.toLocaleDateString("pt-BR")}
              </div>
              <div>
                <strong>Conta:</strong> {transaction.account}
              </div>
              <div>
                <strong>Status:</strong> {transaction.status}
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-800">
                <strong>Atenção:</strong> A exclusão desta transação pode afetar seus relatórios e saldos.
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleConfirm}>
            <Trash2 className="h-4 w-4 mr-2" />
            Excluir Transação
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
