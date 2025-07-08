import { gql } from '@apollo/client/core'
import { apolloClient } from '@/shared/services/graphql/apollo'
import type { Track, BatchDeleteResponse } from '@/features/tracks/schema/trackSchema'
import type { TrackQuery, PaginatedTracks } from '@/features/filters/schema/trackQuerySchema'
import { Result, ok, err } from 'neverthrow'

export async function getGenres(): Promise<Result<string[], Error>> {
  try {
    const { data } = await apolloClient.query<{ genres: string[] }>({
      query: gql`
        query GetGenres {
          genres
        }
      `,
    })
    return ok(data.genres)
  } catch (e) {
    return err(e instanceof Error ? e : new Error('Unexpected error'))
  }
}
// === GET TRACK BY SLUG ===
export async function getTrackBySlug(slug: string): Promise<Result<Track, Error>> {
  try {
    const { data } = await apolloClient.query<{ track: Track }>({
      query: gql`
        query GetTrackBySlug($slug: String) {
          trackBySlug(slug: $slug) {
            id
            title
            artist
            album
            genres
            slug
            coverImage
            audioFile
            createdAt
            updatedAt
          }
        }
      `,
      variables: { slug },
    })
    return ok(data.track)
  } catch (e) {
    return err(e instanceof Error ? e : new Error('Unexpected error'))
  }
}

export async function getTrackById(id: string): Promise<Result<Track, Error>> {
  try {
    const { data } = await apolloClient.query<{ track: Track }>({
      query: gql`
        query GetTrackById($id: ID!) {
          track(id: $id) {
            id
            title
            artist
            album
            slug
            genres
            coverImage
            audioFile
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id },
    })
    return ok(data.track)
  } catch (e) {
    return err(e instanceof Error ? e : new Error('Unexpected error'))
  }
}

export async function getTracks(query: TrackQuery): Promise<Result<PaginatedTracks, Error>> {
  try {
    const { data } = await apolloClient.query<{ tracks: PaginatedTracks }>({
      query: gql`
        query GetTracks($filter: TrackFilter) {
          tracks(filter: $filter) {
            data {
              id
              title
              artist
              album
              slug
              genres
              coverImage
              audioFile
              createdAt
              updatedAt
            }
            meta {
              total
              page
              limit
              totalPages
            }
          }
        }
      `,
      variables: {
        filter: query,
      },
    })

    return ok(data.tracks)
  } catch (e) {
    return err(e instanceof Error ? e : new Error('Unexpected error'))
  }
}

export async function createTrack(
  input: Omit<Track, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Result<Track, Error>> {
  try {
    const { data } = await apolloClient.mutate<{ createTrack: Track }>({
      mutation: gql`
        mutation CreateTrack($input: CreateTrackInput!) {
          createTrack(input: $input) {
            id
            title
            artist
            slug
            album
            genres
            coverImage
            audioFile
            createdAt
            updatedAt
          }
        }
      `,
      variables: { input },
    })

    if (!data?.createTrack) {
      return err(new Error('No track returned from mutation'))
    }

    return ok(data.createTrack)
  } catch (e) {
    return err(e instanceof Error ? e : new Error('Unexpected error'))
  }
}

function getUpdateInput(input: Partial<Track>) {
  const { title, artist, album, genres, coverImage, audioFile } = input
  return { title, artist, album, genres, coverImage, audioFile }
}

export async function updateTrack(
  id: string,
  input: Partial<Track>
): Promise<Result<Track, Error>> {
  try {
    const cleanInput = getUpdateInput(input)
    const { data } = await apolloClient.mutate<{ updateTrack: Track }>({
      mutation: gql`
        mutation UpdateTrack($id: ID!, $input: UpdateTrackInput!) {
          updateTrack(id: $id, input: $input) {
            id
            title
            artist
            album
            genres
            slug
            coverImage
            audioFile
            createdAt
            updatedAt
          }
        }
      `,
      variables: { id, input: cleanInput },
    })

    if (!data?.updateTrack) {
      return err(new Error('No track returned from update mutation'))
    }

    return ok(data.updateTrack)
  } catch (e) {
    return err(e instanceof Error ? e : new Error('Unexpected error'))
  }
}
export async function deleteTrack(id: string): Promise<Result<boolean, Error>> {
  try {
    const { data } = await apolloClient.mutate<{ deleteTrack: boolean }>({
      mutation: gql`
        mutation DeleteTrack($id: ID!) {
          deleteTrack(id: $id)
        }
      `,
      variables: { id },
    })

    if (data?.deleteTrack === undefined) {
      return err(new Error('No response from deleteTrack mutation'))
    }

    return ok(data.deleteTrack)
  } catch (e) {
    return err(e instanceof Error ? e : new Error('Unexpected error'))
  }
}

export async function bulkDeleteTracks(ids: string[]): Promise<Result<BatchDeleteResponse, Error>> {
  try {
    const { data } = await apolloClient.mutate<{ deleteTracks: BatchDeleteResponse }>({
      mutation: gql`
        mutation DeleteTrack($ids: [ID!]!) {
          deleteTracks(ids: $ids) {
            success
            failed
          }
        }
      `,
      variables: { ids },
    })

    if (data?.deleteTracks === undefined) {
      return err(new Error('No response from deleteTrack mutation'))
    }

    return ok(data.deleteTracks)
  } catch (e) {
    return err(e instanceof Error ? e : new Error('Unexpected error'))
  }
}
