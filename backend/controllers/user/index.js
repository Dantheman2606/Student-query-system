const allUsers = require('./allUsers');
const getUserProfile = require('./getUserProfile');
const updateUserProfile = require('./updateUserProfile');
const deleteUserProfile = require('./deleteUserProfile');

module.exports = {
    getUserProfile,
    allUsers,
    updateUserProfile,
    deleteUserProfile
}