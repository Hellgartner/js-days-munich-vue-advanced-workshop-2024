# Exercise 4

Extend the app to uses all three Views in `frontend/src/views`

1. Add an appropriate router view in [App.vue](../frontend/src/App.vue)
2. Implement the following routes (see [index.ts](../frontend/src/router/index.ts))

| Route         | View                  |
|---------------|-----------------------|
| `/`           | `HomeView`            |
| `/estimation` | `ScrumEstimationView` |
| `/result`     | `ResultsView`         |

3. When clicking the `Login` button, go to `/estimation`. (see [HomeView.vue](../frontend/src/views/HomeView.vue))
4. When clicking the `Show Results` button, go to  `/result`. (
   see [EstimationStatus.vue](../frontend/src/components/EstimationStatus/EstimationStatus.vue))
5. When clicking the `Reset Results` button, go to `/estimation`. (
   see [EstimationResults.vue](../frontend/src/components/EstimationResult/EstimationResults.vue))
6. Add names to the routes above (see [index.ts](../frontend/src/router/index.ts)) and use the named routes in
    * [HomeView.vue](../frontend/src/views/HomeView.vue)
    * [EstimationStatus.vue](../frontend/src/components/EstimationStatus/EstimationStatus.vue)
    * [EstimationStatus.vue](../frontend/src/components/EstimationStatus/EstimationStatus.vue)