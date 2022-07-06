const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const checkName = request.payload.name;
  if (!checkName) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const isFinished = pageCount === readPage;
  let finished = false;
  if (isFinished) finished = true;
  else finished = false;

  const newBook = {
    // eslint-disable-next-line max-len
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };
  books.push(newBook);

  const isSuccess = books.filter((Book) => Book.id === id).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  // eslint-disable-next-line no-else-return
  } else {
    const response = h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    });
    response.code(500);
    return response;
  }
};

const mappingBook = (data) => {
  const obj = data.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  return obj;
};

const getBooksHandler = (request) => {
  const {
    reading, name, finished,
  } = request.query;
  let hasil = [];
  if (name !== undefined) {
    hasil = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  } else if (reading !== undefined) {
    hasil = books.filter((book) => Number(book.reading) === Number(reading));
  } else if (finished !== undefined) {
    hasil = books.filter((book) => Number(book.finished) === Number(finished));
  } else {
    hasil = books;
  }
  return {
    status: 'success',
    data: {
      books: mappingBook(hasil),
    },
  };
};

const getBookbyIdHandler = (request, h) => {
  const { id } = request.params;
  const Book = books.filter((book) => book.id === id)[0];

  if (Book !== undefined) {
    return {
      status: 'success',
      data: { book: Book },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

const updateBookByIdHandler = (request, h) => {
  const checkName = request.payload.name;
  if (!checkName) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }
  const { id } = request.params;
  const index = books.findIndex((Book) => Book.id === id);
  const updatedAt = new Date().toISOString();
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  if (readPage >= pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }
  if (index !== -1) {
    books[index] = {
      // eslint-disable-next-line max-len
      ...books[index], name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((Book) => Book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  // eslint-disable-next-line max-len
  addBookHandler, getBooksHandler, getBookbyIdHandler, updateBookByIdHandler, deleteBookByIdHandler,
};
