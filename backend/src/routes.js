const { Router } = require('express');

const DevController = require('./controller/DevController');
const LikeController = require('./controller/LikeController');
const DislikeController = require('./controller/DislikesController');

const routes = Router();

routes.get('/', (req, res) => {
    return res.json({ server_status: "Iniciado" });
});

routes.post('/teste', (req, res) => {
    return res.json({ message: `Olá ${req.body.name}` });
});

routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);

routes.post('/devs/:devId/likes', LikeController.store);
routes.post('/devs/:devId/dislikes', DislikeController.store);

module.exports = routes;