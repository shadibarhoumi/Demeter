import { findMatches, Match } from '@lib/util'
import React, { useRef, useState } from 'react'
import styled from 'styled-components'

interface OptionItemProps {
  selected: boolean
}

const OptionItem = styled.div<OptionItemProps>`
  padding-left: 5px;
  background-color: ${({ selected }) => (selected ? 'lightgray' : 'white')};

  &:hover {
    background-color: lightgray;
  }
`

const Option = ({
  text,
  matchIndices,
  handleSelect,
  selected,
}: {
  text: string
  matchIndices: number[]
  handleSelect: (option: string) => void
  selected: boolean
}) => {
  let part = ''
  let curInd = 0
  let toRender: JSX.Element[] = []
  for (let i = 0; i < text.length; i++) {
    if (i !== matchIndices[curInd]) {
      part += text[i]
      if (part && i == text.length - 1) toRender.push(<span key={text}>{part}</span>)
    } else {
      if (part) toRender.push(<span key={i - 1}>{part}</span>)
      toRender.push(
        <span key={i} style={{ fontWeight: 'bold' }}>
          {text[i]}
        </span>,
      )
      part = ''
      curInd++
    }
  }
  return (
    <OptionItem selected={selected} key={text} onMouseDown={() => handleSelect(text)}>
      {toRender}
    </OptionItem>
  )
}

const OptionsList = ({
  matches,
  selectedIndex,
  handleSelect,
}: {
  matches: Match[]
  selectedIndex: number
  handleSelect: (option: string) => void
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        width: '200px',
        border: 'solid 1px black',
        zIndex: 99,
      }}
    >
      {matches.map(({ text, matchIndices }, i) => (
        <Option
          key={text}
          text={text}
          handleSelect={handleSelect}
          selected={selectedIndex === i}
          matchIndices={matchIndices}
        />
      ))}
    </div>
  )
}

export const Autocomplete: React.FC = () => {
  const options = [
    'wuyan',
    'shadi',
    'samuel',
    'shaker',
    'shannon',
    'shearer',
    'wuming',
    'wooyan',
    'jim',
    'bob',
    'rachel',
  ]
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [input, setInput] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const matches = findMatches(input, options)
  const displayDropdown = isFocused && input.length > 1 && matches.length > 0

  return (
    <>
      <input
        ref={inputRef}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false)
          setSelectedIndex(0)
        }}
        style={{ borderBottom: '1px solid red', padding: '5px' }}
        value={input}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setSelectedIndex((selectedIndex) => (selectedIndex === matches.length - 1 ? 0 : selectedIndex + 1))
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setSelectedIndex((selectedIndex) => (selectedIndex === 0 ? matches.length - 1 : selectedIndex - 1))
          } else if (e.key === 'Enter') {
            if (matches.length > 0) {
              setInput(matches[selectedIndex].text)
            }
            inputRef.current?.blur()
          }
        }}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setInput(e.currentTarget.value)}
      />
      {displayDropdown && (
        <OptionsList
          matches={matches}
          selectedIndex={selectedIndex}
          handleSelect={(option: string) => setInput(option)}
        />
      )}
    </>
  )
}
