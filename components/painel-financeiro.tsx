"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { usePerfil } from "@/contexts/perfil-context"
import { TrendingUp, TrendingDown, DollarSign, AlertTriangle, Building2, User } from "lucide-react"

interface DadosFinanceiros {
  receita: number
  despesas: number
  saldo: number
  origemReceitas?: { nome: string; valor: number }[]
  despesasOperacionais?: { tipo: string; valor: number }[]
  alertasFiscais?: string[]
}

async function buscarDados(perfil: string) {
  const token = localStorage.getItem("token")

  const res = await fetch("/api/lancamentos", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "x-perfil": perfil,
    },
  })

  if (!res.ok) {
    throw new Error("Erro ao buscar dados")
  }

  return res.json()
}

export default function PainelFinanceiro() {
  const { perfilAtivo } = usePerfil()
  const [dados, setDados] = useState<DadosFinanceiros | null>(null)
  const [erro, setErro] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const carregarDados = async () => {
      setLoading(true)
      setErro(false)

      try {
        // Simular dados baseados no perfil
        if (perfilAtivo === "pessoal") {
          setDados({
            receita: 15280.0,
            despesas: 11656.0,
            saldo: 3624.0,
          })
        } else {
          setDados({
            receita: 45000.0,
            despesas: 32500.0,
            saldo: 12500.0,
            origemReceitas: [
              { nome: "Consultório", valor: 25000.0 },
              { nome: "Hospital A", valor: 15000.0 },
              { nome: "Plantões", valor: 5000.0 },
            ],
            despesasOperacionais: [
              { tipo: "Fixas", valor: 18000.0 },
              { tipo: "Variáveis", valor: 14500.0 },
            ],
            alertasFiscais: ["Considere separar 27,5% para IR", "Verifique contribuições previdenciárias"],
          })
        }
      } catch (error) {
        setErro(true)
      } finally {
        setLoading(false)
      }
    }

    carregarDados()

    // Escutar mudanças de perfil
    const handlePerfilChange = () => carregarDados()
    window.addEventListener("perfilAlterado", handlePerfilChange)

    return () => window.removeEventListener("perfilAlterado", handlePerfilChange)
  }, [perfilAtivo])

  // Listener para mudanças de perfil
  useEffect(() => {
    const handlePerfilChange = () => {
      setLoading(true)
      // Recarregar dados após mudança de perfil
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    }

    window.addEventListener("perfilAlterado", handlePerfilChange)
    return () => window.removeEventListener("perfilAlterado", handlePerfilChange)
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 rounded-xl text-red-800 shadow">
        Erro ao carregar os dados financeiros. Verifique sua conexão ou login.
      </div>
    )
  }

  if (!dados) return null

  const getPerfilColor = () => {
    return perfilAtivo === "pessoal" ? "text-green-600" : "text-blue-600"
  }

  const getPerfilIcon = () => {
    return perfilAtivo === "pessoal" ? User : Building2
  }

  const PerfilIcon = getPerfilIcon()

  return (
    <div className="space-y-6">
      {/* Header do Perfil */}
      <div className="flex items-center gap-3 mb-6">
        <PerfilIcon className={`w-6 h-6 ${getPerfilColor()}`} />
        <h2 className={`text-2xl font-bold ${getPerfilColor()}`}>
          Resumo {perfilAtivo === "pessoal" ? "Pessoal" : "Profissional"}
        </h2>
      </div>

      {/* Cards principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              Receita do Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              R$ {dados.receita.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-red-500" />
              Despesas do Mês
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              R$ {dados.despesas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-500" />
              Saldo Líquido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${dados.saldo >= 0 ? "text-blue-600" : "text-red-600"}`}>
              R$ {dados.saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seções específicas por perfil */}
      {perfilAtivo === "profissional" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Origem das Receitas */}
          {dados.origemReceitas && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-600">Origem das Receitas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dados.origemReceitas.map((origem, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">{origem.nome}</span>
                      <span className="text-blue-600 font-bold">
                        R$ {origem.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Despesas Operacionais */}
          {dados.despesasOperacionais && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-blue-600">Despesas Operacionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dados.despesasOperacionais.map((despesa, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">{despesa.tipo}</span>
                      <span className="text-red-600 font-bold">
                        R$ {despesa.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Alertas Fiscais (apenas profissional) */}
      {perfilAtivo === "profissional" && dados.alertasFiscais && (
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-orange-600 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Recomendações Fiscais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {dados.alertasFiscais.map((alerta, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-orange-50 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-orange-800">{alerta}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informação sobre perfil pessoal */}
      {perfilAtivo === "pessoal" && (
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="pt-6">
            <div className="text-center text-gray-600">
              <User className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-lg font-medium mb-2">Perfil Pessoal Ativo</p>
              <p className="text-sm">Visualizando dados completos com categorias detalhadas, metas e gráficos.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
