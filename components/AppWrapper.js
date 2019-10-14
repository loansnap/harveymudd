import React from 'react'
import styled, { css } from 'styled-components'

function AppWrapper({maxWidth, ...props}) {
  return (
    <div {...props} />
  )
}

export default styled(AppWrapper)`
  max-width: calc(var(--sprinter-width-x12) + 2em);
  margin-left: auto;
  margin-right: auto;
  padding: 1em;
  min-height: 100vh;

  ${(props) =>
    props.maxWidth &&
    css`
      max-width: calc(var(--sprinter-width-x${props.maxWidth}) + 2em);
    `};

  @media (max-width: 800px) {
    //
  }
`
