import { FormContainer, TaskInput, MinutesAmountInput } from './styles'
import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CyclesContext } from '../../../../contexts/CyclesContext'
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
          step={5}
          disabled={!!activeCycle}
          {...register('minutesAmount', { valueAsNumber: true })}
        />

        <span>Minutos</span>
      </FormContainer>
    </>
  )
}
