import React from 'react';
import '../App.css'
class Control extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
            shadow: "",
        }
    }
    onClick = (event)=> {
        var name = (event.target.name);
        if(name === "add"){
            this.setState({
                number: this.state.number+1,
                shadow: "5CB85C",
            })
        }
        else if(name === "sub"){
            this.setState({
                number: this.state.number-1,
                shadow: "F0AD4E",
            })
        }
        else if(name === "reset"){
            this.setState({
                number: 0,
                shadow: "D9534F",
            })
        }
    }
  render(){
      var style = {
          color: this.state.shadow,
      }
    return(
      <div style= {{margin: "5% 37% 5% 37%"}}>
          <div className="panel">
              <div className="result">
                <h1>{this.state.number}</h1>
              </div>
              <div className="operator" onClick={this.onClick}>
                <button name ="add" className="btn btn-success fa fa-plus fa-2x" ></button>
                <button name ="reset" className="btn btn-warning fa fa-refresh fa-2x"></button>
                <button name ="sub" className="btn btn-danger fa fa-minus fa-2x"></button>
              </div>
          </div>
      </div>
    )
  }
}
export default Control;
