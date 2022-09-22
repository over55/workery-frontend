// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapTelephoneInput } from "../../../bootstrap/bootstrapTelephoneInput";
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import { BootstrapDatePicker } from '../../../bootstrap/bootstrapDatePicker';
import {
    IS_OK_TO_EMAIL_CHOICES, IS_OK_TO_TEXT_CHOICES,
    PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES, SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES
} from "../../../../constants/api";


class AdminInvoiceCreateStep1Component extends Component {
    render() {
        const {
            orderId, order, errors,
            invoiceId, invoiceDate, associateName, associateTelephone, associateTaxId, customerName, customerAddress, customerEmail,
            onTextChange, onRadioChange, onInvoiceDateChange, isLoading, onClick, onSelectChange
        } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/financials"><i className="fas fa-credit-card"></i>&nbsp;Financials</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/financial/${orderId}/invoice`}>
                                <i className="fas fa-money-check-alt"></i>&nbsp;Order #{orderId && orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Create Invoice
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-file-invoice-dollar"></i>&nbsp;Create Invoice
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num">1.</span><span className="">Review</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Details</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Financials</span>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-file-invoice-dollar"></i>&nbsp;Review
                            </h2>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.invoiceId}
                                label="Invoice ID"
                                onChange={onTextChange}
                                value={invoiceId}
                                name="invoiceId"
                                type="text"
                                disabled={true}
                                helpText="If you need to this values, please update the financials screen for this job."
                            />

                            <BootstrapDatePicker
                                label="Invoice Date"
                                name="invoiceDate"
                                dateObj={invoiceDate}
                                datePickerClassName="form-control form-control-lg border"
                                borderClassname="border-success"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.invoiceDate}
                                disabled={true}
                                helpText="If you need to change this value, please update the financials screen for this job."
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                label="Associate Name"
                                value={order && associateName}
                                name="associateFullName"
                                type="string"
                                disabled={true}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                label="Associate Telephone"
                                value={order && associateTelephone}
                                name="associateTelephone"
                                type="string"
                                disabled={true}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                label="Associate Tax ID"
                                value={order && associateTaxId}
                                name="associateTaxId"
                                type="string"
                                disabled={true}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                label="Client Name"
                                value={order && customerName}
                                name="customerFullName"
                                type="string"
                                disabled={true}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                label="Client Address"
                                value={order && customerAddress}
                                name="customerAddress"
                                type="string"
                                disabled={true}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                label="Client Email"
                                value={order && customerEmail}
                                name="customerEmail"
                                type="string"
                                disabled={true}
                            />


                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Next&nbsp;<i className="fas fa-chevron-right"></i>
                                </button>
                                <Link to={`/financial/${orderId}/invoice`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
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

export default AdminInvoiceCreateStep1Component;
