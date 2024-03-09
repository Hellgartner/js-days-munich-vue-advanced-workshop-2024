# Exercise 2

Make [ScrumEstimationPage.vue](/frontend/src/components/ScrumEstimationPage/ScrumEstimationPage.vue) work by connecting it to the backend.

The backend is available at `http://localhost:3000/`.

It features a swagger based endpoint documentation accessible at http://localhost:3000/api.

1. Trigger a new voting session when the page is shown and when the estimation type changes.
    * Do a post request to `/estimation/vote`
    * Do not forget to provide the estimation variant
    * Check in the server log that the request arrives
2. Poll for estimation results
    * Regularly query `/estimation/results` (e.g. once per second)
    * Pass the results to the `EstimationStatus` component
    * Double check: Do you need to clean-up something to avoid a memory leak
3. Write a test checking that the component starts a new voting session.
4. Write a test checking that the component shows the names of additional voters returned by the backend request.