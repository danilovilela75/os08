const Dev = require('../model/Dev');

module.exports = {

    async store (req, res) {

        const { devId } = req.params;
        const { user } = req.headers;

        const loggedDev = await Dev.findById(user);
        const targetDev = await Dev.findById(devId);

        if(!targetDev) {
            return res.status(400).json({ error: "Dev not exist!" });
        }

        if(targetDev.likes.includes(loggedDev._id)) {
            console.log("Deu match!");
        }

        loggedDev.likes.push(targetDev._id);
        
        await loggedDev.save();

        console.log(loggedDev);

        return res.json(loggedDev);

    },

};