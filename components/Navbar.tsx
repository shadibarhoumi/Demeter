import { Button, Flex, Text } from '@chakra-ui/react'
import { auth } from '@lib/firebase'
import { useRouter } from 'next/router'
import { useUserData } from '@lib/hooks'

const SignOutButton = () => {
  const router = useRouter()
  return (
    auth.currentUser && (
      <Button
        onClick={() => {
          auth.signOut()
          router.push('/')
        }}
        colorScheme="teal"
        size="sm"
        variant="outline"
      >
        Log Out
      </Button>
    )
  )
}

export const Navbar: React.FC = () => {
  const { user, username } = useUserData()

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
      {user && (
        <Flex alignItems="flex-end">
          <Flex width="220px" justifyContent="space-between">
            <SignOutButton />
            <Text style={{ lineHeight: '2em' }}>{user.displayName}</Text>
            <Text style={{ lineHeight: '2em' }}>{username}</Text>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}
