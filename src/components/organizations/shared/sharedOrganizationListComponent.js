import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../../flashMessageComponent";
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from '../../../helpers/jwtUtility';


class TableRow extends Component {
    render() {
        const { schemaName, name } = this.props.row;
        const accessToken = getAccessTokenFromLocalStorage();
        const refreshToken = getRefreshTokenFromLocalStorage();

        // Generate our redirect address.
        const absoluteUrl =  process.env.REACT_APP_WWW_PROTOCOL + "://" + schemaName + "." +process.env.REACT_APP_WWW_DOMAIN+"/dashboard"+"-redirect/"+accessToken+"/"+refreshToken;

        return (
            <tr>
                <td>{schemaName}</td>
                <td>{name}</td>
                <td>
                    <a href={absoluteUrl}>
                        View&nbsp;<i className="fas fa-chevron-right"></i>
                    </a>
                </td>
            </tr>
        );
    }
}


class SharedOrganizationListComponent extends Component {
    render() {
        const { tenantList, flashMessage } = this.props;
        return (
            <div className="container-fluid">

                <div className="d-flex align-items-stretch">
                    <main id="main" role="main">
                <h1><i className="fas fa-building"></i>&nbsp;Organizations</h1>

                <FlashMessageComponent object={flashMessage} />

                <div className="col-sm-12 mx-auto mt-4 pt-4">

                    <section className="row text-center placeholders">
                        <div className="col-sm-3 placeholder">
                            <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                <Link to="/organization/add" className="d-block link-ndecor" title="add">
                                    <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                </Link>
                            </div>
                            <h4>Add</h4>
                            <div className="text-muted">Add an organization</div>
                        </div>
                        { /*
                        <div className="col-sm-3 placeholder">
                            <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                <Link to="#" className="d-block link-ndecor" title="Jobs">
                                    <h1 className="circle-title">10,000</h1>
                                </Link>
                            </div>
                            <h4>Jobs</h4>
                            <span className="text-muted">View your job history</span>
                        </div>
                        <div className="col-sm-3 placeholder">
                            <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                                <Link to="#" className="d-block link-ndecor" title="Members">
                                    <h1 className="circle-title">2,200</h1>
                                </Link>
                            </div>
                            <h4>Client Members</h4>
                            <span className="text-muted">View Member Data</span>
                        </div>
                        <div className="col-sm-3 placeholder">
                            <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                                <Link to="#" className="d-block link-ndecor" title="Tasks">
                                    <h1 className="circle-title">12</h1>
                                </Link>
                            </div>
                            <h4>Tasks</h4>
                            <span className="text-muted">View your tasks</span>
                        </div>
                        */ }
                    </section>

                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Subdomain</th>
                                <th>Name</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {tenantList && tenantList.results.map(
                                (row, i) => <TableRow row={row} key={i} />)
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
                </div>
            </div>
        );
    }
}

export default SharedOrganizationListComponent;
