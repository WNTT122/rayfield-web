import { describe, expect, it } from 'vitest';

import { isRayfieldDemoEnabled, mapRayfieldMetadata } from './RayfieldDataAdapterUtils';

describe('RayfieldDataAdapter', () => {
    it('requires both the build flag and mock query parameter for demo mode', () => {
        expect(isRayfieldDemoEnabled('true', '?rayfieldMock=1')).toBe(true);
        expect(isRayfieldDemoEnabled('false', '?rayfieldMock=1')).toBe(false);
        expect(isRayfieldDemoEnabled('true', '')).toBe(false);
        expect(isRayfieldDemoEnabled(undefined, '?rayfieldMock=1')).toBe(false);
    });

    it('maps Jellyfin item metadata without inventing an item id', () => {
        const item = mapRayfieldMetadata({
            Id: 'movie-123',
            Name: 'A Real Movie',
            ProductionYear: 2024,
            Type: 'Movie',
            CommunityRating: 8.4,
            Genres: ['Drama']
        }, 'movie');

        expect(item).toMatchObject({
            id: 'movie-123',
            title: 'A Real Movie',
            year: 2024,
            rating: '8.4',
            genres: ['Drama']
        });
    });
});
