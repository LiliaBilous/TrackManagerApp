# ADR 0014: Use Apollo Client and GraphQL Subscriptions for Real-Time Active Track

## Context

A new requirement was introduced: the UI must display the name of the currently active track, which should update in real time as the server changes it (randomly every 1–2 seconds). This required a real-time communication channel between the backend and all connected clients.

## Decision

- Use Apollo Client as the GraphQL client for all data operations in the frontend.
- Implement GraphQL Subscriptions to receive real-time updates about the active track from the server.
- On the backend, maintain a variable for the active track name and update it randomly every 1–2 seconds, streaming changes to all clients via a GraphQL Subscription.
- In the frontend, subscribe to the active track and update the UI in real time as new values arrive.

## Rationale

- Apollo Client provides first-class support for GraphQL queries, mutations, and subscriptions in Vue.js.
- GraphQL Subscriptions (over WebSockets) are a standard, scalable way to implement real-time features in SPAs.
- This approach enables instant UI updates for all users without polling or manual refreshes.
- The solution is maintainable, testable, and leverages the existing GraphQL infrastructure.

## Status

Accepted

## Consequences

**Positive:**

- Real-time UI updates for active track name
- Modern, scalable architecture for future real-time features
- Seamless integration with existing GraphQL and Apollo stack

**Negative:**

- Slightly increased complexity in both backend and frontend
- Requires WebSocket support in hosting environment

---

[⬅️ Previous](./ADR-0013-AdoptGraphQL.md) | [🏠 Index(README)](./README.md) | [Next ➡️](./ADR-0015-BuildOptimization.md)
