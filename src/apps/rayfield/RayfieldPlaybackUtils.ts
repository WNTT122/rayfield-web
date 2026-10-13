import type { MediaItem } from './mockData';

export function getRayfieldPlaybackOptions(item: MediaItem) {
    if (!item.id || !item.serverId) return null;
    return { ids: [item.id], serverId: item.serverId, startPositionTicks: item.playbackPositionTicks || 0 };
}
