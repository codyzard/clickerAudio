import React from 'react';
import '../App.css'
import 'font-awesome/css/font-awesome.min.css';
import loveyou3k from '../audio//loveyou3k.mp3'
import yatr from '../audio//you are the reason.mp3'
import bom from '../audio/bom.mp3'
class Player extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            music: [
              {
                name: "Bom",
                author:"Bom bom",
                lyric: `Baby, take my hand
                        I want you to be my husband
                        Cause you're my Iron Man
                        And I love you three thousand`,
                src:  bom ,
                view: Math.round(Math.random()*10000000),
                download: Math.round(Math.random()*1000000)
                },
                {
                    name: "I love you 3000",
                    author:"Stephanie Poetri",
                    lyric: `Baby, take my hand
                            I want you to be my husband
                            Cause you're my Iron Man
                            And I love you three thousand`,
                    src:  loveyou3k ,
                    view: Math.round(Math.random()*10000000),
                    download: Math.round(Math.random()*1000000)
                },
                {
                    name: "You Are The Reason",
                    author:"Calum Scott",
                    lyric: `I'd climb every mountain
                            And swim every ocean
                            Just to be with you
                            And fix what I've broken`,
                    src:  yatr,
                    view: Math.round(Math.random()*10000000),
                    download: Math.round(Math.random()*1000000)
                }
            ],
            audio: new Audio(),
            select: 0,
            currentTime: "00:00",
            duration: "00:00",
            length: "",
        }
    }
    interval = null;
    checkInterval = ()=>{
      if(this.interval) 
      {
        clearInterval(this.interval);
        this.interval = false;
      }
      else {
        this.interval = setInterval(this.onCurrentTime,1000);
      }
    }
    
    onClick = (e)=>{
      var nameTag = e.target.closest("button").name // kien thuc thay LAN
      var target = e.target.closest("button");
      var childNode = target.childNodes[0];
      if(nameTag === "play") {
        var audio = this.state.audio;
        if(audio.src === "") audio.src = this.state.music[this.state.select].src;
        this.setState({
          audio: audio,
        });
        if(this.state.audio.paused || this.state.audio.ended){
          this.state.audio.play();
          this.checkInterval();
          childNode.className = "fa fa-pause fa-1x";
        }
        else if(!this.state.audio.paused || !this.state.audio.paused.ended){
          this.state.audio.pause();
          this.checkInterval();
          childNode.className = "fa fa-play fa-1x";
        }
      }
      else if(nameTag === "next"){
        this.checkInterval();
        this.autoNext();
        var playbtn = document.getElementsByName("play")[0].childNodes[0];
        playbtn.className = "fa fa-pause fa-1x";
      }
      else  if(nameTag == "repeat"){
        audio = this.state.audio;
        if(!audio.loop){
          audio.loop = true;
          childNode.className = "fa fa-repeat fa-1x ";
        }
        else{
          audio.loop = false;
          childNode.className = "fa fa-repeat fa-1x repeat-off";
        }
      }
      else if(nameTag === "volume"){
        audio = this.state.audio
        var volumeBar = document.getElementById("volume-bar");
        if(audio.muted){
          childNode.className ="fa fa-volume-up fa-1x";
          audio.muted = false;
          audio.volume = 1;
          volumeBar.value = 1;
        }
        else{
          childNode.className ="fa fa-volume-off fa-1x";
          audio.muted = true;
          volumeBar.value = "0";
        }
      }
      else if(nameTag == "nextSecond"){
        this.state.audio.currentTime +=5;
      }
    }
    onCurrentTime = ()=>{
      var audio = this.state.audio;
      var duration = audio.duration;
      var currentTime = audio.currentTime;  
      var currentTimePlay =this.parseTime(currentTime);
      var durationTimePlay = this.parseTime(duration);
      var valueProgress = parseInt(currentTime/duration*100);
      console.log(currentTimePlay);
      var probar = document.getElementById("probar");
      probar.value = valueProgress;
      this.setState({
        currentTime: currentTimePlay,
        duration: durationTimePlay,
      })
      if(audio.duration === audio.currentTime){
        this.checkInterval();
        this.autoNext();
      }
    }
    parseTime =(time)=> {
      var timePlay = "";
      if(parseInt(time/60) < 10){
        timePlay = "0" + parseInt(time/60)+":";
      }
      else{
        timePlay += parseInt(time/60) + ":";
      }
      if(parseInt(time%60) < 10){
        timePlay += "0" + parseInt(time%60);
      }
      else{
        timePlay += parseInt(time%60);
      }
      return timePlay;
    }
    autoNext = ()=>{
      var length = this.state.music.length;
      var {audio,select,music} = this.state;
      if(select >= length-1) select = 0;
      else select+=1;
      audio.src = music[select].src;
      this.setState({
        select: select,
        audio: audio,
      });
      this.state.audio.play();
      this.checkInterval();
    }
    onPlay = ()=>{
    }
    onDrag = (e)=>{
      let target = e.target;
      let xDes = e.pageX;
      let xSta = parseInt(e.target.getBoundingClientRect().left);
      let width = parseInt(e.target.style.width);
      let value = (xDes-xSta)/width;
      e.target.value =value;
      if(target.id == "volume-bar"){
        this.state.audio.volume = value;
      }
      else if(target.id == "probar"){
       /*  value = value*100;
        value = parseInt(value);
        e.target.value =value;
        this.state.audio.currentTime += value;
        this.checkInterval(); */
      }
      
     
    }
  render(){
    var {music,select,audio} = this.state; 
    var marginLR={margin: "0 30px"}
    var playMusic = music[select];
    return(
      <div id="player-control">
        <h2>{playMusic.name} <span>- {playMusic.author}</span><i style={{marginLeft: "5px"}}className="fa fa-music fa-1x"></i></h2>
        <p className="info">Author: {playMusic.author}, Lời anh | Thể loại: Tình yêu | Lượt nghe: {playMusic.view} | Lượt tải: {playMusic.download}</p>
        <p className="play-music">
          <button onClick={this.onClick} name="play"><i className="fa fa-play fa-1x" ></i></button>
          <button onClick={this.onClick} name="next"><i className="fa fa-step-forward fa-1x"></i></button>
          <button onClick={this.onClick} name="nextSecond"><i className="fa fa-angle-double-right fa-1x"></i></button>
          <span style={{fontSize: "15px", margin:"0 10px"}}>{this.state.currentTime}</span>
          <progress 
            onClick={this.onDrag}  
            min="0" max="100" 
            value="0" 
            id="probar"
            style={marginLR} 
            style={{width: "775px",height:"10px"}}
          >
          </progress>
          <span style={{fontSize: "15px", margin:"0 10px"}}>{this.state.duration}</span>
          <button onClick={this.onClick} name="repeat"><i className="fa fa-repeat fa-1x repeat-off"></i></button>
          <button onClick={this.onClick} name="volume"><i className="fa fa-volume-up fa-1x"></i></button>
          <progress 
            onClick={this.onDrag} 
            id="volume-bar" min="0" max="1" value="1" 
            style={marginLR} style={{width: "120px",height:"10px"}}
          >
          </progress>
          
        </p>        
      </div>
    )
  }
}
export default Player;
