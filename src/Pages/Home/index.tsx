import { HandPalm, Play } from 'phosphor-react'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'
import {
  newCycleFormData,
  newCycloFormValidationSchema,
} from './../../schemas/form.d'
import { createContext, useState } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/CountDown'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextType {
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  markCurrentCycleAsFinished: () => void
  amountSecondsPassed: number
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextType)

export function Home() {
  // Estado dos ciclos
  const [cycles, setCycles] = useState<Cycle[]>([])

  // Estado do ID do ciclo ativo
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycloFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  // Encontra o ciclo ativo com base no ID do ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
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

  /**
   * Manipula a criação de um novo ciclo.
   * @param {object} data - Os dados para o novo ciclo.
   * @param {string} data.task - A tarefa para o novo ciclo.
   * @param {number} data.minutesAmount - A quantidade de minutos para o novo ciclo.
   */
  function handleCreatNewCycle(data: newCycleFormData) {
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

    // Reseta o formulário
    reset()
  }

  function handleInterruptCycled() {
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

  // Assite o valor do campo "task" do formulário
  const task = watch('task')

  // Assite o valor do campo "minutesAmount" do formulário
  const minutesAmount = watch('minutesAmount')

  // Variável auxiliar, não impacta na leitura, mas melhora a legibilidade
  const isSubmitDisabled = !(task && minutesAmount)

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
      }}
    >
      <HomeContainer>
        <form onSubmit={handleSubmit(handleCreatNewCycle)}>
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
          {activeCycle ? (
            <StopCountdownButton onClick={handleInterruptCycled} type="button">
              <HandPalm size={24} />
              Interromper
            </StopCountdownButton>
          ) : (
            <StartCountdownButton disabled={isSubmitDisabled} type="submit">
              <Play size={24} />
              Começar
            </StartCountdownButton>
          )}
        </form>
      </HomeContainer>
    </CyclesContext.Provider>
  )
}
