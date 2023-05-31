import bookModel from "../models/bookModel.js";

//obtém todos os livros usando a função getBooks do modelo de livro
async function getBooks(req, res) {
    const users = await bookModel.getBooks();
    return res.status(200).send(users);
}

//busca um livro pelo ID usando a função findBook do modelo de livro
async function findBook(req, res) {
    const { id } = req.params;

    const book = await bookModel.findBook(id);
    if (book !== null) {
        return res.status(200).send(book);
    }

    return res.sendStatus(404);
}

//cria um novo livro usando a função createBook do modelo de livro
async function createBook(req, res) {
    const { _id } = req.jwt;
    const { title, content } = req.body;

    const book = await bookModel.createBook({ title, content, authorId: _id });
    return res.status(200).send(book);
}

//atualiza um livro pelo ID usando a função updateBook do modelo de livro
async function updateBook(req, res) {
    const { id } = req.params;

    const book = await bookModel.updateBook(id, req.body);
    if (book !== null) {
        return res.status(200).send(book);
    }
    
    return res.sendStatus(404);
}

//deleta um livro pelo ID usando a função deleteBook do modelo de livro
async function deleteBook(req, res) {
    const { id } = req.params;

    const book = await bookModel.deleteBook(id);
    if (book !== null) {
        return res.status(200).send(book);
    }

    return res.sendStatus(404);
}

const bookController = {
    getBooks,
    findBook,
    createBook,
    updateBook,
    deleteBook,
};

export default bookController;
