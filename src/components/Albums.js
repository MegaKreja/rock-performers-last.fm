import React, { Component } from 'react';
import axios from "axios"
import AlbumCard from "./AlbumCard";
import Spinner from "./Spinner";
import '../styles/Albums.css';

class Albums extends Component {
  render() {
    return (
      <div className="albums">
        <h1><span>{this.props.rockArtist}</span> Albums</h1>        
      </div>
    );
  }
}

export default Albums;

