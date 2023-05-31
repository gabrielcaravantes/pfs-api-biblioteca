//define o esquema e as operações relacionadas ao modelo Book no banco de dados
import mongoose from "../services/mongooseService.js";

//definição do esquema do livro
//o esquema especifica os campos do livro, título, conteúdo, contagem de visualizações, status de publicação, data de criação e atualização, e o ID do autor.
const bookSchema = new mongoose.Schema({
    title: String,
    content: String,
    viewCount: Number,
    published: Boolean,
    createdAt: Date,
    updatedAt: Date,
    authorId: String,
});

//criação do modelo Book com base no esquema
const Book = mongoose.model("Books", bookSchema);

//buscar livros
async function getBooks() {
    const users = Book.find();
    return users;
}

//cria um novo livro com base nos dados fornecidos
async function createBook(userData) {
    const { title, content, authorId } = userData;
    const now = new Date();

    const book = new Book({
        title: title || "",
        content: content || "",
        viewCount: 0,
        published: false,
        createdAt: now,
        updatedAt: now,
        authorId: authorId,
    });
    //salva o livro no banco de dados
    return await book.save();
}

//encontra e atualiza um livro com base no ID fornecido
async function findBook(id) {
    const updatedBook = await Book.findByIdAndUpdate(
        id,
        {
            $inc: {
                viewCount: 1,
            },
        },
        { new: true }
    );

    return updatedBook;
}

//deleta um livro com base no ID fornecido
async function deleteBook(id) {
    const book = await Book.findByIdAndDelete(id);
    return book;
}

//atualizar informações do livro pelo id
async function updateBook(id, newData) {
    const book = await Book.findByIdAndUpdate(
        id,
        {
            title: newData?.title,
            content: newData?.content
        },
        { new: true }
    );
    return await book;
}

const bookModel = {
    createBook,
    findBook,
    getBooks,
    deleteBook,
    updateBook,
};

export default bookModel;
