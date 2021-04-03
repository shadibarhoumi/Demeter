import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { auth } from '@lib/firebase'
import { useRouter } from 'next/router'
import { useUserData } from '@lib/hooks'
import React, { useState } from 'react'
import Link from 'next/link'

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
        variant="link"
      >
        Log Out
      </Button>
    )
  )
}

export const Navbar: React.FC = () => {
  const { user, username } = useUserData()
  const [menuShowing, setMenuShowing] = useState<boolean>(false)

  return (
    <Flex flexDirection="row" alignItems="center" position="relative" padding="20px 30px">
      <img
        src="saturn.png"
        alt="User Photo"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          marginRight: '10px',
          userSelect: 'none',
        }}
      />
      <Text
        fontSize="30px"
        fontFamily="Bebas Neue"
        marginTop="5px"
        letterSpacing="4px"
        fontWeight="bold"
        fontStyle="italic"
        color="hsl(0deg 0% 30%)"
      >
        SpaceTime
      </Text>
      {user && (
        <Flex
          style={{
            marginLeft: 'auto',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'background-color 200ms',
          }}
          _hover={{
            backgroundColor: 'lightgrey',
          }}
        >
          {/* <SignOutButton /> */}
          <img
            src={user.photoURL!}
            alt="User Photo"
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              marginRight: '15px',
              userSelect: 'none',
            }}
          />
          <Box position="relative" onClick={() => setMenuShowing(!menuShowing)}>
            <Text fontSize="lg" userSelect="none">
              {user.displayName}
            </Text>
            <Text fontSize="md" color="grey" userSelect="none">
              @{username}
            </Text>
            <Box display={menuShowing ? 'inherit' : 'none'} position="absolute">
              <ul>
                <li>
                  <Link href={`/profile/${username}`}>View Profile</Link>
                </li>
                <li>
                  <SignOutButton />
                </li>
              </ul>
            </Box>
          </Box>
        </Flex>
      )}
    </Flex>
  )
}
