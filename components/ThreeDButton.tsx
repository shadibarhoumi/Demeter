import React from 'react'
import styled from 'styled-components'

const Button = styled.button`
  background: transparent;
  position: relative;
  border: none;
  padding: 0;
  cursor: pointer;
  outline-offset: 4px;
  /* brighten on hover */
  transition: filter 600ms;

  &:hover {
    transition: filter 250ms;
    filter: brightness(110%);
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`

const Front = styled.span`
  display: block;
  position: relative;
  padding: 12px 42px;
  border-radius: 12px;
  font-size: 1.25rem;
  background: hsl(345deg 100% 47%);
  color: white;
  transform: translateY(-4px);
  will-change: transform;
  /* sink back slowly to original position when cursor leaves */
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);

  ${Button}:hover & {
    /* raise to meet cursor when hovered */
    transform: translateY(-6px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  ${Button}:active & {
    /* quickly snap down when clicked */
    transform: translateY(-2px);
    transition: transform 34ms;
  }
`

const Edge = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(340deg 100% 32%);
  background: linear-gradient(
    to left,
    hsl(340deg 100% 16%) 0%,
    hsl(340deg 100% 32%) 8%,
    hsl(340deg 100% 32%) 92%,
    hsl(340deg 100% 16%) 100%
  );
`

const Shadow = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background: hsl(0deg 0% 0% / 0.25);
  transform: translateY(2px);
  /* blur to get a softer, more natural shadow */
  filter: blur(4px);
  /* these transitions match those of front */
  transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);

  ${Button}:hover & {
    transform: translateY(4px);
    transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
  }

  ${Button}:active & {
    transform: translateY(1px);
    transition: transform 34ms;
  }
`

interface Props {
  onClick?: () => any
  style?: React.CSSProperties
}

export const ThreeDButton: React.FC<Props> = ({ children, onClick, style }) => {
  return (
    <Button onClick={onClick} style={style}>
      <Shadow></Shadow>
      <Edge></Edge>
      <Front>{children}</Front>
    </Button>
  )
}
