"use client"

import React from "react"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { useState, useMemo } from "react"
import Image from "next/image"

const MONTHS = [
  { name: "Janeiro", short: "Jan" },
  { name: "Fevereiro", short: "Fev" },
  { name: "Março", short: "Mar" },
  { name: "Abril", short: "Abr" },
  { name: "Maio", short: "Mai" },
  { name: "Junho", short: "Jun" },
  { name: "Julho", short: "Jul" },
  { name: "Agosto", short: "Ago" },
  { name: "Setembro", short: "Set" },
  { name: "Outubro", short: "Out" },
  { name: "Novembro", short: "Nov" },
  { name: "Dezembro", short: "Dez" },
]

// Dados dos grupos (vindos da página de grupos)
const GRUPOS_DATA = [
  { id: "1", nome: "MORADIA", tipo: "vbsp", categorias: 9, cor: "bg-blue-500" },
  { id: "2", nome: "ALIMENTAÇÃO", tipo: "vbsp", categorias: 5, cor: "bg-green-500" },
  { id: "3", nome: "SAÚDE", tipo: "vbsp", categorias: 7, cor: "bg-red-500" },
  { id: "4", nome: "BELEZA", tipo: "vbsp", categorias: 4, cor: "bg-pink-500" },
  { id: "5", nome: "TRANSPORTE", tipo: "vbsp", categorias: 8, cor: "bg-yellow-500" },
  { id: "6", nome: "FILHOS", tipo: "vbsp", categorias: 5, cor: "bg-purple-500" },
  { id: "7", nome: "EXTRAS", tipo: "vbsp", categorias: 6, cor: "bg-indigo-500" },
  { id: "8", nome: "OUTROS", tipo: "vbsp", categorias: 4, cor: "bg-gray-500" },
  { id: "9", nome: "LAZER SEM CULPA", tipo: "gsc", categorias: 4, cor: "bg-orange-500" },
]

// Dados das categorias (vindos da página de categorias)
const CATEGORIAS_DATA = [
  // MORADIA
  { id: "1", nome: "Aluguel", grupo: "MORADIA", icone: "Home", cor: "bg-blue-500" },
  { id: "2", nome: "Condomínio", grupo: "MORADIA", icone: "Home", cor: "bg-blue-600" },
  { id: "3", nome: "IPTU", grupo: "MORADIA", icone: "Home", cor: "bg-blue-700" },
  { id: "4", nome: "Água/Luz/Gás", grupo: "MORADIA", icone: "Home", cor: "bg-blue-400" },
  { id: "5", nome: "Internet", grupo: "MORADIA", icone: "Home", cor: "bg-blue-300" },
  { id: "6", nome: "Pet", grupo: "MORADIA", icone: "Heart", cor: "bg-blue-800" },
  { id: "7", nome: "Funcionária", grupo: "MORADIA", icone: "Home", cor: "bg-blue-200" },
  { id: "8", nome: "Manutenção da Casa", grupo: "MORADIA", icone: "Home", cor: "bg-blue-900" },
  { id: "9", nome: "Eletrônicos", grupo: "MORADIA", icone: "Home", cor: "bg-blue-100" },

  // ALIMENTAÇÃO
  { id: "10", nome: "Mercado", grupo: "ALIMENTAÇÃO", icone: "Utensils", cor: "bg-green-500" },
  { id: "11", nome: "Lanches", grupo: "ALIMENTAÇÃO", icone: "Utensils", cor: "bg-green-600" },
  { id: "12", nome: "Padaria", grupo: "ALIMENTAÇÃO", icone: "Utensils", cor: "bg-green-700" },
  { id: "13", nome: "Ifood", grupo: "ALIMENTAÇÃO", icone: "Utensils", cor: "bg-green-400" },
  { id: "14", nome: "Restaurante", grupo: "ALIMENTAÇÃO", icone: "Utensils", cor: "bg-green-300" },

  // SAÚDE
  { id: "15", nome: "Farmácia", grupo: "SAÚDE", icone: "Heart", cor: "bg-red-500" },
  { id: "16", nome: "Consultas/Exames/Terapia", grupo: "SAÚDE", icone: "Heart", cor: "bg-red-600" },
  { id: "17", nome: "Suplementos", grupo: "SAÚDE", icone: "Heart", cor: "bg-red-700" },
  { id: "18", nome: "Academia/Personal", grupo: "SAÚDE", icone: "Heart", cor: "bg-red-400" },
  { id: "19", nome: "Seguro de Vida", grupo: "SAÚDE", icone: "Heart", cor: "bg-red-300" },
  { id: "20", nome: "Plano de Saúde", grupo: "SAÚDE", icone: "Heart", cor: "bg-red-800" },

  // BELEZA
  { id: "21", nome: "Cosméticos", grupo: "BELEZA", icone: "Palette", cor: "bg-pink-500" },
  { id: "22", nome: "Estética", grupo: "BELEZA", icone: "Palette", cor: "bg-pink-600" },
  { id: "23", nome: "Salão de Beleza", grupo: "BELEZA", icone: "Palette", cor: "bg-pink-700" },
  { id: "24", nome: "Vestuário e Acessórios", grupo: "BELEZA", icone: "Palette", cor: "bg-pink-400" },

  // TRANSPORTE
  { id: "25", nome: "Sem Parar/Estacionamento", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-500" },
  { id: "26", nome: "Combustível", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-600" },
  { id: "27", nome: "Manutenção do Carro", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-700" },
  { id: "28", nome: "Financiamento do Carro", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-400" },
  { id: "29", nome: "IPVA", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-300" },
  { id: "30", nome: "Seguro do Carro", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-800" },
  { id: "31", nome: "Uber", grupo: "TRANSPORTE", icone: "Car", cor: "bg-yellow-200" },

  // FILHOS
  { id: "32", nome: "Escola", grupo: "FILHOS", icone: "Baby", cor: "bg-purple-500" },
  { id: "33", nome: "Babá", grupo: "FILHOS", icone: "Baby", cor: "bg-purple-600" },
  { id: "34", nome: "Vestuário e Acessório Filhos", grupo: "FILHOS", icone: "Baby", cor: "bg-purple-700" },
  { id: "35", nome: "Brinquedos", grupo: "FILHOS", icone: "Baby", cor: "bg-purple-400" },
  { id: "36", nome: "Transporte Escolar", grupo: "FILHOS", icone: "Baby", cor: "bg-purple-300" },

  // EXTRAS
  { id: "37", nome: "Presentes", grupo: "EXTRAS", icone: "Gift", cor: "bg-indigo-500" },
  { id: "38", nome: "Assinaturas", grupo: "EXTRAS", icone: "Gift", cor: "bg-indigo-600" },
  { id: "39", nome: "Livros", grupo: "EXTRAS", icone: "Gift", cor: "bg-indigo-700" },
  { id: "40", nome: "Cursos e Mentorias", grupo: "EXTRAS", icone: "Gift", cor: "bg-indigo-400" },
  { id: "41", nome: "Viagens", grupo: "EXTRAS", icone: "Gift", cor: "bg-indigo-300" },
  { id: "42", nome: "Festas", grupo: "EXTRAS", icone: "Gift", cor: "bg-indigo-800" },

  // OUTROS
  { id: "43", nome: "Tarifas Bancárias", grupo: "OUTROS", icone: "MoreHorizontal", cor: "bg-gray-500" },
  { id: "44", nome: "Impostos", grupo: "OUTROS", icone: "MoreHorizontal", cor: "bg-gray-600" },
  { id: "45", nome: "Juros/Multas", grupo: "OUTROS", icone: "MoreHorizontal", cor: "bg-gray-700" },
  { id: "46", nome: "CRM", grupo: "OUTROS", icone: "MoreHorizontal", cor: "bg-gray-400" },

  // GASTAR SEM CULPA
  { id: "47", nome: "Cinema/Passeios", grupo: "LAZER SEM CULPA", icone: "Smile", cor: "bg-teal-500" },
  { id: "48", nome: "Bar", grupo: "LAZER SEM CULPA", icone: "Smile", cor: "bg-teal-600" },
  { id: "49", nome: "Brusinha", grupo: "LAZER SEM CULPA", icone: "Smile", cor: "bg-teal-700" },
]

// Exemplo de dados para 12 meses
const INCOMES = [12500, 13200, 14500, 13800, 14100, 15280, 16000, 15800, 16250, 17000, 16800, 17500]
const EXPENSES = [10000, 10750, 11300, 11000, 11180, 11656, 12000, 11800, 12300, 12600, 12400, 13000]

// Dados de exemplo para gastos por categoria (em reais)
const GASTOS_POR_CATEGORIA = {
  Aluguel: [2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800],
  Condomínio: [450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450, 450],
  IPTU: [0, 0, 350, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  "Água/Luz/Gás": [380, 420, 450, 400, 380, 420, 480, 450, 430, 460, 440, 480],
  Internet: [120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120],
  Pet: [200, 180, 220, 190, 210, 200, 180, 200, 190, 210, 200, 220],
  Funcionária: [800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800, 800],
  "Manutenção da Casa": [150, 200, 300, 100, 180, 250, 200, 150, 180, 200, 150, 300],
  Eletrônicos: [0, 500, 0, 200, 0, 300, 0, 150, 0, 400, 0, 200],

  Mercado: [800, 850, 900, 820, 880, 900, 920, 900, 880, 950, 900, 980],
  Lanches: [150, 180, 200, 160, 170, 200, 180, 160, 170, 180, 160, 200],
  Padaria: [120, 130, 140, 125, 135, 140, 145, 140, 135, 150, 140, 155],
  Ifood: [300, 350, 400, 320, 360, 400, 380, 360, 340, 380, 360, 400],
  Restaurante: [200, 250, 300, 220, 280, 300, 280, 260, 240, 280, 260, 300],
}

export default function ResumoPage() {
  const [currentMonth, setCurrentMonth] = useState<number>(5) // Junho (index 5)
  const [selectedYear, setSelectedYear] = useState("2025")

  // Calcula 6 meses centrados no mês atual
  const getVisibleMonths = () => {
    const start = Math.max(0, Math.min(11 - 5, currentMonth - 2))
    return MONTHS.slice(start, start + 6)
  }
  const visibleMonths = getVisibleMonths()

  // Filtra grupos VBSP dinamicamente
  const gruposVBSP = useMemo(() => {
    return GRUPOS_DATA.filter((grupo) => grupo.tipo === "vbsp")
  }, [])

  // Filtra grupos GSC dinamicamente
  const gruposGSC = useMemo(() => {
    return GRUPOS_DATA.filter((grupo) => grupo.tipo === "gsc")
  }, [])

  // Agrupa categorias por grupo
  const categoriasPorGrupo = useMemo(() => {
    const grupos: { [key: string]: any[] } = {}
    CATEGORIAS_DATA.forEach((categoria) => {
      if (!grupos[categoria.grupo]) {
        grupos[categoria.grupo] = []
      }
      grupos[categoria.grupo].push(categoria)
    })
    return grupos
  }, [])

  const navigateMonth = (dir: "prev" | "next") => {
    setCurrentMonth((prev) => {
      if (dir === "prev") return Math.max(0, prev - 1)
      return Math.min(11, prev + 1)
    })
  }

  // Utilidade para formatar pt-BR
  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

  // Calcula total de um grupo para um mês específico
  const calcularTotalGrupo = (nomeGrupo: string, monthIndex: number) => {
    const categorias = categoriasPorGrupo[nomeGrupo] || []
    let total = 0

    categorias.forEach((categoria) => {
      const gastos = GASTOS_POR_CATEGORIA[categoria.nome as keyof typeof GASTOS_POR_CATEGORIA]
      if (gastos && gastos[monthIndex]) {
        total += gastos[monthIndex]
      }
    })

    return total
  }

  // Calcula total VBSP para um mês específico
  const calcularTotalVBSP = (monthIndex: number) => {
    return gruposVBSP.reduce((total, grupo) => {
      return total + calcularTotalGrupo(grupo.nome, monthIndex)
    }, 0)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <div className="flex items-center gap-3">
              <Image
                src="/images/anatomia-logo.png"
                alt="Anatomia Financeira"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <div className="text-sm text-gray-600">Boa tarde,</div>
                <h1 className="text-lg font-bold text-gray-900">Priscila Ferreira!</h1>
                <p className="text-sm text-gray-500">Resumo - Últimos 6 Meses</p>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-2 pr-3">
            <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")} disabled={currentMonth === 0}>
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="text-sm font-medium min-w-[100px] text-center">{MONTHS[currentMonth].name}</div>

            <Button variant="outline" size="sm" onClick={() => navigateMonth("next")} disabled={currentMonth === 11}>
              <ChevronRight className="w-4 h-4" />
            </Button>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["2025", "2024", "2023"].map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              {MONTHS[currentMonth].short} {selectedYear}
            </Button>
          </div>
        </header>

        {/* Fluxo de Caixa (6 Meses) */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#2A3829]" />
              <CardTitle className="text-base font-medium">Fluxo de Caixa – 6 Meses</CardTitle>
            </div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-6 gap-4">
              {visibleMonths.map((m) => {
                const idx = MONTHS.indexOf(m)
                const inc = INCOMES[idx]
                const exp = EXPENSES[idx]
                const bal = inc - exp
                const pct = exp ? (inc / Math.max(exp, inc)) * 100 : 100

                return (
                  <div key={m.name} className="space-y-2 text-center">
                    <p className="text-sm font-medium text-gray-600">{m.short}</p>
                    <p className="text-xs text-green-700">{fmt(inc)}</p>
                    <p className="text-xs text-red-700">{fmt(exp)}</p>
                    <p className={`text-sm font-medium ${bal >= 0 ? "text-blue-700" : "text-rose-700"}`}>{fmt(bal)}</p>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                      <div className="h-full bg-green-500" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Destino do Dinheiro - Sonhar e Realizar */}
        <Card>
          <CardHeader className="bg-[#4C5B48] text-white py-3">
            <CardTitle className="text-center text-base">DESTINO DO DINHEIRO - Sonhar e Realizar (SER)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-[#EAE6DA]">
                    <th className="text-left p-3 w-48 bg-yellow-50 text-sm">Sonhos</th>
                    {visibleMonths.map((month, index) => (
                      <th
                        key={month.name}
                        className={`text-center p-3 min-w-32 text-sm ${
                          MONTHS.indexOf(month) === currentMonth ? "bg-[#4C5B48] text-white font-bold" : ""
                        }`}
                      >
                        {month.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-[#EAE6DA] border-b font-bold">
                    <td className="p-3 bg-yellow-50 text-sm">TOTAL SER</td>
                    {visibleMonths.map((month, index) => {
                      const monthIndex = MONTHS.indexOf(month)
                      const values = [2000, 2200, 2500, 2300, 2400, 2500, 0, 0, 0, 0, 0, 0]
                      return (
                        <td
                          key={month.name}
                          className={`p-3 text-center text-sm ${monthIndex === currentMonth ? "bg-[#EAE6DA]" : ""}`}
                        >
                          {fmt(values[monthIndex])}
                        </td>
                      )
                    })}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 bg-yellow-50 text-sm">Reserva de emergência</td>
                    {visibleMonths.map((month, index) => {
                      const monthIndex = MONTHS.indexOf(month)
                      const values = [1500, 1700, 2000, 1800, 1900, 2000, 0, 0, 0, 0, 0, 0]
                      return (
                        <td
                          key={month.name}
                          className={`p-3 text-center text-sm ${monthIndex === currentMonth ? "bg-[#EAE6DA]" : ""}`}
                        >
                          {fmt(values[monthIndex])}
                        </td>
                      )
                    })}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 bg-yellow-50 text-sm">Viagem Europa</td>
                    {visibleMonths.map((month, index) => {
                      const monthIndex = MONTHS.indexOf(month)
                      const values = [300, 300, 300, 300, 300, 300, 0, 0, 0, 0, 0, 0]
                      return (
                        <td
                          key={month.name}
                          className={`p-3 text-center text-sm ${monthIndex === currentMonth ? "bg-[#EAE6DA]" : ""}`}
                        >
                          {fmt(values[monthIndex])}
                        </td>
                      )
                    })}
                  </tr>
                  <tr className="border-b">
                    <td className="p-3 bg-yellow-50 text-sm">Carro Novo</td>
                    {visibleMonths.map((month, index) => {
                      const monthIndex = MONTHS.indexOf(month)
                      const values = [200, 200, 200, 200, 200, 200, 0, 0, 0, 0, 0, 0]
                      return (
                        <td
                          key={month.name}
                          className={`p-3 text-center text-sm ${monthIndex === currentMonth ? "bg-[#EAE6DA]" : ""}`}
                        >
                          {fmt(values[monthIndex])}
                        </td>
                      )
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Destino do Dinheiro - Viver Bem Sem se Privar (DINÂMICO) */}
        <Card>
          <CardHeader className="bg-[#9E815F] text-white py-3">
            <CardTitle className="text-center text-base">Viver Bem Sem se Privar (VBSP)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-[#EAE6DA]">
                    <th className="text-left p-3 w-48 bg-yellow-50 text-sm">Grupos e Categorias</th>
                    {visibleMonths.map((month, index) => (
                      <th
                        key={month.name}
                        className={`text-center p-3 min-w-32 text-sm ${
                          MONTHS.indexOf(month) === currentMonth ? "bg-[#EAE6DA] font-bold" : ""
                        }`}
                      >
                        {month.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Total VBSP */}
                  <tr className="bg-[#EAE6DA] border-b font-bold">
                    <td className="p-3 bg-yellow-50 text-sm">TOTAL VBSP</td>
                    {visibleMonths.map((month, index) => {
                      const monthIndex = MONTHS.indexOf(month)
                      const total = calcularTotalVBSP(monthIndex)
                      return (
                        <td
                          key={month.name}
                          className={`p-3 text-center text-sm ${monthIndex === currentMonth ? "bg-[#EAE6DA]" : ""}`}
                        >
                          {fmt(total)}
                        </td>
                      )
                    })}
                  </tr>

                  {/* Grupos VBSP dinâmicos */}
                  {gruposVBSP.map((grupo) => (
                    <React.Fragment key={grupo.id}>
                      {/* Linha do Grupo */}
                      <tr className="bg-[#EAE6DA] border-b font-medium">
                        <td className="p-3 bg-yellow-50 text-sm">{grupo.nome}</td>
                        {visibleMonths.map((month, index) => {
                          const monthIndex = MONTHS.indexOf(month)
                          const totalGrupo = calcularTotalGrupo(grupo.nome, monthIndex)
                          return (
                            <td
                              key={month.name}
                              className={`p-3 text-center text-sm ${monthIndex === currentMonth ? "bg-[#EAE6DA]" : ""}`}
                            >
                              {fmt(totalGrupo)}
                            </td>
                          )
                        })}
                      </tr>

                      {/* Categorias do Grupo */}
                      {(categoriasPorGrupo[grupo.nome] || []).map((categoria) => (
                        <tr key={categoria.id} className="border-b">
                          <td className="p-3 bg-yellow-50 pl-8 text-sm">{categoria.nome}</td>
                          {visibleMonths.map((month, index) => {
                            const monthIndex = MONTHS.indexOf(month)
                            const gastos = GASTOS_POR_CATEGORIA[categoria.nome as keyof typeof GASTOS_POR_CATEGORIA]
                            const valor = gastos ? gastos[monthIndex] : 0
                            return (
                              <td
                                key={month.name}
                                className={`p-3 text-center text-sm ${monthIndex === currentMonth ? "bg-[#EAE6DA]" : ""}`}
                              >
                                {fmt(valor)}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Gastei Sem Culpa (DINÂMICO) */}
        <Card>
          <CardHeader className="bg-[#2A3829] text-white py-3">
            <CardTitle className="text-center text-base">Gastei Sem Culpa (GSC)</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-[#EAE6DA]">
                    <th className="text-left p-3 w-48 bg-yellow-50 text-sm">Categorias GSC</th>
                    {visibleMonths.map((month, index) => (
                      <th
                        key={month.name}
                        className={`text-center p-3 min-w-32 text-sm ${
                          MONTHS.indexOf(month) === currentMonth ? "bg-[#2A3829] text-white font-bold" : ""
                        }`}
                      >
                        {month.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Total GSC */}
                  <tr className="bg-[#EAE6DA] border-b font-bold">
                    <td className="p-3 bg-yellow-50 text-sm">TOTAL GSC</td>
                    {visibleMonths.map((month, index) => {
                      const monthIndex = MONTHS.indexOf(month)
                      const values = [800, 950, 1100, 1050, 1080, 1200, 0, 0, 0, 0, 0, 0]
                      return (
                        <td
                          key={month.name}
                          className={`p-3 text-center text-sm bg-border text-black ${monthIndex === currentMonth ? "bg-[#2A3829] text-white" : ""}`}
                        >
                          {fmt(values[monthIndex])}
                        </td>
                      )
                    })}
                  </tr>

                  {/* Categorias GSC dinâmicas */}
                  {gruposGSC.map((grupo) => (
                    <React.Fragment key={grupo.id}>
                      {(categoriasPorGrupo[grupo.nome] || []).map((categoria) => (
                        <tr key={categoria.id} className="border-b">
                          <td className="p-3 bg-yellow-50 text-sm">{categoria.nome}</td>
                          {visibleMonths.map((month, index) => {
                            const monthIndex = MONTHS.indexOf(month)
                            // Valores de exemplo para categorias GSC
                            const valoresGSC: { [key: string]: number[] } = {
                              "Cinema/Passeios": [300, 350, 400, 380, 400, 450, 0, 0, 0, 0, 0, 0],
                              Bar: [300, 350, 400, 370, 380, 450, 0, 0, 0, 0, 0, 0],
                              Brusinha: [200, 250, 300, 300, 300, 300, 0, 0, 0, 0, 0, 0],
                            }
                            const valor = valoresGSC[categoria.nome] ? valoresGSC[categoria.nome][monthIndex] : 0
                            return (
                              <td
                                key={month.name}
                                className={`p-3 text-center text-sm ${monthIndex === currentMonth ? "bg-[#EAE6DA]" : ""}`}
                              >
                                {fmt(valor)}
                              </td>
                            )
                          })}
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Resumo Final do Orçamento Poderoso */}
        <Card className="border-2 border-slate-300">
          <CardHeader className="bg-[#4C5B48] text-white py-3">
            <CardTitle className="text-center text-base">Resumo Final do Orçamento Poderoso</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-[#EAE6DA]">
                    <th className="text-left p-3 w-48 bg-yellow-50 font-bold text-sm">Resumo</th>
                    {visibleMonths.map((month, index) => (
                      <th
                        key={month.name}
                        className={`text-center p-3 min-w-32 font-bold text-sm ${
                          MONTHS.indexOf(month) === currentMonth ? "bg-[#EAE6DA]" : ""
                        }`}
                      >
                        {month.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      label: "Receita",
                      values: INCOMES,
                    },
                    {
                      label: "Despesa",
                      values: EXPENSES,
                    },
                    {
                      label: "Saldo",
                      values: INCOMES.map((inc, idx) => inc - EXPENSES[idx]),
                    },
                  ].map((row) => (
                    <tr key={row.label} className="border-b">
                      <td className="p-3 bg-yellow-50 font-medium text-sm">{row.label}</td>
                      {visibleMonths.map((month, index) => {
                        const monthIndex = MONTHS.indexOf(month)
                        const value = row.values[monthIndex]
                        return (
                          <td
                            key={month.name}
                            className={`p-3 text-center text-sm ${
                              monthIndex === currentMonth ? "bg-[#EAE6DA] font-bold" : ""
                            }`}
                          >
                            {fmt(value)}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
