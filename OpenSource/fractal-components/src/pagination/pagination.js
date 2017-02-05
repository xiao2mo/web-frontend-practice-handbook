import React from 'react';
import Pager from './pager';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import HardwareKeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import NavigationFirstPage from 'material-ui/svg-icons/navigation/first-page';
import NavigationLastPage from 'material-ui/svg-icons/navigation/last-page';

/**
 * @function 默认的分页指示器
 */
export default class Pagination extends React.Component {

  //输入类型
  static propTypes = {
    //当前页
    current: React.PropTypes.number,
    //总页数
    total: React.PropTypes.number,
    //点击上一页下一页的响应事件
    onChange: React.PropTypes.func,
  };

  //默认值
  static defaultProps = {
    current: 1,
    total: 5,
    onChange: () => {

    }
  };

  constructor(props) {
    super(props);

    this.state = {
      current: props.current,
    };

    //绑定回调函数
    this.onChange = this.onChange.bind(this);
  }

  /**
   * @function 点击跳转到上一页还是下一页
   * @param index
   */
  onChange(index) {
  
    console.log('pagination onchange');

    this.setState({
      current: index
    });

    //调用父类传入的回调函数
    this.props.onChange(index);

  }

  render() {
    const {total} = this.props;
    const {current} = this.state;
    const pagerList = [];
    let firstPager = null;
    let lastPager = null;
    let prevButton = null;
    let nextButton = null;

    if (current > 1) {
      prevButton = (
        <Pager icon={<div className="arrow" style={{display:'flex'}}><HardwareKeyboardArrowLeft  /></div>}
               title={'上一页'}
               onTouchTap={() => this.onChange(current - 1)}
               key={'prev'}/>);
    }
    if (current < total) {
      nextButton = (
        <Pager icon={<div className="arrow" style={{display:'flex'}}><HardwareKeyboardArrowRight  /></div>}
               title={'下一页'}
               onTouchTap={() => this.onChange(current + 1)}
               key={'next'}/>);
    }

    if (total <= 9) {
      pagerList.push(prevButton);
      for (let i = 1; i <= total; i++) {
        const active = current === i;
        pagerList.push(<Pager onTouchTap={() => this.onChange(i)} key={i} page={i} active={active}/>);
      }
      pagerList.push(nextButton);
    } else {
      lastPager = (
        <Pager icon={<NavigationLastPage />} title={'末页'} onTouchTap={() => this.onChange(total)} key={'last'}/>);
      firstPager = (
        <Pager icon={<NavigationFirstPage />} title={'首页'} onTouchTap={() => this.onChange(1)} key={'first'}/>);

      let left = Math.max(1, current - 5);
      let right = Math.min(current + 5, total);

      pagerList.push(prevButton);
      for (let i = left; i <= right; i++) {
        const active = current === i;
        pagerList.push(<Pager onTouchTap={() => this.onChange(i)} key={i} page={i} active={active}/>);
      }
      pagerList.push(nextButton);

      if (left !== 1) {
        pagerList.unshift(firstPager);
      }
      if (right !== total) {
        pagerList.push(lastPager);
      }
    }

    return (
      <div unselectable="unselectable" style={{display:'flex',width:'100%',justifyContent:'center'}}>
        {pagerList}
      </div>
    );
  }

}
