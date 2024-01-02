import {getByTestId} from "@testing-library/vue";
import {expect} from "vitest";

export const getToggleableCard = (container: HTMLElement): HTMLElement => {
    return getByTestId<HTMLElement>(container, 'scrum-estimation-card')
}

export const expectVisibleText = (container: HTMLElement, expectedText: string):void => {
    const toggleableCard = getToggleableCard(container as HTMLElement);
    expect(toggleableCard).toHaveTextContent(expectedText);
    expect(toggleableCard).toBeVisible;
}

export const expectSelectedEventToBeFiredWithValue = (emitted: <T = unknown>(name?: string)=>  T[], valueSelected: String):void => {
    const selectedEvent = emitted<string[]>('selected');
    expect(selectedEvent).toBeTruthy;
    expect(selectedEvent.length).to.equal(1);
    expect(selectedEvent[0][0]).to.equal(valueSelected);
}