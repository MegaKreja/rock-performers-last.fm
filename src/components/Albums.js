import React, { Component } from 'react';
import axios from "axios"
import AlbumCard from "./AlbumCard";
import Spinner from "./Spinner";
import '../styles/Albums.css';

class Albums extends Component {
  state = {
    albums: [],
    album: "",
    albumSongs: []
  }

  componentDidMount() {
    const api = "5250da4d4e88ce97d088f9cc6229410b";
    const rockArtist = this.props.rockArtist;
    axios.get("http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + rockArtist + "&api_key=" + api + "&format=json")
      .then(res => {
        const albums = res.data.topalbums.album.slice(0, 10);
        console.log(albums);
        this.setState({ albums: albums });
      })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
  }

  changeAlbumName = (album) => {
    this.setState({album: album});
    this.setState({albumSongs: []});
    const api = "5250da4d4e88ce97d088f9cc6229410b";
    let albumName = album;
    let artist = this.props.rockArtist;
    axios.get("http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + api + "&artist=" + artist + "&album=" + albumName + "&format=json")
      .then(res => {
        const albumSongs = res.data.album.tracks.track.slice(0, 10);
        console.log(albumSongs);
        this.setState({ albumSongs: albumSongs });
      })
  }

  render() {
    const topTenSongs = this.state.albums.map((album, i) => {
      return (
        <AlbumCard albumName={album.name} changeAlbumName={this.changeAlbumName} key={i} rank={i+1} img={album.image[2]["#text"]} albumSongs={this.state.albumSongs}/>
      );
    });

    return (
      <div className="albums">
        <h1><span>{this.props.rockArtist}</span> Albums</h1>
        {topTenSongs.length === 10 ? topTenSongs : <Spinner />}        
      </div>
    );
  }
}

export default Albums;

