import Link from 'next/link'
import { useUserData } from '@lib/hooks'

type Props = {
  fallback?: JSX.Element
}

// Component's children only shown to logged-in users
export const AuthCheck: React.FC<Props> = ({ children, fallback }) => {
  const { user } = useUserData()
  return user ? <>{children}</> : fallback || <Link href="/login">You must be signed in</Link>
}
