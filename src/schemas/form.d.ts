import * as zod from 'zod'

export const newCycloFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .step(1)
    .min(1, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

export type newCycleFormData = zod.infer<typeof newCycloFormValidationSchema>
