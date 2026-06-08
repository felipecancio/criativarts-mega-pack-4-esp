import { motion } from "motion/react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

const VIDEO_ID = "vI8YlowxvB4";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  getPlayerState: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
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
        onStateChange?: (e: { data: number }) => void;
      };
    }
  ) => YTPlayer;
  PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
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
  const primedRef = useRef(false);

  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    let cancelled = false;
    let rafId = 0;
    let primeTimer = 0;
    primedRef.current = false;
    setReady(false);

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
          autoplay: 0,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          iv_load_policy: 3,
          fs: 0,
          disablekb: 1,
          playsinline: 1,
          cc_load_policy: 0,
          start: 0,
          enablejsapi: 1,
          origin: typeof window !== "undefined" ? window.location.origin : "",
        },
        events: {
          onReady: (e) => {
            if (cancelled) return;
            const player = e.target;
            player.mute();
            player.seekTo(0, true);
            fitPlayerToContainer(aspectRef.current, mountRef.current, player);
            // Reproduz silenciosamente por um instante para carregar o frame inicial real do vídeo
            player.playVideo();
          },
          onStateChange: (e) => {
            if (cancelled) return;
            const player = playerRef.current;
            if (!player) return;

            if (!primedRef.current && e.data === window.YT!.PlayerState.PLAYING) {
              primeTimer = window.setTimeout(() => {
                if (cancelled || primedRef.current) return;
                player.pauseVideo();
                player.seekTo(0, true);
                primedRef.current = true;
                fitPlayerToContainer(aspectRef.current, mountRef.current, player);
                setReady(true);
              }, 400);
              return;
            }

            const isPlaying = e.data === window.YT!.PlayerState.PLAYING;
            setPlaying(isPlaying);
            if (isPlaying) setStarted(true);
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
      primedRef.current = false;
      window.clearTimeout(primeTimer);
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleSync);
      window.removeEventListener("orientationchange", scheduleSync);
      playerRef.current?.destroy();
      playerRef.current = null;
      if (mountRef.current) mountRef.current.innerHTML = "";
    };
  }, [mountId]);

  const handlePlayPause = () => {
    const player = playerRef.current;
    if (!player) return;
    if (playing) {
      player.pauseVideo();
      setPlaying(false);
    } else {
      player.playVideo();
      setStarted(true);
      setPlaying(true);
    }
  };

  const handleStart = () => {
    const player = playerRef.current;
    if (!player) return;
    player.unMute();
    setMuted(false);
    player.playVideo();
    setStarted(true);
    setPlaying(true);
  };

  const handleMuteToggle = () => {
    const player = playerRef.current;
    if (!player) return;
    if (player.isMuted()) {
      player.unMute();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  };

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
          <div
            ref={mountRef}
            id={`hero-yt-${mountId}`}
            className="absolute inset-0 [&_iframe]:pointer-events-none"
            title="Mega Pack 4.0 — video"
          />

          {!ready && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-black" aria-hidden>
              <div className="h-8 w-8 animate-pulse rounded-full border-2 border-white/30 border-t-white/80" />
            </div>
          )}

          {!started && (
            <button
              type="button"
              onClick={handleStart}
              disabled={!ready}
              className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 transition hover:bg-black/5 disabled:cursor-wait disabled:bg-black/40"
              aria-label="Reproducir video"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/95 text-black shadow-[0_0_24px_rgba(255,255,255,0.35)] sm:h-14 sm:w-14"
              >
                <Play className="ml-0.5 h-6 w-6 fill-black sm:h-7 sm:w-7" />
              </motion.span>
            </button>
          )}

          {started && (
            <div className="absolute bottom-2 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-black/75 px-2 py-1.5 backdrop-blur-md">
              <button
                type="button"
                onClick={handlePlayPause}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/10"
                aria-label={playing ? "Pausar" : "Reproducir"}
              >
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white" />}
              </button>
              <button
                type="button"
                onClick={handleMuteToggle}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/10"
                aria-label={muted ? "Activar sonido" : "Silenciar"}
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
