import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WriteArticle from './WriteArticle';

class NewsAdmin extends Component {
    render() {
        return (
            <div className="news-admin">
                <div className="write-article container">
                    <WriteArticle />
                </div>
            </div>
        )
    }
}

export default NewsAdmin;
