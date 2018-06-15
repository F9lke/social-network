const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// News Model
const News = require('../../models/News');

// Validation
const validateNewsInput = require('../../validation/news');

// @route  GET api/news/test 
// @desc   Tests post route 
// @access Public
router.get('/test', (req, res) => res.json({ msg: "News Works" }))

// @route  GET api/news 
// @desc   Get News
// @access Public
router.get('/', (req, res) => {
    News.find()
        .sort({ date: -1 })
        .then(news => res.json(news))
        .catch(err => res.status(404).json({ noarticlefound: 'No news found' }));
})

// @route  GET api/news/:id
// @desc   Get news by id
// @access Public
router.get('/:id', (req, res) => {
    News.findById(req.params.id)
        .then(news => res.json(news))
        .catch(err => res.status(404).json({ noarticlefound: 'No news found with that id' }))
})

// @route  POST api/news 
// @desc   Create News Article
// @access Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validateNewsInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    const checkDataExistence = {
        title: req.body.title,
        information: req.body.information
    }

    News.findOne(checkDataExistence)
        .then(news => {
            if (news) {
                errors.data = 'An article with this data is already existing.';
                return res.status(400).json(errors);
            } else {
                const newNewsArticle = new News({
                    author: req.user.id,
                    title: req.body.title,
                    information: req.body.information
                })

                newNewsArticle.save()
                    .then(post => res.json(post))
                    .catch(err => res.json(err));
            }
        })
});

// @route  DELETE api/news/:id
// @desc   Delete News Article
// @access Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    News.findById(req.params.id)
        .then(article => {

            if (article.author.toString() !== req.user.id) {
                return res.status(401).json({ notauthorized: 'User not authorized' })
            }

            article.remove().then(() => res.json({ success: true }));

        })
        .catch(err => res.status(404).json({ articlenotfound: 'No article with the corresponding id found' }));
})

module.exports = router;