"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simular autenticação
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Credenciais de teste
      const validCredentials = [
        { email: "admin@anatomia.com", password: "admin123", role: "admin" },
        { email: "user@anatomia.com", password: "user123", role: "user" },
      ]

      const user = validCredentials.find((cred) => cred.email === formData.email && cred.password === formData.password)

      if (user) {
        // Salvar token e dados do usuário
        localStorage.setItem("token", `fake-jwt-token-${user.role}`)
        localStorage.setItem("user", JSON.stringify(user))

        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo, ${user.role === "admin" ? "Administrador" : "Usuário"}!`,
        })

        // Redirecionar baseado no papel
        if (user.role === "admin") {
          router.push("/dashboard")
        } else {
          router.push("/")
        }
      } else {
        toast({
          title: "Erro no login",
          description: "Email ou senha incorretos.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Erro no login",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Cadastro realizado!",
        description: "Sua conta foi criada com sucesso. Faça login para continuar.",
      })
    } catch (error) {
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: "#2A3829" }}>
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-12">
        <div className="w-96 h-24 mb-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Untitled%20design%20%281%29-mQeiJYZNNgcdc4Zd6I5c7Rwh3pPF9L.png"
            alt="Anatomia Financeira"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Login/Register Form */}
      <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/10">
            <TabsTrigger value="login" className="text-white data-[state=active]:bg-white/20">
              Entrar
            </TabsTrigger>
            <TabsTrigger value="register" className="text-white data-[state=active]:bg-white/20">
              Cadastrar
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-light text-white">Bem-vindo de volta</CardTitle>
              <CardDescription className="text-white/70">
                Entre com suas credenciais para acessar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white/90">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                      className="border-white/20 data-[state=checked]:bg-white/20"
                    />
                    <Label htmlFor="remember" className="text-sm text-white/70">
                      Lembrar de mim
                    </Label>
                  </div>
                  <Button variant="link" className="text-white/70 hover:text-white p-0 h-auto">
                    Esqueceu a senha?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-green-800 hover:bg-white/90 h-12 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </>
                  ) : (
                    "Entrar"
                  )}
                </Button>
              </form>

              {/* Credenciais de teste */}
              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-xs text-white/60 mb-2">Credenciais de teste:</p>
                <div className="text-xs text-white/80 space-y-1">
                  <div>Admin: admin@anatomia.com / admin123</div>
                  <div>User: user@anatomia.com / user123</div>
                </div>
              </div>
            </CardContent>
          </TabsContent>

          <TabsContent value="register">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-light text-white">Criar conta</CardTitle>
              <CardDescription className="text-white/70">Preencha os dados para criar sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white/90">
                    Nome completo
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-white/90">
                    Email
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-white/90">
                    Senha
                  </Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Crie uma senha"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 text-white/70 hover:text-white hover:bg-white/10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-green-800 hover:bg-white/90 h-12 font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Criando conta...
                    </>
                  ) : (
                    "Criar conta"
                  )}
                </Button>
              </form>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
