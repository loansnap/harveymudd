import React, { useState } from 'react'
import Input from './Input'
import Select from './Select'
import CollapsibleCard from './CollapsibleCard'
import { formFormatNumber, parseNumber } from 'utils/helpers'
import { getMortgagePayment } from 'utils/mortgageCalc'

export default function MortgageCalculator(props) {
  const [loanAmountInput, setLoanAmountInput] = useState('300,000')
  const [termInput, setTermInput] = useState(360)
  const [rateInput, setRateInput] = useState(3.8)
  const [downpaymentInput, setDownpaymentInput] = useState(20.0)
  const loanAmount = parseNumber(loanAmountInput) * (1 - downpaymentInput / 100)
  const payment = loanAmount > 10000
    ? getMortgagePayment(loanAmount, termInput, rateInput)
    : null
  const paymentInputValue = payment ? formFormatNumber('' + payment.toFixed(2)) : ''
  return (
    <CollapsibleCard
      shadow
      animateShadowOnHover='lg'
      title={<h2>Calculate your mortgage</h2>}
      {...props}
    >
      <Input
        name='loanAmount'
        type='tel'
        label='Property price'
        placeholder='Property price'
        value={loanAmountInput}
        onChange={(ev) => setLoanAmountInput(formFormatNumber(ev.target.value))}
      />
      <Input
        label={`Downpayment: ${downpaymentInput}%`}
        name='rate'
        type='range'
        min={10.0}
        max={25.0}
        step={0.1}
        value={downpaymentInput}
        onChange={(ev) => setDownpaymentInput(ev.target.value)}
      />
      <Select
        value={termInput}
        label='Loan term'
        onChange={(ev) => setTermInput(ev.target.value)}
      >
        <option value={360}>30 years</option>
        <option value={300}>25 years</option>
        <option value={240}>20 years</option>
        <option value={180}>15 years</option>
      </Select>
      <Input
        label={`Rate: ${rateInput}%`}
        name='rate'
        type='range'
        min={3.5}
        max={5.0}
        step={0.01}
        value={rateInput}
        onChange={(ev) => setRateInput(ev.target.value)}
      />
      <Input
        label='Monthly payment'
        name='payment'
        placeholder='Your monthly payment'
        value={paymentInputValue}
      />
    </CollapsibleCard>
  )
}
