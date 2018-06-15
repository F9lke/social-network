import {
    ADD_NEWS_ARTICLE,
    GET_NEWS_ARTICLES,
    GET_NEWS_ARTICLE,
    NEWS_ARTICLE_LOADING,
    DELETE_NEWS_ARTICLE
} from '../actions/types';

const initialState = {
    articles: [],
    article: {},
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case NEWS_ARTICLE_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_NEWS_ARTICLES:
            return {
                ...state,
                articles: action.payload,
                loading: false
            }
        case GET_NEWS_ARTICLE:
            return {
                ...state,
                article: action.payload,
                loading: false
            }
        case ADD_NEWS_ARTICLE:
            return {
                ...state,
                articles: [action.payload, ...state.articles]
            }
        case DELETE_NEWS_ARTICLE:
            return {
                ...state,
                articles: state.articles.filter(article => article._id !== action.payload)
            }
        default:
            return state;
    }
}