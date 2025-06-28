import { type NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"

// Tipos dos eventos do Asaas
interface AsaasWebhookEvent {
  event: string
  payment?: {
    object: string
    id: string
    dateCreated: string
    customer: string
    paymentLink?: string
    value: number
    netValue: number
    originalValue?: number
    interestValue?: number
    description?: string
    billingType: string
    canBePaidAfterDueDate: boolean
    pixTransaction?: string
    status: string
    dueDate: string
    originalDueDate: string
    paymentDate?: string
    clientPaymentDate?: string
    installmentNumber?: number
    invoiceUrl: string
    invoiceNumber: string
    externalReference?: string
    deleted: boolean
    anticipated: boolean
    anticipable: boolean
    creditDate?: string
    estimatedCreditDate?: string
    transactionReceiptUrl?: string
    nossoNumero?: string
    bankSlipUrl?: string
    lastInvoiceViewedDate?: string
    lastBankSlipViewedDate?: string
    discount?: {
      value: number
      limitDate?: string
      dueDateLimitDays: number
      type: string
    }
    fine?: {
      value: number
      type: string
    }
    interest?: {
      value: number
      type: string
    }
    postalService: boolean
    custody?: string
    refunds?: any[]
  }
  subscription?: {
    object: string
    id: string
    dateCreated: string
    customer: string
    paymentLink?: string
    value: number
    netValue: number
    status: string
    billingType: string
    cycle: string
    description?: string
    endDate?: string
    maxPayments?: number
    nextDueDate: string
    externalReference?: string
    deleted: boolean
    discount?: {
      value: number
      dueDateLimitDays: number
      type: string
    }
    fine?: {
      value: number
      type: string
    }
    interest?: {
      value: number
      type: string
    }
  }
}

// Função para verificar a autenticidade do webhook
function verifyWebhookSignature(payload: string, signature: string): boolean {
  // Implementar verificação de assinatura do webhook
  // Por enquanto, vamos usar o token simples
  const expectedToken = process.env.ASAAS_WEBHOOK_TOKEN
  return signature === expectedToken
}

// Função para processar eventos de pagamento
async function processPaymentEvent(event: string, payment: any) {
  console.log(`Processando evento de pagamento: ${event}`, payment)

  switch (event) {
    case "PAYMENT_CREATED":
      // Pagamento criado
      console.log("Novo pagamento criado:", payment.id)
      break

    case "PAYMENT_AWAITING_PAYMENT":
      // Pagamento aguardando
      console.log("Pagamento aguardando:", payment.id)
      break

    case "PAYMENT_RECEIVED":
      // Pagamento recebido
      console.log("Pagamento recebido:", payment.id)
      // Aqui você pode ativar o acesso do usuário, enviar email de confirmação, etc.
      break

    case "PAYMENT_CONFIRMED":
      // Pagamento confirmado
      console.log("Pagamento confirmado:", payment.id)
      break

    case "PAYMENT_OVERDUE":
      // Pagamento vencido
      console.log("Pagamento vencido:", payment.id)
      // Aqui você pode enviar lembretes, suspender acesso, etc.
      break

    case "PAYMENT_DELETED":
      // Pagamento deletado
      console.log("Pagamento deletado:", payment.id)
      break

    case "PAYMENT_RESTORED":
      // Pagamento restaurado
      console.log("Pagamento restaurado:", payment.id)
      break

    case "PAYMENT_REFUNDED":
      // Pagamento estornado
      console.log("Pagamento estornado:", payment.id)
      break

    case "PAYMENT_RECEIVED_IN_CASH":
      // Pagamento recebido em dinheiro
      console.log("Pagamento recebido em dinheiro:", payment.id)
      break

    case "PAYMENT_CHARGEBACK_REQUESTED":
      // Chargeback solicitado
      console.log("Chargeback solicitado:", payment.id)
      break

    case "PAYMENT_CHARGEBACK_DISPUTE":
      // Chargeback em disputa
      console.log("Chargeback em disputa:", payment.id)
      break

    case "PAYMENT_AWAITING_CHARGEBACK_REVERSAL":
      // Aguardando reversão do chargeback
      console.log("Aguardando reversão do chargeback:", payment.id)
      break

    case "PAYMENT_DUNNING_REQUESTED":
      // Cobrança solicitada
      console.log("Cobrança solicitada:", payment.id)
      break

    case "PAYMENT_DUNNING_RECEIVED":
      // Cobrança recebida
      console.log("Cobrança recebida:", payment.id)
      break

    case "PAYMENT_BANK_SLIP_VIEWED":
      // Boleto visualizado
      console.log("Boleto visualizado:", payment.id)
      break

    case "PAYMENT_CHECKOUT_VIEWED":
      // Checkout visualizado
      console.log("Checkout visualizado:", payment.id)
      break

    default:
      console.log("Evento de pagamento não tratado:", event)
  }
}

// Função para processar eventos de assinatura
async function processSubscriptionEvent(event: string, subscription: any) {
  console.log(`Processando evento de assinatura: ${event}`, subscription)

  switch (event) {
    case "SUBSCRIPTION_CREATED":
      // Assinatura criada
      console.log("Nova assinatura criada:", subscription.id)
      break

    case "SUBSCRIPTION_UPDATED":
      // Assinatura atualizada
      console.log("Assinatura atualizada:", subscription.id)
      break

    case "SUBSCRIPTION_DELETED":
      // Assinatura deletada
      console.log("Assinatura deletada:", subscription.id)
      break

    default:
      console.log("Evento de assinatura não tratado:", event)
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = await headers()
    const signature = headersList.get("asaas-access-token") || headersList.get("authorization")

    // Verificar assinatura do webhook
    if (!signature || !verifyWebhookSignature(body, signature)) {
      console.error("Assinatura do webhook inválida")
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const webhookData: AsaasWebhookEvent = JSON.parse(body)
    const { event, payment, subscription } = webhookData

    console.log("Webhook recebido:", event)

    // Processar eventos de pagamento
    if (payment && event.startsWith("PAYMENT_")) {
      await processPaymentEvent(event, payment)
    }

    // Processar eventos de assinatura
    if (subscription && event.startsWith("SUBSCRIPTION_")) {
      await processSubscriptionEvent(event, subscription)
    }

    // Aqui você pode salvar os dados no banco de dados
    // Exemplo:
    // await saveWebhookEvent({
    //   event,
    //   data: webhookData,
    //   processedAt: new Date(),
    // })

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Erro ao processar webhook:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// Método GET para verificação de saúde do endpoint
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Webhook endpoint is working",
    timestamp: new Date().toISOString(),
  })
}
