"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Search, Plus, Edit, Trash2, TrendingUp, TrendingDown, DollarSign } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { NovoLancamentoModal } from "@/components/novo-lancamento-modal"
import { EditarLancamentoModal } from "@/components/editar-lancamento-modal"
import { ConfirmarExclusaoModal } from "@/components/confirmar-exclusao-modal"
import { usePerfil } from "@/contexts/perfil-context"

interface Lancamento {
  id: string
  data: string
  descricao: string
  categoria: string
  valor: number
  tipo: "receita" | "despesa" | "transferencia"
  conta?: string
  observacoes?: string
  perfil: string
}

export default function LancamentosPage() {
  const { perfilAtivo } = usePerfil()
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([])
  const [filtroTipo, setFiltroTipo] = useState<string>("todos")
  const [filtroCategoria, setFiltroCategoria] = useState<string>("todas")
  const [termoBusca, setTermoBusca] = useState("")
  const [showNovoLancamento, setShowNovoLancamento] = useState(false)
  const [showEditarLancamento, setShowEditarLancamento] = useState(false)
  const [showConfirmarExclusao, setShowConfirmarExclusao] = useState(false)
  const [lancamentoSelecionado, setLancamentoSelecionado] = useState<Lancamento | null>(null)
  const [loading, setLoading] = useState(true)

  // Dados simulados
  const lancamentosSimulados: Lancamento[] = [
    {
      id: "1",
      data: "2024-01-15",
      descricao: "Salário",
      categoria: "Salário",
      valor: 5000,
      tipo: "receita",
      conta: "Conta Corrente",
      perfil: "pessoal",
    },
    {
      id: "2",
      data: "2024-01-16",
      descricao: "Supermercado",
      categoria: "Alimentação",
      valor: 250,
      tipo: "despesa",
      conta: "Cartão de Crédito",
      perfil: "pessoal",
    },
    {
      id: "3",
      data: "2024-01-17",
      descricao: "Consulta Médica",
      categoria: "Saúde",
      valor: 150,
      tipo: "despesa",
      conta: "Conta Corrente",
      perfil: "pessoal",
    },
    {
      id: "4",
      data: "2024-01-18",
      descricao: "Consulta Particular",
      categoria: "Consultório",
      valor: 300,
      tipo: "receita",
      conta: "Conta Corrente",
      perfil: "profissional",
    },
    {
      id: "5",
      data: "2024-01-19",
      descricao: "Material Médico",
      categoria: "Equipamentos",
      valor: 800,
      tipo: "despesa",
      conta: "Cartão de Crédito",
      perfil: "profissional",
    },
  ]

  const carregarLancamentos = async () => {
    setLoading(true)
    try {
      // Simular carregamento
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Filtrar por perfil
      const lancamentosFiltrados = lancamentosSimulados.filter((lancamento) => lancamento.perfil === perfilAtivo)

      setLancamentos(lancamentosFiltrados)
    } catch (error) {
      console.error("Erro ao carregar lançamentos:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarLancamentos()
  }, [perfilAtivo])

  const lancamentosFiltrados = lancamentos.filter((lancamento) => {
    const matchTipo = filtroTipo === "todos" || lancamento.tipo === filtroTipo
    const matchCategoria = filtroCategoria === "todas" || lancamento.categoria === filtroCategoria
    const matchBusca =
      lancamento.descricao.toLowerCase().includes(termoBusca.toLowerCase()) ||
      lancamento.categoria.toLowerCase().includes(termoBusca.toLowerCase())

    return matchTipo && matchCategoria && matchBusca
  })

  const totalReceitas = lancamentos.filter((l) => l.tipo === "receita").reduce((acc, l) => acc + l.valor, 0)

  const totalDespesas = lancamentos.filter((l) => l.tipo === "despesa").reduce((acc, l) => acc + l.valor, 0)

  const saldo = totalReceitas - totalDespesas

  const categorias = Array.from(new Set(lancamentos.map((l) => l.categoria)))

  const handleNovoLancamento = () => {
    setShowNovoLancamento(true)
  }

  const handleEditarLancamento = (lancamento: Lancamento) => {
    setLancamentoSelecionado(lancamento)
    setShowEditarLancamento(true)
  }

  const handleExcluirLancamento = (lancamento: Lancamento) => {
    setLancamentoSelecionado(lancamento)
    setShowConfirmarExclusao(true)
  }

  const handleLancamentoSalvo = (novoLancamento: any) => {
    console.log("Lançamento salvo:", novoLancamento)
    carregarLancamentos()
  }

  const handleLancamentoEditado = (lancamentoEditado: Lancamento) => {
    setLancamentos((prev) => prev.map((l) => (l.id === lancamentoEditado.id ? lancamentoEditado : l)))
  }

  const handleLancamentoExcluido = (id: string) => {
    setLancamentos((prev) => prev.filter((l) => l.id !== id))
  }

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor)
  }

  const formatarData = (data: string) => {
    return new Date(data + "T00:00:00").toLocaleDateString("pt-BR")
  }

  // BOTÃO DE TESTE TEMPORÁRIO
  const testarLancamento = async () => {
    try {
      const response = await fetch("/api/lancamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: "Teste direto no botão",
          amount: 123.45,
          date: new Date().toISOString(),
        }),
      })

      const result = await response.json()
      console.log("Resposta da API:", result)
      alert("Lançamento enviado!")
    } catch (error) {
      console.error("Erro ao testar lançamento:", error)
      alert("Erro ao enviar lançamento: " + error.message)
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Lançamentos</h1>
            <p className="text-gray-600">
              Gerencie suas{" "}
              {perfilAtivo === "pessoal" ? "receitas e despesas pessoais" : "receitas e custos profissionais"}
            </p>
          </div>
          <Button onClick={handleNovoLancamento} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Novo Lançamento
          </Button>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {perfilAtivo === "pessoal" ? "Receitas" : "Faturamento"}
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatarValor(totalReceitas)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{perfilAtivo === "pessoal" ? "Despesas" : "Custos"}</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatarValor(totalDespesas)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo</CardTitle>
              <DollarSign className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${saldo >= 0 ? "text-blue-600" : "text-red-600"}`}>
                {formatarValor(saldo)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por descrição..."
                    value={termoBusca}
                    onChange={(e) => setTermoBusca(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo</label>
                <Select value={filtroTipo} onValueChange={setFiltroTipo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="receita">{perfilAtivo === "pessoal" ? "Receitas" : "Faturamento"}</SelectItem>
                    <SelectItem value="despesa">{perfilAtivo === "pessoal" ? "Despesas" : "Custos"}</SelectItem>
                    <SelectItem value="transferencia">Transferências</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Categoria</label>
                <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas</SelectItem>
                    {categorias.map((categoria) => (
                      <SelectItem key={categoria} value={categoria}>
                        {categoria}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Período</label>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Este mês
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Lançamentos */}
        <Card>
          <CardHeader>
            <CardTitle>Lançamentos</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-16 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : lancamentosFiltrados.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Nenhum lançamento encontrado.</p>
                <Button onClick={handleNovoLancamento} className="mt-4">
                  Criar primeiro lançamento
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {lancamentosFiltrados.map((lancamento) => (
                  <div
                    key={lancamento.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium">{lancamento.descricao}</h3>
                          <Badge
                            variant="outline"
                            className={
                              lancamento.tipo === "receita"
                                ? "text-green-600"
                                : lancamento.tipo === "despesa"
                                  ? "text-red-600"
                                  : "text-blue-600"
                            }
                          >
                            {lancamento.tipo}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          {lancamento.categoria} • {formatarData(lancamento.data)}
                          {lancamento.conta && ` • ${lancamento.conta}`}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div
                        className={`text-lg font-bold ${
                          lancamento.tipo === "receita"
                            ? "text-green-600"
                            : lancamento.tipo === "despesa"
                              ? "text-red-600"
                              : "text-blue-600"
                        }`}
                      >
                        {lancamento.tipo === "despesa" ? "-" : "+"}
                        {formatarValor(lancamento.valor)}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => handleEditarLancamento(lancamento)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleExcluirLancamento(lancamento)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* BOTÃO DE TESTE TEMPORÁRIO */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">🧪 Área de Desenvolvimento</p>
            <Button onClick={testarLancamento} className="bg-blue-600 text-white hover:bg-blue-700">
              Testar Lançamento
            </Button>
            <p className="text-xs text-gray-500 mt-1">Envia POST para /api/lancamentos com dados de teste</p>
          </div>
        </div>

        {/* Modais */}
        <NovoLancamentoModal
          isOpen={showNovoLancamento}
          onClose={() => setShowNovoLancamento(false)}
          onSave={handleLancamentoSalvo}
        />

        <EditarLancamentoModal
          isOpen={showEditarLancamento}
          onClose={() => setShowEditarLancamento(false)}
          lancamento={lancamentoSelecionado}
          onSave={handleLancamentoEditado}
        />

        <ConfirmarExclusaoModal
          isOpen={showConfirmarExclusao}
          onClose={() => setShowConfirmarExclusao(false)}
          lancamento={lancamentoSelecionado}
          onConfirm={handleLancamentoExcluido}
        />
      </div>
    </DashboardLayout>
  )
}
