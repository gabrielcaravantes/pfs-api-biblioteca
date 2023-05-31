import mongoose from "../services/mongooseService.js";

const bookSchema = new mongoose.Schema({
    title: String,
    content: String,
    viewCount: Number,
    published: Boolean,
    createdAt: Date,
    updatedAt: Date,
    authorId: String,
});

const Book = mongoose.model("Books", bookSchema);

async function getBooks() {
    const users = Book.find();
    return users;
}

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
    return await book.save();
}

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

async function deleteBook(id) {
    const book = await Book.findByIdAndDelete(id);
    return book;
}

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
