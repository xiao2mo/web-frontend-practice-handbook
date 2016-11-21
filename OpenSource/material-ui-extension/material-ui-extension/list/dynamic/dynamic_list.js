// @flow
import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import BlueWhiteRaisedButton from '../../button/raised/blue_white_raised_button';
import BlueBorderRaisedButton from '../../button/raised/blue_border_raised_button';
import { NavigationCancel } from 'material-ui/svg-icons';
import IconButton from 'material-ui/IconButton';
import BlueLinkButton from '../../button/link/link_button';
import update from 'react-addons-update'; // ES6
require('./dynamic_list.scss');

const style = {
  deleteButtonIcon: {
    color: 'rgb(137, 137, 137)'
  }
};

/**
 * 组件DynamicList，动态可增删的列表组件
 */
export default class DynamicList extends Component {

  static displayName = 'DynamicList';

  static propTypes = {

    //渲染每一行的标签
    renderRowLabel: PropTypes.func,

    //控制每一行输入的元素类别
    renderInputComponent: PropTypes.func,

    //输入的每一行的初始数据
    emptyValue: PropTypes.any,

    //点击取消的回调
    onCancel: PropTypes.func,

    //点击确定提交的回调
    onSubmit: PropTypes.func,

    //最大行数限制
    maxRows: PropTypes.number,

  };

  static defaultProps = {
    renderRowLabel: (index) => (index),
    /**
     * @param index 当前行下标
     * @param value 当前显示值
     * @param onChange 重新赋值的响应函数
     * @return {XML}
     */
    renderInputComponent: (index, value, onRowChange) => {
      return <TextField name={'text_field'} value={value} onChange={(event)=>{onRowChange(index,event.target.value)}}/>
    },
    emptyValue: '初始值',
    onCancel: (values) => {
      console.log(values);
    },
    onSubmit: (values) => {
      console.log(values)
    },
    maxRows: -1//-1 表示没有限制
  };

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);

    this.state = {
      values: [this.props.emptyValue]
    };

    this._onAdd = this._onAdd.bind(this);

    this._onChange = this._onChange.bind(this);

    this._onDelete = this._onDelete.bind(this);

  }

  /**
   * @function 组件挂载完成回调
   */
  componentDidMount() {

  }

  /**
   * @function 响应子组件的数据改动
   * @param index
   * @param value
   */
  _onChange(index, value) {

    //修改列表中对应的值属性
    //创建一个新的列表
    const newValues = [...this.state.values];

    newValues[index] = value;

    this.setState({values: newValues})


  }

  /**
   * @function 点击添加事件
   * @private
   */
  _onAdd() {

    const newValues = [...this.state.values];

    if (this.props.maxRows != -1 && this.props.maxRows <= newValues.length) return;

    newValues.push(this.props.emptyValue);

    this.setState({values: newValues})
  }

  /**
   * @function 点击删除事件
   * @private
   */
  _onDelete(index) {

    const {values} = this.state;

    //删除对应行的值
    this.setState({
      values: update(values, {$splice: [[index, 1]]})
    })

  }

  /**
   * @function 渲染每行尾部的Button
   * @param index
   * @return {XML}
   * @private
   */
  _renderRowButton(index: number) {
    const {values} = this.state;

    if (index === values.length - 1) {
      //如果是最后一个
      return <BlueLinkButton onClick={this._onAdd} label={'添加'}/>

    } else {

      //否则返回删除
      return <IconButton
        onClick={(event)=>{this._onDelete(index)}}
        children={<NavigationCancel/>}
        iconStyle={style.deleteButtonIcon}
      />
    }

  }

  /**
   * @function 默认渲染函数
   */
  render() {

    const {renderRowLabel, renderInputComponent, onCancel, onSubmit} = this.props;

    const {values} = this.state;

    return <section className="dynamic_list__container">

      {
        values.map((value, index) => {
          return <div className="row" key={index}>
            {/*渲染标签*/}
            <div className="label">
              {renderRowLabel(index)}
            </div>
            <div className="input">
              {renderInputComponent(index, value, this._onChange)}
            </div>
            <div className="button">

              {/*判断是否为最后一个，如果为最后一个则显示添加*/}
              {this._renderRowButton(index)}

            </div>
          </div>
        })
      }

      <div className="buttons">
        <div className="cancel">
          <BlueBorderRaisedButton label={'取消'} onClick={()=>{onCancel(values)}}/>
        </div>
        <div className="save">
          <BlueWhiteRaisedButton label={'保存'} onClick={()=>{onSubmit(values)}}/>
        </div>
      </div>

    </section>

  }

}

