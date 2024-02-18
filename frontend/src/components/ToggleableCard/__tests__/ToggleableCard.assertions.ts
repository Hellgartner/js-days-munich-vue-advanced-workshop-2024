import { expect } from 'vitest'

export const expectCardToBeSelected = (card: HTMLElement) => {
  expect(card).toHaveClass('awesomescrumestimation-card--selected')
}

export const expectCardNotToBeSelected = (card: HTMLElement) => {
  expect(card).not.toHaveClass('awesomescrumestimation-card--selected')
}
