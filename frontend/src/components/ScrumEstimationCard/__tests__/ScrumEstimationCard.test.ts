import { describe, expect, it } from 'vitest'
import { fireEvent, getByTestId, render } from '@testing-library/vue'
import ScrumEstimationCard from '../ScrumEstimationCard.vue'
import {
  expectCorrectEventToBeEmitted,
  expectTextContent,
  getToggleableCard
} from './ScrumEstimationCard.assertions'
import {
  expectCardNotToBeSelected,
  expectCardToBeSelected
} from '../../ToggleableCard/__tests__/ToggleableCard.assertions'

describe('ScrumEstimationCard', () => {
  it('renders', () => {
    const { container } = render(ScrumEstimationCard, {
      props: {
        value: 'test value'
      }
    })

    expect(container).not.toBeNull
  })

  it('renders the correct value', () => {
    const { container } = render(ScrumEstimationCard, {
      props: {
        value: 'test value'
      }
    })

    expectTextContent(container as HTMLElement, 'test value')
  })

  it('selects the card if value and selected value are the same', () => {
    const { container } = render(ScrumEstimationCard, {
      props: {
        value: 'test value',
        selectedValue: 'test value'
      }
    })

    const scrumEstimationCard = getToggleableCard(container as HTMLElement)
    expectCardToBeSelected(scrumEstimationCard)
  })

  it('does not select the card if value and selected value are not the same', () => {
    const { container } = render(ScrumEstimationCard, {
      props: {
        value: 'test value',
        selectedValue: 'some other value'
      }
    })

    const scrumEstimationCard = getToggleableCard(container as HTMLElement)
    expectCardNotToBeSelected(scrumEstimationCard)
  })

  it('emits the selected event on click', async () => {
    const { container, emitted } = render(ScrumEstimationCard, {
      props: {
        value: 'test value',
        selectedValue: 'some other value'
      }
    })

    const scrumEstimationCard = getToggleableCard(container as HTMLElement)
    await fireEvent.click(scrumEstimationCard)

    expectCorrectEventToBeEmitted(emitted, 'test value')
  })
})
