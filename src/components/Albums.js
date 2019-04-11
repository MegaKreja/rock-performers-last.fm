import React, { Component } from 'react';
import axios from 'axios';
import AlbumCard from './AlbumCard';
import Spinner from './Spinner';
import '../styles/Albums.css';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      filterAlbums: [],
      album: '',
      albumSongs: [],
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
        this.loadAlbums();
      }
    };
  }

  componentDidMount() {
    this.loadAlbums();
  }

  loadAlbums = () => {
    const { count } = this.state;
    const api = '5250da4d4e88ce97d088f9cc6229410b';
    const rockArtist = window.location.pathname.substring(8);
    axios
      .get(
        'https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=' +
          rockArtist +
          '&api_key=' +
          api +
          '&format=json'
      )
      .then(res => {
        const albums = res.data.topalbums.album.slice(0, count);
        this.setState({ albums: albums, filterAlbums: albums });
      });
  };

  changeAlbumName = album => {
    this.setState({ album });
    this.setState({ albumSongs: [] });
    const api = '5250da4d4e88ce97d088f9cc6229410b';
    let albumName = album;
    let artist = window.location.pathname.substring(8);
    axios
      .get(
        'https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=' +
          api +
          '&artist=' +
          artist +
          '&album=' +
          albumName +
          '&format=json'
      )
      .then(res => {
        const albumSongs = res.data.album.tracks.track.slice(0, 10);
        console.log(albumSongs);
        this.setState({ albumSongs });
      });
  };

  findAlbum = album => {
    console.log(album);
<<<<<<< HEAD
    let filterAlbums = this.state.albums;
    filterAlbums = filterAlbums.filter(el => {
      return el.name.toLowerCase().search(album.toLowerCase()) !== -1;
=======
    let filterAlbums = this.state.albums.slice();
    filterAlbums = filterAlbums.filter((el) => {
      return el.name.toLowerCase().search(album.toLowerCase()) !== -1
>>>>>>> 3d45b71ea2aec3cead00a264a7f3967c33abd466
    });
    this.setState({ filterAlbums });
  };

  render() {
    const topTenSongs = this.state.filterAlbums.map((album, i) => {
      return (
        <AlbumCard
          albumName={album.name}
          changeAlbumName={this.changeAlbumName}
          key={i}
          rank={i + 1}
          img={album.image[2]['#text']}
          albumSongs={this.state.albumSongs}
        />
      );
    });

    return (
      <div className='albums'>
        <h1>
          <span>{this.props.rockArtist}</span> Albums
        </h1>
        <h2>
          <span>Search</span>
        </h2>
        <input
          type='text'
          name='search'
          placeholder='Find Album...'
          onChange={e => this.findAlbum(e.target.value)}
        />
        {topTenSongs.length > 0 ? topTenSongs : <Spinner />}
      </div>
    );
  }
}

export default Albums;
