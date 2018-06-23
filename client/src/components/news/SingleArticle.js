import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import {
    getNewsArticle,
    deleteNewsArticle,
    addLikeNewsArticle,
    removeLikeNewsArticle
} from '../../actions/newsActions';

class SingleArticle extends Component {
    constructor(props) {
        super(props);

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.findUserLike = this.findUserLike.bind(this);
        this.onLikeClick = this.onLikeClick.bind(this);
        this.onUnlikeClick = this.onUnlikeClick.bind(this);
    }

    componentDidMount() {
        this.props.getNewsArticle(this.props.match.params.id);
    }

    onDeleteClick(id) {
        this.props.deleteNewsArticle(this.props.news.article._id);
    }

    findUserLike(likes) {
        const { auth } = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    onLikeClick() {
        this.props.addLikeNewsArticle(this.props.news.article._id);
    }

    onUnlikeClick() {
        this.props.removeLikeNewsArticle(this.props.news.article._id);
    }

    render() {
        const { auth } = this.props;
        const { article, loading } = this.props.news;
        const { permission } = auth.user;
        let articleContent;

        if (article === null || loading || Object.keys(article).length === 0) {
            articleContent = <Spinner />;
        } else if (article.length === 0) {
            articleContent = <h1 className="text-center">No article found with that id.</h1>
        } else {
            articleContent = (
                <div className="col-md-12">
                    <Link to="/news" className="btn btn-light mb-3">
                        Go Back
                    </Link>
                    <div className="card card-body mb-3">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="container">
                                    <h3 className="mb-3">{article.title}</h3>
                                    <p className="lead">{article.information}</p>
                                    <span>
                                        <button
                                            onClick={this.onLikeClick}
                                            type="button"
                                            className="btn btn-light mr-1"
                                        >
                                            <i
                                                className={classnames(
                                                    "fas fa-thumbs-up",
                                                    {
                                                        "text-info": this.findUserLike(
                                                            article.likes
                                                        )
                                                    }
                                                )}
                                            />
                                            <span className="badge badge-light">
                                                {article.likes.length}
                                            </span>
                                        </button>
                                        <button
                                            onClick={this.onUnlikeClick}
                                            type="button"
                                            className="btn btn-light mr-1"
                                        >
                                            <i className="text-secondary fas fa-thumbs-down" />
                                        </button>
                                        {permission === 'admin' ? (
                                            <button
                                                onClick={this.onDeleteClick}
                                                type="button"
                                                className="btn btn-danger mr-1"
                                            >
                                                <i className="fas fa-times" />
                                            </button>
                                        ) : null}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="SingleArticle">
                {articleContent}
            </div>
        )

    }
}

SingleArticle.propTypes = {
    getNewsArticle: PropTypes.func.isRequired,
    news: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    news: state.news
})

export default connect(mapStateToProps, { getNewsArticle, deleteNewsArticle, addLikeNewsArticle, removeLikeNewsArticle })(SingleArticle);