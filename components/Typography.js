import React from 'react'
import styled, { css } from 'styled-components'

export const Text = styled.span`
  ${props =>
    props.color &&
    css`
      color: var(--sprinter-color-${props.color})
    `}
`
