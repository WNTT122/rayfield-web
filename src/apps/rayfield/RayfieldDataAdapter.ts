import { BaseItemKind } from '@jellyfin/sdk/lib/generated-client/models/base-item-kind';
import { ImageType } from '@jellyfin/sdk/lib/generated-client/models/image-type';
import { ItemFields } from '@jellyfin/sdk/lib/generated-client/models/item-fields';
import { ItemSortBy } from '@jellyfin/sdk/lib/generated-client/models/item-sort-by';
import { SortOrder } from '@jellyfin/sdk/lib/generated-client/models/sort-order';
import { useGetItems } from 'hooks/useFetchItems';
import { useApi } from 'hooks/useApi';
import { useNextUp } from 'apps/legacy/features/libraries/api/useNextUp';
import { useResumeItems } from 'apps/legacy/features/libraries/api/useResumeItems';
import { useUserViews } from 'hooks/api/useUserViews';
import { getImageUrl } from 'apps/legacy/features/playback/utils/image';
import type { MediaItem } from './mockData';
import { isRayfieldDemoEnabled, mapRayfieldMetadata } from './RayfieldDataAdapterUtils';

const isDemo = typeof window !== 'undefined'
    && isRayfieldDemoEnabled(process.env.VITE_RAYFIELD_DEMO, window.location.search);

const toMediaItem = (item: any, type: MediaItem['type']): MediaItem => ({
    ...mapRayfieldMetadata(item, type),
    image: getImageUrl(item, { type: ImageType.Primary, maxHeight: 720 }) || '',
    backdrop: getImageUrl(item, { type: ImageType.Backdrop, maxHeight: 900 }) || undefined,
    meta: type === 'movie'
        ? (item.RunTimeTicks ? `${Math.round(item.RunTimeTicks / 600000000)} min` : 'Movie')
        : (item.RecursiveItemCount ? `${item.RecursiveItemCount} episodes` : 'TV series'),
    rating: item.CommunityRating ? Number(item.CommunityRating).toFixed(1) : '—',
    progress: item.UserData?.PlayedPercentage,
    episode: type === 'series' && item.ParentIndexNumber != null && item.IndexNumber != null
        ? `S${String(item.ParentIndexNumber).padStart(2, '0')} E${String(item.IndexNumber).padStart(2, '0')}`
        : undefined,
    genres: item.Genres || []
});

const itemFields = [
    ItemFields.DateCreated,
    ItemFields.Overview,
    ItemFields.PrimaryImageAspectRatio,
    ItemFields.Genres,
    ItemFields.MediaStreams,
    ItemFields.SeasonUserData,
    ItemFields.ItemCounts
];

export function useRayfieldData() {
    const { api, user } = useApi();
    const enabled = Boolean(api && user?.Id) && !isDemo;
    const views = useUserViews();
    const resume = useResumeItems({ limit: 12, fields: itemFields, enableImageTypes: [ImageType.Primary, ImageType.Backdrop] });
    const nextUp = useNextUp({ limit: 12, fields: itemFields, enableImageTypes: [ImageType.Primary, ImageType.Backdrop] });
    const movies = useGetItems({
        includeItemTypes: [BaseItemKind.Movie],
        recursive: true,
        limit: 24,
        sortBy: [ItemSortBy.SortName],
        sortOrder: [SortOrder.Ascending],
        fields: itemFields,
        enableImageTypes: [ImageType.Primary, ImageType.Backdrop]
    });
    const shows = useGetItems({
        includeItemTypes: [BaseItemKind.Series],
        recursive: true,
        limit: 24,
        sortBy: [ItemSortBy.SortName],
        sortOrder: [SortOrder.Ascending],
        fields: itemFields,
        enableImageTypes: [ImageType.Primary, ImageType.Backdrop]
    });

    const loading = enabled && [views, resume, nextUp, movies, shows].some(query => query.isLoading);
    const error = enabled && [views, resume, nextUp, movies, shows].find(query => query.error)?.error;
    const hasData = Boolean(views.data || resume.data || nextUp.data || movies.data || shows.data);

    return {
        enabled,
        isAuthenticated: Boolean(user?.Id),
        loading,
        error,
        hasData,
        libraries: views.data?.Items || [],
        continueWatching: (resume.data?.Items || []).map(item => toMediaItem(item, item.Type === BaseItemKind.Movie ? 'movie' : 'series')),
        nextUp: (nextUp.data?.Items || []).map(item => toMediaItem(item, 'series')),
        movies: (movies.data?.Items || []).map(item => toMediaItem(item, 'movie')),
        shows: (shows.data?.Items || []).map(item => toMediaItem(item, 'series'))
    };
}

export function mapRayfieldItem(item: any, type: MediaItem['type']) {
    return toMediaItem(item, type);
}

export { isDemo };
