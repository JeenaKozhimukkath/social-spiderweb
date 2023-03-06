const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

// Aggregate function for getting the overall grade using $avg
// const grade = async (thoughtId) =>
//   Student.aggregate([
//     // only include the given student by using $match
//     { $match: { _id: ObjectId(reactionId) } },
//     {
//       $unwind: '$reaction',
//     },
//     {
//       $group: {
//         _id: ObjectId(reactionId),
//         reactionBody: '$reaction.reactionBody',
//         reactionUser: '$reaction.username',
//         reactionTime: '$reaction.createdAt',

//       },
//     },
//   ]);

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts)) // DO I NEED TO ADD IN THE OBJECTID/JSON FORMATTING FOR THE THOUGHTS?
            .catch((err) => res.status(500).json(err));
    },
    // Get a single thought by id
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a new thought (and push to associated user's 'thoughts' array field)
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thought: thought._id } },
                    { new: true }
                );
            })
            .then((user) => 
                !user
                    ? res
                        .status(404)
                        .json({ message: 'Thought created, but found no user with that ID' })
                    : res.json('Created the thought!')
            )
            .catch((err) => res.status(500).json(err));
    },
    // update a thought by id
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true}
            )
            .then((thought) => 
                !thought
                ? res
                .status(404).json({ message: 'No thought found with that ID' })
            : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete a thought by id
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id exists' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: 'Thought deleted, but no courses found' })
                    : res.json({ message: 'Thought successfully deleted' })
            )
            .catch((err) => res.status(500).json(err));
    },
    // Add a new reaction to a thought (store it in the thought's 'reactions' array field)
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reaction: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res
                        .status(404).json({ message: 'No thought found with that ID!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Remove a reaction from a thought's 'reaction' array feild
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};
