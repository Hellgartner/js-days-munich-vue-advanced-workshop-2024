# Exercise 4

Extend the app to uses all three Views in `frontend/src/views`
1. Add an appropriate router view in `App.vue`
2. Implement the following routes (see [index.ts](../frontend/src/router/index.ts))

| Route    | View       |
|----------|------------|
| `/`       | `HomeView` |
| `/estimation` | `ScrumEstimationView` |
| `/result`    | `ResultsView`       |

3. When clicking the `Login` button, go to `/estimation`
4. When clicking the `Show Results` button, go to  `/result`
5. When clicking the `Reset Results` button, go to `/estimation`
6. Use named routes