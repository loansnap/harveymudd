import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import styled, { css } from 'styled-components';
import Card from 'components/Card'


const CollapsibleCardCnt = styled(function CollapsibleCardCnt({collapsed, ...props}) {
  return <Card short={collapsed} {...props} />
})`
  transition:
    padding 200ms,
    box-shadow 300ms;

  ${props =>
    props.collapsed &&
    css`
      padding-top: calc(0.5em - 1px);
      padding-bottom: calc(0.5em - 1px);
    `}

  ${(props) =>
    props.animateShadowOnHover &&
    css`
      :hover {
        transition:
          padding 200ms,
          box-shadow 100ms;
      }
    `}
`

const CardTitle = styled.div`
  cursor: pointer;
`

export default function CollapsibleCard({title, onToggleCollapse = _.noop, defaultState, onCollapsed = _.noop, onExpanded = _.noop, children, ...props}) {
  const [collapseState, setCollapseState] = useState(defaultState)
  const collapsed = collapseState === 'collapsed'
  const handleCollapse = useCallback(() => {
    const nextState = collapseState === 'collapsed' ? 'expanded' : 'collapsed'
    setCollapseState(nextState)
    switch (nextState) {
      case 'collapsed':
        onCollapsed()
      case 'expanded':
        onExpanded()
      default:
        onToggleCollapse()
    }
  })
  return (
    <CollapsibleCardCnt collapsed={collapsed} {...props}>
      <CardTitle onClick={handleCollapse}>{title}</CardTitle>
      {collapsed
        ? null
        : children}
    </CollapsibleCardCnt>
  )
}
