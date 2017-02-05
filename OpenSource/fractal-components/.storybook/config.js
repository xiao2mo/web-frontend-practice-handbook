import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import injectTapEventPlugin from 'react-tap-event-plugin';

setAddon(infoAddon);

injectTapEventPlugin();

require('./stories.scss');

function loadStories() {
  require('./index/index');
  require('./stories/button');
  require('./stories/bread_crumb');
  require('./stories/card');
  require('./stories/carousel');
  require('./stories/chip');
  require('./stories/dialog');
  require('./stories/divider');
  require('./stories/folder');
  require('./stories/form');
  require('./stories/label');
  require('./stories/list');
  require('./stories/pagination');
  require('./stories/paper');
  require('./stories/svg_icons');
  require('./stories/tooltip');
  require('./stories/tree');
  require('./stories/upload');

}

configure(loadStories, module);