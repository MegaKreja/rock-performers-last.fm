import React from "react";
import "../styles/Card.css";

const card = (props) => {
  console.log(props.img)
  return (
    <div className="card">
      <img src={props.img} alt=""/>
      <h2>{props.rank}. <span>{props.artistName}</span></h2>
    </div>
  );
}

export default card;