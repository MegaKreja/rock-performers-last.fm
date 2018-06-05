import React from "react";
import Spinner from "./Spinner";
import "../styles/Card.css";

const card = (props) => {
  console.log(props.img);
  const topTenSongs = props.albumSongs.map((song, i) => {
    return (
      <p id="songParagraph"><a id="songLink" href={song.url}><span id="songRank">{i + 1}.</span> {song.name}</a></p>
    );
  })

  return (
    <div className="flip-container">
      <div onMouseEnter={() => props.changeAlbumName(props.albumName)} className="card">
        <div className="front">
          <img src={props.img} alt=""/>
          <h2><span>{props.albumName}</span></h2>
        </div>
        <div className="back">
          {props.albumSongs.length > 0 ? topTenSongs : <Spinner />}
        </div>
      </div>
    </div>
  );
}

export default card;