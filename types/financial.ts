export interface ContaBancaria {
  id: string
  nome: string
  banco: string
  tipo: "corrente" | "poupanca" | "investimento"
  saldo?: number
  ativa: boolean
  cor: string
}

export interface CartaoCredito {
  id: string
  nome: string
  banco: string
  diaFechamento: number
  diaVencimento: number
  limite?: number
  ativo: boolean
  cor: string
}
