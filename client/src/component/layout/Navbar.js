import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fa fa-users' />
          {'  '} <span className='hide-sm'>Developers</span>
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i className='fa fa-gift ' />
          {'  '}
          <span className='hide-sm'> Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user' />{' '}
          <span className='hide-sm'> Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'> Logout </span>{' '}
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>
          <i className='fa fa-users' />
          {'  '}
          Developers
        </Link>
      </li>
      <li>
        <Link to='/register'>
          <i className='fa fa-address-book' />
          {'  '}
          Register
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <i className='fa fa-sign-in-alt' />
          {'  '}Login
        </Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
