// const {addBookHandler, showBooksHandler, getIdBookHandler, updateBookByIdHandler, deleteBookByIdHandler} = require('./handler.js');
const {addBookHandler, showBooksHandler, getBookbyIdHandler, updateBookByIdHandler, deleteBookByIdHandler} = require('./handler.js');
const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: addBookHandler,
    },
    {
      method: 'GET',
      path: '/books',
      handler: showBooksHandler,
    },
    {
      method: 'GET',
      path: '/books/{id}',
      handler: getBookbyIdHandler,
    },
    {
      method: 'PUT',
      path: '/books/{id}',
      handler: updateBookByIdHandler,
    },
    {
      method: 'DELETE',
      path: '/books/{id}',
      handler: deleteBookByIdHandler,
    }
  ];
   
module.exports = routes;
