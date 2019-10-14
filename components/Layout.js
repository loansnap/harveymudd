import React from 'react'
import styled, { css } from 'styled-components'


function Col({ width, offset, offsetRight, offsetLeft, ...props }) {
  return (
    <div {...props} />
  )
}
const StyledCol = styled(Col)`
  flex: 1;
  flex-basis: var(--sprinter-width-x3);
  max-width: 100%;
  min-width: var(--sprinter-width-x3);

  ${(props) =>
    props.width &&
    css`
      flex-basis: var(--sprinter-width-x${props.width});
      max-width: var(--sprinter-width-x${props.width});
    `}

  ${(props) =>
    props.offset &&
    css`
      margin-left: var(--sprinter-offset-x${props.offset});
      margin-right: var(--sprinter-offset-x${props.offset});
    `}

  ${(props) =>
    props.offsetRight &&
    css`
      margin-right: var(--sprinter-offset-x${props.offsetRight});
    `}

  ${(props) =>
    props.offsetLeft &&
    css`
      margin-left: var(--sprinter-offset-x${props.offsetLeft});
    `}

  ${(props) =>
    props.centered &&
    css`
      text-align: center;
    `}

  @media (max-width: 568px) {
    display: block;
    width: 100%;
    margin-left: 0;
    margin-right: 0;
  }
`


function Row({ padding, paddingRight, paddingLeft, offset, offsetRight, offsetLeft, ...props }) {
  return (
    <div {...props} />
  )
}

const StyledRow = styled(Row)`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;

  margin-left: calc(-1 * var(--sprinter-offset-gutter) / 2);
  margin-right: calc(-1 * var(--sprinter-offset-gutter) / 2);

  ${StyledCol} {
    margin: calc(var(--sprinter-offset-gutter) / 2);
  }

  ${(props) =>
    props.padding &&
    css`
      padding-right: var(--sprinter-offset-x${props.padding});
      padding-left: var(--sprinter-offset-x${props.padding});
    `}

  ${(props) =>
    props.paddingRight &&
    css`
      padding-right: var(--sprinter-offset-x${props.paddingRight});
    `}

  ${(props) =>
    props.paddingLeft &&
    css`
      padding-left: var(--sprinter-offset-x${props.paddingLeft});
    `}

  ${(props) =>
    props.offset &&
    css`
      margin-right: var(--sprinter-offset-x${props.offset});
      margin-left: var(--sprinter-offset-x${props.offset});
    `}

  ${(props) =>
    props.offsetRight &&
    css`
      margin-right: var(--sprinter-offset-x${props.offsetRight});
    `}

  ${(props) =>
    props.offsetLeft &&
    css`
      margin-left: var(--sprinter-offset-x${props.offsetLeft});
    `}

  @media (max-width: 568px) {
    display: block;
    width: 100%;
    margin-left: 0;
    margin-right: 0;

    ${StyledCol} {
      margin-left: 0;
      margin-right: 0;
    }
  }
`

export {
  StyledRow as Row,
  StyledCol as Col,
}
