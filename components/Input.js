import React, { useCallback } from 'react';
import _ from 'lodash';
import styled, { css } from 'styled-components';

// const inputStyle = css`
//   display: block;
//   width: 100%;
//   border: 1px solid var(--sprinter-color-silver);
//   borderRadius: 3px;
//   padding: 0.25em 0.33em;
//   fontSize: 1em;
// `

const StyledInputCnt = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;

  ${props =>
    props.withLabel &&
    css`
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    `}

  ${props =>
    props.width &&
    css`
      width: ${props.width};
    `}

  ${props =>
    props.centered &&
    css`
      margin-left: auto;
      margin-right: auto;
    `}
`
const StyledInputLabel = styled.label`
  display: block;
  text-align: start;
  font-size: 0.9em;
  margin-bottom: 0.25em;
  color: var(--sprinter-color-caption);
`
const StyledInputHint = styled.div`
  font-size: 0.9em;
  text-align: start;
  color: var(--sprinter-color-dark-silver);
  margin-top: 0.25em;
  margin-left: 0.25em;

  ${props =>
    props.hintType === 'success' &&
    css`
      color: var(--sprinter-color-success);
    `}

  ${props =>
    props.hintType === 'warning' &&
    css`
      color: var(--sprinter-color-warning);
    `}

  ${props =>
    props.hintType === 'error' &&
    css`
      color: var(--sprinter-color-error);
    `}
`
const StyledInput = styled.input`
  display: block;
  width: 100%;
  border: 1px solid var(--sprinter-color-silver);
  outline-color: var(--sprinter-color-primary);
  border-radius: 3px;
  padding: 0.5em 0.5em;
  font-size: 1em;
`

const StyledTextarea = styled.textarea`
  display: block;
  width: 100%;
  border: 1px solid var(--sprinter-color-silver);
  outline-color: var(--sprinter-color-primary);
  border-radius: 3px;
  padding: 0.5em 0.5em;
  font-size: 1em;
`

function Input({name = null, type = 'text', label = null, hintText = null, hintType = 'text', onChange = _.noop, onChangeValue = _.noop, onRef = _.noop, width = null, centered = false, ...props}) {
  const handleChange = useCallback((ev, ...args) => {
    onChange(ev, ...args);
    onChangeValue(ev.target.value);
  })
  const inputName = name || _.padStart('' + _.random(1e6, false), 6, '0')
  const inputId = `input-${inputName}`
  return (
    <StyledInputCnt withLabel={!!label} width={width} centered={centered}>
      {label && (
        <StyledInputLabel htmlFor={inputId}>
          {label}
        </StyledInputLabel>
      )}

      {type === 'textarea'
        ? (
          <StyledTextarea {...props} id={inputId} onChange={handleChange} ref={onRef} />
        )
        : (
          <StyledInput {...props} type={type} id={inputId} onChange={handleChange} ref={onRef} />
        )
      }

      {hintText && (
        <StyledInputHint hintType={hintType}>
          {hintText}
        </StyledInputHint>
      )}
    </StyledInputCnt>
  )
}

export default Input
