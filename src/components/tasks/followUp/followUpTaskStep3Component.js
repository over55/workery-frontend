import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";


export default class FollowUpTaskStep3Component extends Component {
    render() {
        const { status, statusLabel, meetingDate, comment, id, task, onBack, onClick, errors, isLoading } = this.props;
        const { associate, associateTags, customer, customerTags, workOrder, workOrderSkillSets, workOrderTags } = task;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/tasks`}><i className="fas fa-tasks"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.orderId && task.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                {task && task.associateAwayLog !== undefined && task.associateAwayLog !== null &&
                    <div className="alert alert-warning" role="alert">
                        <strong><i className="fas fa-exclamation-triangle"></i>&nbsp;Warning</strong> - The associate assigned to this task is currently away.
                    </div>
                }

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <div className="jumbotron">
                            <h1 className="display-4"><i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation - 48 Hour Follow Up</h1>

                            <table className="table table-bordered custom-cell-w">
                                <tbody>
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-user-circle"></i>&nbsp;Summary
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Associate Name</th>
                                        <td>
                                            <Link to={`/associate/${task && task.associateId}`} target="_blank">
                                                {task && task.associateId}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Client Name</th>
                                        <td>
                                            <Link to={`/client/${task.customerId}`} target="_blank">
                                                {task && task.customerName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Client Location</th>
                                        <td>
                                            {customer &&
                                                <a href={customer.fullAddressUrl} target="_blank">
                                                    {customer.fullAddressWithoutPostalCode}&nbsp;<i className="fas fa-external-link-alt"></i>
                                                </a>
                                            }
                                        </td>
                                    </tr>
                                    {status === true || status === "true" &&
                                        <tr>
                                            <th scope="row" className="bg-light">Meeting Date</th>
                                            <td>
                                                {task && meetingDate &&
                                                    <Moment format="MM/DD/YYYY">{meetingDate}</Moment>
                                                }
                                            </td>
                                        </tr>
                                    }
                                    <tr>
                                        <th scope="row" className="bg-light">Have the Associate and Client agreed to meet?</th>
                                        <td>{task && statusLabel}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <p>Please click <strong>save</strong> to proceed.</p>
                            <p>
                            <Link to={`/task/2/${id}/step-2`} className="btn btn-orange btn-lg  float-left">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                                <button className="btn btn-success btn-lg" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


class TagItem extends Component {
    render() {
        const { id, text } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={id}>{text}</span>
        );
    };
}


class SkillSetItem extends Component {
    render() {
        const { subCategory, value } = this.props.skillSet;
        return (
            <span className="badge badge-info badge-lg" value={value}>{subCategory}</span>
        );
    };
}
