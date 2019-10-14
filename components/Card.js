import React from 'react';
import _ from 'lodash';
import styled, { css } from 'styled-components';

export default styled.div`
  padding: calc(2em - 1px);
  padding-bottom: calc(3em - 1px);
  border: 1px solid var(--sprinter-color-silver);
  border-radius: 4px;
  margin-block-start: 1em;
  margin-block-end: 1em;

  ${(props) =>
    props.short &&
    css`
      padding-top: calc(0.5em - 1px);
      padding-bottom: calc(1em - 1px);
    `}

  ${(props) =>
    props.noPadding &&
    css`
      padding: 0;
    `}

  ${(props) =>
    props.shadow &&
    css`
      box-shadow: var(--sprinter-shadow-sm);
      transition: box-shadow 300ms;
    `}

  ${(props) =>
    props.animateShadowOnHover &&
    css`
      :hover {
        transition: box-shadow 100ms;
        box-shadow: ${_.isString(props.animateShadowOnHover) ? `var(--sprinter-shadow-${props.animateShadowOnHover})`: 'var(--sprinter-shadow-md)'};
      }
    `}

  ${(props) =>
    props.centered &&
    css`
      text-align: center;
    `}

  ${(props) =>
    props.noMargin &&
    css`
    margin-block-start: 0;
    margin-block-end: 0;
    `}
`
