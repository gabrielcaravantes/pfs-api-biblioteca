import bookModel from "../models/bookModel.js";

async function getBooks(req, res) {
    const users = await bookModel.getBooks();
    return res.status(200).send(users);
}

async function findBook(req, res) {
    const { id } = req.params;

    const book = await bookModel.findBook(id);
    if (book !== null) {
        return res.status(200).send(book);
    }

    return res.sendStatus(404);
}

async function createBook(req, res) {
    const { _id } = req.jwt;
    const { title, content } = req.body;

    const book = await bookModel.createBook({ title, content, authorId: _id });
    return res.status(200).send(book);
}

async function updateBook(req, res) {
    const { id } = req.params;

    const book = await bookModel.updateBook(id, req.body);
    if (book !== null) {
        return res.status(200).send(book);
    }
    
    return res.sendStatus(404);
}

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
