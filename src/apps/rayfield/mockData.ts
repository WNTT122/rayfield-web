export type MediaItem = {
    id: string;
    title: string;
    year: number;
    type: 'movie' | 'series';
    image: string;
    backdrop?: string;
    meta: string;
    rating: string;
    progress?: number;
    episode?: string;
    genres?: string[];
};

export const profiles = [
    { name: 'Alex', role: 'Owner', initials: 'A', color: '#a78bfa', pin: false, admin: true },
    { name: 'Sarah', role: 'Personal', initials: 'S', color: '#fb7185', pin: true, admin: false },
    { name: 'Kids', role: 'Kids profile', initials: 'K', color: '#38bdf8', pin: false, admin: false },
    { name: 'Guest', role: 'Guest profile', initials: 'G', color: '#94a3b8', pin: false, admin: false }
];

const art = (id: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;

export const movies: MediaItem[] = [
    { id: 'orbit', title: 'The Last Orbit', year: 2026, type: 'movie', image: art('photo-1446776811953-b23d57bd21aa'), backdrop: art('photo-1451187580459-43490279c0fa'), meta: '2h 14m', rating: '8.7', genres: ['Sci-Fi', 'Drama'] },
    { id: 'afterglow', title: 'Afterglow', year: 2025, type: 'movie', image: art('photo-1519608487953-e999c86e7455'), meta: '1h 48m', rating: '8.2', genres: ['Drama', 'Mystery'] },
    { id: 'north', title: 'Northbound', year: 2025, type: 'movie', image: art('photo-1464822759023-fed622ff2c3b'), meta: '2h 02m', rating: '7.9', genres: ['Adventure'] },
    { id: 'signal', title: 'Signal / Noise', year: 2024, type: 'movie', image: art('photo-1518770660439-4636190af475'), meta: '1h 51m', rating: '8.1', genres: ['Thriller'] },
    { id: 'tide', title: 'Tidal Memory', year: 2024, type: 'movie', image: art('photo-1507525428034-b723cf961d3e'), meta: '1h 42m', rating: '7.8', genres: ['Drama'] },
    { id: 'echo', title: 'Echo Valley', year: 2023, type: 'movie', image: art('photo-1464278533981-50106e6176b1'), meta: '2h 06m', rating: '8.4', genres: ['Drama', 'Indie'] },
    { id: 'horizon', title: 'Horizon Line', year: 2023, type: 'movie', image: art('photo-1470770841072-f978cf4d019e'), meta: '1h 55m', rating: '7.6', genres: ['Adventure'] },
    { id: 'monument', title: 'Monument', year: 2022, type: 'movie', image: art('photo-1500534623283-312aade485b7'), meta: '2h 21m', rating: '8.0', genres: ['History'] }
];

export const shows: MediaItem[] = [
    { id: 'atlas', title: 'Atlas Division', year: 2026, type: 'series', image: art('photo-1518391846015-55a9cc003b25'), backdrop: art('photo-1511497584788-876760111969'), meta: '2 seasons', rating: '9.1', episode: 'S02 E04' },
    { id: 'static', title: 'Static Bloom', year: 2025, type: 'series', image: art('photo-1534791547706-6e61b3f567b2'), meta: '1 season', rating: '8.6', episode: 'S01 E07' },
    { id: 'wild', title: 'Wild Meridian', year: 2024, type: 'series', image: art('photo-1500534623283-312aade485b7'), meta: '3 seasons', rating: '8.8', episode: 'S03 E02' },
    { id: 'common', title: 'Common Ground', year: 2024, type: 'series', image: art('photo-1500534623283-312aade485b7'), meta: '2 seasons', rating: '8.3', episode: 'S02 E08' }
];

export const continueWatching = [
    { ...shows[0], progress: 68, episode: 'S02 E04 · The Quiet Signal' },
    { ...movies[1], progress: 42 },
    { ...shows[1], progress: 24, episode: 'S01 E07 · Bloom' },
    { ...movies[2], progress: 81 }
];

export const activeStreams = [
    { user: 'Sarah', media: 'Atlas Division', playback: 'Direct Play', client: 'Web · Chrome', color: '#fb7185' },
    { user: 'Alex', media: 'The Last Orbit', playback: 'Direct Stream', client: 'Android TV', color: '#a78bfa' },
    { user: 'Kids', media: 'Wild Meridian', playback: 'Transcoding', client: 'iPadOS', color: '#38bdf8' }
];

export const serverStats = [
    { label: 'CPU usage', value: '18%', detail: 'of 16 cores', icon: 'CPU' },
    { label: 'Memory', value: '6.2 GB', detail: 'of 32 GB', icon: 'RAM' },
    { label: 'Storage', value: '8.4 TB', detail: 'of 24 TB used', icon: 'DISK' },
    { label: 'Uptime', value: '42d 08h', detail: 'since last restart', icon: 'UP' }
];

export const navItems = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'movies', label: 'Movies', icon: '▣' },
    { id: 'shows', label: 'TV Shows', icon: '▤' },
    { id: 'live', label: 'Live TV', icon: '◉' },
    { id: 'collections', label: 'Collections', icon: '◫' },
    { id: 'favorites', label: 'Favourites', icon: '♡' }
];
