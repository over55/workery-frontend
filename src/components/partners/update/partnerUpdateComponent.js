// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapTelephoneInput } from "../../bootstrap/bootstrapTelephoneInput";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapCountrySelect } from '../../bootstrap/bootstrapCountrySelect'
import { BootstrapRegionSelect } from '../../bootstrap/bootstrapRegionSelect'
import { BootstrapMultipleSelect } from "../../bootstrap/bootstrapMultipleSelect";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { IS_OK_TO_EMAIL_CHOICES, IS_OK_TO_TEXT_CHOICES, IS_ACTIVE_TYPE_OF_CHOICES, GENDER_RADIO_CHOICES } from "../../../constants/api";


export default class PartnerUpdateComponent extends Component {
    render() {
        const {
            // STEP 3
            organizationName, givenName, lastName,
            primaryPhone, primaryPhoneTypeOfOptions, primaryPhoneTypeOf,
            secondaryPhone, secondaryPhoneTypeOf, secondaryPhoneTypeOfOptions, email,
            isOkToEmail, isOkToText, isActive,

            // STEP 4
            country, region, locality, postalCode, streetAddress,

            // STEP 5
            tags, tagOptions, dateOfBirth, gender, howHear, howHearOptions, howHearOther, joinDate,
            onJoinDateChange, comment,

            // Everything else..
            onTextChange, onSelectChange, onRadioChange, isLoading, onClick, id, errors,
            onBillingCountryChange, onBillingRegionChange, typeOf, onDateOfBirthChange, onTagMultiChange
        } = this.props;
        const isOtherHowDidYouHearSelected = howHear === 'Other';
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/partners`}><i className="fas fa-handshake"></i>&nbsp;Partners</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/partner/${id}/full`}><i className="fas fa-user"></i>&nbsp;Argyle</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>
                                <i className="fas fa-edit"></i>&nbsp;Update Partner
                            </h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-user-shield"></i>&nbsp;Personal Information
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.organizationName}
                                label="Company Name (*)"
                                onChange={onTextChange}
                                value={organizationName}
                                name="organizationName"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.givenName}
                                label="Contact First Name (*)"
                                onChange={onTextChange}
                                value={givenName}
                                name="givenName"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.lastName}
                                label="Contact Last Name (*)"
                                onChange={onTextChange}
                                value={lastName}
                                name="lastName"
                                type="text"
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.primaryPhone}
                                label="Primary Phone (*)"
                                onChange={onTextChange}
                                value={primaryPhone}
                                name="primaryPhone"
                                type="text"
                                placeholder="+1 (xxx) xxx-xxxx"
                            />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Primary Telephone type (*)"
                                name="primaryPhoneTypeOf"
                                defaultOptionLabel="Please select a telephone type."
                                options={primaryPhoneTypeOfOptions}
                                value={primaryPhoneTypeOf}
                                error={errors.primaryPhoneTypeOf}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.secondaryPhone}
                                label="Secondary Phone"
                                onChange={onTextChange}
                                value={secondaryPhone}
                                name="secondaryPhone"
                                type="text"
                                placeholder="+1 (xxx) xxx-xxxx"
                            />

                            <BootstrapSingleSelect
                                borderColour="border-success"
                                label="Secondary Telephone type"
                                name="secondaryPhoneTypeOf"
                                defaultOptionLabel="Please select a telephone type."
                                options={secondaryPhoneTypeOfOptions}
                                value={secondaryPhoneTypeOf}
                                error={errors.secondaryPhoneTypeOf}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.email}
                                label="Email (*)"
                                onChange={onTextChange}
                                value={email}
                                name="email"
                                type="text"
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.isOkToEmail}
                                label="Ok to E-Mail? (*)"
                                name="isOkToEmail"
                                onChange={onRadioChange}
                                selectedValue={isOkToEmail}
                                options={IS_OK_TO_EMAIL_CHOICES}
                                helpText='Selecting "yes" will result in partner getting emails from our system.'
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.isOkToText}
                                label="Ok to Text? (*)"
                                name="isOkToText"
                                onChange={onRadioChange}
                                selectedValue={isOkToText}
                                options={IS_OK_TO_TEXT_CHOICES}
                                helpText='Selecting "yes" will result in partner getting text-messages on their phone from our system.'
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.isActive}
                                label="Is the account active? (*)"
                                name="isActive"
                                onChange={onRadioChange}
                                selectedValue={isActive}
                                options={IS_ACTIVE_TYPE_OF_CHOICES}
                                helpText='Selecting "yes" will grant the parnter login ability.'
                            />

                            <h2><i className="fas fa-address-book"></i>&nbsp;Address</h2>

                            <BootstrapCountrySelect
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.country}
                                label="Country (*)"
                                value={country}
                                onChange={onBillingCountryChange}
                                priorityOptions={["CA", "US", "MX"]}
                                name="country"
                            />
                            <BootstrapRegionSelect
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.region}
                                label="Province / state (*)"
                                country={country}
                                value={region}
                                onChange={onBillingRegionChange}
                                name="region"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.locality}
                                label="City (*)"
                                onChange={onTextChange}
                                value={locality}
                                name="locality"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.streetAddress}
                                label="Street address (*)"
                                onChange={onTextChange}
                                value={streetAddress}
                                name="streetAddress"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.postalCode}
                                label="Postal / zip (*)"
                                onChange={onTextChange}
                                value={postalCode}
                                name="postalCode"
                                type="text"
                            />

                            <h2><i className="fas fa-chart-pie"></i>&nbsp;Metrics</h2>

                            <BootstrapMultipleSelect
                                borderColour="border-success"
                                label="Tags"
                                name="tags"
                                defaultOptionLabel="Please select the tag."
                                options={tagOptions}
                                selectedOptions={tags}
                                error={errors.tags}
                                onMultiChange={onTagMultiChange}
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
                                label="Date of Birth (*)"
                                name="dateOfBirth"
                                dateObj={dateOfBirth}
                                onTimeChange={onDateOfBirthChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.dateOfBirth}
                            />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="How did you hear about us? (*)"
                                name="howHear"
                                defaultOptionLabel="Please select how you heard about us."
                                options={howHearOptions}
                                value={howHear}
                                error={errors.howHear}
                                onSelectChange={onSelectChange}
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

                            <BootstrapDatePicker
                                label="Join date (*)"
                                name="joinDate"
                                dateObj={joinDate}
                                onTimeChange={onJoinDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.joinDate}
                            />

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

                        </form>
                        <form>
                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/partner/${id}/full`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
