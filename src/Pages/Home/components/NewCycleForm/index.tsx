import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { useContext } from 'react'
import { CyclesContext } from '../..'
import { useFormContext } from 'react-hook-form'
export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register } = useFormContext()

  return (
    <>
      <FormContainer>
        <label htmlFor="task"> Vou Trabalhar em </label>
        <TaskInput
          placeholder="De um nome para o seu projeto"
          id="task"
          type="text"
          list="task-suggestions"
          disabled={!!activeCycle}
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
          step={1}
          disabled={!!activeCycle}
          min={1}
          max={60}
          {...register('minutesAmount', { valueAsNumber: true })}
        />

        <span>Minutos</span>
      </FormContainer>
    </>
  )
}
