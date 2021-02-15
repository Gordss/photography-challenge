const { Router } = require('express');
const generateControllers = require('../modules/controllers');

const router = Router();
const challengesController = generateControllers('challenges');

