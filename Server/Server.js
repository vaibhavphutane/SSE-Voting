const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

let offices = [
  {
    name: "Bangalore",
    imageURL: "https://i.ibb.co/qj6bV3j/India-Bangalore.png",
    count: 0,
    id: 1,
  },
  {
    name: "Chennai",
    imageURL: "https://i.ibb.co/DQNCytT/India-Chennai.png",
    count: 0,
    id: 2,
  },
  {
    name: "Coimbatore",
    imageURL: "https://i.ibb.co/yQqfdF6/India-Coimbatore.png",
    count: 0,
    id: 3,
  },
  {
    name: "Gurgaon",
    imageURL: "https://i.ibb.co/fp5M0HD/India-Gurgaon.jpg",
    count: 0,
    id: 4,
  },
  {
    name: "Hyderabad",
    imageURL: "https://i.ibb.co/ZWZ64np/India-Hyderabad.png",
    count: 0,
    id: 5,
  },
  {
    name: "Mumbai",
    imageURL: "https://i.ibb.co/ygq244d/India-Mumbai.png",
    count: 0,
    id: 6,
  },
  {
    name: "Pune",
    imageURL: "https://i.ibb.co/HnL1xMk/India-Pune.png",
    count: 0,
    id: 7,
  },
];

let clients = [];

const eventsHandler = (request, response, next) => {
  const headers = {
    "Content-Type": "text/event-stream",
    Connection: "keep-alive",
    "Cache-Control": "no-cache",
  };
  response.writeHead(200, headers);

  const data = `data: ${JSON.stringify(offices)}\n\n`;

  response.write(data);

  const clientId = Date.now();

  const newClient = {
    id: clientId,
    response,
  };

  clients.push(newClient);

  request.on("close", () => {
    console.log(`${clientId} Connection closed`);
    clients = clients.filter((client) => client.id !== clientId);
  });
};

const broadCast = (updatedOffices) => {
  clients.forEach((client) =>
    client.response.write(`data: ${JSON.stringify(updatedOffices)}\n\n`)
  );
};

app.get("/getOffices", eventsHandler);

app.get("/reset", (req, res) => {
  offices = offices.map((office) => ({ ...office, count: 0 }));
  res.send({ status: 200 });
  return broadCast(offices);
});

app.post("/upvote", (req, res) => {
  offices = offices.map((office) => {
    if (office.id === req.body.id) {
      return {
        ...office,
        count: office.count + 1,
      };
    }
    return office;
  });
  res.send(offices);
  return broadCast(offices);
});

app.listen("3030", () => {
  console.log("Server started");
});
