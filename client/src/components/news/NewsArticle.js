import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import setExcerpt from "../../utils/setExcerpt";
import { Link } from "react-router-dom";
import {
    deleteNewsArticle,
    addLikeNewsArticle,
    removeLikeNewsArticle
} from "../../actions/newsActions";

class NewsArticle extends Component {
    constructor(props) {
        super(props);

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onLikeClick = this.onLikeClick.bind(this);
        this.onUnlikeClick = this.onUnlikeClick.bind(this);
        this.findUserLike = this.findUserLike.bind(this);
    }

    onDeleteClick(id = this.props.article._id) {
        this.props.deleteNewsArticle(this.props.article._id);
    }

    onLikeClick(id = this.props.article._id) {
        this.props.addLikeNewsArticle(this.props.article._id);
    }

    onUnlikeClick(id = this.props.article._id) {
        this.props.removeLikeNewsArticle(this.props.article._id);
    }

    findUserLike(likes) {
        const { auth } = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        const { article, auth, showActions, excerptLength } = this.props;
        const { permission } = auth.user;

        const information = setExcerpt(
            article.information,
            excerptLength,
            "words"
        );

        return (
            <div className="col-md-12">
                <div className="card card-body mb-3">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="container">
                                <h3 className="mb-3">{article.title}</h3>
                                <p className="lead">{information}</p>
                                {showActions ? (
                                    <span>
                                        <button
                                            onClick={this.onLikeClick.bind(
                                                article._id
                                            )}
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
                                            onClick={this.onUnlikeClick.bind(
                                                article._id
                                            )}
                                            type="button"
                                            className="btn btn-light mr-1"
                                        >
                                            <i className="text-secondary fas fa-thumbs-down" />
                                        </button>
                                        <Link
                                            to={`/news/article/${article._id}`}
                                            className="btn btn-info mr-1"
                                        >
                                            Read More
                                        </Link>
                                        {permission === 'admin' ? (
                                            <button
                                                onClick={this.onDeleteClick.bind(
                                                    article._id
                                                )}
                                                type="button"
                                                className="btn btn-danger mr-1"
                                            >
                                                <i className="fas fa-times" />
                                            </button>
                                        ) : null}
                                    </span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NewsArticle.defaultProps = {
    showActions: true
};

NewsArticle.propTypes = {
    addLikeNewsArticle: PropTypes.func.isRequired,
    removeLikeNewsArticle: PropTypes.func.isRequired,
    deleteNewsArticle: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    showActions: PropTypes.bool
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { deleteNewsArticle, addLikeNewsArticle, removeLikeNewsArticle }
)(NewsArticle);
