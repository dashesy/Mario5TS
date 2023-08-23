import './Styles/mario.scss';
import { Level } from './engine';
import { assets } from './assets';
import { keys } from './keys';
import { instrument } from './instrument';
import { LevelFormat } from './types';

export interface MarioGameOptions {
  sound?: boolean;
  level?: number;
  levels?: Array<LevelFormat>;
  instrument?: boolean
}

export function appendMarioTo(host: Element, options: MarioGameOptions = {}) {
  const loadingLevels = options.levels || import('./levels').then(m => m.default);

  return Promise.resolve(loadingLevels).then(levels => {
    const level = new Level(host, options.instrument ? instrument : keys, levels, assets);
    level.load(levels[options.level || 0]);

    if (options.sound !== false) {
      import('./audio').then(({ HtmlAudioManager }) => {
        const sounds = new HtmlAudioManager();
        level.setSounds(sounds);
      });
    }

    return level;
  });
}
