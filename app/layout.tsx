import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { PerfilProvider } from "@/contexts/perfil-context"
import { Toaster } from "@/components/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Anatomia Financeira",
  description: "Sistema de gestão financeira pessoal e profissional",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <PerfilProvider>
          {children}
          <Toaster />
        </PerfilProvider>
      </body>
    </html>
  )
}
