import { useState } from "react";

export interface Wallpaper {
  url: string;
  name: string;
}

export interface Fullwallpaper extends Wallpaper {
  liked: boolean; // Allow both true and false
  library: boolean;
  suggested: boolean;
}

export function useSuggestedWallpapers(): Fullwallpaper[] {
  const wallpapers=useWallpapers();
  return wallpapers.filter(wallpaper=>wallpaper.suggested);
}

export function useLibraryWallpapers(): Fullwallpaper[] {
  const wallpapers=useWallpapers();
  return wallpapers.filter(wallpaper=>wallpaper.library);
}


export function useLikedWallpapers() {
  const [wallpapers, setWallpapers] = useState<Fullwallpaper[]>(useWallpapers());

  const toggleLike = (wallpaper: Wallpaper) => {
    setWallpapers((prevWallpapers) =>
      prevWallpapers.map((w) =>
        w.name === wallpaper.name ? { ...w, liked: !w.liked } : w
      )
    );
  };

  const likedWallpapers = wallpapers.filter((w) => w.liked);

  return { likedWallpapers, toggleLike };
}


export default function useWallpapers(): Fullwallpaper[] {
  return [
    {
      url: "https://ideogram.ai/assets/image/lossless/response/8MFSZq-nRJyYt09QvKpBhA",
      name: "Beauty",
      liked: true,
      suggested: true,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/image/lossless/response/s-78b9x3TbCBn3EIotReIw",
      name: "Nature",
      liked: false,
      suggested: false,
      library: true,
    },
    {
      url: "https://ideogram.ai/assets/image/lossless/response/Lq59Xa8pQEeFvNndk2Xfhg",
      name: "Serenity",
      liked: false,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/yzcPg6rNSriLC4TE6qrYVA",
      name: "Mountains",
      liked: false,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/0247jxjLRcOYwrQlUlPdnw",
      name: "Ocean",
      liked: false,
      suggested: true,
      library: true,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/LLb7cpzLRuyQT2_R1RUvcQ",
      name: "Forest",
      liked: false,
      suggested: true,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/wOg5b0FTTiWx6eli7so54Q",
      name: "Cityscape",
      liked: true,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/VUOIb5CWTaO4BXoVjJfsGA",
      name: "Sunset",
      liked: false,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/ZvGzI0RVQp6udUvBKOqW6w",
      name: "Desert",
      liked: true,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/bV8qqSHlQCeUqkCVdrvuzA",
      name: "Snowy Peak",
      liked: false,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/Od9LWdtySIyPGjRnYe-TKg",
      name: "Wildflowers",
      liked: false,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/5rPhcpMSSz2t_WQ6XxdyVA",
      name: "River",
      liked: false,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/8YVW-HQiTEGX-Wc7w7afkg",
      name: "Countryside",
      liked: false,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/nrCZlAeTSiWEcxWiF0E0ZA",
      name: "Valley",
      liked: false,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/csTBJFBYRPiyoBQfAVqwPg",
      name: "Hills",
      liked: false,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/iqMjGAgeQiihux-YLF7G4Q",
      name: "Plains",
      liked: false,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/AKfojtyHTqW1BgMZJPrLZA",
      name: "Waterfall",
      liked: false,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/PWnJzpRLQhmBuWgG6i42iA",
      name: "Meadow",
      liked: false,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/I5nyl99kRNG3cU8fo6M0nw",
      name: "Glacier",
      liked: false,
      suggested: false,
      library: false,
    },
    {
      url: "https://ideogram.ai/assets/progressive-image/balanced/response/8yuAjqCsQOi0mS4k4Ypupg",
      name: "Aurora",
      liked: false,
      suggested: false,
      library: false,
    },
  ];
}
