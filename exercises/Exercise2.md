# Exercise 2

Make [ScrumEstimationPage.vue](../frontend/src/components/ScrumEstimationPage/ScrumEstimationPage.vue) work by connecting it to the backend.

The backend is available at `http://localhost:3000/`.

It features a swagger based endpoint documentation accessible at http://localhost:3000/api.

1. Trigger a new voting session when the page is shown.
    * You can use ready-made call in  `startVotingWithVariant`
    * Do not forget to provide the estimation variant.
    * Check in the server log that the request arrives.
2. Poll for estimation results.
    * Regularly query `/estimation/results` (e.g. once per second). You can use the ready-made call in `getVotingResultsFromBackend`
    * Pass the results to the `EstimationStatus` component.
    * Double check: Do you need to clean-up something to avoid a memory leak.
    * Hint: Polling in javascript: [setInterval()](https://developer.mozilla.org/en-US/docs/Web/API/setInterval#syntax)
3. Optional: Write a test checking that the component starts a new voting session. (see [ScrumEstimationPage.test.ts](../frontend/src/components/ScrumEstimationPage/__tests__/ScrumEstimationPage.test.ts))
4. Optional: Write a test checking that the component shows the names of additional voters returned by the backend request. (see [ScrumEstimationPage.test.ts](../frontend/src/components/ScrumEstimationPage/__tests__/ScrumEstimationPage.test.ts))