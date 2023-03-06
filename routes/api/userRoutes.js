const router = require('express').Router();
const { getUsers, getSingleUser, createUser, updateUser,deleteUser, addFriend, removeFriend } = require('../../controllers/userController');

// /api/user
router.route('/').get(getUsers).post(createUser);

// /api/user/:userId
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/user/:userId/friend/:friendId
router.route('/:userId/friend/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;