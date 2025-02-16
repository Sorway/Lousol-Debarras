const routes = require('express').Router();

routes.get('/', async (req, res) => res.render('index'));
routes.get('/about', async (req, res) => res.render('about'));
routes.get('/services', async (req, res) => res.render('services'));
routes.get('/contact', async (req, res) => res.render('contact'));

module.exports = routes;