import express from "express";
import cors from "cors";
import "./database.js";
import Book from "./Book.js";

const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());

// Routes

// Insertar libro
app.post("/insertOne", async (req, res) => {
  console.log(req.body);
  const book = await Book.create(req.body);
  res.json(book);
});

// Traer todos los libros
app.get("/getAll", async (req, res) => {
  const books = await Book.find();
  res.json({ data: books });
});

// Obtener un libro por serie
app.get("/getOne/:book_numserie", async (req, res) => {
  const book = await Book.findOne({ book_serie: req.params.book_numserie });
  if (book) res.json({ data: book });
  else res.status(404).json({ message: "Libro no encontrado" });
});

// Actualizar libro por serie
app.put("/updateOne/:book_numserie", async (req, res) => {
  const result = await Book.findOneAndUpdate(
    { book_serie: req.params.book_numserie },
    req.body,
    { new: true }
  );
  if (result) {
    res.json({ message: "Libro actualizado", data: result });
  } else {
    res.status(404).json({ message: "Libro no encontrado" });
  }
});

// Eliminar libro
app.delete("/deleteOne/:book_numserie", async (req, res) => {
  const result = await Book.findOneAndDelete({
    book_serie: req.params.book_numserie,
  });
  if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: "Libro no encontrado" });
  }
});

// Start server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
