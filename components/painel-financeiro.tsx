"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  AlertTriangle,
  Calendar,
  PlusCircle,
  BarChart3,
  User,
  Building2,
  Wifi,
  RefreshCw,
  TestTube,
  Database,
} from "lucide-react"
import { usePerfil } from "@/contexts/perfil-context"
import { NovoLancamentoModal } from "@/components/novo-lancamento-modal"
import ApiTester from "@/components/api-tester"

interface DadosFinanceiros {
  receitas: number
  despesas: number
  saldo: number
  meta: number
  progressoMeta: number
  alertas: Array<{
    tipo: "vencimento" | "meta" | "fiscal"
    mensagem: string
    urgencia: "alta" | "media" | "baixa"
  }>
  categorias: Array<{
    nome: string
    valor: number
    percentual: number
  }>
}

export default function PainelFinanceiro() {
  const { perfilAtivo } = usePerfil()
  const [dados, setDados] = useState<DadosFinanceiros | null>(null)
  const [loading, setLoading] = useState(true)
  const [apiStatus, setApiStatus] = useState<"online" | "offline" | "checking">("checking")
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [showNovoLancamento, setShowNovoLancamento] = useState(false)
  const [showApiTester, setShowApiTester] = useState(false)

  const BASE_URL = "https://92a839f4-ca69-4644-9ece-3f297c376767-00-1k84q7kulkkda.worf.replit.dev"

  // Dados simulados para fallback
  const dadosSimulados: Record<string, DadosFinanceiros> = {
    pessoal: {
      receitas: 8500,
      despesas: 6200,
      saldo: 2300,
      meta: 3000,
      progressoMeta: 76.7,
      alertas: [
        { tipo: "vencimento", mensagem: "Cartão de crédito vence em 3 dias", urgencia: "alta" },
        { tipo: "meta", mensagem: "Faltam R$ 700 para atingir a meta mensal", urgencia: "media" },
      ],
      categorias: [
        { nome: "Alimentação", valor: 1800, percentual: 29 },
        { nome: "Transporte", valor: 1200, percentual: 19 },
        { nome: "Moradia", valor: 2500, percentual: 40 },
        { nome: "Lazer", valor: 700, percentual: 11 },
      ],
    },
    profissional: {
      receitas: 25000,
      despesas: 18500,
      saldo: 6500,
      meta: 8000,
      progressoMeta: 81.25,
      alertas: [
        { tipo: "fiscal", mensagem: "DAS vence em 5 dias", urgencia: "alta" },
        { tipo: "fiscal", mensagem: "Declaração mensal pendente", urgencia: "media" },
      ],
      categorias: [
        { nome: "Consultório", valor: 12000, percentual: 48 },
        { nome: "Hospital", valor: 8000, percentual: 32 },
        { nome: "Cursos", valor: 3000, percentual: 12 },
        { nome: "Equipamentos", valor: 2000, percentual: 8 },
      ],
    },
  }

  // Verifica se existe uma API local primeiro, depois tenta a externa
  const verificarStatusAPI = async () => {
    setApiStatus("checking")

    // Primeiro tenta API local
    try {
      const localResponse = await fetch("/api/lancamentos", {
        method: "GET",
        headers: { "x-perfil": perfilAtivo },
      })

      if (localResponse.ok) {
        console.log("✅ API local encontrada e funcionando")
        setApiStatus("online")
        return { type: "local", online: true }
      }
    } catch (error) {
      console.log("ℹ️ API local não encontrada, tentando API externa...")
    }

    // Se API local não funcionar, tenta a externa com timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    try {
      const response = await fetch(`${BASE_URL}/`, {
        method: "GET",
        headers: { "x-perfil": perfilAtivo },
        signal: controller.signal,
      })

      clearTimeout(timeoutId)
      const online = response.ok
      setApiStatus(online ? "online" : "offline")
      return { type: "external", online }
    } catch (error) {
      clearTimeout(timeoutId)
      console.warn("⚠️ API externa indisponível, usando dados simulados")
      setApiStatus("offline")
      return { type: "external", online: false }
    }
  }

  const carregarDados = async () => {
    setLoading(true)

    const apiResult = await verificarStatusAPI()

    if (apiResult.online) {
      try {
        // Determina qual URL usar baseado no tipo de API
        const apiUrl = apiResult.type === "local" ? "/api/lancamentos" : `${BASE_URL}/lancamentos`

        const response = await fetch(apiUrl, {
          headers: { "x-perfil": perfilAtivo },
        })

        if (response.ok) {
          const lancamentos = await response.json()
          console.log(`✅ Dados carregados da API ${apiResult.type}:`, lancamentos)

          // Por enquanto, usar dados simulados mesmo com API online
          // TODO: Processar dados reais da API
          setDados(dadosSimulados[perfilAtivo])
        } else {
          throw new Error(`Erro ${response.status} ao carregar dados`)
        }
      } catch (error) {
        console.error("❌ Erro ao carregar dados da API:", error)
        setDados(dadosSimulados[perfilAtivo])
      }
    } else {
      // API offline - usar dados simulados
      console.log("📊 Usando dados simulados")
      setDados(dadosSimulados[perfilAtivo])
    }

    setLoading(false)
    setLastUpdate(new Date())
  }

  const handleNovoLancamento = () => {
    setShowNovoLancamento(true)
  }

  const handleLancamentoSalvo = (lancamento: any) => {
    console.log("Lançamento salvo:", lancamento)
    // Recarregar dados após salvar
    carregarDados()
  }

  useEffect(() => {
    carregarDados()
  }, [perfilAtivo])

  // Se estiver mostrando o testador de API, renderizar apenas ele
  if (showApiTester) {
    return <ApiTester />
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (!dados) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Erro ao carregar dados</h3>
        <Button onClick={carregarDados}>Tentar novamente</Button>
      </div>
    )
  }

  const getCorPerfil = () => (perfilAtivo === "pessoal" ? "text-green-600" : "text-blue-600")
  const getIconePerfil = () => (perfilAtivo === "pessoal" ? User : Building2)

  // Seleciona o ícone correto para o perfil atual
  const IconePerfil = getIconePerfil()

  return (
    <div className="space-y-6">
      {/* Header com Status da API */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 rounded-full ${perfilAtivo === "pessoal" ? "bg-green-100" : "bg-blue-100"} flex items-center justify-center`}
          >
            <IconePerfil className={`w-5 h-5 ${getCorPerfil()}`} />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Painel {perfilAtivo === "pessoal" ? "Pessoal" : "Profissional"}</h2>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                {apiStatus === "online" ? (
                  <Wifi className="w-4 h-4 text-green-500" />
                ) : apiStatus === "offline" ? (
                  <Database className="w-4 h-4 text-blue-500" />
                ) : (
                  <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
                )}
                <span>
                  {apiStatus === "online"
                    ? "API Conectada"
                    : apiStatus === "offline"
                      ? "Dados Simulados"
                      : "Verificando"}
                </span>
              </div>
              {lastUpdate && <span>• Atualizado às {lastUpdate.toLocaleTimeString()}</span>}
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button onClick={() => setShowApiTester(true)} variant="outline">
            <TestTube className="w-4 h-4 mr-2" />
            Testar API
          </Button>
          <Button
            onClick={handleNovoLancamento}
            className={perfilAtivo === "pessoal" ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Criar 1 Lançamento
          </Button>
          <Button onClick={carregarDados} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
        </div>
      </div>

      {/* Alerta informativo sobre dados simulados */}
      {apiStatus === "offline" && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-blue-700">
              <Database className="w-5 h-5" />
              <span className="font-medium">Modo de Desenvolvimento</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              Usando dados simulados para demonstração. A API externa não está disponível no momento.
            </p>
            <div className="mt-2 flex space-x-2">
              <Button size="sm" variant="outline" onClick={verificarStatusAPI}>
                Verificar API
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowApiTester(true)}>
                Diagnosticar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cards Principais */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {perfilAtivo === "pessoal" ? "Receitas" : "Faturamento"}
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">R$ {dados.receitas.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {perfilAtivo === "pessoal" ? "Despesas" : "Custos Operacionais"}
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">R$ {dados.despesas.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">-3% em relação ao mês anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {perfilAtivo === "pessoal" ? "Saldo" : "Margem Líquida"}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">R$ {dados.saldo.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {perfilAtivo === "pessoal"
                ? `${((dados.saldo / dados.receitas) * 100).toFixed(1)}% da receita`
                : `${((dados.saldo / dados.receitas) * 100).toFixed(1)}% de margem`}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {perfilAtivo === "pessoal" ? "Meta de Economia" : "Meta de Lucro"}
            </CardTitle>
            <Target className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{dados.progressoMeta.toFixed(1)}%</div>
            <Progress value={dados.progressoMeta} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">
              R$ {dados.saldo.toLocaleString()} de R$ {dados.meta.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas */}
      {dados.alertas.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>{perfilAtivo === "pessoal" ? "Alertas Pessoais" : "Alertas Fiscais"}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dados.alertas.map((alerta, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    alerta.urgencia === "alta"
                      ? "bg-red-50 border-red-200"
                      : alerta.urgencia === "media"
                        ? "bg-yellow-50 border-yellow-200"
                        : "bg-blue-50 border-blue-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm">{alerta.mensagem}</span>
                    <Badge
                      variant="outline"
                      className={
                        alerta.urgencia === "alta"
                          ? "text-red-600"
                          : alerta.urgencia === "media"
                            ? "text-yellow-600"
                            : "text-blue-600"
                      }
                    >
                      {alerta.tipo}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Distribuição por Categoria */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>{perfilAtivo === "pessoal" ? "Gastos por Categoria" : "Receitas por Fonte"}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dados.categorias.map((categoria, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{categoria.nome}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">R$ {categoria.valor.toLocaleString()}</span>
                    <Badge variant="outline" className="text-xs">
                      {categoria.percentual}%
                    </Badge>
                  </div>
                </div>
                <Progress value={categoria.percentual} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Informações Específicas por Perfil */}
      {perfilAtivo === "profissional" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Informações Fiscais</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Regime Tributário</div>
                <div className="text-lg font-bold text-blue-600">Simples Nacional</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-800">Próximo DAS</div>
                <div className="text-lg font-bold text-green-600">20/01/2025</div>
              </div>
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-sm font-medium text-purple-800">Alíquota Atual</div>
                <div className="text-lg font-bold text-purple-600">6,5%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Modal de Novo Lançamento */}
      <NovoLancamentoModal
        isOpen={showNovoLancamento}
        onClose={() => setShowNovoLancamento(false)}
        onSave={handleLancamentoSalvo}
      />
    </div>
  )
}
