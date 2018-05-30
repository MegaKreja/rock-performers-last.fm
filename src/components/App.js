import React, { Component } from 'react';
import axios from "axios"
import Card from "./Card";
import '../styles/App.css';

class App extends Component {
  state = {
    rockArtists: []
  }

  componentDidMount() {
    const api = "5250da4d4e88ce97d088f9cc6229410b";
    axios.get("http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=rock&api_key=" + api + "&format=json")
      .then(res => {
        const rockArtists = res.data.topartists.artist.slice(0, 10);
        console.log(rockArtists);
        this.setState({ rockArtists: rockArtists });
      })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  render() {
    const topTen = this.state.rockArtists.map((artist, i) => {
      return (
        <Card key={i} artistName={artist.name} rank={i+1} img={artist.image[2]["#text"]}/>
      );
    })

    return (
      <div className="container">
        <h1>Top 10 <span>Rock</span> Performers</h1>
        {topTen}
      </div>
    );
  }
}

export default App;