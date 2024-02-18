import { describe, expect, it } from 'vitest'
import { fireEvent, render } from '@testing-library/vue'
import ScrumEstimationCard from '../ScrumEstimationCard.vue'
import {
  expectCardNotToBeSelected,
  expectCardToBeSelected
} from '../../ToggleableCard/__tests__/ToggleableCard.assertions'
import {
  expectSelectedEventToBeFiredWithValue,
  expectVisibleText,
  getToggleableCard
} from './ScrumEstimationCard.assertions'

describe('ScrumEstimationCard', () => {
  it('renders', () => {
    const { container } = render(ScrumEstimationCard, {
      props: { value: 'some test value' }
    })

    expect(container).not.toBeNull
  })

  it('renders the correct value', () => {
    const { container } = render(ScrumEstimationCard, {
      props: { value: 'some test value' }
    })

    expectVisibleText(container as HTMLElement, 'some test value')
  })

  it('selects the card if value and selected value are the same', () => {
    const { container } = render(ScrumEstimationCard, {
      props: {
        value: 'some test value',
        selectedValue: 'some test value'
      }
    })

    const toggleableCard = getToggleableCard(container as HTMLElement)
    expectCardToBeSelected(toggleableCard)
  })

  it('does not select the card if value and selected value are the same', () => {
    const { container } = render(ScrumEstimationCard, {
      props: {
        value: 'some test value',
        selectedValue: 'some other value'
      }
    })

    const toggleableCard = getToggleableCard(container as HTMLElement)
    expectCardNotToBeSelected(toggleableCard)
  })

  it('emits the selected event on click', async () => {
    const { container, emitted } = render(ScrumEstimationCard, {
      props: { value: 'some test value' }
    })

    const toggleableCard = getToggleableCard(container as HTMLElement)
    await fireEvent.click(toggleableCard)

    expectSelectedEventToBeFiredWithValue(emitted, 'some test value')
  })
})
