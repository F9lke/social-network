import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import NewsFeed from './NewsFeed';
import { getNewsArticles } from '../../actions/newsActions';

class News extends Component {
    componentDidMount() {
        this.props.getNewsArticles();
    }

    render() {
        const { loading, articles } = this.props.news;
        let newsContent;

        if (newsContent === null || loading) {
            newsContent = <Spinner />
        } else {
            //newsContent = <NewsFeed news={this.props.news} />
            if (articles.length > 0) {
                newsContent = <NewsFeed news={this.props.news} />
            } else {
                newsContent = <h4>No articles found...</h4>;
            }
        }

        return (
            <div className="News container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 text-center">
                                News Articles
                            </h1>
                            <p className="lead text-center mb-5">
                                Read the latest articles
                            </p>
                            {newsContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

News.propTypes = {
    getNewsArticles: PropTypes.func.isRequired,
    news: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    news: state.news
})

export default connect(mapStateToProps, { getNewsArticles })(News);