import { useEffect, useId, useRef, useState } from "react";

const VIDEO_ID = "vI8YlowxvB4";
const POSTER_WEBP = "/hero/video-poster.webp";
const POSTER_JPG = "/hero/video-poster.jpg";

type YTPlayer = {
  playVideo: () => void;
  setSize: (width: number, height: number) => void;
  destroy: () => void;
};

type YTNamespace = {
  Player: new (
    el: HTMLElement | string,
    opts: {
      videoId: string;
      width?: string | number;
      height?: string | number;
      playerVars?: Record<string, number | string>;
      events?: {
        onReady?: (e: { target: YTPlayer }) => void;
      };
    }
  ) => YTPlayer;
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiLoading: Promise<void> | null = null;

function loadYouTubeApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (apiLoading) return apiLoading;

  apiLoading = new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }

    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      tag.async = true;
      document.head.appendChild(tag);
      return;
    }

    const pollId = window.setInterval(() => {
      if (window.YT?.Player) {
        window.clearInterval(pollId);
        resolve();
      }
    }, 100);
  });

  return apiLoading;
}

function readContainerSize(el: HTMLDivElement | null) {
  if (!el) return null;
  const width = el.clientWidth;
  if (width <= 0) return null;
  const height = el.clientHeight > 0 ? el.clientHeight : Math.round((width * 9) / 16);
  return { width, height };
}

function fitPlayerToContainer(
  aspectEl: HTMLDivElement | null,
  mountEl: HTMLDivElement | null,
  player?: YTPlayer | null
) {
  const size = readContainerSize(aspectEl);
  if (!size) return;

  const { width, height } = size;
  player?.setSize(width, height);

  if (mountEl) {
    mountEl.style.cssText = `position:absolute;top:0;left:0;width:${width}px;height:${height}px;overflow:hidden;`;
  }

  const iframe = mountEl?.querySelector("iframe");
  if (iframe instanceof HTMLIFrameElement) {
    iframe.style.cssText = `position:absolute;top:0;left:0;width:${width}px;height:${height}px;border:0;`;
    iframe.removeAttribute("width");
    iframe.removeAttribute("height");
  }
}

export default function HeroVideoPlayer() {
  const mountId = useId().replace(/:/g, "");
  const aspectRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);

  const [activated, setActivated] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!activated) return;

    let cancelled = false;
    let rafId = 0;

    const syncSize = () => {
      if (!cancelled) {
        fitPlayerToContainer(aspectRef.current, mountRef.current, playerRef.current);
      }
    };

    const scheduleSync = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(syncSize);
    };

    const initPlayer = () => {
      if (cancelled || !mountRef.current || !aspectRef.current || !window.YT) return;

      const size = readContainerSize(aspectRef.current);
      if (!size) {
        requestAnimationFrame(initPlayer);
        return;
      }

      const { width, height } = size;
      const mountEl = mountRef.current;
      mountEl.innerHTML = "";

      playerRef.current = new window.YT.Player(mountEl, {
        videoId: VIDEO_ID,
        width,
        height,
        playerVars: {
          autoplay: 1,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          playsinline: 1,
          cc_load_policy: 0,
          enablejsapi: 1,
          origin: typeof window !== "undefined" ? window.location.origin : "",
        },
        events: {
          onReady: (e) => {
            if (cancelled) return;
            const player = e.target;
            fitPlayerToContainer(aspectRef.current, mountRef.current, player);
            player.playVideo();
            setReady(true);
          },
        },
      });
    };

    loadYouTubeApi().then(initPlayer);

    const resizeObserver = new ResizeObserver(scheduleSync);
    if (aspectRef.current) resizeObserver.observe(aspectRef.current);

    window.addEventListener("resize", scheduleSync);
    window.addEventListener("orientationchange", scheduleSync);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("orientationchange", scheduleSync);
      playerRef.current?.destroy();
      playerRef.current = null;
      if (mountRef.current) mountRef.current.innerHTML = "";
    };
  }, [activated, mountId]);

  return (
    <div className="relative w-full">
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-80 blur-xl"
        style={{
          background:
            "linear-gradient(135deg, rgba(168,85,247,0.45) 0%, rgba(236,72,153,0.2) 45%, rgba(16,185,129,0.35) 100%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-purple-400/40 shadow-[0_0_28px_rgba(168,85,247,0.35),0_0_48px_rgba(16,185,129,0.15)]"
        aria-hidden
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">
        <div ref={aspectRef} className="relative aspect-video w-full overflow-hidden bg-black">
          <picture>
            <source srcSet={POSTER_WEBP} type="image/webp" />
            <img
              src={POSTER_JPG}
              alt="Vista previa del video Mega Pack 4.0"
              decoding="async"
              fetchPriority="high"
              width={854}
              height={480}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
                ready ? "pointer-events-none opacity-0" : "opacity-100"
              }`}
            />
          </picture>

          {activated && (
            <div
              ref={mountRef}
              id={`hero-yt-${mountId}`}
              className="absolute inset-0"
              title="Mega Pack 4.0 — video"
            />
          )}

          {!activated && (
            <button
              type="button"
              onClick={() => setActivated(true)}
              className="absolute inset-0 z-10 flex items-center justify-center transition hover:bg-black/5"
              aria-label="Reproducir video"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 shadow-[0_4px_24px_rgba(0,0,0,0.45)] sm:h-16 sm:w-16">
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-7 w-7 fill-white sm:h-8 sm:w-8"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}

          {activated && !ready && (
            <div
              className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/40"
              aria-hidden
            >
              <div className="h-8 w-8 animate-pulse rounded-full border-2 border-white/30 border-t-white/80" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
