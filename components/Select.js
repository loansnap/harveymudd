import React, { useCallback } from 'react';
import _ from 'lodash';
import styled, { css } from 'styled-components';

const StyledSelectCnt = styled.div`
  margin-top: 1em;
  margin-bottom: 1em;

  ${props =>
    props.withLabel &&
    css`
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    `}
`
const StyledSelectLabel = styled.label`
  display: block;
  text-align: start;
  font-size: 0.9em;
  margin-bottom: 0.25em;
  color: var(--sprinter-color-caption);
`
const StyledSelectHint = styled.div`
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
const StyledSelect = styled.select`
  display: block;
  width: 100%;
  border: 1px solid var(--sprinter-color-silver);
  outline-color: var(--sprinter-color-primary);
  border-radius: 3px;
  padding: 0.5em 0.5em;
  font-size: 1em;
  background-color: transparent;
  font-size: 100%;
  height: 2.25em;
`

function Select({name = null, type = 'text', label = null, hintText = null, hintType = 'text', onChange = _.noop, onChangeValue = _.noop, onRef = _.noop, ...props}) {
  const handleChange = useCallback((ev, ...args) => {
    onChange(ev, ...args);
    onChangeValue(ev.target.value);
  })
  const selectName = name || _.padStart('' + _.random(1e6, false), 6, '0')
  const selectId = `select-${selectName}`
  return (
    <StyledSelectCnt withLabel={!!label}>
      {label && (
        <StyledSelectLabel htmlFor={selectId}>
          {label}
        </StyledSelectLabel>
      )}

      {<StyledSelect {...props} type={type} id={selectId} onChange={handleChange} ref={onRef} />}

      {hintText && (
        <StyledSelectHint hintType={hintType}>
          {hintText}
        </StyledSelectHint>
      )}
    </StyledSelectCnt>
  )
}

export default Select
