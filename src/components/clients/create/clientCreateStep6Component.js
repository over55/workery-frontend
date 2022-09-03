// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapMultipleSelect } from "../../bootstrap/bootstrapMultipleSelect";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { COMMERCIAL_ASSOCIATE_TYPE_OF_ID, GENDER_RADIO_CHOICES, WILLING_TO_VOLUNTEER_CHOICES, ANOTHER_HOUSEHOLD_MEMBER_REGISTERED_CHOICES } from "../../../constants/api";


export default class ClientCreateStep6Component extends Component {
    render() {
        const {
            typeOf, isTagsLoading, tags, tagOptions, dateOfBirth, gender, isHowHearLoading, howHearId, howHearOptions, howHearOther, howHearIdLabel, joinDate,
            onRadioChange,  onMultiChange, onJoinDateChange, comment,
            errors, onTextChange, onSelectChange, onDateOfBirthChange, isLoading, onClick
        } = this.props;
        let isOtherHowDidYouHearSelected = false;
        if (howHearIdLabel !== undefined && howHearIdLabel !== null && howHearIdLabel !== "") {
            isOtherHowDidYouHearSelected = howHearIdLabel.includes("Other") === true
        }

        const isBizTypeOf = typeOf === COMMERCIAL_ASSOCIATE_TYPE_OF_ID || typeOf === toString(COMMERCIAL_ASSOCIATE_TYPE_OF_ID);

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
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Client
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/clients/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/clients/add/step-2">
                                <span className="num">2.</span><span className="">Results</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/clients/add/step-3">
                                <span className="num">3.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/clients/add/step-4">
                                <span className="num">4.</span><span className="">Contact</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to="/clients/add/step-5">
                                <span className="num">5.</span><span className="">Address</span>
                            </Link>
                        </div>
                         <div id="step-6" className="st-grey active">
                            <strong>
                                <span className="num">6.</span><span className="">Metrics</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                            </h2>
                            <p className="text-secondary font-italic">All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-user-shield"></i>&nbsp;Personal Information
                            </p>

                            <BootstrapMultipleSelect
                                borderColour="border-success"
                                label="Tags"
                                name="tags"
                                defaultOptionLabel="Please select the tag."
                                options={tagOptions}
                                selectedOptions={tags}
                                error={errors.tags}
                                onMultiChange={onMultiChange}
                                isLoading={isTagsLoading}
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.gender}
                                label="Please select your gender (*)"
                                name="gender"
                                onChange={onRadioChange}
                                selectedValue={gender}
                                options={GENDER_RADIO_CHOICES}
                            />

                            <BootstrapDatePicker
                                label="Date of Birth"
                                name="dateOfBirth"
                                dateObj={dateOfBirth}
                                onTimeChange={onDateOfBirthChange}
                                borderClassname="border-success"
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.dateOfBirth}
                                helpText="This field is optional as start date can be set at a later task."
                            />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="How did you hear about us? (*)"
                                name="howHearId"
                                defaultOptionLabel="Please select how you heard about us."
                                options={howHearOptions}
                                value={howHearId}
                                error={errors.howHearId}
                                onSelectChange={onSelectChange}
                                isLoading={isHowHearLoading}
                            />

                            {isOtherHowDidYouHearSelected &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.howHearOther}
                                    label="Other (*)"
                                    onChange={onTextChange}
                                    value={howHearOther}
                                    name="howHearOther"
                                    type="text"
                                />
                            }

                            {typeOf !== COMMERCIAL_ASSOCIATE_TYPE_OF_ID && <BootstrapDatePicker
                                label="Join date (*)"
                                name="joinDate"
                                dateObj={joinDate}
                                onTimeChange={onJoinDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.joinDate}
                            />}

                            <BootstrapTextarea
                                name="comment"
                                borderColour="border-success"
                                label="Additional Comments"
                                placeholder="Write any additional comments here."
                                rows="5"
                                value={comment}
                                helpText="This is the comment of the organization."
                                onChange={onTextChange}
                                error={errors.comment}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/clients/add/step-5" className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}
