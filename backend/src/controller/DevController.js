const Dev = require('../model/Dev');
const axios = require('axios');

module.exports = {

    async store (req, res) {

        const { username } = req.body;

        const userExists = await Dev.findOne({ user: username });

        if(userExists) {
            console.log(userExists);
            return res.json(userExists);
        }

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const { name, bio, avatar_url: avatar } = response.data;

        const dev = await Dev.create({
            name,
            user: username,
            bio,
            avatar
        });

        console.log(dev);

        return res.json(dev);

    },

    async index (req, res) {

        const { user } = req.headers;

        const dev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                { _id: { $ne: user } },
                { _id: { $nin: dev.likes } },
                { _id: { $nin: dev.dislikes } }
            ]
        })

        console.log(users);
        return res.json(users);

    },

};