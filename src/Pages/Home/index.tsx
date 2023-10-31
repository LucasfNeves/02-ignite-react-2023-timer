import { Play } from 'phosphor-react'
import {
  CountDownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  newCycleFormData,
  newCycloFormValidationSchema,
} from '../../schemas/form'

export function Home() {
  const { handleSubmit, register, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycloFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleCreatNewCycle(data: newCycleFormData) {
    console.log(data)
    reset()
  }

  const task = watch('task')
  const minutesAmount = watch('minutesAmount')

  // Variável auxiliar, não impacta na leitura, mas melhora a legibilidade
  const isSubmitDisabled = !(task && minutesAmount)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreatNewCycle)} action="">
        <FormContainer>
          <label htmlFor="task"> Vou Trabalhar em </label>
          <TaskInput
            placeholder="De um nome para o seu projeto"
            id="task"
            type="text"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1">Projeto 1</option>
          </datalist>

          <label htmlFor="minutesAmount">Durante</label>
          <MinutesAmountInput
            placeholder="00"
            type="number"
            id="minutesAmount"
            step={5}
            // min={5}
            // max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>Minutos</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
