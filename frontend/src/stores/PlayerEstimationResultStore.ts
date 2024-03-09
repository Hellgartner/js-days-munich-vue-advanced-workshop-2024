import { defineStore } from 'pinia'
import { reactive } from 'vue'
import type { EstimationResult } from '@/components/EstimationStatus/EstimationStatus.vue'

export const usePlayerResultStore = defineStore('estimationResult', () => {
  const results = reactive<EstimationResult>({ name: 'Player', result: undefined })

  const setPlayerName = (name: string) => {
    results.name = name
  }

  const setPlayerResult = (result?: string) => {
    results.result = result
  }

  const resetPlayerResult = () => {
    results.result = undefined
  }

  return { results, setPlayerName, setPlayerResult, resetPlayerResult }
})
