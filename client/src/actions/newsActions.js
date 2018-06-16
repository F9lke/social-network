import axios from 'axios';

import {
    ADD_NEWS_ARTICLE,
    GET_NEWS_ARTICLES,
    GET_NEWS_ARTICLE,
    NEWS_ARTICLE_LOADING,
    DELETE_NEWS_ARTICLE,
    GET_ERRORS
} from './types';

import { clearErrors } from "./postActions";

// Add Article
export const addNewsArticle = articleData => dispatch => {
    dispatch(clearErrors);
    axios
        .post('/api/news', articleData)
        .then(res =>
            dispatch({
                type: ADD_NEWS_ARTICLE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

// Get Articles
export const getNewsArticles = () => dispatch => {
    dispatch(setArticleLoading);
    axios
        .get('/api/news')
        .then(res =>
            dispatch({
                type: GET_NEWS_ARTICLES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_NEWS_ARTICLES,
                payload: null
            })
        )
};

// Get Article
export const getNewsArticle = id => dispatch => {
    dispatch(setArticleLoading);
    axios
        .get(`/api/news/${id}`)
        .then(res =>
            dispatch({
                type: GET_NEWS_ARTICLE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_NEWS_ARTICLE,
                payload: null
            })
        )
};

// Delete Article
export const deleteNewsArticle = id => dispatch => {
    axios
        .delete(`/api/news/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_NEWS_ARTICLE,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

// Add Like
export const addLikeNewsArticle = id => dispatch => {
    axios
        .post(`/api/news/like/${id}`)
        .then(res => dispatch(getNewsArticles()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

// Remove Like
export const removeLikeNewsArticle = id => dispatch => {
    axios
        .post(`/api/news/unlike/${id}`)
        .then(res => dispatch(getNewsArticles()))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

// Add Comment
export const addCommentNewsArticle = (articleId, commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/api/news/comment/${articleId}`, commentData)
        .then(res =>
            dispatch({
                type: GET_NEWS_ARTICLE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

// Delete Comment
export const deleteCommentNewsArticle = (articleId, commentId) => dispatch => {
    axios
        .delete(`/api/news/comment/${articleId}/${commentId}`)
        .then(res =>
            dispatch({
                type: GET_NEWS_ARTICLE,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
};

// Set loading state
export const setArticleLoading = () => {
    return {
        type: NEWS_ARTICLE_LOADING
    }
};