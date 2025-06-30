import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Crown, Shield, Award } from "lucide-react"

export default function PerfilPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meu Perfil</h1>
          <p className="text-gray-600">Gerencie suas informações pessoais e preferências</p>
        </div>

        {/* Informações Pessoais */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-xl">PF</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline">Alterar Foto</Button>
                  <p className="text-sm text-gray-500 mt-1">JPG, PNG até 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome Completo</label>
                  <Input defaultValue="Priscila Ferreira" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input defaultValue="priscila.ferreira@email.com" type="email" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Telefone</label>
                  <Input defaultValue="(11) 99999-9999" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Data de Nascimento</label>
                  <Input defaultValue="1990-05-15" type="date" />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Endereço</label>
                  <Input defaultValue="Rua das Flores, 123 - São Paulo, SP" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">CEP</label>
                  <Input defaultValue="01234-567" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Profissão</label>
                  <Input defaultValue="Desenvolvedora Frontend" />
                </div>
              </div>

              <div className="flex space-x-4">
                <Button>Salvar Alterações</Button>
                <Button variant="outline">Cancelar</Button>
              </div>
            </CardContent>
          </Card>

          {/* Resumo do Perfil */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Status da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Plano Atual</span>
                  <Badge className="bg-yellow-100 text-yellow-800">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Membro desde</span>
                  <span className="text-sm text-gray-600">Jan 2024</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Contas conectadas</span>
                  <span className="text-sm font-medium">4</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Transações este mês</span>
                  <span className="text-sm font-medium">247</span>
                </div>

                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  <Crown className="w-4 h-4 mr-2" />
                  Gerenciar Plano
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conquistas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Primeiro Mês</div>
                    <div className="text-xs text-gray-500">Completou o primeiro mês</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Conta Segura</div>
                    <div className="text-xs text-gray-500">Ativou 2FA</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Multi Contas</div>
                    <div className="text-xs text-gray-500">Conectou 4+ contas</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Estatísticas Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle>Suas Estatísticas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">R$ 45.280</div>
                <div className="text-sm text-gray-600">Total Economizado</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1.247</div>
                <div className="text-sm text-gray-600">Transações Registradas</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">18</div>
                <div className="text-sm text-gray-600">Metas Alcançadas</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">156</div>
                <div className="text-sm text-gray-600">Dias Consecutivos</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preferências de Privacidade */}
        <Card>
          <CardHeader>
            <CardTitle>Privacidade e Dados</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Compartilhar dados para melhorias</div>
                <div className="text-sm text-gray-600">Ajude-nos a melhorar o produto</div>
              </div>
              <input type="checkbox" className="rounded" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Receber dicas personalizadas</div>
                <div className="text-sm text-gray-600">Baseadas no seu perfil financeiro</div>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Permitir análise de gastos</div>
                <div className="text-sm text-gray-600">Para sugestões de economia</div>
              </div>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>

            <div className="pt-4 border-t">
              <Button variant="outline">Baixar Meus Dados</Button>
              <Button variant="destructive" className="ml-2">
                Excluir Conta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
