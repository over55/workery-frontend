import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { ORDER_CANCEL_REASON_CHOICES } from "../../../constants/api";


export default class OrderCompletionTaskStep4Component extends Component {
    render() {
        const {
            task, status, id, comment, onClick, onBack, errors, isLoading, onTextChange
        } = this.props;
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
                            <i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Order Completion</h1>

                {task && task.associateAwayLog !== undefined && task.associateAwayLog !== null &&
                    <div className="alert alert-warning" role="alert">
                        <strong><i className="fas fa-exclamation-triangle"></i>&nbsp;Warning</strong> - The associate assigned to this task is currently away.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/task/6/${id}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/task/6/${id}/step-2`}>
                                <span className="num">2.</span><span className="">Status</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/task/6/${id}/step-3`}>
                                <span className="num">3.</span><span className="">Financials</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey active">
                            <strong>
                                <span className="num">4.</span><span className="">Comment</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-comments"></i>&nbsp;Comments
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            {/*
                            <!--------------------------------------------->
                            <!--           ADDITIONAL COMMENTS           -->
                            <!--------------------------------------------->
                            */}

                            <BootstrapTextarea
                                name="comment"
                                borderColour="border-success"
                                label="Comment"
                                placeholder="Write any additional comments here."
                                rows="5"
                                value={comment}
                                helpText="This field is optional. Comment text will be attached to the order."
                                onChange={onTextChange}
                                error={errors.comment}
                            />

                            {/*
                            <!--------------------------------------------->
                            <!--         end ADDITIONAL COMMENTS         -->
                            <!--------------------------------------------->
                            */}

                        </form>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick} isLoading={isLoading}>
                                Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </button>

                            <Link className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4" to={`/task/6/${id}/step-3`}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}


const STATUS_CHOICES = [
    {
        id: 'status-m-choice',
        name: "status",
        value: true,
        label: "Yes"
    },{
        id: 'status-f-choice',
        name: "status",
        value: false,
        label: "No"
    }
];
