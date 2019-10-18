import React from 'react';
import Header from './components/Header';
import Control from './components/Control';
import Player from './components/Player';
import Food from './components/Food'
class App extends React.Component{
  render(){
    return(
      <div id="container">
        <Header/>
        <Control/>
         <Player/>
        <Food/>
      </div>
    )
  }
}
export default App;
