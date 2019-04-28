import { CompositeDisposable } from 'atom';
import { HoverProvidersRegistry } from './atom-ide-hover';
import { UI } from './linter';

import { LinterHoverProviderInstance } from './LinterHoverProvider';

class Main {
  private _subscriptions = new CompositeDisposable();

  activate(): void {
  }

  deactivate(): void {
    this._subscriptions.dispose();
  }

  ConsumeHoverProvidersRegistry(hoverProvidersRegistry: HoverProvidersRegistry) {
    console.log('ConsumeHoverProvidersRegistry');

    hoverProvidersRegistry.AddProvider(LinterHoverProviderInstance);
  }

  ProviderLinterUI(): UI {
    return LinterHoverProviderInstance;
  }
}

module.exports = new Main();
