/**
 * Created by apple on 16/7/18.
 */
import React, {Component, PropTypes} from "react";

require("./react_autolayout.scss");

export class ReactAutolayout extends Component {

    //需要输入的Props
    static propTypes = {
        className: PropTypes.string,
        elements: PropTypes.array.isRequired,//子元素的列表
        colNumber: PropTypes.number //列数,即每行最多的元素数目
    };

    //默认的Props类型
    static defaultProps = {
        className: "",
        elements: [],
        colNumber: 1 //默认只有一列
    };

    /**
     * @function 判断flex-wrap属性是否适用
     * @private
     */
    _flexWrapValidate() {
        return false;
    }

    /**
     * @function 默认渲染函数
     * @returns {XML}
     */
    render() {

        let rows = [];

        if (this._flexWrapValidate()) {
            //如果flex-wrap属性可用,则直接放置到一行中
            rows = <div className="row">

                {this.props.elements.map((element,index)=> {
                    return <div className="column" style={{flex:`1 1 ${100/this.props.colNumber}%`}} key={index}>
                        {element}
                    </div>
                })}


            </div>
        } else {

            //如果flex-wrap不可用,则需要切分为多行
            //首先判断需要切分的行数
            let rowNumber = Math.floor(this.props.elements.length / this.props.colNumber);

            //如果除下来是小数,则将行数加一
            if (rowNumber * this.props.colNumber < this.props.elements.length) {
                rowNumber++;
            }

            //遍历所有行
            for (var i = 0; i < rowNumber; i++) {

                let row = [];

                //遍历属于当前行的所有的元素
                for (var j = 0; j < this.props.colNumber && (i * this.props.colNumber + j) < this.props.elements.length; j++) {

                    //将属于该行的加入到rows中
                    row.push(
                        <div className="column" style={{flex:`1 1 ${100/this.props.colNumber}%`}} key={`${i} + ${j}`}>
                            {this.props.colNumber[i * this.props.colNumber + j]}
                        </div>
                    );
                }

                //将生成好的行加入到所有的行中
                rows.push(
                    <div className="row">
                        {row}
                    </div>
                );
            }


        }

        return <section className={`react_autolayout__container ${this.props.className}`}>

            {rows}

        </section>
    }
}