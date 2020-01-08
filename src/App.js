import React, { Component } from 'react';
import './App.css';
// import Play from './components/play';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reproducing: false,
      songs: [
        { id: 1, category: "game", name: "Mario Castle", url: "files/mario/songs/castle.mp3" },
        { id: 2, category: "game", name: "Mario Star", url: "files/mario/songs/hurry-starman.mp3" },
        { id: 3, category: "game", name: "Mario Overworld", url: "files/mario/songs/overworld.mp3" }
      ]
    }
    this.player = null;
    this.actualIndex = null;
  }

  dj(e, i) {
    e.preventDefault();
    
    // Reproduzco si player esta en pausa o igual a null
    if(this.player === null || this.player.paused) {

      // Si indice es igual al mismo que se estaba reproduciendo se continua la reproduccion de lo contrario se reproduce desde el principio el nuevo audio
      (this.actualIndex === i)? this.continue(i) : this.playItem(i)

    }
    else {
      this.pause();
      // Si el nuevo indice es distinto al que se esta reproduciendo actualmente se reproduce el nuevo audio
      if(this.actualIndex !== i) {
        this.playItem(i);
      }

    }
  }

  // Continua la reproduccion desde donde se quedo
  continue(i) {
    this.actualIndex = i;
    this.player = document.querySelectorAll("audio")[i];
    this.play();
  }

  // Empieza la reproduccion desde el principio
  playItem(i) {
    this.actualIndex = i;
    this.player = document.querySelectorAll("audio")[i];
    this.player.currentTime = 0;
    this.play();
  }

  play() {
    this.setState({reproducing: true});
    this.player.play();
  }

  pause() {
    this.setState({reproducing: false});
    this.player.pause();
  }

  buttonPlayPause() {
    if(this.player !== null) {
      (this.player.paused)? this.play() : this.pause();
    }
  }

  next() {
    if(this.player !== null) {
      this.pause();
      let nextIndex = (this.actualIndex < this.state.songs.length - 1)? this.actualIndex + 1 : 0;
      this.playItem(nextIndex);
    }
  }

  prev() {
    if(this.player !== null) {
      this.pause();
      let nextIndex = (this.actualIndex > 0)? this.actualIndex - 1 : this.state.songs.length - 1;
      this.playItem(nextIndex);
    }
  }

 render() {
    return (
      <div className="card">
        <div className="card-body">
          <div className="list-group">
            {
            this.state.songs.map((val, i) => (
            <a href="#" className="list-group-item list-group-item-action" onClick={(e) => this.dj(e, i)}>{val.name}
              <audio>
                <source src={"https://assets.breatheco.de/apis/sound/" + val.url} type="audio/mp3"/>
              </audio>
            </a>
            
            ))}
          </div>

          <div className="card-footer d-flex justify-content-center">
              <button className="btn btn-secondary fa  fa-step-backward" type="button" onClick={() => this.prev()}></button>
              <button className={"btn btn-secondary fa " + ((this.state.reproducing)? 'fa-pause' : 'fa-play')} type="button" onClick={() => this.buttonPlayPause()} ></button>
              <button className="btn btn-secondary fa fa-step-forward" type="button" onClick={() => this.next()}></button>
          </div>
        </div>
      </div>
    )
  }
}
export default App; 