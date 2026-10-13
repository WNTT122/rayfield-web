import { describe, expect, it } from 'vitest';
import type { MediaItem } from './mockData';
import { getRayfieldPlaybackOptions } from './RayfieldPlaybackUtils';

describe('Rayfield playback options', () => {
    it('uses the real item id, server and resume position', () => {
        const item: MediaItem = {
            id: 'movie-1', title: 'Movie', year: 2026, type: 'movie', image: '', meta: 'Movie', rating: '8.0', serverId: 'server-1', playbackPositionTicks: 1200
        };
        expect(getRayfieldPlaybackOptions(item)).toEqual({ ids: ['movie-1'], serverId: 'server-1', startPositionTicks: 1200 });
    });

    it('does not create playback options without a server id', () => {
        expect(getRayfieldPlaybackOptions({ id: 'movie-1', title: 'Movie', year: 2026, type: 'movie', image: '', meta: 'Movie', rating: '8.0' })).toBeNull();
    });
});
