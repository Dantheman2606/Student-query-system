const createQuery = require('./createQuery');
const getAllQueries=require('./getAllQueries');
const getQueryById=require('./getQueryById');
const getQueryByTags=require('./getQueryByTags');
const deleteQueryById=require('./deleteQueryById');
const upvoteQuery=require('./upvoteQuery');
const downvoteQuery=require('./downvoteQuery');
const voteCountOfQuery=require('./voteCountOfQuery');

module.exports = {
    createQuery,
    getAllQueries,
    getQueryById,
    upvoteQuery,
    downvoteQuery,
    voteCountOfQuery,
    getQueryByTags,
    deleteQueryById
};
