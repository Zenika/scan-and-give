// ================= DATABASE SETUP ================== //
// Low DB is used as the flat file JSON database

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

// ================= DATABASE SETUP ================== //
// Express is used as the HTTP server

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sse = require("./sse");
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(sse);

// ================= REAL TIME ENDPOINT  ================== //
// We use server sent event to trigger the client when an update is made

let connections = [];

app.get("/sse", function(req, res) {
  const donsByAssociationId = getDonsByAssociationId();
  res.sseSetup();
  res.sseSend(donsByAssociationId);
  connections.push(res);
});

// ================= ASSOCIATIONS ENDPOINTS  ================== //

app.get("/api/associations", function(req, res) {
  const associations = db.get("associations").value();
  res.send(associations);
});

app.get("/api/associations/:associationId", function(req, res) {
  const association = db
    .get("associations")
    .find({ id: parseInt(req.params.associationId) })
    .value();
  res.send(association);
});

// ================= DONS ENDPOINTS  ================== //

app.post("/api/dons", function(req, res) {
  const hasDon = db
    .get("dons")
    .find({ hash: req.body.hash })
    .value();
  let don = null;
  if (hasDon === undefined) {
    don = db
      .get("dons")
      .push(req.body)
      .write();

    const donsByAssociationId = getDonsByAssociationId();
    connections.forEach(connection => connection.sseSend(donsByAssociationId));
  } else {
    res.status(400);
  }
  res.send(don);
});

app.get("/api/dons/:associationId", function(req, res) {
  const associationId = req.params.associationId;
  const dons = db
    .get("dons")
    .filter({ associationId: parseInt(associationId) })
    .size()
    .value();
  res.send({ associationId, dons });
});

app.get("/api/dons", function(req, res) {
  const donsByAssociationId = getDonsByAssociationId();
  res.send(donsByAssociationId);
});

function getDonsByAssociationId() {
  const donsByAssociationId = db
    .get("dons")
    .groupBy("associationId")
    .map((dons, associationId) => {
      const association = db
        .get("associations")
        .find({ id: parseInt(associationId) })
        .value();
      return {
        associationId,
        association: association.nom,
        image: association.image,
        nombre_correspondance: association.nombre_correspondance,
        correspondance: association.correspondance,
        correspondances: association.correspondances,
        dons: dons.length
      };
    })
    .value();
  return donsByAssociationId;
}

// ================= HERE WE GO!  ================== //

app.listen(3001, function() {
  console.log("Example app listening on port 3001!");
});
