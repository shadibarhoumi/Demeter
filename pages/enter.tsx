import { firestore, auth, googleAuthProvider } from '@lib/firebase'
import toast from 'react-hot-toast'
import React, { useContext, useEffect, useState, useCallback } from 'react'
import { UserContext } from '@lib/context'
import { Button } from '@chakra-ui/react'
import debounce from 'lodash.debounce'

export default function EnterPage() {
  const { user, username } = useContext(UserContext)

  return <main>{user ? !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />}</main>
}

const SignInButton = () => {
  const signInWithGoogle = async () => {
    try {
      await auth.signInWithPopup(googleAuthProvider)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error('An error occurred: ' + error.message)
      }
    }
  }

  return (
    <button onClick={signInWithGoogle}>
      <img src={'/google.png'} alt="Google Logo" /> Sign in with Google
    </button>
  )
}

const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>Sign Out</button>
}

const UsernameForm = () => {
  const [formValue, setFormValue] = useState('')
  const [isValid, setIsValid] = useState(false)
  const [loading, setIsLoading] = useState(false)

  const { user, username } = React.useContext(UserContext)

  useEffect(() => {
    checkUsername(formValue)
  }, [formValue])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase()
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/

    // only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val)
      setIsLoading(false)
      setIsValid(false)
    }

    if (re.test(val)) {
      setFormValue(val)
      setIsLoading(true)
      setIsValid(false)
    }
  }

  // prevent creation of a new, debounced function at every render (which would result in non-debounced behavior)
  const checkUsername = useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`)
        const { exists } = await ref.get()
        console.log('Firestore read executed!')
        setIsValid(!exists)
        setIsLoading(false)
      }
    }, 500),
    [],
  )

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Create refs for both documents
      const userDoc = firestore.doc(`/users/${user?.uid}`)
      const usernameDoc = firestore.doc(`usernames/${formValue}`)
      // Commit both docs together as a batch write.
      const batch = firestore.batch()
      batch.set(userDoc, {
        username: formValue,
        photoURL: user?.photoURL,
        displayName: user?.displayName,
      })
      batch.set(usernameDoc, { uid: user?.uid })
      await batch.commit()
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error('An error occurred: ' + err.message)
      } else {
        console.error(err)
      }
    }
  }

  return !username ? (
    <section>
      <h3>Choose Username</h3>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="username" value={formValue} onChange={onChange} />
        <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
        <Button type="submit" disabled={!isValid}>
          Choose
        </Button>

        <h3>Debug State</h3>
        <div>
          Username: {formValue}
          <br />
          Loading: {loading.toString()}
          <br />
          Username Valid: {isValid.toString()}
        </div>
      </form>
    </section>
  ) : null
}

const UsernameMessage = ({ username, isValid, loading }: { username: string; isValid: boolean; loading: boolean }) => {
  if (loading) {
    return <p>Checking...</p>
  } else if (isValid) {
    return <p>{username} is available! </p>
  } else if (username && !isValid) {
    return <p>That username is taken!</p>
  } else {
    return <p></p>
  }
}
