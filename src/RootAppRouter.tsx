import React from 'react';
import { createMemoryHistory } from 'history';

import RayfieldApp from 'apps/rayfield/RayfieldApp';

/**
 * Rayfield's frontend shell is intentionally isolated from the legacy Jellyfin
 * route tree while the visual system is being established.
 */
export const history = createMemoryHistory();

export default function RootAppRouter() {
    return <RayfieldApp />;
}
