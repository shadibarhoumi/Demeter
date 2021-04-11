import React, { useState } from 'react'
import styled from 'styled-components'

const OptionDiv = styled.div`
  padding-left: 5px;

  &:hover {
    background-color: lightgray;
  }
`

const Option = ({
  option,
  matchIndices,
  onSelect,
}: {
  option: string
  matchIndices: number[]
  onSelect: () => void
}) => {
  let part = ''
  let curInd = 0
  let toRender: JSX.Element[] = []
  for (let i = 0; i < option.length; i++) {
    if (i !== matchIndices[curInd]) {
      part += option[i]
    } else {
      if (part) toRender.push(<span key={i - 1}>{part}</span>)
      toRender.push(
        <span key={i} style={{ fontWeight: 'bold' }}>
          {option[i]}
        </span>,
      )
      part = ''
      curInd++
    }
  }
  if (part) toRender.push(<span key={option.length}>{part}</span>)
  return (
    <OptionDiv key={option} onMouseDown={onSelect}>
      {toRender}
    </OptionDiv>
  )
}

const matchStrings = (prefix: string, candidate: string) => {
  let j = 0 // index into candidate string
  let matchIndices = []
  for (let i = 0; i < prefix.length; i++) {
    while (candidate[j] !== prefix[i]) {
      j++
      if (j >= candidate.length) {
        return { isMatch: false, matchIndices }
      }
    }
    matchIndices.push(j)
    j++
  }
  return { isMatch: true, matchIndices }
}

const OptionsList = ({
  options,
  input,
  handleSelect,
}: {
  options: string[]
  input: string
  handleSelect: (option: string) => void
}) => {
  let matches = options.map((option) => matchStrings(input, option))
  const matchingOptions = options.filter((_, i) => matches[i].isMatch)
  matches = matches.filter((match) => match.isMatch)
  if (!matchingOptions.length) return null

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
      {matchingOptions.map((option, i) => (
        <Option
          key={option}
          option={option}
          matchIndices={matches[i].matchIndices}
          onSelect={() => handleSelect(option)}
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
  const [isFocused, setIsFocused] = useState(false)
  const [selected, setSelected] = useState('')
  const displayDropdown = isFocused && selected.length > 1

  return (
    <>
      <input
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{ borderBottom: '1px solid red', padding: '5px' }}
        value={selected}
        onChange={(e: React.FormEvent<HTMLInputElement>) => setSelected(e.currentTarget.value)}
      />
      {displayDropdown && <OptionsList input={selected} options={options} handleSelect={setSelected} />}
    </>
  )
}
