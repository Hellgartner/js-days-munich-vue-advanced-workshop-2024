import type {EstimationVariant} from "@/services/scrumEstimationValuesProvider";
import {onMounted, onUnmounted, ref} from "vue";
import {Exception} from "sass";

export interface EstimationResult {
    name: string;
    result?: string;
}

const useVotingBackend = (doPoll: boolean, initialEstimationVariant?: EstimationVariant) => {
    const error = ref<String|undefined>(undefined)
    const loading = ref(true)
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
            error.value = ""+e;
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
            loading.value = false;
        } catch (e) {
            console.error(e)
            error.value = ""+e;
            results.value = []
            loading.value = true
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
        setCurrentEstimationVariant,
        error,
        loading
    }
}

export default useVotingBackend;
