// Biblioteca para integração com a API do Asaas
const ASAAS_BASE_URL =
  process.env.NODE_ENV === "production" ? "https://api.asaas.com/v3" : "https://sandbox.asaas.com/api/v3"

const ASAAS_API_KEY = process.env.ASAAS_API_KEY

interface AsaasCustomer {
  id?: string
  name: string
  email: string
  phone?: string
  mobilePhone?: string
  cpfCnpj?: string
  postalCode?: string
  address?: string
  addressNumber?: string
  complement?: string
  province?: string
  city?: string
  state?: string
  country?: string
  externalReference?: string
  notificationDisabled?: boolean
  additionalEmails?: string
  municipalInscription?: string
  stateInscription?: string
  observations?: string
}

interface AsaasPayment {
  id?: string
  customer: string
  billingType: "BOLETO" | "CREDIT_CARD" | "PIX" | "UNDEFINED"
  value: number
  dueDate: string
  description?: string
  externalReference?: string
  installmentCount?: number
  installmentValue?: number
  discount?: {
    value: number
    dueDateLimitDays: number
    type: "FIXED" | "PERCENTAGE"
  }
  interest?: {
    value: number
    type: "PERCENTAGE"
  }
  fine?: {
    value: number
    type: "FIXED" | "PERCENTAGE"
  }
  postalService?: boolean
  split?: Array<{
    walletId: string
    fixedValue?: number
    percentualValue?: number
  }>
}

interface AsaasSubscription {
  id?: string
  customer: string
  billingType: "BOLETO" | "CREDIT_CARD" | "PIX"
  value: number
  nextDueDate: string
  cycle: "WEEKLY" | "BIWEEKLY" | "MONTHLY" | "QUARTERLY" | "SEMIANNUALLY" | "YEARLY"
  description?: string
  endDate?: string
  maxPayments?: number
  externalReference?: string
  split?: Array<{
    walletId: string
    fixedValue?: number
    percentualValue?: number
  }>
}

class AsaasAPI {
  private apiKey: string
  private baseURL: string

  constructor() {
    if (!ASAAS_API_KEY) {
      throw new Error("ASAAS_API_KEY não configurada")
    }
    this.apiKey = ASAAS_API_KEY
    this.baseURL = ASAAS_BASE_URL
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseURL}${endpoint}`

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        access_token: this.apiKey,
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(`Asaas API Error: ${response.status} - ${error.message || response.statusText}`)
    }

    return response.json()
  }

  // Clientes
  async createCustomer(customer: AsaasCustomer) {
    return this.request("/customers", {
      method: "POST",
      body: JSON.stringify(customer),
    })
  }

  async getCustomer(customerId: string) {
    return this.request(`/customers/${customerId}`)
  }

  async updateCustomer(customerId: string, customer: Partial<AsaasCustomer>) {
    return this.request(`/customers/${customerId}`, {
      method: "POST",
      body: JSON.stringify(customer),
    })
  }

  async listCustomers(params?: {
    name?: string
    email?: string
    cpfCnpj?: string
    groupName?: string
    externalReference?: string
    offset?: number
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return this.request(`/customers${query ? `?${query}` : ""}`)
  }

  async deleteCustomer(customerId: string) {
    return this.request(`/customers/${customerId}`, {
      method: "DELETE",
    })
  }

  // Pagamentos
  async createPayment(payment: AsaasPayment) {
    return this.request("/payments", {
      method: "POST",
      body: JSON.stringify(payment),
    })
  }

  async getPayment(paymentId: string) {
    return this.request(`/payments/${paymentId}`)
  }

  async updatePayment(paymentId: string, payment: Partial<AsaasPayment>) {
    return this.request(`/payments/${paymentId}`, {
      method: "POST",
      body: JSON.stringify(payment),
    })
  }

  async deletePayment(paymentId: string) {
    return this.request(`/payments/${paymentId}`, {
      method: "DELETE",
    })
  }

  async listPayments(params?: {
    customer?: string
    customerGroupName?: string
    billingType?: string
    status?: string
    subscription?: string
    installment?: string
    externalReference?: string
    paymentDate?: string
    estimatedCreditDate?: string
    pixQrCodeId?: string
    anticipated?: boolean
    dateCreated?: string
    offset?: number
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return this.request(`/payments${query ? `?${query}` : ""}`)
  }

  async getPaymentStatus(paymentId: string) {
    return this.request(`/payments/${paymentId}/status`)
  }

  // Assinaturas
  async createSubscription(subscription: AsaasSubscription) {
    return this.request("/subscriptions", {
      method: "POST",
      body: JSON.stringify(subscription),
    })
  }

  async getSubscription(subscriptionId: string) {
    return this.request(`/subscriptions/${subscriptionId}`)
  }

  async updateSubscription(subscriptionId: string, subscription: Partial<AsaasSubscription>) {
    return this.request(`/subscriptions/${subscriptionId}`, {
      method: "POST",
      body: JSON.stringify(subscription),
    })
  }

  async deleteSubscription(subscriptionId: string) {
    return this.request(`/subscriptions/${subscriptionId}`, {
      method: "DELETE",
    })
  }

  async listSubscriptions(params?: {
    customer?: string
    customerGroupName?: string
    billingType?: string
    status?: string
    deletedOnly?: boolean
    includeDeleted?: boolean
    externalReference?: string
    order?: "asc" | "desc"
    sort?: string
    offset?: number
    limit?: number
  }) {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString())
        }
      })
    }

    const query = searchParams.toString()
    return this.request(`/subscriptions${query ? `?${query}` : ""}`)
  }

  // Webhooks
  async listWebhooks() {
    return this.request("/webhooks")
  }

  async createWebhook(webhook: {
    name: string
    url: string
    email: string
    apiVersion: number
    enabled: boolean
    interrupted: boolean
    authToken?: string
    events: string[]
  }) {
    return this.request("/webhooks", {
      method: "POST",
      body: JSON.stringify(webhook),
    })
  }

  // Saldo
  async getBalance() {
    return this.request("/finance/balance")
  }

  // Transferências
  async createTransfer(transfer: {
    value: number
    bankAccount: {
      bank: {
        code: string
      }
      accountName: string
      ownerName: string
      ownerBirthDate: string
      cpfCnpj: string
      agency: string
      account: string
      accountDigit: string
      bankAccountType: "CONTA_CORRENTE" | "CONTA_POUPANCA"
    }
  }) {
    return this.request("/transfers", {
      method: "POST",
      body: JSON.stringify(transfer),
    })
  }

  // Relatórios
  async getFinancialReport(params: {
    dateFrom: string
    dateTo: string
  }) {
    const searchParams = new URLSearchParams(params)
    return this.request(`/finance/reports?${searchParams.toString()}`)
  }
}

export const asaas = new AsaasAPI()

// Tipos para uso em outros arquivos
export type { AsaasCustomer, AsaasPayment, AsaasSubscription }

// Utilitários
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export const formatDate = (date: string): string => {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(date))
}

export const getBillingTypeLabel = (billingType: string): string => {
  const labels: Record<string, string> = {
    BOLETO: "Boleto",
    CREDIT_CARD: "Cartão de Crédito",
    PIX: "PIX",
    UNDEFINED: "Não Definido",
  }
  return labels[billingType] || billingType
}

export const getPaymentStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    PENDING: "Pendente",
    RECEIVED: "Recebido",
    CONFIRMED: "Confirmado",
    OVERDUE: "Vencido",
    REFUNDED: "Estornado",
    RECEIVED_IN_CASH: "Recebido em Dinheiro",
    REFUND_REQUESTED: "Estorno Solicitado",
    REFUND_IN_PROGRESS: "Estorno em Andamento",
    CHARGEBACK_REQUESTED: "Chargeback Solicitado",
    CHARGEBACK_DISPUTE: "Chargeback em Disputa",
    AWAITING_CHARGEBACK_REVERSAL: "Aguardando Reversão do Chargeback",
    DUNNING_REQUESTED: "Cobrança Solicitada",
    DUNNING_RECEIVED: "Cobrança Recebida",
    AWAITING_RISK_ANALYSIS: "Aguardando Análise de Risco",
  }
  return labels[status] || status
}
