import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profileActions';
import { connect } from 'react-redux';

class Dashboard extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }

    render() {
        return (
            <h1>Dashboard</h1>
        )
    }
}

export default connect(null, { getCurrentProfile })(Dashboard);
