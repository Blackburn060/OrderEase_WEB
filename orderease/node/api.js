const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");

const app = express();

var serviceAccount = require("./orderease-76588-firebase-adminsdk-ie91v-65023f0baa.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://orderease-76588-default-rtdb.firebaseio.com",
});

app.use(bodyParser.urlencoded({ extended: true })); // Use body-parser for x-www-form-urlencoded data
app.use(express.json()); // Use express.json() for JSON data

const db = admin.firestore();

app.post("/api/adicionar-produto", (req, res) => {
  const { productId, productName, productDescription, productValue } = req.body;

  const collectionRef = db.collection("Produto");
  collectionRef
    .add({
      id: productId,
      nome: productName,
      descricao: productDescription,
      valor: productValue,
    })
    .then((docRef) => {
      console.log("Servidor: Produto cadastrado com ID:", docRef.id);
      res
        .status(201)
        .json({ message: "Servidor: Produto cadastrado com sucesso" });
    })
    .catch((error) => {
      console.error("Servidor: Erro ao cadastrar o produto:", error);
      res.status(500).json({ error: "Servidor: Erro ao cadastrar o produto" });
    });
});

module.exports = app;
