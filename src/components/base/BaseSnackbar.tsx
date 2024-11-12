import { useEffect, useState } from 'react'
const MESSAGE_DURATION_MS = 1000 * 4 // 4 seconds
export enum SNACKBAR_MESSAGE_TYPE {
  INFO = 'info',
  ERROR = 'error',
  SUCCESS = 'success',
}
export function BaseSnackbar({
  message,
  level,
}: {
  message: string
  level?: string
}) {
  const [_message, setMessage] = useState<string | null>(message)
  useEffect(() => {
    setTimeout(() => {
      setMessage(null)
    }, MESSAGE_DURATION_MS)
    setMessage(message)
  }, [message])
  return (
    <>
      {_message && (
        <div className={['base-snackbar', level || 'Info'].join(' ')}>
          {message}
        </div>
      )}
    </>
  )
}
