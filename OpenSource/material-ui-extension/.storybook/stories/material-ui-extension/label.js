import React from 'react';
import { storiesOf } from '@kadira/storybook';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { StoryPanel, StoryTitle, Example } from '../../stories';
import DigitalLabel from '../../../material-ui-extension/label/digital/digital_label';
import DecoratorLabel from '../../../material-ui-extension/label/decorator/decorator_label';


storiesOf('Label', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .addWithInfo(
    'DigitalLabel',
    `
      数字显示标签
    `,
    () => (
      <StoryPanel>
        <StoryTitle label="DigitalLabel" description="数字显示标签"/>
        <section className="examples">
          <Example label="中文">
            <DigitalLabel
              digital={1}/>

            <DigitalLabel
              digital={2}/>
          </Example>
        </section>
      </StoryPanel>
    ),
    {inline: false, propTables: [DigitalLabel]})
  .addWithInfo(
    'DecoratorLabel',
    `
      附带其他装饰效果的标签
    `,
    () => (
      <StoryPanel>
        <StoryTitle label="DecoratorLabel" description="附带其他装饰效果的标签"/>
        <section className="examples">
          <Example label="Required">
            <DecoratorLabel required={true}/>
          </Example>
        </section>
      </StoryPanel>
    ),
    {inline: false, propTables: [DigitalLabel]})
;

