import React from "react";
import './App.css';

const Voting = ({ offices }) => {

  const upvoteHandler = async (id) => {
    await fetch('http://localhost:3030/upvote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id
      })
    })
  };

  return (<div className='OfficeContainer'>
    {offices.map((office) => (
      <div key={office.count + 1 * Math.random()} className="OfficeCard">
        <div>
          <img src={office.imageURL} alt={office.name} />
          <h1>{office.name}</h1>
        </div>
        <div className='counter'>{office.count}</div>
        <button className='btn' onClick={() => upvoteHandler(office.id)}>Vote</button>
      </div>
    ))}
  </div>)
}

export default Voting;