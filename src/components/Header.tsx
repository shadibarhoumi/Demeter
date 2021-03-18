import { Button, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useRouter } from 'next/router'
import { auth } from '../firebase'

const SignOutButton = () => {
  return (
    auth.currentUser && (
      <Button onClick={() => auth.signOut()} colorScheme="teal" size="sm" variant="outline">
        Log Out
      </Button>
    )
  )
}

export default function Header(): React.ReactElement {
  const [user] = useAuthState(auth)
  const router = useRouter()
  React.useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user])

  return (
    <Flex
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      style={{ padding: '15px 20px 8px 20px' }}
    >
      <Text fontSize="large" style={{ alignSelf: 'flex-start' }}>
        ❤️ StickyTime
      </Text>
      <Flex alignItems="flex-end">
        <Flex width="220px" justifyContent="space-between">
          <SignOutButton />
          <Text style={{ lineHeight: '2em' }}>{user?.displayName}</Text>
        </Flex>
      </Flex>
    </Flex>
  )
}
