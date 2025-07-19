# ADR 0013: Adopt GraphQL API for Data Fetching and Mutations

## Context

Originally, the Track Manager frontend interacted with a REST API for all data operations (fetching tracks, genres, etc.). As the application grew and requirements for more flexible queries, real-time updates, and efficient data fetching emerged, REST became less optimal. The project required a more expressive and efficient API layer.

## Decision

- Replace the REST API with a GraphQL API for all data fetching and mutations in the frontend.
- Update all data access logic to use GraphQL queries and mutations (e.g., fetching tracks, genres, creating/editing/deleting tracks).
- Use GraphQL for both standard CRUD operations and for enabling real-time features (see next ADR).

## Rationale

- GraphQL allows clients to request exactly the data they need, reducing over-fetching and under-fetching.
- Enables more flexible and maintainable frontend code, especially as the data model evolves.
- Simplifies the addition of new features (e.g., filtering, sorting, pagination) without backend changes for each new endpoint.
- Provides a foundation for real-time updates via GraphQL Subscriptions.
- Compared to gRPC, GraphQL is better supported in the web ecosystem and integrates seamlessly with Vue and Apollo Client.

## Status

Accepted

## Consequences

**Positive:**

- More efficient and flexible data fetching
- Easier to evolve the frontend without backend changes
- Enables real-time features and better developer experience

**Negative:**

- Initial migration effort to rewrite data access logic
- Requires learning curve for contributors unfamiliar with GraphQL

---

[⬅️ Previous](./ADR-0012-FeatureBasedPinia.md) | [🏠 Index(README)](./README.md) | [Next ➡️](./ADR-0014-ApolloRealtimeActiveTrack.md)
