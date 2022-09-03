// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapMultipleSelect } from "../../../bootstrap/bootstrapMultipleSelect";


class SkillSetUpdateComponent extends Component {
    render() {
        const {
            category, subCategory, description, errors, onTextChange, isLoading, onClick,
            insuranceRequirements, insuranceRequirementOptions, onInsuranceRequirementMultiChange,
            isInsuranceRequirementsLoading
        } = this.props;

        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/settings/skill-sets"><i className="fas fa-graduation-cap"></i>&nbsp;Skill Set</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>Update New SkillSet</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.category}
                                label="Category (*)"
                                onChange={onTextChange}
                                value={category}
                                name="category"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.subCategory}
                                label="Sub-Category (*)"
                                onChange={onTextChange}
                                value={subCategory}
                                name="subCategory"
                                type="text"
                            />

                            <BootstrapMultipleSelect
                                borderColour="border-primary"
                                label="Insurance Requirements (*)"
                                name="insuranceRequirements"
                                defaultOptionLabel="Please select the insurance requirements."
                                options={insuranceRequirementOptions}
                                selectedOptions={insuranceRequirements}
                                error={errors.insuranceRequirements}
                                onMultiChange={onInsuranceRequirementMultiChange}
                                isLoading={isInsuranceRequirementsLoading}
                            />

                            <BootstrapTextarea
                                name="description"
                                borderColour="border-primary"
                                label="Description (*)"
                                placeholder="Please describe this skill set."
                                rows="5"
                                value={description}
                                helpText="This will only be visible to staff members."
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to="/settings/skill-sets" className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i> Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}

export default SkillSetUpdateComponent;
