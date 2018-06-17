import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewsArticle from './NewsArticle';

class NewsFeed extends Component {
    render() {
        const { articles } = this.props.news;
        const output = articles.map(article => <NewsArticle key={article._id} article={article} excerptLength="50" />)

        return (
            <div className="row">
                {output}
            </div>
        )
    }
}

NewsFeed.propTypes = {
    news: PropTypes.object.isRequired
}

export default NewsFeed;
