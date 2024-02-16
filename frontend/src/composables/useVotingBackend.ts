import type {EstimationVariant} from "@/services/scrumEstimationValuesProvider";
import {onMounted, onUnmounted, ref} from "vue";

export interface EstimationResult {
    name: string;
    result?: string;
}

const useVotingBackend = (doPoll: boolean, initialEstimationVariant?: EstimationVariant) => {
    async function startVotingWithCurrentVariant(variant:EstimationVariant) {
        try{
            await fetch("http://localhost:3000/estimation/vote", {
                method: 'POST', headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({variant})
            })}
        catch (e) {
            console.error(e);
        }
    }
    const currentEstimationVariant = ref<EstimationVariant>('fibonacci');

    const setCurrentEstimationVariant = (variant: EstimationVariant):Promise<void> => {
        currentEstimationVariant.value = variant
        return startVotingWithCurrentVariant(variant)
    }

    const results = ref<EstimationResult[]>([]);

    async function fetchVotingResults() {
        try {
            const fetchResult = await fetch("http://localhost:3000/estimation/results")
            results.value = await fetchResult.json()
        } catch (e) {
            console.error(e)
            results.value = []
        }
    }

    let intervalId: number|undefined = undefined;

    onMounted( async () => {
        if(initialEstimationVariant) {
            await startVotingWithCurrentVariant(currentEstimationVariant.value);
        }
        if (doPoll) {
            intervalId = setInterval(fetchVotingResults, 1000) as unknown as number
        } else {
            await fetchVotingResults()
        }
    } )

    onUnmounted(() => {
        if(intervalId) {
            clearInterval(intervalId)
        }
    })

    return {
        results,
        setCurrentEstimationVariant
    }
}

export default useVotingBackend;