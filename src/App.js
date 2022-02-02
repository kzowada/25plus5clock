import React, { Component } from 'react';
import './App.css';
import {FaPlay, FaPause, FaPlus, FaMinus} from 'react-icons/fa';
import { MdOutlineRepeatOn } from 'react-icons/md';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sessionMinutes: "25",
      sessionSeconds: "00",
      sessionTimeConst: "25",
      breakMinutes: "05",
      breakSeconds: "00",
      breakTimeConst: "5",
      runTimerSession: null,
      runTimerBreak: null,
      isSession: true,
      runningFlag: false,
      timerLabel: "Session"
    }
    this.runTimerSession = this.runTimerSession.bind(this);
    this.runTimerBreak = this.runTimerBreak.bind(this);
    this.setTime = this.setTime.bind(this);
    this.reset = this.reset.bind(this);
    this.incrementSessionLength = this.incrementSessionLength.bind(this);
    this.decrementSessionLength = this.decrementSessionLength.bind(this);
    this.incrementBreakLength = this.incrementBreakLength.bind(this);
    this.decrementBreakLength = this.decrementBreakLength.bind(this);
    this.runTimer = this.runTimer.bind(this);
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
  }

  runTimer() {
    this.state.isSession ? this.runTimerSession() : this.runTimerBreak();
  }

  runTimerSession() {
    if (this.state.runTimerSession === null) {
      let timer = setInterval(this.setTime, 100);
      this.setState({
        breakMinutes: this.state.breakTimeConst > 10 ? this.state.breakTimeConst : "0" + this.state.breakTimeConst,
        breakSeconds:"00" ,
        runTimerSession: timer,
        runningFlag: true});
    } else if (this.state.runningFlag) {
      this.setState({runningFlag: false});
    } else if (!this.state.runningFlag) {
      this.setState({runningFlag: true})
    }
  }

  runTimerBreak() {
    if (this.state.runTimerBreak === null) {
      let timer = setInterval(this.setTime, 100);
      this.setState({
        sessionMinutes: this.state.sessionTimeConst > 10 ? this.state.sessionTimeConst : "0" + this.state.sessionTimeConst,
        sessionSeconds: "00",
        runTimerBreak: timer,
        runningFlag: true});
    } else if (this.state.runningFlag) {
      this.setState({runningFlag: false});
    } else if (!this.state.runningFlag) {
      this.setState({runningFlag: true});
    }
  }

  setTime() {
    if (this.state.runningFlag) {
      if (this.state.isSession) {
        if (this.state.sessionSeconds === "00") {
          if (parseInt(this.state.sessionMinutes) > 10) {
            this.setState(state => ({
              sessionMinutes: parseInt(state.sessionMinutes) - 1,
              sessionSeconds: 59 + ""
            }));
          } else if (parseInt(this.state.sessionMinutes) <= 10) {
            if (parseInt(this.state.sessionMinutes) - 1 >= 0) {
              this.setState(state => ({
                sessionMinutes: "0" + (parseInt(state.sessionMinutes) - 1),
                sessionSeconds: 59 + ""
              }));
            } else {
              clearInterval(this.state.runTimerSession);
              this.setState(state => ({
                sessionMinutes: "00",
                sessionSeconds: "00",
                runTimerSession: null,
                isSession: false,
                timerLabel: "Break"
              }));
              this.playSound();
              this.runTimerBreak();
            }
          }
      } else {
        if (parseInt(this.state.sessionSeconds) < 60 && parseInt(this.state.sessionSeconds) > 10) {
          this.setState(state => ({
            sessionSeconds: (parseInt(state.sessionSeconds) - 1) + ""
          }))
        } else if (parseInt(this.state.sessionSeconds) <= 10) {
          this.setState(state => ({
            sessionSeconds: "0" + (parseInt(state.sessionSeconds) - 1)
          }))
        }
      }
    } else {
      if (this.state.breakSeconds === "00") {
        if (parseInt(this.state.breakMinutes) > 10) {
          this.setState(state => ({
            breakMinutes: parseInt(state.breakMinutes) - 1,
            breakSeconds: 59 + ""
          }));
        } else if (parseInt(this.state.breakMinutes) <= 10) {
          if (parseInt(this.state.breakMinutes) - 1 >= 0) {
            this.setState(state => ({
              breakMinutes: "0" + (parseInt(state.breakMinutes) - 1),
              breakSeconds: 59 + ""
            }));
          } else {
            clearInterval(this.state.runTimerBreak);
            this.setState(state => ({
              breakMinutes: "00",
              breakSeconds: "00",
              runTimerBreak: null,
              isSession: true,
              timerLabel: "Session"
            }));
            this.playSound();
            this.runTimerSession();
          }
        }
    } else {
      if (parseInt(this.state.breakSeconds) < 60 && parseInt(this.state.breakSeconds) > 10) {
        this.setState(state => ({
          breakSeconds: (parseInt(state.breakSeconds) - 1) + ""
        }))
      } else if (parseInt(this.state.breakSeconds) <= 10) {
        this.setState(state => ({
          breakSeconds: "0" + (parseInt(state.breakSeconds) - 1)
        }))
      }
    }
    }
  }
}

  reset() {
    clearInterval(this.state.runTimerSession);
    clearInterval(this.state.runTimerBreak);
    this.stopSound();
    this.setState({sessionMinutes: "25", sessionSeconds: "00", sessionTimeConst: "25", breakMinutes: "5", breakSeconds: "00", breakTimeConst: "5", runTimerSession: null, runTimerBreak: null, isSession: true, runningFlag:false, timerLabel: "Session"});
  }

  incrementSessionLength() {
    if (this.state.runningFlag === false) {
      if (parseInt(this.state.sessionMinutes) >= 9 && parseInt(this.state.sessionMinutes) < 60) {
        this.setState(state => ({sessionMinutes: parseInt(state.sessionTimeConst) + 1, sessionSeconds: "00", sessionTimeConst: parseInt(state.sessionTimeConst) + 1}));
      } else if (parseInt(this.state.sessionMinutes) < 9) {
        this.setState(state => ({sessionMinutes: "0" + (parseInt(state.sessionTimeConst) + 1), sessionSeconds: "00", sessionTimeConst: parseInt(state.sessionTimeConst) + 1}));
      } 
    }
  }

  decrementSessionLength() {
    if (this.state.runningFlag === false) {
      if (parseInt(this.state.sessionMinutes) > 10) {
        this.setState(state => ({sessionMinutes: parseInt(state.sessionTimeConst) - 1, sessionSeconds: "00", sessionTimeConst: parseInt(state.sessionTimeConst) - 1}));
      } else if (parseInt(this.state.sessionMinutes) <= 10 && parseInt(this.state.sessionMinutes) > 1) {
        this.setState(state => ({sessionMinutes: "0" + (parseInt(state.sessionTimeConst) - 1), sessionSeconds: "00", sessionTimeConst: parseInt(state.sessionTimeConst) - 1}));
      }
    }
  }

  incrementBreakLength() {
    if (this.state.runningFlag === false) {
      if (parseInt(this.state.breakMinutes) >= 9 && parseInt(this.state.breakMinutes) < 60) {
        this.setState(state => ({breakMinutes: parseInt(state.breakTimeConst) + 1, breakSeconds: "00", breakTimeConst: parseInt(state.breakTimeConst) + 1}));
      } else if (parseInt(this.state.breakMinutes) < 9) {
        this.setState(state => ({breakMinutes: "0" + (parseInt(state.breakTimeConst) + 1), breakSeconds: "00", breakTimeConst: parseInt(state.breakTimeConst) + 1}));
      }
    }
  }

  decrementBreakLength() {
    if (this.state.runningFlag === false) {
      if (parseInt(this.state.breakMinutes) > 10) {
        this.setState(state => ({breakMinutes: parseInt(state.breakTimeConst) - 1, breakSeconds: "00", breakTimeConst: parseInt(state.breakTimeConst) - 1}));
      } else if (parseInt(this.state.breakMinutes) <= 10 && parseInt(this.state.breakMinutes) > 1) {
        this.setState(state => ({breakMinutes: "0" + (parseInt(state.breakTimeConst) - 1), breakSeconds: "00", breakTimeConst: parseInt(state.breakTimeConst) - 1}));
      }
    }
  }

  playSound() {
    let sound = document.getElementById("beep");
    sound.play();
  }

  stopSound() {
    let sound = document.getElementById("beep");
    sound.currentTime = 0;
    sound.pause();
  }

  render() {
    return (
      <div className='all-content-container'>
        <h1>25 + 5 Clock</h1>
        <div className='session-break-display'>
          <h2 id='timer-label'>{this.state.timerLabel}</h2>
          <p id='time-left' className='time-left'>{this.state.isSession ? this.state.sessionMinutes + ":" + this.state.sessionSeconds : this.state.breakMinutes + ":" + this.state.breakSeconds}</p>
          <div className='play-reset-button-container'>
            <a id='start_stop' className='start-stop' onClick={this.runTimer}>{!this.state.runningFlag ? <FaPlay /> : <FaPause />}</a>
            <a id='reset' className='reset' onClick={this.reset}><MdOutlineRepeatOn className='onClick' /></a>
          </div>
        </div>
        <div className='session-break-mod-container'>
          <Session decrement={this.decrementSessionLength} increment={this.incrementSessionLength} sessionLength={this.state.sessionTimeConst}/>
          <Break decrement={this.decrementBreakLength} increment={this.incrementBreakLength} breakLength={this.state.breakTimeConst} />
        </div>
        <footer>
          <p>Designed and Coded by</p>
          <p>Karsten Zowada</p>
        </footer>
        <Beeper />
      </div>
    )
  }
}

function Break(props) {

  return (
    <div className='break-mod-component'>
      <h4 id='break-label' className='break-label'>Break Length</h4>
      <p id='break-length' className='break-length'>{props.breakLength}</p>
      <div>
        <a id='break-increment' className='break-increment onClick' onClick={props.increment}><FaPlus /></a>
        <a id='break-decrement' className='break-decrement onClick' onClick={props.decrement}><FaMinus /></a>
      </div>
    </div>
  )
}

function Session(props) {

  return (
    <div className='session-mod-component'>
      <h4 id='session-label' className='session-label'>Session Length</h4>
      <p id='session-length' className='session-length'>{props.sessionLength}</p>
      <div>
        <a id='session-increment' className='session-increment onClick' onClick={props.increment}><FaPlus /></a>
        <a id='session-decrement' className='session-decrement onClick' onClick={props.decrement}><FaMinus /></a>
      </div>
    </div>
  )
}

function Beeper(props) {
  let url = "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav";
  
  return(
    <audio id='beep' preload='auto' src={url}></audio>
  )
}

export default App;
