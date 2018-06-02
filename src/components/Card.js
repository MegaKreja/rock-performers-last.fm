import React from "react";
import Spinner from "./Spinner";
import "../styles/Card.css";

const card = (props) => {
  console.log(props.img);
  let backSide = (
    <p>{props.summary}...</p>
  )

  return (
    <div className="flip-container">
      <div onMouseEnter={() => props.changeName(props.artistName)} className="card">
        <div className="front">
          <img src={props.img} alt=""/>
          <h2>{props.rank}. <span>{props.artistName}</span></h2>
        </div>
        <div className="back">
          {props.summary ? backSide : <Spinner />}
          <div><a onClick={() => props.openAlbums(props.artistName)} className="btn btn-sm animated-button thar-three">Albums</a></div>
        </div>
      </div>
    </div>
  );
}

export default card;