import { createContext } from 'react'
import type firebase from 'firebase/app'

type UserData = {
  user: firebase.User | null | undefined
  username: string | null
}

export const UserContext = createContext<UserData>({ user: null, username: null })
