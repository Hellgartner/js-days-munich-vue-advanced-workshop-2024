import type { EstimationVariant } from '@/services/scrumEstimationValuesProvider'
import { onMounted, onUnmounted, ref } from 'vue'
import type { EstimationResult } from '@/types/EstimationResult'

const useVotingBackend = (
  doPoll: boolean,
  initialEstimationVariant: EstimationVariant | undefined
) => {
  const error = ref<String | false>(false)

  async function startVotingWithVariant(variant: EstimationVariant) {
    try {
      await fetch('http://localhost:3000/estimation/vote', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ variant })
      })
    } catch (e) {
      console.error(e)
      error.value = '' + e
    }
  }

  const results = ref<EstimationResult[]>([])

  async function fetchVotingResults() {
    try {
      const fetchResult = await fetch('http://localhost:3000/estimation/results')
      results.value = await fetchResult.json()
    } catch (e) {
      console.error(e)
      error.value = '' + e
      results.value = []
    }
  }

  let intervalId: number | undefined = undefined

  onMounted(async () => {
    if (initialEstimationVariant) {
      await startVotingWithVariant(initialEstimationVariant)
    }

    if (doPoll) {
      intervalId = window.setInterval(fetchVotingResults, 1000)
    } else {
      await fetchVotingResults()
    }
  })

  onUnmounted(() => {
    if (intervalId) {
      window.clearInterval(intervalId)
    }
  })

  return {
    results,
    startVotingWithVariant,
    error
  }
}
export default useVotingBackend
