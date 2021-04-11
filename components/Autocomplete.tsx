import { CheckBoxOutlineBlankRounded } from '@material-ui/icons'
import React, { useState } from 'react'
import styled from 'styled-components'

const Option = styled.div`
  padding-left: 5px;

  &:hover {
    background-color: lightgray;
  }
`
const matchStrings = (prefix: string, candidate: string) => {
  return candidate.substring(0, prefix.length) === prefix
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
  const matchingOptions = options.filter((option) => matchStrings(input, option))
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
      onClick={() => {
        console.log('clicked outer')
      }}
    >
      {matchingOptions.map((option) => (
        <Option key={option} onMouseDown={() => handleSelect(option)}>
          {option}
        </Option>
      ))}
    </div>
  )
}

export const Autocomplete: React.FC = () => {
  const options = ['wuyan', 'shadi', 'jim', 'bob', 'rachel']
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
