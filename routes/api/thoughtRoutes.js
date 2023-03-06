const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction } = require('../../controllers/thoughtController');

// /api/thought
router.route('/').get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thought/:thoughtId/reaction/:reactionId
router.route('/reaction/:reactionId').post(addReaction).delete(removeReaction);

module.exports = router;