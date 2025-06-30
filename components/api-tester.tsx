"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Play, CheckCircle, XCircle, Clock, AlertTriangle, Wifi, WifiOff, Server } from "lucide-react"

interface TestResult {
  endpoint: string
  method: string
  status: number
  time: number
  success: boolean
  response: string
  error?: string
}

export default function ApiTester() {
  const [results, setResults] = useState<TestResult[]>([])
  const [loading, setLoading] = useState(false)
  const [customEndpoint, setCustomEndpoint] = useState("/lancamentos")
  const [customMethod, setCustomMethod] = useState("GET")
  const [customBody, setCustomBody] = useState("")
  const [showCustomTest, setShowCustomTest] = useState(false)

  const BASE_URL = "https://92a839f4-ca69-4644-9ece-3f297c376767-00-1k84q7kulkkda.worf.replit.dev"

  const testEndpoint = async (endpoint: string, method = "GET", body?: string): Promise<TestResult> => {
    const startTime = Date.now()

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-perfil": "pessoal",
        },
        signal: controller.signal,
      }

      if (body && method !== "GET") {
        options.body = body
      }

      const response = await fetch(`${BASE_URL}${endpoint}`, options)
      const endTime = Date.now()
      clearTimeout(timeoutId)

      // Ler o corpo da resposta apenas uma vez
      const responseText = await response.text()

      return {
        endpoint,
        method,
        status: response.status,
        time: endTime - startTime,
        success: response.ok,
        response: responseText,
      }
    } catch (error) {
      const endTime = Date.now()
      return {
        endpoint,
        method,
        status: 0,
        time: endTime - startTime,
        success: false,
        response: "",
        error: error instanceof Error ? error.message : "Erro desconhecido",
      }
    }
  }

  const testAllEndpoints = async () => {
    setLoading(true)
    setResults([])

    const endpoints = [
      { path: "/", method: "GET" },
      { path: "/lancamentos", method: "GET" },
      {
        path: "/lancamentos",
        method: "POST",
        body: JSON.stringify({
          valor: 100,
          categoria: "Teste",
          tipo: "despesa",
          perfil: "pessoal",
          descricao: "Teste da API",
          data: new Date().toISOString().split("T")[0],
        }),
      },
    ]

    const testResults: TestResult[] = []

    for (const endpoint of endpoints) {
      console.log(`🧪 Testando ${endpoint.method} ${endpoint.path}`)
      const result = await testEndpoint(endpoint.path, endpoint.method, endpoint.body)
      testResults.push(result)
      setResults([...testResults])

      // Pequena pausa entre testes
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    setLoading(false)
  }

  const testCustomEndpoint = async () => {
    setLoading(true)
    const result = await testEndpoint(customEndpoint, customMethod, customBody || undefined)
    setResults([result, ...results])
    setLoading(false)
  }

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "text-green-600 bg-green-50"
    if (status >= 400 && status < 500) return "text-red-600 bg-red-50"
    if (status >= 500) return "text-purple-600 bg-purple-50"
    return "text-gray-600 bg-gray-50"
  }

  const getStatusIcon = (success: boolean, status: number) => {
    if (success) return <CheckCircle className="w-4 h-4 text-green-500" />
    if (status === 0) return <XCircle className="w-4 h-4 text-red-500" />
    return <AlertTriangle className="w-4 h-4 text-yellow-500" />
  }

  const successCount = results.filter((r) => r.success).length
  const errorCount = results.filter((r) => !r.success).length
  const avgTime = results.length > 0 ? Math.round(results.reduce((acc, r) => acc + r.time, 0) / results.length) : 0

  const allFailed = results.length > 0 && errorCount === results.length
  const hasConnectionErrors = results.some((r) => r.error?.includes("fetch"))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">Testador de API</h2>
            <p className="text-gray-600">Verificar conectividade e funcionalidade dos endpoints</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button onClick={() => setShowCustomTest(!showCustomTest)} variant="outline">
            Teste Customizado
          </Button>
          <Button onClick={testAllEndpoints} disabled={loading}>
            {loading ? <Clock className="w-4 h-4 mr-2 animate-spin" /> : <Play className="w-4 h-4 mr-2" />}
            Testar Todos
          </Button>
        </div>
      </div>

      {/* Status da API */}
      <Card
        className={allFailed ? "border-red-200 bg-red-50" : hasConnectionErrors ? "border-yellow-200 bg-yellow-50" : ""}
      >
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {allFailed ? (
              <WifiOff className="w-5 h-5 text-red-500" />
            ) : hasConnectionErrors ? (
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            ) : (
              <Wifi className="w-5 h-5 text-green-500" />
            )}
            <span>Status da API Externa</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">URL Base:</span>
              <code className="text-xs bg-gray-100 px-2 py-1 rounded">{BASE_URL}</code>
            </div>

            {allFailed && (
              <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2 text-red-700">
                  <Server className="w-4 h-4" />
                  <span className="font-medium">API Externa Indisponível</span>
                </div>
                <p className="text-sm text-red-600 mt-1">
                  O servidor externo não está respondendo. Isso é normal em desenvolvimento.
                </p>
                <div className="mt-2 text-xs text-red-500">
                  <strong>Soluções:</strong>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>
                      Criar endpoints locais em <code>/api/</code>
                    </li>
                    <li>Usar dados simulados (já implementado)</li>
                    <li>Configurar um servidor de desenvolvimento</li>
                  </ul>
                </div>
              </div>
            )}

            {hasConnectionErrors && !allFailed && (
              <div className="p-3 bg-yellow-100 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2 text-yellow-700">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-medium">Conectividade Instável</span>
                </div>
                <p className="text-sm text-yellow-600 mt-1">
                  Alguns endpoints estão falhando. Verifique a conexão de rede.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Estatísticas */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{successCount}</div>
                  <div className="text-sm text-gray-600">Sucessos</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <div>
                  <div className="text-2xl font-bold text-red-600">{errorCount}</div>
                  <div className="text-sm text-gray-600">Erros</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{avgTime}ms</div>
                  <div className="text-sm text-gray-600">Tempo Médio</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Teste Customizado */}
      {showCustomTest && (
        <Card>
          <CardHeader>
            <CardTitle>Teste Customizado</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="method">Método HTTP</Label>
                <Select value={customMethod} onValueChange={setCustomMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET">GET</SelectItem>
                    <SelectItem value="POST">POST</SelectItem>
                    <SelectItem value="PUT">PUT</SelectItem>
                    <SelectItem value="DELETE">DELETE</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="endpoint">Endpoint</Label>
                <Input
                  id="endpoint"
                  value={customEndpoint}
                  onChange={(e) => setCustomEndpoint(e.target.value)}
                  placeholder="/lancamentos"
                />
              </div>
            </div>

            {customMethod !== "GET" && (
              <div className="space-y-2">
                <Label htmlFor="body">Body (JSON)</Label>
                <Textarea
                  id="body"
                  value={customBody}
                  onChange={(e) => setCustomBody(e.target.value)}
                  placeholder='{"valor": 100, "categoria": "Teste"}'
                  rows={4}
                />
              </div>
            )}

            <Button onClick={testCustomEndpoint} disabled={loading}>
              Executar Teste
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Resultados */}
      <Card>
        <CardHeader>
          <CardTitle>Resultados dos Testes</CardTitle>
        </CardHeader>
        <CardContent>
          {results.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum teste executado ainda. Clique em "Testar Todos" para começar.
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(result.success, result.status)}
                      <Badge variant="outline" className="font-mono">
                        {result.method}
                      </Badge>
                      <span className="font-medium">{result.endpoint}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">{result.time}ms</span>
                      <Badge className={getStatusColor(result.status)}>{result.status || "Erro de Conexão"}</Badge>
                    </div>
                  </div>

                  {result.error && (
                    <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                      <strong>Erro:</strong> {result.error}
                    </div>
                  )}

                  {result.response && (
                    <div className="mt-2">
                      <Label className="text-xs text-gray-500">Resposta:</Label>
                      <pre className="mt-1 p-2 bg-gray-50 border rounded text-xs overflow-x-auto max-h-32">
                        {result.response.length > 500 ? result.response.substring(0, 500) + "..." : result.response}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Guia de Desenvolvimento */}
      <Card>
        <CardHeader>
          <CardTitle>Próximos Passos para Desenvolvimento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">🚀 Criar API Local</h4>
              <p className="text-sm text-blue-700 mb-2">
                Como a API externa não está disponível, você pode criar endpoints locais:
              </p>
              <div className="space-y-2 text-sm">
                <div className="font-mono bg-white p-2 rounded border">
                  <div className="text-gray-600">// app/api/lancamentos/route.ts</div>
                  <div className="text-blue-600">export async function GET() {`{`}</div>
                  <div className="text-blue-600 ml-2">return Response.json([...dados])</div>
                  <div className="text-blue-600">{`}`}</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-green-600">✅ Funcionando (Simulado)</h4>
                <ul className="text-sm space-y-1">
                  <li>• Dados simulados carregando</li>
                  <li>• Interface responsiva</li>
                  <li>• Troca de perfis</li>
                  <li>• Modal de lançamentos</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-orange-600">🔧 Para Implementar</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    • <code>GET /api/lancamentos</code>
                  </li>
                  <li>
                    • <code>POST /api/lancamentos</code>
                  </li>
                  <li>
                    • <code>GET /api/categorias</code>
                  </li>
                  <li>
                    • <code>GET /api/grupos</code>
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3 bg-green-50 border border-green-200 rounded">
              <h5 className="font-medium text-green-800 mb-2">💡 Dica de Desenvolvimento</h5>
              <p className="text-sm text-green-700">
                O sistema já está preparado para funcionar com dados reais. Quando você implementar os endpoints locais,
                a aplicação automaticamente detectará e usará os dados da API em vez dos simulados.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
