import { trackResolvers } from './tracks';

import { PubSub } from 'graphql-subscriptions';
const pubsub = new PubSub();
const ACTIVE_TRACK_CHANGED = 'ACTIVE_TRACK_CHANGED';

let allTrackTitles: string[] = [];
let currentTrackTitle = '';

function pickRandomTrackTitle(): string {
    if (allTrackTitles.length === 0) return 'No tracks available';
    let nextTitle: string;
    do {
        nextTitle = allTrackTitles[Math.floor(Math.random() * allTrackTitles.length)];
    } while (nextTitle === currentTrackTitle);
    return nextTitle;
}

async function loadTrackTitles() {
    const { tracks } = await import('../../utils/db').then(m => m.getTracks({ page: 1, limit: 1000 }));
    allTrackTitles = tracks.map(t => t.title);
}

function startTrackSwitcher() {
    setInterval(() => {
        currentTrackTitle = pickRandomTrackTitle();
        pubsub.publish(ACTIVE_TRACK_CHANGED, { activeTrackTitle: currentTrackTitle });
    }, 2000);
}

export async function initActiveTrackStreaming() {
    await loadTrackTitles();
    startTrackSwitcher();
}

export const resolvers = {
    ...trackResolvers,
    Subscription: {
        activeTrackTitle: {
            subscribe: () => pubsub.asyncIterableIterator(ACTIVE_TRACK_CHANGED),
        },
    },
};
