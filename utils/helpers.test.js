import { formatPrice } from './helpers'

test('formats prices', () => {
  expect(formatPrice(314.15, {precision: 0})).toBe('$314');
});
