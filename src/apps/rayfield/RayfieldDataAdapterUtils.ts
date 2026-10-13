export function isRayfieldDemoEnabled(flag: string | undefined, search: string) {
    return flag === 'true' && new URLSearchParams(search).get('rayfieldMock') === '1';
}

export function mapRayfieldMetadata(item: any, type: 'movie' | 'series') {
    return {
        id: item.Id,
        title: item.Name || 'Untitled',
        year: item.ProductionYear || new Date(item.PremiereDate || item.DateCreated || 0).getFullYear() || 0,
        type,
        rating: item.CommunityRating ? Number(item.CommunityRating).toFixed(1) : '—',
        genres: item.Genres || []
    };
}
