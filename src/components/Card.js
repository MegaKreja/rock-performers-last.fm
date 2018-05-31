import React from "react";
import "../styles/Card.css";

const card = (props) => {
  console.log(props.img)
  return (
    <div className="flip-container">
      <div className="card">
        <div className="front">
          <img src={props.img} alt=""/>
          <h2>{props.rank}. <span>{props.artistName}</span></h2>
        </div>
        <div className="back">
          
        </div>
      </div>
    </div>
  );
}

export default card;