const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const serviceAccount = require("./orderease-76588-firebase-adminsdk-ie91v-65023f0baa.json");

const app = express();
const PORT = process.env.PORT || 3001;

// Configure o cors
app.use(cors({ origin: '*' }));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://orderease-76588-default-rtdb.firebaseio.com",
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = admin.firestore();

app.post("/api/adicionar-produto", async (req, res) => {
  const { productId, productName, productDescription, productValue, imageBase64 } = req.body;

  if (!productId || !productName || !productDescription || !productValue || !imageBase64) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios, incluindo a imagem." });
  }

  const imageBuffer = Buffer.from(imageBase64, "base64");

  // Faça o upload da imagem para o serviço de hospedagem ImgBB
  const imgbbApiKey = "6e2825a52e0efeaa3e997ff88d245086"; // Substitua pela sua chave de API
  const imgbbUploadURL = "https://api.imgbb.com/1/upload";

  const imgbbFormData = new FormData();
  imgbbFormData.append("image", imageBuffer, { filename: "product_image.jpg" });

  try {
    const imgbbResponse = await fetch(imgbbUploadURL, {
      method: "POST",
      body: imgbbFormData,
      headers: {
        ...imgbbFormData.getHeaders(),
        Authorization: `Bearer ${imgbbApiKey}`,
      },
    });

    if (imgbbResponse.ok) {
      const imgbbData = await imgbbResponse.json();
      const imageUrl = imgbbData.data.url; // URL da imagem hospedada no ImgBB

      // Agora você tem o URL da imagem, que pode ser armazenado no banco de dados
      console.log("URL da imagem hospedada:", imageUrl);

      // Além dos dados da imagem, envie os outros dados para o seu servidor
      const collectionRef = db.collection("Produto");
      collectionRef
        .add({
          id: productId,
          nome: productName,
          descricao: productDescription,
          valor: productValue,
          imageUrl: imageUrl, // Armazene o URL da imagem no banco de dados
        })
        .then((docRef) => {
          console.log("Servidor: Produto cadastrado com ID:", docRef.id);
          res.status(201).json({ message: "Servidor: Produto cadastrado com sucesso" });
        })
        .catch((error) => {
          console.error("Servidor: Erro ao cadastrar o produto:", error);
          res.status(500).json({ error: "Servidor: Erro ao cadastrar o produto" });
        });
    } else {
      console.error("Erro ao fazer o upload da imagem para o ImgBB");
      res.status(500).json({ error: "Erro ao fazer o upload da imagem para o ImgBB" });
    }
  } catch (error) {
    console.error("Erro durante a solicitação para o ImgBB:", error);
    res.status(500).json({ error: "Erro durante a solicitação para o ImgBB" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor Node.js rodando na porta ${PORT}`);
});
