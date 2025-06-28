"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

type Props = {
  children: React.ReactNode
}

export default function ProtecaoSessao({ children }: Props) {
  const [loading, setLoading] = useState(true)
  const [logado, setLogado] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      setLogado(true)
    } else {
      router.push("/login")
    }

    setLoading(false)
  }, [router])

  if (loading) return <div>Carregando...</div>

  return <>{logado ? children : null}</>
}
