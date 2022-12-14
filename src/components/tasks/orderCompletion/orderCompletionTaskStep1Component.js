import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';


export default class OrderCompletionTaskStep1Component extends Component {
    render() {
        const { id, task, onBack, onClick } = this.props;
        const { associate, associateTags, customer, customerTags, workOrder, workOrderSkillSets, workOrderTags } = task;
        return (
            <div>
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

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.orderId && task.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Order Completion</h1>

                {task && task.associateAwayLog !== undefined && task.associateAwayLog !== null &&
                    <div className="alert alert-warning" role="alert">
                        <strong><i className="fas fa-exclamation-triangle"></i>&nbsp;Warning</strong> - The associate assigned to this task is currently away.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num">1.</span><span className="">Info</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Review</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Financials</span>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Comment</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10 mx-auto p-2">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;Task Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{task && task.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job #</th>
                                    <td>
                                        <Link to={`/order/${task.orderId}`} target="_blank">
                                            {task && task.orderId && task.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Name</th>
                                    <td>
                                        <Link to={`/client/${customer && customer.id}`} target="_blank">
                                            {customer && customer.name}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Phone #</th>
                                    <td>
                                        {task &&
                                            <a href={`tel:${customer && customer.telephone}`}>
                                                {customer && customer.telephone}
                                            </a>
                                        }
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
                                <tr>
                                    <th scope="row" className="bg-light">Client Tag(s)</th>
                                    <td>
                                        {customerTags && customerTags.map(
                                            (customerTag) => <TagItem tag={customerTag} key={`workOrderTag-${customerTag.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate Name</th>
                                    <td>
                                        <Link to={`/associate/${associate && associate.id}`} target="_blank">
                                            {associate && associate.name}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate Phone #</th>
                                    <td>
                                        {task &&
                                            <a href={`tel:${associate && associate.telephone}`}>
                                                {associate && associate.telephone}
                                            </a>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate Tag(s)</th>
                                    <td>
                                        {associateTags && associateTags.map(
                                            (associateTag) => <TagItem tag={associateTag} key={`associateTag-${associateTag.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job Description</th>
                                    <td>{workOrder && workOrder.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Skill Set(s)</th>
                                    <td>
                                        {workOrderSkillSets && workOrderSkillSets.map(
                                            (workOrderSkillSet) => <SkillSetItem skillSet={workOrderSkillSet} key={`workOrderSkillSet-${workOrderSkillSet.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tag(s)</th>
                                    <td>
                                        {workOrderTags && workOrderTags.map(
                                            (workOrderTag) => <TagItem tag={workOrderTag} key={`workOrderTag-${workOrderTag.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Comments</th>
                                    <td>
                                        <Link to={`/order/${task.orderId}/comments`} target="_blank">
                                            View comments&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created:</th>
                                    <td>
                                        At {task && task.createdTime &&
                                            <Moment format="MM/DD/YYYY">{task.createdTime}</Moment>
                                        }
                                    </td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-clipboard-list"></i>&nbsp;Optional
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Available Choices</th>
                                    <td>
                                        <div className="row">
                                            <div className="col-md-4 mx-auto p-2">
                                                <Link className="btn btn-orange btn-lg" to={`/order/${task.orderId}/postpone`}>
                                                    <i className="fas fa-clock"></i>&nbsp;Postpone
                                                </Link>
                                            </div>
                                            <div className="col-md-4 mx-auto p-2">
                                                <Link className="btn btn-danger btn-lg" to={`/order/${task.orderId}/close`}>
                                                    <i className="fas fa-window-close"></i>&nbsp;Close
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-clipboard-list"></i>&nbsp;Required
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Available Choices</th>
                                    <td>
                                        <div className="row">
                                            <div className="col-md-4 mx-auto p-2">
                                                <button className="btn btn-success btn-lg" onClick={onClick}>
                                                    Begin&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <Link className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4" to="/tasks">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
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
