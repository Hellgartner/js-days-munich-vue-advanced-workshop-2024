# Exercise 5

1. Set up a pinia store in your application with the following properties. (see [PlayerEstimationResultStore.ts](../frontend/src/stores/PlayerEstimationResultStore.ts))
    * The user's name.
    * The chosen estimation value.
2. On login, set the user's name. (see [HomeView.vue](../frontend/src/views/HomeView.vue))
3. Use the user's name on the estimation page. (see [ScrumEstimationPage.vue](../frontend/src/components/ScrumEstimationPage/ScrumEstimationPage.vue))
4. When the user estimates, set the estimation value. (see [ScrumEstimationPage.vue](../frontend/src/components/ScrumEstimationPage/ScrumEstimationPage.vue))
5. Use the user's name and estimation value on the results page. (see [ResultsView.vue](../frontend/src/views/ResultsView.vue))
6. Reset the estimation value once `Reset results` is clicked. (see [EstimationResults.vue](../frontend/src/components/EstimationResult/EstimationResults.vue))