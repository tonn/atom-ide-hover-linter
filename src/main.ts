import { CompositeDisposable } from 'atom';

module.exports = {
  config: {},
  subscriptions: null,

  activate(): void {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable;

    // Register command that displays Hello World
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-ide-hover-linter:hello-world': () => this.helloWorld()
    }));
  },

  deactivate(): void {
    this.subscriptions.dispose();
  },

  helloWorld(): void {
    atom.notifications.addInfo('Hello World');
  }
};
