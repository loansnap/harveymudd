import React, { useState, useCallback } from 'react';
import styled, { css } from 'styled-components'
import { useTrackEvent } from 'utils/metrics';


const StyledButton = styled.button`
  // Colors
  //  - primary
  --primary-color: var(--sprinter-color-primary);
  --primary-hover-color: var(--sprinter-color-primary-hover);
  --primary-pressed-color: var(--sprinter-color-primary-pressed);
  --primary-disabled-color: var(--sprinter-color-primary-disabled);
  //  - border
  --border-color: var(--sprinter-color-primary);
  --border-hover-color: var(--sprinter-color-primary-hover);
  --border-pressed-color: var(--sprinter-color-primary-pressed);
  --border-disabled-color: var(--sprinter-color-primary-disabled);
  //  - contrast
  --contrast-color: var(--sprinter-color-white);
  --contrast-hover-color: var(--sprinter-color-plaster);
  --contrast-pressed-color: var(--sprinter-color-dark-plaster);
  --contrast-disabled-color: var(--sprinter-color-plaster);
  //  - outline
  --outline-color: var(--sprinter-color-primary);

  // <Button/> styles
  background: var(--contrast-color);
  color: var(--primary-color);
  border: 1px solid var(--border-color);
  margin: 0;
  margin-block-start: 1em;
  margin-block-end: 1em;
  padding: calc(0.5em - 1px) calc(1em - 1px);
  // height: var(--sprinter-button-height);
  font-size: 100%;
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 100ms,
    color 100ms,
    border-color 100ms;
  :hover {
    --primary-color: var(--primary-hover-color);
    --border-color: var(--border-hover-color);
    --contrast-color: var(--contrast-hover-color);
  }
  :active {
    --primary-color: var(--primary-pressed-color);
    --border-color: var(--border-pressed-color);
    --contrast-color: var(--contrast-pressed-color);
    transition:
      background-color 0s,
      color 0s,
      border-color 0s;
  }
  :focus {
    outline: var(--outline-color) auto 4px;
  }
  :disabled {
    --primary-color: var(--primary-disabled-color);
    --border-color: var(--border-disabled-color);
    --contrast-color: var(--contrast-disabled-color);
    cursor: no-drop;
  }

  // <Button primary/> styles
  ${props =>
    props.primary &&
    css`
      --primary-color: var(--sprinter-color-white);
      --primary-hover-color: var(--sprinter-color-white);
      --primary-pressed-color: var(--sprinter-color-dark-plaster);
      --primary-disabled-color: var(--sprinter-color-plaster);
      --border-color: var(--sprinter-color-primary);
      --border-hover-color: var(--sprinter-color-primary-hover);
      --border-pressed-color: var(--sprinter-color-primary-pressed);
      --border-disabled-color: var(--sprinter-color-primary-disabled);
      --contrast-color: var(--sprinter-color-primary);
      --contrast-hover-color: var(--sprinter-color-primary-hover);
      --contrast-pressed-color: var(--sprinter-color-primary-pressed);
      --contrast-disabled-color: var(--sprinter-color-primary-disabled);
    `};
  // <Button primary/> styles
  ${props =>
    props.minSized &&
    css`
      min-width: 10em;
    `};
  // <Button primary/> styles
  ${props =>
    props.color &&
    css`
      --contrast-color: ${props.color};
      --contrast-hover-color: ${props.color};
      --contrast-pressed-color: ${props.color};
      --contrast-disabled-color: ${props.color};
      --border-color: ${props.color};
      --border-hover-color: ${props.color};
      --border-pressed-color: ${props.color};
      --border-disabled-color: ${props.color};
      --outline-color: ${props.color};
    `};
`
function Button({onClick, ...otherProps}) {
  const [loading, setLoading] = useState(false)
  const trackEvent = useTrackEvent()
  const onClickHandler = useCallback(() => {
    if (onClick) {
      setLoading(true)
      Promise.resolve(onClick())
        .finally(() => {
          setLoading(false)
        })
    }
    trackEvent('Button click', {target: otherProps.children || ''})
  }, [onClick])
  return (
    <StyledButton
      {...otherProps}
      onClick={onClickHandler}
      disabled={otherProps.disabled || loading}
    />
  )
}

export default Button


const ButtonRowCnt = styled.div`
  margin-left: -0.5em;
  margin-right: -0.5em;
  margin-block-start: 1em;
  margin-block-end: 1em;

  ${StyledButton} {
    margin-left: 0.5em;
    margin-right: 0.5em;
  }

  ${(props) =>
    props.centered &&
    css`
      text-align: center;
    `}
`
const ButtonRowWrp = styled.div`
  margin-block-start: -1em;
  margin-block-end: -1em;
`

export function ButtonRow (props) {
  return (
    <ButtonRowCnt>
      <ButtonRowWrp {...props} />
    </ButtonRowCnt>
  )
}
