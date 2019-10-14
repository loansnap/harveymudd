import _ from 'lodash'
import accounting from 'accounting'

export const sleep = (delayMs = 1000) => new Promise((res) => setTimeout(res, delayMs))
export function numOnly(value) {
  const v = value || ''
  return v.replace(/[^\d+]/g, '')
}
export function parseNumber(v) {
  return accounting.unformat(v)
}
export function formatPrice(v, opts) {
  return accounting.formatMoney(v, opts)
}
export function formFormatNumber(v) {
  if (!v && v !== '0') return ''
  let [wholePart, decimalPart] = v.split('.')
  const wholePartNums = numOnly(wholePart)
  const decimalPartNums = numOnly(decimalPart).slice(0, 2)
  let value = ''
  if (wholePartNums) {
    value = accounting.format(wholePartNums, {precision: 0})
  }
  if (!_.isNil(decimalPart)) {
    if (!value) {
      value = '0.'
    } else {
      value += '.'
    }
  }
  if (decimalPartNums) {
    value += `${decimalPartNums}`
  }
  return value
}
