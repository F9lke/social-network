import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
    onLogoutClick(event) {
        event.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;
        const { permission } = user;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item mr-2">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li className="nav-item">
                    <a
                        href=""
                        onClick={this.onLogoutClick.bind(this)}
                        className="nav-link"
                    >
                        <img
                            className="rounded-circle"
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '25px', marginRight: '5px' }}
                            title="You must have a Gravatar connected to your email to display an image"
                        />
                        Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );

        const adminNews = (
            <li className="nav-item dropdown">
                <a className="dropdown-toggle nav-link" data-toggle="dropdown" href="">News
                <span className="caret"></span></a>
                <ul className="dropdown-menu">
                    <li><Link to="/news" className="nav-link text-dark mx-auto p-auto">News Feed</Link></li>
                    <li><Link to="/news/write" className="nav-link text-dark mx-auto p-auto">Write Article</Link></li>
                </ul>
            </li>
        )

        const userNews = (
            <li className="nav-item">
                <Link className="nav-link" to="/news">News</Link>
            </li>
        )

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item mr-2">
                                <Link className="nav-link" to="/feed">Post Feed</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles">Developers</Link>
                            </li>
                            {permission === 'admin' ? adminNews : userNews}
                        </ul>

                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
