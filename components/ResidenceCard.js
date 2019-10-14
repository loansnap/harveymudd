import React from 'react';
import _ from 'lodash';
import styled, { css } from 'styled-components'
import Card from './Card';
import { formatPrice } from 'utils/helpers';
import Button from './Button';

const ResidenceCaption = styled.div`
  padding-left: 1em;
  padding-right: 1em;
  padding-bottom: 1em;
`

export default function ResidenceCard({residence, onClickSelect, ...otherProps}) {
  return (
    <Card
      noPadding
      {...otherProps}
    >
      <img src={residence.imageSrc} width={'100%'} />
      <ResidenceCaption>
        <h1>{formatPrice(residence.price, {precision: 0})}</h1>
        <h3>{residence.title}</h3>
        <p>Address: {residence.address}</p>
        <p>Rating: {residence.rating}</p>
        {onClickSelect && (
          <Button primary onClick={onClickSelect}>
            Select Residence
          </Button>
        )}
      </ResidenceCaption>
    </Card>
  )
}
