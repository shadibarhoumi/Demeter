import Link from 'next/link'
import { useContext } from 'react'
import { UserContext } from '@lib/context'

type Props = {
  fallback?: JSX.Element
}

// Component's children only shown to logged-in users
export const AuthCheck: React.FC<Props> = ({ children, fallback }) => {
  const { user } = useContext(UserContext)
  return user ? <>{children}</> : fallback || <Link href="/login">You must be signed in</Link>
}
