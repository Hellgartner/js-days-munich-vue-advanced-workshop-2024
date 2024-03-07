import { getByTestId } from '@testing-library/vue'
import { expect } from 'vitest'

export const getToggleableCard = (container: HTMLElement) => {
  return getByTestId(container as HTMLElement, 'scrum-estimation-card')
}

export const expectTextContent = (container: HTMLElement, expectedText: string) => {
  const scrumEstimationCard = getToggleableCard(container)
  expect(scrumEstimationCard).toHaveTextContent(expectedText)
  expect(scrumEstimationCard).toBeVisible()
}

export const expectCorrectEventToBeEmitted = (
  emitted: <T = unknown>(name?: string) => T[],
  valueSelected: String
) => {
  const event = emitted<string[]>('selected')
  expect(event).toHaveLength(1)
  expect(event[0]).toHaveLength(1)
  expect(event[0][0]).toEqual(valueSelected)
}
