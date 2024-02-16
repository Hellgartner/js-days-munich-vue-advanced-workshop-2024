import {afterAll, afterEach, beforeAll, beforeEach, describe} from "vitest";
import {setupServer, SetupServerApi} from 'msw/node';
import {http, HttpResponse} from 'msw';
import {render} from "@testing-library/vue";
import ScrumEstimationPage from "../ScrumEstimationPage.vue";
import type {EstimationVariant} from "../../../services/scrumEstimationValuesProvider";
import {flushPromises} from "@vue/test-utils";
import {expectNamesInOrder, getEstimationStatus} from "../../EstimationStatus/__tests__/EstimationStatus.assertions";

let server: SetupServerApi | undefined = undefined;

const votingStartedHandler = (buffer?: {variant: EstimationVariant|undefined}  ) => {
    return http.post('http://localhost:3000/estimation/vote', async ({request, params, cookies}) => {
        const json = await request.json() as { variant: EstimationVariant }
        if(buffer) {
            buffer.variant = json.variant;
        }
        return new HttpResponse()
    });
}

const voteResultsHandler =
     http.get('http://localhost:3000/estimation/results', () => {
        return HttpResponse.json(
            [
                {
                    "name": "Franz Xaver",
                    "result": "5"
                },
                {
                    "name": "Bob Brown",
                    "result": "21"
                }]
        )});



describe('ScrumEstimationPage', () => {
    beforeAll(() => {
        server = setupServer();
        server?.listen();
    } )

    beforeEach( () => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        server?.resetHandlers();
        vi.useRealTimers()
    })

    afterAll(()=> {
        server?.close();
    })

    it('starts the voting on page load with fibonacci', async () => {
        const estimationVariant : {variant :EstimationVariant | undefined}  = {variant: undefined};
        server?.use(votingStartedHandler(estimationVariant))

        render(ScrumEstimationPage)

        await flushPromises()

        expect(estimationVariant.variant).toBe('fibonacci')
    })

    it('renders the shown voters as soon as the first poll is in', async ()=> {
        server?.use(votingStartedHandler(), voteResultsHandler)

        const {container} = render(ScrumEstimationPage)
        await flushPromises();

        vi.advanceTimersByTime(2000)

        await flushPromises()

        const estimationStatus = getEstimationStatus(container);
        expectNamesInOrder(estimationStatus, ["Franz Xaver", "Bob Brown", "player"])
    })
})