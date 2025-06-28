"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simular autenticação
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email === "admin@anatomia.com" && password === "admin123") {
        localStorage.setItem("token", "fake-jwt-token")
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: 1,
            name: "Administrador",
            email: "admin@anatomia.com",
            role: "admin",
          }),
        )
        router.push("/dashboard")
      } else if (email === "user@anatomia.com" && password === "user123") {
        localStorage.setItem("token", "fake-jwt-token")
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: 2,
            name: "Usuário",
            email: "user@anatomia.com",
            role: "user",
          }),
        )
        router.push("/")
      } else {
        setError("Email ou senha incorretos")
      }
    } catch {
      setError("Erro ao fazer login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Input */}
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full h-12 px-4 bg-green-700/30 border border-green-600/50 rounded-lg text-white placeholder:text-green-200/70 focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:bg-green-700/40 transition-all"
        />
      </div>

      {/* Password Input */}
      <div className="space-y-2 relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full h-12 px-4 pr-12 bg-green-700/30 border border-green-600/50 rounded-lg text-white placeholder:text-green-200/70 focus:border-green-400 focus:ring-1 focus:ring-green-400 focus:bg-green-700/40 transition-all"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-green-200/70 hover:text-green-200 transition-colors"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="text-red-300 text-sm text-center bg-red-900/20 border border-red-700/50 rounded-lg p-3">
          {error}
        </div>
      )}

      {/* Remember Me */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center text-green-200/80">
          <input
            type="checkbox"
            className="mr-2 rounded border-green-600/50 bg-green-700/30 text-green-400 focus:ring-green-400"
          />
          Lembrar de mim
        </label>
        <button type="button" className="text-green-200/80 hover:text-green-200 transition-colors">
          Esqueceu a senha?
        </button>
      </div>

      {/* Login Button */}
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 bg-white text-green-800 font-medium rounded-lg hover:bg-green-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Entrando..." : "Entrar"}
      </Button>

      {/* Test Credentials */}
      <div className="mt-8 p-4 bg-green-800/30 border border-green-600/30 rounded-lg">
        <p className="text-green-200/80 text-xs text-center mb-2">Credenciais de teste:</p>
        <div className="space-y-1 text-xs text-green-200/60 text-center">
          <p>
            <span className="font-medium">Admin:</span> admin@anatomia.com / admin123
          </p>
          <p>
            <span className="font-medium">Usuário:</span> user@anatomia.com / user123
          </p>
        </div>
      </div>
    </form>
  )
}
