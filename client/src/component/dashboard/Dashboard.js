import React, { Fragment, useEffect } from 'react';
import DashboardAction from './DashboardAction';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import { Link } from 'react-router-dom';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa_user'></i> Welcome 🖐️ {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardAction />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button className='btn btn-danger' onClick={() => deleteAccount()}>
              <i className='fas fa-user'> delete my account</i>
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>you have not set up profile , plz set up profile</p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            create profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
