"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, Plus, Edit2, Trash2 } from "lucide-react"

export function GoalsSection() {
  const [goals, setGoals] = useState([
    {
      id: 1,
      name: "Reserva de Emergência",
      current: 12580,
      target: 50000,
      category: "Segurança",
    },
    {
      id: 2,
      name: "Viagem Europa",
      current: 3200,
      target: 15000,
      category: "Lazer",
    },
    {
      id: 3,
      name: "Carro Novo",
      current: 8500,
      target: 45000,
      category: "Transporte",
    },
  ])

  const addGoal = () => {
    const newGoal = {
      id: goals.length + 1,
      name: "Nova Meta",
      current: 0,
      target: 10000,
      category: "Geral",
    }
    setGoals([...goals, newGoal])
  }

  const removeGoal = (id: number) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Metas Financeiras</span>
          </CardTitle>
          <Button variant="outline" size="sm" onClick={addGoal}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Meta
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {goals.map((goal) => {
            const progress = (goal.current / goal.target) * 100
            const remaining = goal.target - goal.current

            return (
              <div key={goal.id} className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{goal.name}</h4>
                    <p className="text-sm text-gray-600">{goal.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => removeGoal(goal.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progresso: {progress.toFixed(1)}%</span>
                    <span>
                      R$ {goal.current.toLocaleString("pt-BR")} / R$ {goal.target.toLocaleString("pt-BR")}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="text-sm text-gray-600">
                    Faltam R$ {remaining.toLocaleString("pt-BR")} para atingir a meta
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
