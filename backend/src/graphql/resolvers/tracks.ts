import * as db from '../../utils/db';
import { Track } from '../../types';
import { createSlug } from '../../utils/slug';

export const trackResolvers = {
    Query: {
        tracks: async (_: unknown, args: { filter?: any }) => {
            const filter = args.filter || {};
            const { tracks, total } = await db.getTracks(filter);

            return {
                data: tracks,
                meta: {
                    total,
                    page: filter.page || 1,
                    limit: filter.limit || 10,
                    totalPages: Math.ceil(total / (filter.limit || 10)),
                },
            };
        },
        track: async (_: unknown, args: { id: string }) => {
            return db.getTrackById(args.id);
        },
        genres: async () => {
            return db.getGenres();
        },
        trackBySlug: async (_: unknown, args: { slug: string }) => {
            return db.getTrackBySlug(args.slug)
        }
    },
    Mutation: {
        createTrack: async (_: unknown, args: { input: Omit<Track, 'id' | 'createdAt' | 'updatedAt'> }) => {
            const slug = createSlug(args.input.title);

            const existing = await db.getTrackBySlug(slug);
            if (existing) {
                throw new Error('A track with this title already exists');
            }

            return db.createTrack({
                ...args.input,
                slug,
            });
        },
        updateTrack: async (_: unknown, args: { id: string; input: Partial<Track> }) => {
            return db.updateTrack(args.id, args.input);
        },
        deleteTrack: async (_: unknown, args: { id: string }) => {
            return db.deleteTrack(args.id);
        },
        deleteTracks: async (_: unknown, args: { ids: string[] }) => {
            return db.deleteMultipleTracks(args.ids);
        },
    },
};
