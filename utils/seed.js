const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    // Delete the entries in the collection
    await Reaction.deleteMany({});
    await Thought.deleteMany({});
    await User.deleteMany({});

    const reaction = [
        {
            'reactionBody': 'The first star I see tonight',
            'username': 'guillameH123'
        },
        {
            'reactionBody': 'How I wonder what you are!',
            'username': 'eveF789'
        },
        {
            'reactionBody': 'Went up the hill to fetch a pail of water',
            'username': 'camD456'
        },
        {
            'reactionBody': 'Have you any wool?',
            'username': 'alexB123'
        },
        {
            'reactionBody': 'Do you know the muffin man?',
            'username': 'kodyL789'
        },
        {
            'reactionBody': 'This little piggy had roast beef',
            'username': 'opheliaP456'
        },
        {
            'reactionBody': 'See how they run!',
            'username': 'iliaJ456'
        },
        {
            'reactionBody': 'Down came the rain...and washed the spider out!',
            'username': 'macyN123'
        },
    ];
    
    const thought = [
        {
            'thoughtText': 'Star Light, Star Bright',
            'username': 'alexB123',
            'reaction': []
        },
        {
            'thoughtText': 'Twinkle, Twinkle, Little Star',
            'username': 'camD456',
            'reaction': []
        },
        {
            'thoughtText': 'Jack and Jill',
            'username': 'eveF789',
            'reaction': []
        },
        {
            'thoughtText': 'Baa, Baa, Black Sheep',
            'username': 'guillameH123',
            'reaction': []
        },
        {
            'thoughtText': 'The Muffin Man',
            'username': 'iliaJ456',
            'reaction': []
        },
        {
            'thoughtText': 'This Little Piggy',
            'username': 'kodyL789',
            'reaction': []
        },
        {
            'thoughtText': 'Three Blind Mice',
            'username': 'macyN123',
            'reaction': []
        },
        {
            'thoughtText': 'Itsy Bitsy Spider',
            'username': 'opheliaP456',
            'reaction': []
        },
    ];
    
    const user = [
        {
            "username": "alexB123",
            "email": "alexB123@test.com",
            "thought": []
        },
        {
            "username": "camD456",
            "email": "camD456@test.com",
            "thought": []
        },
        {
            "username": "eveF789",
            "email": "eveF789@test.com",
            "thought": []
        },
        {
            "username": "iliaJ456",
            "email": "iliaJ456@test.com",
            "thought": []
        },
        {
            "username": "kodyL789",
            "email": "kodyL789@test.com",
            "thought": []
        },
        {
            "username": "macyN123",
            "email": "macyN123@test.com",
            "thought": []
        },
        {
            "username": "ophelia456",
            "email": "ophelia456@test.com",
            "thought": []
        },
        {
            "username": "quinR789",
            "email": "quinR789@test.com",
            "thought": []
        }
    ]
    
    // add reactions to thoughts
    for (var i = 0; i < thought.length; i++) {
        thought[i].reaction.push(reaction[i])
    }
    
    // add thoughts to users
    for (var i = 0; i < user.length; i++) { 
        // for every user, go through every thought
        for (var j = 0; j < thought.length; j++) {
            // if usernames match, push thought object to user's thought array
            if (user[i].username == thought[j].username) {
                user[i].thought.push(thought[j]); 
            }
        }
    }

    await User.collection.insertMany(user);
    await Thought.collection.insertMany(thought);
    await Reaction.collection.insertMany(reaction);

    // Log out a table for users, thoughts and reactions
    console.table(user);
    console.table(thought);
    console.table(reaction);
    console.info('Seeding complete! 🌱');
    process.exit(0);
});