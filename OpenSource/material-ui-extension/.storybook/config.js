import { configure, setAddon } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import injectTapEventPlugin from 'react-tap-event-plugin';

setAddon(infoAddon);

injectTapEventPlugin();

require('./stories.scss');
require('highlight.js/styles/default.css');
require('highlight.js/styles/github.css');

function loadStories() {
  require('./stories');
  require('./stories/material-ui-extension/button');
  require('./stories/material-ui-extension/card');
  require('./stories/material-ui-extension/carousel');
  require('./stories/material-ui-extension/chip');
  require('./stories/material-ui-extension/dialog');
  require('./stories/material-ui-extension/divider');
  require('./stories/material-ui-extension/folder');
  require('./stories/material-ui-extension/form');
  require('./stories/material-ui-extension/label');
  require('./stories/material-ui-extension/list');
  require('./stories/material-ui-extension/pagination');
  require('./stories/material-ui-extension/paper');
  require('./stories/material-ui-extension/svg_icons');
  require('./stories/material-ui-extension/tree');
  require('./stories/material-ui-extension/upload');

}

configure(loadStories, module);