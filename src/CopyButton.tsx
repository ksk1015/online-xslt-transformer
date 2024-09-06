import { useState, useRef } from 'react'

type Props = {
  copy: string
  text?: string
}
export function CopyButton({ copy, text = 'copy' }: Props) {
  const [stateText, setStateText] = useState(text)
  const timerRef = useRef<number>()
  const onClick = () => {
    navigator.clipboard.writeText(copy).then(
      () => {
        setStateText('😀')
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setStateText(text), 1000)
      },
      () => {
        setStateText('💩')
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setStateText(text), 1000)
      }
    )
  }
  return (
    <button style={{ width: '4em' }} onClick={onClick}>
      {stateText}
    </button>
  )
}
