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
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/CountDown'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useContext } from 'react'
import { CyclesContext } from '../../contexts/CyclesContext'

export function Home() {
  const { creatNewCycle, interruptCurrentCycled, activeCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycloFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreatNewCycle(data: newCycleFormData) {
    creatNewCycle(data)
    reset()
  }

  // Assite o valor do campo "task" do formulário
  const task = watch('task')

  // Assite o valor do campo "minutesAmount" do formulário
  const minutesAmount = watch('minutesAmount')

  // Variável auxiliar, não impacta na leitura, mas melhora a legibilidade
  const isSubmitDisabled = !(task && minutesAmount)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreatNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />
        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycled} type="button">
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
  )
}
