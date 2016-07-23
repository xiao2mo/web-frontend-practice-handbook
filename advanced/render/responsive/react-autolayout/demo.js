/**
 * Created by apple on 16/7/18.
 */
import React from "react";
import {render} from "react-dom";
import {ReactAutolayout} from "./react_autolayout";

let elements = [];

for (let i = 0; i < 20; i++) {
    elements.push(<div style={{padding:"10px",height:"30px", backgroundColor:"red"}}>
        i
    </div>)
}


const App = ()=> {
    return <section style={{height:"100%"}}>
        <ReactAutolayout
            colNumber={3}
            elements={elements}
        />
    </section>
}

render(<App />, document.getElementById('root'));
