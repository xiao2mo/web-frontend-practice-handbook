/**
 * Created by apple on 16/8/19.
 */

/**
 * @function 常用的格式校验类
 */
export class Validator {

  /**
   * @function 校验是否为有效的手机号码
   * @param phoneNumber
   * @returns {boolean}
   */
  static isPhoneNumber(phoneNumber) {
    var pattern = /^1[34578]\d{9}$/;
    if (pattern.test(phoneNumber)) {
      return true;
    }
    return false;
  }

}