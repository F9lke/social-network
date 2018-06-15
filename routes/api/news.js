const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// News Model
const News = require('../../models/News');

// Validation
const validateNewsInput = require('../../validation/news');
const validatePostInput = require('../../validation/post');

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
        .catch(err => res.status(404).json({ articlenotfound: 'No article found with the corresponding id' }));
})

// @route  POST api/news/like/:id
// @desc   Like News Article
// @access Private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    News.findById(req.params.id)
        .then(article => {
            if (article.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                return res.status(400).json({ alreadyLiked: 'User already liked this article' });
            }

            article.likes.unshift({ user: req.user.id });
            article.save().then(article => res.json(article));
        })
        .catch(err => res.status(404).json({ articlenotfound: 'No article found with the corresponding id' }))
})

// @route  POST api/news/unlike/:id
// @desc   Unlike News Article
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    News.findById(req.params.id)
        .then(article => {
            if (article.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                return res.status(400).json({ notliked: 'User did not like the article' })
            }

            const removeIndex = article.likes
                .map(item => item.user.toString())
                .indexOf(req.user.id);

            article.likes.splice(removeIndex, 1);

            article.save().then(article => res.json(article));
        })
        .catch(err => res.status(404).json({ articlenotfound: 'No article found with the corresponding id' }))
})

// @route  POST api/news/comment/:id
// @desc   Add comment to news
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) return res.status(400).json(errors);

    News.findById(req.params.id)
        .then(article => {
            const newComment = {
                text: req.body.text,
                name: req.body.name,
                avatar: req.body.avatar,
                user: req.user.id
            }

            article.comments.unshift(newComment);

            article.save().then(article => res.json(article));
        })
        .catch(err => res.status(404).json({ articlenotfound: 'No article found with the corresponding id' }));
})

// @route  DELETE api/news/comment/:id/:comment_id
// @desc   Delete comment
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    News.findById(req.params.id)
        .then(article => {

            if (article.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                return res.status(404).json({ commentnotexisting: 'Comment does not exist' })
            }

            const removeIndex = article.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id);

            article.comments.splice(removeIndex, 1);

            article.save().then(article => res.json(article));

        })
        .catch(err => res.status(404).json({ articlenotfound: 'No article found with the corresponding id' }));
})

module.exports = router;