// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { AREA_COORDINATOR_ROLE_ID, ASSOCIATE_ROLE_ID } from "../../../constants/api";


export default class ClientPromoteStep1Component extends Component {
    render() {
        const { slug, onClick, isLoading } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/clients"><i className="fas fa-user-circle"></i>&nbsp;Clients</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/client/${slug}/full`}><i className="fas fa-user"></i>&nbsp;Argyle</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-star"></i>&nbsp;Promote
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-star"></i>&nbsp;Promote Client</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num">1.</span><span className="">Selection</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Agreement</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <h5>Please select what the promotion is.</h5>

                <div className="card-group row">
                    <div className="col-sm-6">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-horse-head fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Area Coordinator</h3>
                                <p className="card-text">Promote the client to be an area coordinator.</p>
                                <button className="btn btn-success btn-lg" disabled={isLoading} onClick={ (event)=>{ onClick(event, AREA_COORDINATOR_ROLE_ID) } }>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-crown fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Associate</h3>
                                <p className="card-text">Promote the client to be an associate.</p>
                                <button className="btn btn-success btn-lg" disabled={isLoading} onClick={ (event)=>{ onClick(event, ASSOCIATE_ROLE_ID) } }>
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <Link to={`/client/${slug}/full`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
                            <i className="fas fa-arrow-circle-left"></i> Back
                        </Link>
                    </div>
                </div>

            </main>
        );
    }
}
