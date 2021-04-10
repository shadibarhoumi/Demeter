import { useRouter } from 'next/router'

export default function ProfilePage({}) {
  const router = useRouter()
  const { username } = router.query

  return <main>{username}</main>
}
