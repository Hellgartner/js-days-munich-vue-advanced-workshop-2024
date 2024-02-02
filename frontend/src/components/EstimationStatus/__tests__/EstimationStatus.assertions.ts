import {getByTestId, queryAllByTestId} from "@testing-library/vue";

const getEstimationStatus = (container: Element): HTMLElement => {
    return getByTestId(container as HTMLElement, "estimation-status")
}

const expectNamesInOrder = (container: HTMLElement, names: string[]) => {
    const renderedNames = queryAllByTestId(container,'result-name')
    expect(renderedNames).toHaveLength(names.length)
    for(let i = 0; i < names.length; i++) {
        expect(renderedNames[i]).toHaveTextContent(names[i])
    }
}

export {getEstimationStatus, expectNamesInOrder}