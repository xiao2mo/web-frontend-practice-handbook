import React, {Component} from 'react'
import DatePicker from 'material-ui/DatePicker'
import warning from "warning";

function dateTimeFormat(locale, options) {
  var dayAbbreviation = ['日', '一', '二', '三', '四', '五', '六'];
  var dayList = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  var monthList = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
  var monthLongList = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  
  this.format = function (date) {
    if (options.month === 'short' && options.weekday === 'short' && options.day === '2-digit') {
      return `${monthList[date.getMonth()]}${date.getDate()},${dayList[date.getDay()]}`;
    } else if (options.day === 'numeric' && options.month === 'numeric' && options.year === 'numeric') {
      return `${date.getFullYear()}年${monthList[date.getMonth()]}${date.getDate()}日`;
    } else if (options.month === 'long' && options.year === 'numeric') {
      return `${date.getFullYear()}年${monthLongList[date.getMonth()]}`;
    } else if (options.weekday === 'narrow') {
      return dayAbbreviation[date.getDay()];
    } else if (options.year === 'numeric') {
      return date.getFullYear().toString();
    } else if (options.day === 'numeric') {
      return date.getDate();
    } else {
      warning(false, 'Material-UI: Wrong usage of DateTimeFormat');
    }
  };
}

const DatePickerCN = (props) => {
  return (
      <DatePicker
        okLabel='确定'
        cancelLabel='取消'
        DateTimeFormat={dateTimeFormat}
        locale='en-US'
        {...props}
      />
  )
};
export default DatePickerCN;