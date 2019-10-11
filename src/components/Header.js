import React from 'react';
import '../App.css'
import 'font-awesome/css/font-awesome.min.css';
class Header extends React.Component{
  render(){
    return(
      <div id="header">
          <h1><i className  ="fa fa-hand-pointer-o fa-2x text-white"></i>React Clicker</h1>
      </div>
    )
  }
}
export default Header;
