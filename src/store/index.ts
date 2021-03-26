import { timerInitialState } from './../features/timer/timerSlice'
import { combineReducers, createStore } from 'redux'
import timerReducer from '@d/features/timer/timerSlice'
import { configureStore, EnhancedStore } from '@reduxjs/toolkit'
import { useMemo } from 'react'

let store: EnhancedStore<RootState> | null

const rootReducer = combineReducers({
  timer: timerReducer,
})
export type RootState = ReturnType<typeof rootReducer>

const initialState = {
  timer: timerInitialState,
}

const initStore = (preloadedState = initialState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  })
}

export const initializeStore = (preloadedState: RootState) => {
  let _store = store ?? initStore(preloadedState)

  // after navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    })
    store = null
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // create the store once in the client
  if (!store) store = _store

  return _store
}

export const useStore = (initialReduxState: RootState = initialState) => {
  const store = useMemo(() => initializeStore(initialReduxState), [initialReduxState])
  return store
}
