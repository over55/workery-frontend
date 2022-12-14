import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { BootstrapInputGroup } from '../bootstrap/bootstrapInputGroup';
import { FlashMessageComponent } from "../flashMessageComponent";


class AlertComponent extends Component {
    render() {
        const { wasLoggedOut = false } = this.props;
        if (wasLoggedOut === false) {
            return null
        }
        return (
            <div className="row" id="logout-message">
                <div className="col-md-6 mx-auto alert alert-success alert-dismissible text-center fade show" role="alert">
                    <strong>You have successfully logged out.</strong>
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        )
    }
}


class LoginComponent extends Component {
    render() {
    const { email, password, onChange, onSubmit, errors = {}, isLoading, flashMessage } = this.props;
    console.log("errors:", errors);
    return (
        <div className="container">
            <AlertComponent />
            <div className="row">
                <div className="col-sm-12 text-center">
                <img className="img-fluid" src="/img/workery-logo.jpeg" alt="Workery Logo" width="180px" /></div>
            </div>
            <div className="row">
                <div className="col-sm-5 mx-auto">
                    <h2 className="text-center mb-3">Sign In</h2>
                    <form id="sign-in" className="form-signin needs-validation" onSubmit={onSubmit}>

                        <FlashMessageComponent object={flashMessage} />
                        {errors.nonFieldErrors && <div className="alert alert-danger" role="alert">{errors.nonFieldErrors}</div>}

                        <BootstrapInputGroup
                            layoutSize="large"
                            labelIconClassName="fa fa-envelope color-blue"
							spanPrependClassName="input-group-text input-group-addon-e"
                            name="email"
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={onChange}
                            disabled={isLoading}
                            error={errors.email}
                        />

                        <BootstrapInputGroup
                            layoutSize="large"
                            labelIconClassName="fa fa-key color-blue"
							spanPrependClassName="input-group-text input-group-addon-p"
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChange}
                            disabled={isLoading}
                            error={errors.password}
                        />

                        { /*
                        <div className="custom-control custom-checkbox mb-3 mt-3">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                        </div>
                        */}
                        <div className="custom-control custom-checkbox mb-3 mt-3"></div>

                        <input
                            type="submit"
                            value="Sign In"
                            className="btn btn-lg btn-info btn-fxw px-5 d-block mx-auto"
                            disabled={isLoading}
                        />
                        <h5 className="text-center mt-3 mb-3">
                            <Link to="/send-password-reset" className="text-info plain-link">Forgot Password?</Link>
                        </h5>

                    </form>
                </div>
            </div>
        </div>
    );
  }
}

LoginComponent.propTypes = {
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default LoginComponent;
