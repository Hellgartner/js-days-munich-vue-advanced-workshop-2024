# Exercise 3 (Optional)

1. Extract getting the voting results from the backend into the composable [useVotingBackend.ts](../frontend/src/composables/useVotingBackend.ts).
2. Re-use the `results` of the voting in [ResultsView.vue](../frontend/src/views/ResultsView.vue).
3. Add an error message if the backend is not available on the initial call or when polling. (see [ScrumEstimationPage.vue](../frontend/src/components/ScrumEstimationPage/ScrumEstimationPage.vue))