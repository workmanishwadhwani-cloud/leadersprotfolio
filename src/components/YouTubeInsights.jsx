import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Calendar, ExternalLink, Youtube, RefreshCw } from 'lucide-react';

// ─────────────────────────────────────────────
//  CONFIG — swap these two values with your own
// ─────────────────────────────────────────────
const YT_API_KEY = 'AIzaSyDgX_vlkeAmN8AvP-c0YkqsLMxRO1PIhzg';
const YT_CHANNEL_ID = 'UCp6nJBPGAhzF1yTrc3gvnsw';
// The uploads playlist is always "UC..." → "UU..." (replace UC with UU)
const YT_PLAYLIST_ID = YT_CHANNEL_ID.replace(/^UC/, 'UU');
const MAX_RESULTS = 3;

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────
function formatDate(iso) {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Determine how long ago
function timeAgo(iso) {
    if (!iso) return '';
    const diff = Date.now() - new Date(iso).getTime();
    const days = Math.floor(diff / 86_400_000);
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
}

// ─────────────────────────────────────────────
//  Fetch strategies
// ─────────────────────────────────────────────

/** Strategy 1 — YouTube Data API v3 (playlistItems) */
async function fetchViaAPI() {
    if (!YT_API_KEY || YT_API_KEY === 'YOUR_YOUTUBE_API_KEY') {
        throw new Error('API key not configured');
    }

    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('playlistId', YT_PLAYLIST_ID);
    url.searchParams.set('maxResults', MAX_RESULTS);
    url.searchParams.set('key', YT_API_KEY);

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`YouTube API error ${res.status}`);

    const data = await res.json();
    return (data.items || []).map((item) => {
        const s = item.snippet;
        return {
            videoId: s.resourceId?.videoId ?? '',
            title: s.title,
            thumbnail: s.thumbnails?.high?.url || s.thumbnails?.medium?.url || '',
            published: s.publishedAt,
            url: `https://www.youtube.com/watch?v=${s.resourceId?.videoId ?? ''}`,
        };
    });
}

/** Strategy 2 — YouTube RSS feed (no API key needed, CORS proxy required) */
async function fetchViaRSS() {
    if (!YT_CHANNEL_ID || YT_CHANNEL_ID === 'YOUR_CHANNEL_ID') {
        throw new Error('Channel ID not configured');
    }

    // Use a CORS-friendly proxy or your own backend
    const rssFeed = `https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssFeed)}`;

    const res = await fetch(proxyUrl);
    if (!res.ok) throw new Error(`RSS proxy error ${res.status}`);

    const { contents } = await res.json();
    const parser = new DOMParser();
    const doc = parser.parseFromString(contents, 'text/xml');
    const entries = Array.from(doc.querySelectorAll('entry')).slice(0, MAX_RESULTS);

    return entries.map((entry) => {
        const videoId = entry.querySelector('videoId')?.textContent ?? '';
        const title = entry.querySelector('title')?.textContent ?? '';
        const thumbnail = entry.querySelector('thumbnail')?.getAttribute('url')
            ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
        const published = entry.querySelector('published')?.textContent ?? '';
        return {
            videoId,
            title,
            thumbnail,
            published,
            url: `https://www.youtube.com/watch?v=${videoId}`,
        };
    });
}

// ─────────────────────────────────────────────
//  Demo / placeholder data shown while no key
// ─────────────────────────────────────────────
const DEMO_VIDEOS = [
    {
        videoId: 'demo1',
        title: 'The Silent Leadership Crisis No One Talks About',
        thumbnail: '',
        published: new Date(Date.now() - 2 * 86_400_000).toISOString(),
        url: 'https://www.youtube.com/',
    },
    {
        videoId: 'demo2',
        title: 'How Executive Presence Is Actually Built',
        thumbnail: '',
        published: new Date(Date.now() - 9 * 86_400_000).toISOString(),
        url: 'https://www.youtube.com/',
    },
    {
        videoId: 'demo3',
        title: 'Why High Performers Stop Growing — And How to Restart',
        thumbnail: '',
        published: new Date(Date.now() - 18 * 86_400_000).toISOString(),
        url: 'https://www.youtube.com/',
    },
];

// ─────────────────────────────────────────────
//  Video Card
// ─────────────────────────────────────────────
const VideoCard = ({ video, index }) => {
    const [play, setPlay] = useState(false);
    const [imgError, setImgError] = useState(false);
    const isDemo = video.videoId.startsWith('demo');

    // Fallback gradient thumbnails for demo cards
    const gradients = [
        'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        'linear-gradient(135deg, #1c1c1c 0%, #2d1b0e 50%, #3d2108 100%)',
        'linear-gradient(135deg, #0a0a0c 0%, #1a0d24 50%, #2d1547 100%)',
    ];

    return (
        <motion.article
            id={`yt-card-${index}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="yt-card group"
        >
            {/* Thumbnail */}
            <div
                className="yt-thumb-wrapper"
                onClick={() => setPlay(true)}
                aria-label={`Watch: ${video.title}`}
                style={{ cursor: "pointer" }}
            >

                {play ? (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
                        title={video.title}
                        frameBorder="0"
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                        className="yt-video-frame"
                    />
                ) : (
                    <>
                        {!imgError && video.thumbnail ? (
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="yt-thumb-img"
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <div
                                className="yt-thumb-placeholder"
                                style={{ background: gradients[index % gradients.length] }}
                            >
                                <Youtube size={48} className="text-accent/40" />
                            </div>
                        )}

                        <div className="yt-thumb-overlay">
                            <motion.div
                                className="yt-play-btn"
                                whileHover={{ scale: 1.12 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Play size={22} fill="black" className="ml-1" />
                            </motion.div>
                        </div>
                    </>
                )}

            </div>

            {/* NEW badge */}
            {index === 0 && (
                <span className="yt-new-badge">Latest Insight</span>
            )}

            {/* Card Body */ }
    <div className="yt-card-body">
        {/* Date */}
        <div className="yt-meta">
            <Calendar size={12} className="text-accent shrink-0" />
            <time dateTime={video.published} className="yt-date">
                {formatDate(video.published)}
            </time>
            <span className="yt-time-ago">{timeAgo(video.published)}</span>
        </div>

        {/* Title */}
        <h3 className="yt-title">
            <a href={video.url} target="_blank" rel="noopener noreferrer">
                {video.title}
            </a>
        </h3>

        {/* Watch CTA */}
        <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="yt-watch-btn"
        >
            <Youtube size={14} />
            Watch on YouTube
            <ExternalLink size={12} className="ml-auto opacity-60" />
        </a>
    </div>

    {
        isDemo && (
            <div className="yt-demo-notice">
                Demo — add your Channel ID &amp; API Key to load real videos
            </div>
        )
    }
        </motion.article >
    );
};

// ─────────────────────────────────────────────
//  Skeleton loader
// ─────────────────────────────────────────────
const SkeletonCard = () => (
    <div className="yt-card yt-skeleton" aria-hidden="true">
        <div className="yt-thumb-wrapper yt-skel-thumb" />
        <div className="yt-card-body" style={{ gap: '0.75rem' }}>
            <div className="yt-skel-line" style={{ width: '40%', height: '10px' }} />
            <div className="yt-skel-line" style={{ width: '90%', height: '16px' }} />
            <div className="yt-skel-line" style={{ width: '75%', height: '16px' }} />
            <div className="yt-skel-line" style={{ width: '50%', height: '12px', marginTop: '0.5rem' }} />
        </div>
    </div>
);

// ─────────────────────────────────────────────
//  Main Section Component
// ─────────────────────────────────────────────
const YouTubeInsights = () => {
    const [videos, setVideos] = useState([]);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error | demo
    const [errorMsg, setErrorMsg] = useState('');
    const hasFetched = useRef(false);

    const loadVideos = async () => {
        setStatus('loading');
        setErrorMsg('');

        // If neither key nor channel is configured, show demo immediately
        if (
            YT_API_KEY === 'YOUR_YOUTUBE_API_KEY' &&
            YT_CHANNEL_ID === 'YOUR_CHANNEL_ID'
        ) {
            await new Promise(r => setTimeout(r, 800)); // simulate network
            setVideos(DEMO_VIDEOS);
            setStatus('demo');
            return;
        }

        // Try API first, fall back to RSS
        try {
            const data = await fetchViaAPI();
            setVideos(data);
            setStatus('success');
        } catch (apiErr) {
            console.warn('[YouTubeInsights] API fetch failed, trying RSS…', apiErr.message);
            try {
                const data = await fetchViaRSS();
                setVideos(data);
                setStatus('success');
            } catch (rssErr) {
                console.error('[YouTubeInsights] RSS fetch also failed:', rssErr.message);
                setVideos(DEMO_VIDEOS);
                setStatus('demo');
                setErrorMsg('Could not load live data. Showing sample content.');
            }
        }
    };

    useEffect(() => {
        if (!hasFetched.current) {
            hasFetched.current = true;
            loadVideos();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section id="insights" className="section scroll-mt-28">
            <div className="container">

                {/* ── Section Header ── */}
                <div className="yt-header">
                    <span className="section-label">Thought Leadership</span>
                    <motion.h2
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="text-3xl md:text-4xl font-black uppercase mt-3"
                        style={{ fontFamily: 'var(--font-heading)' }}
                    >
                        Latest Leadership <span className="text-accent accent-underline">Insights</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="yt-subtitle"
                    >
                        Fresh perspectives on executive leadership, culture, and high-performance teams —
                        straight from the channel.
                    </motion.p>

                    {/* Live indicator */}
                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="yt-live-badge"
                        >
                            <span className="yt-live-dot" />
                            Auto-updating from YouTube
                        </motion.div>
                    )}
                </div>

                {/* ── Error / Demo Banner ── */}
                {errorMsg && (
                    <div className="yt-error-banner">
                        <span>{errorMsg}</span>
                        <button onClick={loadVideos} className="yt-retry-btn">
                            <RefreshCw size={13} /> Retry
                        </button>
                    </div>
                )}

                {/* ── Grid ── */}
                <div className="yt-grid">
                    {status === 'loading'
                        ? Array.from({ length: MAX_RESULTS }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))
                        : videos.map((v, i) => (
                            <VideoCard key={v.videoId} video={v} index={i} />
                        ))}
                </div>

                {/* ── Channel CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="yt-channel-cta"
                >
                    <a
                        id="yt-channel-link"
                        href={`https://www.youtube.com/channel/${YT_CHANNEL_ID}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline gap-3"
                    >
                        <Youtube size={18} className="text-accent" />
                        View All Videos on YouTube
                        <ExternalLink size={14} className="opacity-50" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default YouTubeInsights;
