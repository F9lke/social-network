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
        const { loading } = this.props.news;
        let newsContent;

        if (newsContent === null || loading) {
            newsContent = <Spinner />
        } else {
            newsContent = <NewsFeed news={this.props.news} />
        }

        return (
            <div className="News container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
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