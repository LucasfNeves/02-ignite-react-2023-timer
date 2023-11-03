import { useContext, useEffect } from 'react'
import { CountDownContainer, Separator } from './styles'
import { differenceInSeconds } from 'date-fns'
import { CyclesContext } from '../../../../contexts/CyclesContext'

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext)
  // Estado da quantidade de segundos passados
  // Calcula o total de segundos com base na duração do ciclo ativo
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )
        if (secondsDiference >= totalSeconds) {
          markCurrentCycleAsFinished()
          setSecondsPassed(totalSeconds)
          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDiference)
        }
      }, 1000)
    }
    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    activeCycleId,
    totalSeconds,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ])

  // Calcula os segundos restantes do ciclo ativo
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  // Calcula os minutos a partir dos segundos restantes
  const minutesInTotalSeconds = Math.floor(currentSeconds / 60)

  // Calcula a quantidade de segundos
  const secondsAmount = currentSeconds % 60

  // Converte os minutos para string e adiciona um zero à esquerda se necessário
  const minutes = String(minutesInTotalSeconds).padStart(2, '0')

  // Converte os segundos para string e adiciona um zero à esquerda se necessário
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
