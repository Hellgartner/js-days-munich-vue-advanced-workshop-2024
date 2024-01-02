import { describe, expect, it } from 'vitest'
import {fireEvent, queryByTestId, render} from '@testing-library/vue'
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

        const toggleableCard = queryByTestId(container as HTMLElement, 'scrum-estimation-card') as HTMLDivElement;
        const textContent = toggleableCard.textContent;
        expect(textContent).toEqual('some test value')
    })

    it('selects the card if value and selected value are the same', () => {
        const { container } = render(ScrumEstimationCard, {
            props: {
                value: "some test value",
                selectedValue: "some test value"
            }
        })

        const toggleableCard = queryByTestId(container as HTMLElement, 'scrum-estimation-card') as HTMLDivElement;
        expect(toggleableCard.classList.contains('awesomescrumestimation-card--selected')).toBeTruthy
    })

    it('does not select the card if value and selected value are the same', () => {
        const { container } = render(ScrumEstimationCard, {
            props: {
                value: "some test value",
                selectedValue: "some other value"
            }
        })

        const toggleableCard = queryByTestId(container as HTMLElement, 'scrum-estimation-card') as HTMLDivElement;
        expect(toggleableCard.classList.contains('awesomescrumestimation-card--selected')).toBeFalsy
    })

    it('emits the selected event on click', async ()=> {
        const { container, emitted} = render(ScrumEstimationCard, {
            props: {value: "some test value"}
        })

        const toggleableCard = queryByTestId(container as HTMLElement, 'scrum-estimation-card') as HTMLDivElement;
        await fireEvent.click(toggleableCard);

        const selectedEvent = emitted<string[]>('selected');
        expect(selectedEvent).toBeTruthy;
        expect(selectedEvent.length).to.equal(1);
        expect(selectedEvent[0][0]).to.equal("some test value");
    })
})
