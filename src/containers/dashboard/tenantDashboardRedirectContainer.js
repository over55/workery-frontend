import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { pullProfile } from "../../actions/profileAction";
import TenantRedirectComponent from "../../components/dashboard/tenantRedirectComponent";
import { setAccessTokenInLocalStorage, setRefreshTokenInLocalStorage } from '../../helpers/jwtUtility';


class TenantDashboardRedirectContainer extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the arguments as follows.
        const { accessToken, refreshToken, schemaName } = this.props.match.params;

        this.state = {
            referrer: '',
            accessTokenString: accessToken,
            refreshTokenString: refreshToken,
            schemaName: schemaName,
        }

        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Defensive code: If we don't have the details then don't run this
        // function in our code.
        const { accessTokenString, refreshTokenString, schemaName } = this.state;
        if (accessTokenString === undefined || accessTokenString === null) {
            alert("NULL TOKEN DETECTED.");
            return;
        }

        // IMPORTANT: WE ARE TAKING THE ACCESS TOKEN FOUND AS A URL ARGUMENT
        // AND INSERTING IT INTO OUR TOKEN-UTILITY LIBRARY SO ALL OUR API
        // NOW CAN USE IT AND WE HAVE ACCESS TO THE TENANTED API DATA.
        setAccessTokenInLocalStorage(accessTokenString);

        // IMPORTANT: WE NEED TO SAVE THE REFRESH TOKEN AS WELL!
        setRefreshTokenInLocalStorage(refreshTokenString);

        // IMPORTANT: NOW THAT WE HAVE ATTACHED OUR ACCESS TOKEN TO OUR LOCAL
        // STORAGE, WE CAN NOW MAKE API CALLS.
        this.props.pullProfile(schemaName, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(responseData) {
        // DEVELOPERS NOTE:
        // WE WILL SAVE THE ACCESS TOKEN AND REFRESH TOKEN THAT IS PROVIDED
        // BY THE GET PROFILE ENDPOINT SUCCESS RESPONSE. ONCE WE SAVE THE
        // TOKENS WE WILL REDIRECT THE USER TO THE DASHBOARD. THE PURPOSE OF
        // THIS IS SO WE ENABLE THE ABILITY FOR EXECUTIVES TO SWITCH TENANT
        // MEMBERSHIP.

        const { accessToken, refreshToken } = responseData;
        if (accessToken === undefined || accessToken === null || accessToken === "" || accessToken === "null") {
            alert("onSuccessfulSubmissionCallback: NULL TOKEN DETECTED.");
            return;
        }

        setAccessTokenInLocalStorage(accessToken);
        setRefreshTokenInLocalStorage(refreshToken);

        this.setState({
            referrer: "/dashboard"
        });
    }

    onFailedSubmissionCallback() {
        // Do nothing.
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        if (this.state.referrer !== undefined && this.state.referrer !== null && this.state.referrer !== '') {
            return <Redirect to="/dashboard" />
        }
        return (
            <TenantRedirectComponent />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        onboarding: store.onboardingState
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProfile: (overrideTenantSchema, successCallback, failureCallback) => {
            dispatch(pullProfile(overrideTenantSchema, successCallback, failureCallback))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TenantDashboardRedirectContainer);
