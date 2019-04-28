import { TextEditor, Point } from 'atom';
import { UI, Linter, Message, MessagesPatch } from './linter';

import { HoverProvider } from './atom-ide-hover';
import { Defer, IsPromise } from './helpers';
import { LinterMessagesView } from './LinterMessagesView';

class LinterHoverProvider implements HoverProvider, UI {
  private _lintMessages: Message[] = [];
  private _lintingPromises: { [filePath: string]: Defer<void> } = {};

  get Name() {
    return 'Linter';
  }

  get Priority() {
    return 1;
  }

  async Get$(textEditor: TextEditor, position: Point): Promise<(HTMLElement | String)[]> {
    const filePath = textEditor.getPath();

    if (filePath && filePath in this._lintingPromises) {
      await this._lintingPromises[filePath].Promise$;
    }

    const messages = this._lintMessages.filter(msg => msg.location.file === filePath && msg.location.position.containsPoint(position));

    await Promise.all(
      messages
      .filter(msg => IsPromise(msg.description))
      .map(async msg => {
        msg.description = await msg.description;
      })
    );

    if (messages.length === 0) {
      return [];
    } else {
      const result = new LinterMessagesView({ Messages: messages });

      return [result.element];
    }
  }

  name: string = 'atom-ide-hover';

  didBeginLinting(_: Linter, filePath?: string): void {
    if (filePath) {
      this._lintingPromises[filePath] = new Defer<void>();
    }
  }

  didFinishLinting(_: Linter, filePath?: string): void {
    if (filePath && filePath in this._lintingPromises) {
      this._lintingPromises[filePath].Resolve();
      delete this._lintingPromises[filePath];
    }
  }

  render(patch: MessagesPatch): void {
    this._lintMessages = patch.messages;
  }

  dispose(): void { }
}

export const LinterHoverProviderInstance = new LinterHoverProvider();
