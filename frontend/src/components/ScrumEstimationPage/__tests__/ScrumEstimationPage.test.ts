import { afterAll, afterEach, beforeAll, beforeEach, describe } from 'vitest'
import { setupServer, SetupServerApi } from 'msw/node'
import { http, HttpResponse } from 'msw'
import type { EstimationVariant } from '../../../services/scrumEstimationValuesProvider'

let server: SetupServerApi | undefined = undefined

const votingStartedHandler = (buffer?: { variant: EstimationVariant | undefined }) => {
  return http.post(
    'http://localhost:3000/estimation/vote',
    async ({ request, params, cookies }) => {
      const json = (await request.json()) as { variant: EstimationVariant }
      if (buffer) {
        buffer.variant = json.variant
      }
      return new HttpResponse()
    }
  )
}

const voteResultsHandler = http.get('http://localhost:3000/estimation/results', () => {
  return HttpResponse.json([
    {
      name: 'Franz Xaver',
      result: '5'
    },
    {
      name: 'Bob Brown',
      result: '21'
    }
  ])
})

describe('ScrumEstimationPage', () => {
  beforeAll(() => {
    server = setupServer() as SetupServerApi
    server?.listen()
  })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    server?.resetHandlers()
    vi.useRealTimers()
  })

  afterAll(() => {
    server?.close()
  })

  it('starts the voting on page load with fibonacci', async () => {
    // ToDo Exercise 2.3
  })

  it('renders the shown voters as soon as the first poll is in', async () => {
    // ToDo Exercise 2.4
  })
})
