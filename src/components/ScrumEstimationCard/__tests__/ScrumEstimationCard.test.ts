import { describe, expect, it } from 'vitest'
import {fireEvent, getByTestId, render} from '@testing-library/vue'
import ScrumEstimationCard from "../ScrumEstimationCard.vue";

describe('ScrumEstimationCard', () => {
    it('renders', ()=> {
        const { container } = render(ScrumEstimationCard, {
            props: {value: "some test value"}
        })

        expect (container).not.toBeNull
    })

    it('renders the correct value', ()=> {
        const { container } = render(ScrumEstimationCard, {
            props: {value: "some test value"}
        })

        const toggleableCard = getByTestId(container as HTMLElement, 'scrum-estimation-card') as HTMLDivElement;
        expect(toggleableCard).toHaveTextContent('some test value');
        expect(toggleableCard).toBeVisible;
    })

    it('selects the card if value and selected value are the same', () => {
        const { container } = render(ScrumEstimationCard, {
            props: {
                value: "some test value",
                selectedValue: "some test value"
            }
        })

        const toggleableCard = getByTestId(container as HTMLElement, 'scrum-estimation-card') as HTMLDivElement;
        expect(toggleableCard).toHaveClass('awesomescrumestimation-card--selected');
    })

    it('does not select the card if value and selected value are the same', () => {
        const { container } = render(ScrumEstimationCard, {
            props: {
                value: "some test value",
                selectedValue: "some other value"
            }
        })

        const toggleableCard = getByTestId(container as HTMLElement, 'scrum-estimation-card') as HTMLDivElement;
        expect(toggleableCard).not.toHaveClass('awesomescrumestimation-card--selected');
    })

    it('emits the selected event on click', async ()=> {
        const { container, emitted} = render(ScrumEstimationCard, {
            props: {value: "some test value"}
        })

        const toggleableCard = getByTestId(container as HTMLElement, 'scrum-estimation-card') as HTMLDivElement;
        await fireEvent.click(toggleableCard);

        const selectedEvent = emitted<string[]>('selected');
        expect(selectedEvent).toBeTruthy;
        expect(selectedEvent.length).to.equal(1);
        expect(selectedEvent[0][0]).to.equal("some test value");
    })
})
