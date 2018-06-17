import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { addNewsArticle } from '../../actions/newsActions';

class WriteArticle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            published: false,
            title: '',
            text: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.errors) {
            this.setState({ errors: newProps.errors });
        }
    }

    onSubmit(event) {
        event.preventDefault();

        const { user } = this.props.auth;

        const newArticle = {
            title: this.state.title,
            information: this.state.text,
            name: user.name,
            avatar: user.avatar
        }

        this.props.addNewsArticle(newArticle);
        this.setState({ title: '', text: '', published: newArticle });
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    render() {
        const { errors, published } = this.state;

        const publishedArticle = (
            <div className="row">
                <div className="col-md-12">
                    <div className="alert alert-success mb-3 mt-3" role="alert">
                        <strong>Success!</strong> You just published the article below.
                    </div>
                    <div className="card card-secondary">
                        <div className="card-header">
                            {published.title}
                        </div>
                        <div className="card-body">
                            {published.information}
                        </div>
                    </div>
                </div>
            </div>
        );

        return (
            <div className="WriteArticle">
                <h1 className="display-4 text-center">Tell the news</h1>
                <p className="lead text-center mb-5">
                    Write a news article publicly for every user
                </p>
                <div className="article-form mb-3">
                    <div className="card card-info">
                        <h5 className="card-header bg-info text-white mb-3" style={{ padding: 0.1 + "rem" }}></h5>
                        <div className="card-body" style={{ marginTop: -10 + "px" }}>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <TextFieldGroup
                                        placeholder="Title"
                                        name="title"
                                        type="text"
                                        value={this.state.title}
                                        onChange={this.onChange}
                                        error={errors.title}
                                    />
                                </div>
                                <div className="form-group">
                                    <TextAreaFieldGroup
                                        placeholder="Information"
                                        name="text"
                                        value={this.state.text}
                                        onChange={this.onChange}
                                        error={errors.text}
                                    />
                                </div>
                                <button type="submit" className="btn btn-dark">Publish</button>
                            </form>
                        </div>
                    </div>
                </div>
                {this.state.published ? publishedArticle : null}
            </div>
        )
    }
}

WriteArticle.propTypes = {
    addNewsArticle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(mapStateToProps, { addNewsArticle })(WriteArticle);
