import etch from 'etch';
import { Message } from './linter';

import { EtchComponentBase } from './EtchComponentBase';
import { LinterMessageView } from './LinterMessageView';

export interface LinterMessagesViewProperties {
  Messages: Message[];
}

export class LinterMessagesView extends EtchComponentBase<LinterMessagesViewProperties> {
  render(): JSX.Element {
    const messages = this.properties.Messages || [];

    return (
      <div key='LinterMessagesView' className={'LinterMessagesView'}>
      {
        messages.map(message => <LinterMessageView Message={message} />)
      }
      </div>
    );
  }
}
