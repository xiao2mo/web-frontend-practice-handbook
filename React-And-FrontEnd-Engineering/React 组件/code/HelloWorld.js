import React from 'react';

class HelloWorld extends React.Component{

    constructor(props){
        super(props);
    }

    sayHi(event){
        alert(`Hi ${this.props.name}`);
    }

    render(){
        return (
            <div>
                <a 
                    href="#"
                    onClick={this.sayHi.bind(this)}
                    >
                    Say Hi
                </a>
            </div>
        )
    }
}

HelloWorld.propTypes = {
    name:React.PropTypes.string.isRequired
}

export default HelloWorld;

import React from 'react';

const HelloWorld = ({name}) => {

    const sayHi = (event) => {
        alert(`Hi ${name}`);
    };

    return (
        <div>
            <a 
                href="#"
                onClick={sayHi}    
            >
                Say Hi
            </a>
        </div>
    );
}

HelloWorld.propTypes = {
    name:React.PropTypes.string.isRequired
}

export default HelloWorld;