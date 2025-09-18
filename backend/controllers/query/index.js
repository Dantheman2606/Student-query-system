const createQuery = require('./createQuery');
const getAllQueries=require('./getAllQueries');
const getQueryById=require('./getQueryById');
const getQueryByTags=require('./getQueryByTags');
const deleteQueryById=require('./deleteQueryById');

module.exports = {
    createQuery,
    getAllQueries,
    getQueryById,
    getQueryByTags,
    deleteQueryById
};
