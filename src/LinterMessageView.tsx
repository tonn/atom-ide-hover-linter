import etch from 'etch';
import { Message } from './linter';

import { EtchComponentBase } from './EtchComponentBase';

export interface LinterMessageViewProperties {
  Message: Message;
}

export class LinterMessageView extends EtchComponentBase<LinterMessageViewProperties> {
  render(): JSX.Element {
    const message = this.properties.Message;

    const severityMod = message.severity === 'error' ? 'LinterMessageView_Error' :
                              message.severity === 'warning' ? 'LinterMessageView_Warning' :
                              message.severity === 'info' ? 'LinterMessageView_Info' : undefined;

    return (
      <div className={`LinterMessageView ${severityMod}`}>
        <span class='LinterMessageView__Severity'></span> <span class='LinterMessageView__LinterName'>{message.linterName}</span> <span class='LinterMessageView__Excerpt'>{message.excerpt}</span>
      </div>
    );
  }
}
