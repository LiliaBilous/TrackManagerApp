export const schema = `
  type Track {
    id: ID!
    title: String!
    artist: String!
    album: String
    genres: [String!]!
    slug: String
    coverImage: String
    audioFile: String
    createdAt: String!
    updatedAt: String!
  }


  type Subscription {
    activeTrackTitle: String!
  }
`;
