import React, { Component } from 'react';
import axios from 'axios';
import Card from './Card';
import Spinner from './Spinner';
import '../styles/Artists.css';

class Artists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rockArtists: [],
      rockArtist: '',
      summary: '',
      count: 10
    };

    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.setState(prevState => {
          return {
            count: prevState.count + 10
          };
        });
        this.loadArtists();
      }
    };
  }

  componentDidMount() {
    this.loadArtists();
  }

  loadArtists = () => {
    const { count } = this.state;
    const api = '5250da4d4e88ce97d088f9cc6229410b';
    axios
      .get(
        'https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=rock&api_key=' +
          api +
          '&format=json'
      )
      .then(res => {
        const rockArtists = res.data.topartists.artist.slice(0, count);
        console.log(rockArtists);
        this.setState({ rockArtists });
      });
  };

  changeName = rockArtist => {
    this.setState({ rockArtist: rockArtist });
    this.setState({ summary: '' });
    const api = '5250da4d4e88ce97d088f9cc6229410b';
    let name = rockArtist;
    axios
      .get(
        'https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=' +
          name +
          '&api_key=' +
          api +
          '&format=json'
      )
      .then(res => {
        const summary = res.data.artist.bio.summary.substring(0, 300);
        console.log(summary);
        this.setState({ summary });
      });
  };

  render() {
    const topTen = this.state.rockArtists.map((artist, i) => {
      return (
        <Card
          openAlbums={this.props.openAlbums}
          summary={this.state.summary}
          changeName={this.changeName}
          key={i}
          artistName={artist.name}
          rank={i + 1}
          img={artist.image[2]['#text']}
        />
      );
    });

    return (
      <div className='artists'>
        <h1>
          Top 10 <span>Rock</span> Performers
        </h1>
        {topTen.length < 10 ? <Spinner /> : topTen}
      </div>
    );
  }
}

export default Artists;
