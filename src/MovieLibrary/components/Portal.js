import React from 'react'
import ReactDOM from 'react-dom'

const reactPortal = document.getElementById('portal')

//Render any children outside the root div
export default class Portal extends React.Component {
    childrenDiv = document.createElement("div")
    componentDidMount(){
        reactPortal.appendChild(this.childrenDiv);
    }

    componentWillUnmount(){
        reactPortal.removeChild(this.childrenDiv)
    }   

    render(){
        return ReactDOM.createPortal(this.props.children, this.childrenDiv)
    }
}