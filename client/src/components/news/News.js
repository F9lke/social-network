import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import { getNewsArticles } from '../../actions/newsActions';

class News extends Component{
    componentDidMount(){
        this.props.getNewsArticles();
    }

    render(){
        return(
            <div className="News container">

            </div>
        )
    }
}

News.propTypes = {
    getNewsArticles: PropTypes.func.isRequired
};

export default connect(null, { getNewsArticles })(News);