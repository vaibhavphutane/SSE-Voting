import React from "react";
import "./App.css";

const Voting = ({ offices }) => {
  const upvoteHandler = async (id) => {
    await fetch("http://localhost:3030/upvote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });
  };

  return (
    <div className="OfficeContainer">
      {offices.map((office) => (
        <div key={office.count + 1 * Math.random()} className="OfficeCard">
          <div>
            <figure className="position-relative m-0">
              <img src={office.imageURL} alt={office.name} />
              <figcaption className="officeName">{office.name}</figcaption>
            </figure>
          </div>
          <div>
            <div className="counter">{office.count}</div>
            <small>votes</small>
          </div>
          <button className="btn" onClick={() => upvoteHandler(office.id)}>
            Vote
          </button>
        </div>
      ))}
    </div>
  );
};

export default Voting;
