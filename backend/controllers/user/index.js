const allUsers = require('./allUsers');
const getUserProfile = require('./getUserProfile');
const updateUserProfile = require('./updateUserProfile');
const deleteUserProfile = require('./deleteUserProfile');
const checkUserRole = require('./checkUserRole');

module.exports = {
    getUserProfile,
    allUsers,
    updateUserProfile,
    checkUserRole,
    deleteUserProfile
}