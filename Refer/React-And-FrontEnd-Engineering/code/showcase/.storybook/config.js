import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import injectTapEventPlugin from 'react-tap-event-plugin';

setAddon(infoAddon);

injectTapEventPlugin();

require('./stories.scss');

function loadStories() {
  require('./index/index');
}

configure(loadStories, module);