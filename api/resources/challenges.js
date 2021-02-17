const { Router } = require('express');
const generateControllers = require('../modules/controllers');
const { checkAndExtractChallengesFieldsMiddlewareFactory } = require('./challenges.middleware');

const router = Router();
const challengesController = generateControllers('challenges');

router.route('/')
    .get(challengesController.queryAll)
    .post(
        checkAndExtractChallengesFieldsMiddlewareFactory({strict: true}),
        challengesController.create
    );

router.route('/:id')
    .get(challengesController.queryOne)
    .put(
        checkAndExtractChallengesFieldsMiddlewareFactory({strict: false}),
        challengesController.update
    )
    .delete(challengesController.remove);

module.exports = router;