import Artplayer from 'artplayer';
// 通过 typeof 或 Artplayer['option'] 方式获取类型
type Option = ConstructorParameters<typeof Artplayer>[0];

export type ArtplayerOption = Partial<Option>;

let defaultOptions: ArtplayerOption = {
  volume: 0.5,
  isLive: false,
  muted: false,
  autoplay: false,
  pip: true,
  autoSize: false,
  autoMini: true,
  screenshot: true,
  setting: true,
  playbackRate: true,
  aspectRatio: true,
  fullscreen: true,
  fullscreenWeb: true,
  subtitleOffset: true,
  miniProgressBar: true,
  mutex: true,
  backdrop: true,
  playsInline: true,
  autoPlayback: true,
  airplay: true,
  theme: '#23ade5',
  lang: 'zh-cn',
};

export function setupArtPlayer(options: ArtplayerOption) {
  defaultOptions = { ...defaultOptions, ...options };
}

export function mergeArtPlayerOptions(options: ArtplayerOption) {
  return { ...defaultOptions, ...options };
}
