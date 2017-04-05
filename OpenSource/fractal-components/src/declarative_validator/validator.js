// @flow
import isEmail from 'validator/lib/isEmail';

const ruleRegex = /^(.+?)\[(.+)\]$/,
  numericRegex = /^[0-9]+$/,
  numericExtractRegex = /[0-9]+/,
  integerRegex = /^\-?[0-9]+$/,
  decimalRegex = /^\-?[0-9]*\.?[0-9]+$/,
  mobileRegex = /^1\d{10}$/i,
  emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  alphaRegex = /^[a-z]+$/i,
  alphaNumericRegex = /^[a-z0-9]+$/i,
  alphaDashRegex = /^[a-z0-9_\-]+$/i,
  naturalRegex = /^[0-9]+$/i,
  naturalNoZeroRegex = /^[1-9][0-9]*$/i,
  ipRegex = /^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/i,
  base64Regex = /[^a-zA-Z0-9\/\+=]/i,
  numericDashRegex = /^[\d\-\s]+$/,
  urlRegex = /^((http|https):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
  dateRegex = /\d{4}-\d{1,2}-\d{1,2}/;

/**
 * @function
 *
 * required 必填项
 * email 电子邮箱
 * min-length[min] 最短长度
 * max-length[max] 最长长度
 * mobile 手机号
 *
 * @param ruleStr
 * @param value
 */
function validator(ruleStr = 'required', value) {

  //分割规则
  let rules = ruleStr.split('|');

  //判断required的位置
  let indexOfRequired = rules.indexOf('required');

  let isEmpty = (!value || value === '' || value === undefined);

  //如果为空并且不存在必要条件
  if (isEmpty && indexOfRequired == -1) {
    return true;
  }

  //遍历所有的规则
  for (let rule of rules) {

    //依次遍历所有的待校验项目
    let result =
      _isRequired(rule, value) &&
      _isEmail(rule, value) &&
      _isFixedLength(rule, value) &&
      _isMobile(rule, value);

    if (!result) return false;

  }

  return true;


}

export default validator;

/**
 * @function 验证是否为必须选项
 * @param rule
 * @param value
 * @return {boolean}
 * @private
 */
export function _isRequired(rule, value) {

  let isEmpty = (!value || value === '' || value === undefined);

  //如果是必须
  if (rule === 'required') {
    if (isEmpty)return false;
  }

  return true;

}

/**
 * @function 验证是否为EMail
 * @param rule
 * @param value
 * @return {boolean}
 * @private
 */
export function _isEmail(rule, value) {

  //判断是否为e-mail
  if (rule === 'email') {

    if (!isEmail(value))return false;
  }

  return true;

}

/**
 * @function 验证是否为固定长度
 * @param rule
 * @param value
 * @return {boolean}
 * @private
 */
export function _isFixedLength(rule, value) {

  //判断长度是否符合条件
  if (rule.indexOf('length') > -1) {

    //如果规则不成立，则直接返回错误提示
    if (!ruleRegex.test(rule)) {
      return false;
    }

    //抽取出长度
    let length = numericExtractRegex.exec(rule)[0];

    //判断是否抽取出来的为有效长度，如果无效则报错
    if (!numericRegex.test(length))return false;

    if (rule.indexOf('min') > -1) {
      if (value.length < length)return false;
    }

    if (rule.indexOf('max') > -1) {
      if (value.length > length)return false;
    }

  }
  return true;

}

/**
 * @function 验证是否为手机号
 * @param rule
 * @param value
 * @return {boolean}
 * @private
 */
export function _isMobile(rule, value) {
  //判断是否为手机号
  if (rule === 'mobile') {
    if (!mobileRegex.test(value))return false;
  }
  return true;
}


/**
 * @function 对比两个对象是否相等
 * @param o
 * @param p
 * @return {boolean}
 */
export function compareObjects(o, p) {
  var i,
    keysO = Object.keys(o).sort(),
    keysP = Object.keys(p).sort();
  if (keysO.length !== keysP.length)
    return false;//not the same nr of keys
  if (keysO.join('') !== keysP.join(''))
    return false;//different keys
  for (i = 0; i < keysO.length; ++i) {
    if (o[keysO[i]] instanceof Array) {
      if (!(p[keysO[i]] instanceof Array))
        return false;
      //if (compareObjects(o[keysO[i]], p[keysO[i]] === false) return false
      //would work, too, and perhaps is a better fit, still, this is easy, too
      if (p[keysO[i]].sort().join('') !== o[keysO[i]].sort().join(''))
        return false;
    }
    else if (o[keysO[i]] instanceof Date) {
      if (!(p[keysO[i]] instanceof Date))
        return false;
      if (('' + o[keysO[i]]) !== ('' + p[keysO[i]]))
        return false;
    }
    else if (o[keysO[i]] instanceof Function) {
      if (!(p[keysO[i]] instanceof Function))
        return false;
      //ignore functions, or check them regardless?
    }
    else if (o[keysO[i]] instanceof Object) {
      if (!(p[keysO[i]] instanceof Object))
        return false;
      if (o[keysO[i]] === o) {//self reference?
        if (p[keysO[i]] !== p)
          return false;
      }
      else if (compareObjects(o[keysO[i]], p[keysO[i]]) === false)
        return false;//WARNING: does not deal with circular refs other than ^^
    }
    if (o[keysO[i]] !== p[keysO[i]])//change !== to != for loose comparison
      return false;//not the same value
  }
  return true;
}
