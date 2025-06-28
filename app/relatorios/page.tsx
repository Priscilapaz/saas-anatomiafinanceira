import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, Calendar, TrendingUp, TrendingDown, BarChart3 } from "lucide-react"

export default function RelatoriosPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
            <p className="text-gray-600">Análises detalhadas das suas finanças</p>
          </div>
          <div className="flex space-x-2">
            <Select defaultValue="mensal">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="trimestral">Trimestral</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Jun 2025
            </Button>
          </div>
        </div>

        {/* Relatórios Disponíveis */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span>Relatório de Receitas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Análise detalhada de todas as suas fontes de receita</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-green-600">R$ 15.280</span>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingDown className="w-5 h-5 text-red-600" />
                <span>Relatório de Despesas</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Breakdown completo dos seus gastos por categoria</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-red-600">R$ 11.656</span>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <span>Fluxo de Caixa</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Evolução do seu saldo ao longo do tempo</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-600">R$ 3.624</span>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <span>Relatório Completo</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Relatório consolidado com todas as informações</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Última atualização: Hoje</span>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5 text-orange-600" />
                <span>Análise de Tendências</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Projeções e tendências baseadas no histórico</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-green-600">↗ Tendência positiva</span>
                <Button size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Baixar
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-gray-600" />
                <span>Relatório Personalizado</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Crie relatórios customizados conforme sua necessidade</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Configurar filtros</span>
                <Button size="sm" variant="outline">
                  Criar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resumo Rápido */}
        <Card>
          <CardHeader>
            <CardTitle>Resumo do Período</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">R$ 15.280</div>
                <div className="text-sm text-gray-600">Total de Receitas</div>
                <div className="text-xs text-green-600 mt-1">+8.5% vs mês anterior</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">R$ 11.656</div>
                <div className="text-sm text-gray-600">Total de Despesas</div>
                <div className="text-xs text-red-600 mt-1">+3.2% vs mês anterior</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">R$ 3.624</div>
                <div className="text-sm text-gray-600">Saldo Final</div>
                <div className="text-xs text-blue-600 mt-1">+18.5% vs mês anterior</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">23.7%</div>
                <div className="text-sm text-gray-600">Taxa de Poupança</div>
                <div className="text-xs text-purple-600 mt-1">Meta: 20%</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
