// @flow
import React, { Component, PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
var Highlight = require('react-highlight');
require('./stories.scss');

/**
 * @function 包裹每个Story的父层组件
 * @return {XML}
 * @constructor
 */
export const StoryPanel = ({children}) => {
  return <section className="story_panel__container">
    {children}
  </section>
};

/**
 * @function 组件级别的标题
 * @param label
 * @constructor
 */
export const StoryTitle = ({label, description = ''}) => {

  return <div className="story_title__container">
    <h2>
      <div className="label">
        {label}
      </div>
      {/*
       <div className="github">
       Edit / Star in Github(@wxyyxc1992)
       </div>
       */}
    </h2>
    <div>
      {description}
    </div>
  </div>


};

/**
 * @function 每个例子的容器
 * @param label
 * @param children
 * @return {XML}
 * @constructor
 */
export const Example = ({label, children, code}) => {
  return <section className="example__container">
    <Paper>
      <div className="example_title">
        {label}(点击右上角查看源代码)
      </div>
      <div className="children">
        {children}
      </div>
      <div className="code">
        <Highlight className='js'>
          {
            JSON.stringify(code)
          }
        </Highlight>
      </div>
    </Paper>
  </section>

};

/**
 * @function 显示元素的Props
 */
export const Props = ({label, props = []}) => (

  <section className="props__container">
    <h2>
      类名:{label}
    </h2>
    <PropTypesTable props={props}/>
  </section>

);

/**
 * 组件PropTypesTable
 */
export default class PropTypesTable extends Component {

  static propTypes = {
    props: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      type: PropTypes.string,
      description: PropTypes.string,
      value: PropTypes.string,
    }))
  };

  static defaultProps = {};

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);
  }

  /**
   * @function 组件挂载完成回调
   */
  componentDidMount() {

  }

  /**
   * @function 默认渲染函数
   */
  render() {

    return <section className="prop_types_table__container">

      <Table
        fixedHeader={true}
        selectable={false}
        multiSelectable={false}
      >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn style={{width:'12rem'}}>Name</TableHeaderColumn>
            <TableHeaderColumn style={{width:'5rem'}}>Type</TableHeaderColumn>
            <TableHeaderColumn style={{width:'20rem'}}>Description</TableHeaderColumn>
            <TableHeaderColumn>Example Value</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            this.props.props.map((prop, index) => (
              <TableRow key={index}>
                <TableRowColumn style={{width:'12rem'}}>{prop.name}</TableRowColumn>
                <TableRowColumn style={{width:'5rem'}}>{prop.type}</TableRowColumn>
                <TableRowColumn style={{width:'20rem'}}>{prop.description}</TableRowColumn>
                <TableRowColumn>{prop.value}</TableRowColumn>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </section>

  }

}


