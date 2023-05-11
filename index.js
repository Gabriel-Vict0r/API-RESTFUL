//config inicial
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Person = require("./models/Person");
//forma de ler JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.post("/person", async (req, res) => {
  // req.body
  const { name, salary, aproved } = req.body;

  if (!name || !salary || aproved === "") {
    res.status(422).json({ error: "O nome é obrigatório!" });
  }
  const person = {
    name,
    salary,
    aproved,
  };

  //create
  try {
    //criando dados
    await Person.create(person);
    res.status(201).json({ message: "Pessoa inserida no sistema com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//rota inicial / endpoint
app.get("/", (req, res) => {
  //mostrar requisição
  res.json({ message: "Oi Express!" });
});
const DB_USER = "gabriel-vict0r";
const DB_PASSWORD = encodeURIComponent("QsLj7ddYTOkB8MZY");
//entregar uma porta
mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ygjbm0v.mongodb.net/`
  )
  .then(() => {
    console.log("conectamos ao mongodb");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

//PAREI NO 50:58
