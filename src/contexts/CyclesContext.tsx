import { createContext, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
  creatNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycled: () => void
}

interface CyclesContextProviderProps {
  children: React.ReactNode
}

export const CyclesContext = createContext({} as CyclesContextType)

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  // Estado dos ciclos
  const [cycles, setCycles] = useState<Cycle[]>([])

  // Estado do ID do ciclo ativo
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  // Encontra o ciclo ativo com base no ID do ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  /**
   * Manipula a criação de um novo ciclo.
   * @param {object} data - Os dados para o novo ciclo.
   * @param {string} data.task - A tarefa para o novo ciclo.
   * @param {number} data.minutesAmount - A quantidade de minutos para o novo ciclo.
   */
  function creatNewCycle(data: CreateCycleData) {
    // Cria um id único baseado no tempo e data atual
    const id = String(new Date().getTime())

    const newCycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }
    /**
     * Define o estado dos ciclos adicionando o novo ciclo ao estado existente.
     * @param {array} state - O estado atual dos ciclos.
     * @returns {array} - O estado atualizado dos ciclos.
     */
    setCycles((state) => [...state, newCycle])

    // Define o id do ciclo ativo para o id recém-criado
    setActiveCycleId(id)

    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycled() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
    setActiveCycleId(null)
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        interruptCurrentCycled,
        creatNewCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
