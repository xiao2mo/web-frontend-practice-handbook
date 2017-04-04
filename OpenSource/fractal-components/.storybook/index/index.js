import React from 'react';
import { storiesOf, linkTo } from '@kadira/storybook';
import Button from '../../stories/button';
import Welcome from './Welcome';

storiesOf('Welcome', module)
  .add('to Storybook', () => (
    <Welcome showApp={linkTo('Button')}/>
  ));

