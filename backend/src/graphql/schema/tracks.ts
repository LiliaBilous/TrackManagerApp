export const tracksSchema = `
  input CreateTrackInput {
    title: String!
    artist: String!
    album: String
    genres: [String!]!
    coverImage: String
  }

  input UpdateTrackInput {
    title: String
    artist: String
    album: String
    genres: [String!]
    coverImage: String
    audioFile: String
  }

  input TrackFilter {
    page: Int
    limit: Int
    sort: String
    order: String
    search: String
    genre: String
    artist: String
  }

  type Track {
    id: ID!
    title: String!
    artist: String!
    album: String
    genres: [String!]!
    slug: String!
    coverImage: String
    audioFile: String
    createdAt: String!
    updatedAt: String!
  }

  type PaginationMeta {
    total: Int!
    page: Int!
    limit: Int!
    totalPages: Int!
  }

  type PaginatedTracks {
    data: [Track!]!
    meta: PaginationMeta!
  }

  type BatchDeleteResponse {
    success: [ID!]!
    failed: [ID!]!
  }

  type Query {
    tracks(filter: TrackFilter): PaginatedTracks!
    track(id: ID!): Track
    genres: [String!]!
    trackBySlug(slug: String!): Track
  }

  type Mutation {
    createTrack(input: CreateTrackInput!): Track!
    updateTrack(id: ID!, input: UpdateTrackInput!): Track
    deleteTrack(id: ID!): Boolean!
    deleteTracks(ids: [ID!]!): BatchDeleteResponse!
  }
`;
