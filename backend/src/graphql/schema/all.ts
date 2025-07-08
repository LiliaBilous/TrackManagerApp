import { tracksSchema } from './tracks';
import { schema as subscriptionOnlySchema } from './schema';

export const fullSchema = `
  ${tracksSchema}

  type Subscription {
    activeTrackTitle: String!
  }
`;
