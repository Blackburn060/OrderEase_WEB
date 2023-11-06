const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const request = require("request");
const serviceAccount = require("./orderease-76588-firebase-adminsdk-ie91v-65023f0baa.json");

const app = express();
const PORT = process.env.PORT || 3001;

// Configure o cors
app.use(cors({ origin: "*" }));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://orderease-76588-default-rtdb.firebaseio.com",
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

const db = admin.firestore();

// Função para fazer o upload da imagem para o ImgBB usando a biblioteca request
const uploadImageToImgBB = (imageBase64) => {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: 'https://api.imgbb.com/1/upload?key=6e2825a52e0efeaa3e997ff88d245086',
      headers: {
        'content-type': 'multipart/form-data',
      },
      formData: {
        image: imageBase64,
      },
    };

    request(options, (error, response, body) => {
      if (error) {
        console.error("Erro ao fazer upload da imagem para o ImgBB:", error);
        reject(error);
      } else {
        const responseData = JSON.parse(body);
        const imageUri = responseData.data.url;
        resolve(imageUri);
      }
    });
  });
};

app.post("/api/adicionar-produto", async (req, res) => {
  const { productId, productName, productDescription, productValue, imageBase64 } =
    req.body;

  if (!productId || !productName || !productDescription || !productValue || !imageBase64) {
    return res
      .status(400)
      .json({ error: "Todos os campos são obrigatórios, incluindo a imagem." });
  }

  // Remova o prefixo "data:image/png;base64," da imagem
  const base64WithoutPrefix = imageBase64.replace(/^data:image\/[a-zA-Z+]+;base64,/, '');

  uploadImageToImgBB(base64WithoutPrefix)
    .then((imageUri) => {
      const collectionRef = db.collection("Produto");
      collectionRef
        .add({
          id: productId,
          nome: productName,
          descricao: productDescription,
          valor: productValue,
          imageUri,
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
    })
    .catch((error) => {
      res.status(500).json({ error: "Erro ao fazer upload da imagem para o ImgBB." });
    });
});

app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});
