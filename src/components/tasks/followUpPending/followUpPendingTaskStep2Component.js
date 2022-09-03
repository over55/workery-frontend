import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { GENDER_RADIO_CHOICES } from "../../../constants/api";


export default class FollowUpPendingTaskStep2Component extends Component {
    render() {
        const { task, status, id, comment, onClick, onBack, errors, isLoading, onRadioChange, onTextChange } = this.props;
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

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.orderId && task.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - 24 Hour Follow Up</h1>

                {task && task.associateAwayLog !== undefined && task.associateAwayLog !== null &&
                    <div className="alert alert-warning" role="alert">
                        <strong><i className="fas fa-exclamation-triangle"></i>&nbsp;Warning</strong> - The associate assigned to this task is currently away.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/task/4/${id}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Review</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-user-check"></i>&nbsp;Review
                            </h2>
                            <p>Please contact the Associate to confirm if they want the job.</p>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.status}
                                label="Please contact the Associate to confirm if they want the job. (*)"
                                name="status"
                                onChange={onRadioChange}
                                selectedValue={status}
                                options={STATUS_CHOICES}
                            />

                            <BootstrapTextarea
                                name="comment"
                                borderColour="border-primary"
                                label="Comment (*)"
                                placeholder="Write any additional comments here."
                                rows="5"
                                value={comment}
                                helpText="This is the comment will be attached to the order."
                                onChange={onTextChange}
                                error={errors.comment}
                            />

                        </form>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick} isLoading={isLoading}>
                                <i className="fas fa-check-circle"></i>&nbsp;Save
                            </button>

                            <Link className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4" to={`/task/4/${id}/step-1`}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}

//
// See `state` constants in `activity_sheet_items.go` in `workery-back` repo.
//

const STATUS_CHOICES = [
    {
        id: 'status-accepted-choice',
        name: "status",
        value: 1,
        label: "Yes"
    },{
        id: 'status-declined-choice',
        name: "status",
        value: 2,
        label: "No"
    },{
        id: 'status-pending-choice',
        name: "status",
        value: 3,
        label: "Pending"
    }
];
