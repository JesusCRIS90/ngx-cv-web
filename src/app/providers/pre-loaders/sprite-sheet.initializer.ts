// import { APP_INITIALIZER, inject, Provider } from '@angular/core';
import { inject, provideAppInitializer, EnvironmentProviders } from '@angular/core';

import { SpriteSheetManager } from '@beexy/tools'
import { APP_COMMON_CONFIG_TOKEN } from '../config';

/** Initialize sprite sheet */
export async function initializeSpriteSheet(): Promise<void> {

  const config = inject(APP_COMMON_CONFIG_TOKEN); // Inject config
  const result = await new SpriteSheetManager().addSpriteSheetCollection(config.svgSpriteSheetSrc);

  if (result.fail) {
    console.error(`Failed to load sprite sheet: ${result.errorMsg}`);
    config.initialLoadingFail = true;
  } else {
    // console.log('Injected Sprite Sheet Correctly');
  }
}

/* APP_INITIALIZER Version */
// export const SPRITE_SHEET_PROVIDER: Provider = {
//   provide: APP_INITIALIZER,
//   useFactory: () => initializeSpriteSheet,
//   deps: [],
//   multi: true,
// };

export const SPRITE_SHEET_PROVIDER: EnvironmentProviders = provideAppInitializer(initializeSpriteSheet);
