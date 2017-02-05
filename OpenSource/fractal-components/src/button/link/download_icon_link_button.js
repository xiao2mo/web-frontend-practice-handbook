import React, { PropTypes, Component } from 'react';
import PDFIcon from '../../svg_icons/file/pdf';
require('./download_icon_link_button.scss');

/**
 * @function 自带图标的文件下载按钮
 */
export class DownloadIconLinkButton extends Component {

  static displayName = 'DownloadIconLinkButton';

  static propTypes = {
    //文件名
    fileName: PropTypes.string.isRequired,
    //下载地址
    fileDownloadLink: PropTypes.string.isRequired
  };

  static defaultProps = {
    fileName: '生产说明文档',
    fileDownloadLink: 'http://baidu.com'
  }


  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {

    //设置默认的icon为PDF Icon
    let icon = <PDFIcon color="rgb(22, 175, 202)"/>;

    return <section className="download_icon_link_button__container">
      <div>
        {icon}
      </div>
      <a target="_blank" href={this.props.fileDownloadLink}>{this.props.fileName}</a>
    </section>

  }


}
/**
 * Created by apple on 16/9/20.
 */
