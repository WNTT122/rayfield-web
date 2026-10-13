import { playbackManager } from 'components/playback/playbackmanager';
import type { MediaItem } from './mockData';
import { getRayfieldPlaybackOptions } from './RayfieldPlaybackUtils';

export { getRayfieldPlaybackOptions } from './RayfieldPlaybackUtils';

export type RayfieldPlaybackResult =
    | { ok: true }
    | { ok: false; reason: 'demo' | 'missing-id' | 'missing-server' | 'error'; error?: unknown };

export async function playRayfieldItem(item: MediaItem, demo: boolean): Promise<RayfieldPlaybackResult> {
    if (demo) return { ok: false, reason: 'demo' };
    if (!item.id) return { ok: false, reason: 'missing-id' };
    if (!item.serverId) return { ok: false, reason: 'missing-server' };

    const options = getRayfieldPlaybackOptions(item);
    if (!options) return { ok: false, reason: 'missing-server' };

    try {
        await playbackManager.play(options);
        return { ok: true };
    } catch (error) {
        return { ok: false, reason: 'error', error };
    }
}
