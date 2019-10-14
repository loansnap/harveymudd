import React from 'react';
import styled, { css } from 'styled-components'
import { Text } from 'components/Typography';
import Card from 'components/Card';
import Avatar from 'components/Avatar';


const PersonCardCnt = styled(Card)`
  display: flex;
  align-items: center;
  padding: 1.5em;

  ${props =>
    props.onClick &&
    css`
      cursor: pointer;
    `}
`
const PersonAvatar = styled(Avatar)`
  margin-right: 1em;
`

const PersonContacts = styled.div`
  flex: 1;
  text-align: start;
`

function PersonCard({person, ...props}) {
  return (
    <PersonCardCnt {...props}>
      <PersonAvatar person={person} />
      <PersonContacts>
        <div>
          {person.name} <Text color='dark-silver'>({person.initials})</Text>
        </div>
        <div>
          <Text color='dark-silver'>@{person.username}</Text>
        </div>
      </PersonContacts>
    </PersonCardCnt>
  )
}

export default PersonCard
