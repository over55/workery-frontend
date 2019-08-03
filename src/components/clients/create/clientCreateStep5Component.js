// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";


class ClientCreateStep5Component extends Component {
    render() {
        const {
            streetNumber, streetName, apartmentUnit, streetType, streetTypeOptions, streetTypeOther, streetDirection, streetDirectionOptions, postalCode,
            returnURL, errors, onTextChange, onSelectChange, isLoading, onClick
        } = this.props;

        const isOtherStreetTypeSelected = streetType === 'Other';

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
                            <Link to={returnURL}>
                                <span className="num">4.</span><span className="">Contact</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey active">
                            <strong>
                                <span className="num">5.</span><span className="">Address</span>
                            </strong>
                        </div>
                        <div id="step-6" className="st-grey">
                            <span className="num">6.</span><span className="">Watch</span>
                        </div>
                         <div id="step-7" className="st-grey">
                            <span className="num">7.</span><span className="">Metrics</span>
                        </div>
                        <div id="step-8" className="st-grey">
                            <span className="num">8.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-address-book"></i>&nbsp;Address
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.streetNumber}
                                label="Street Number (*)"
                                onChange={onTextChange}
                                value={streetNumber}
                                name="streetNumber"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.streetName}
                                label="Street Name (*)"
                                onChange={onTextChange}
                                value={streetName}
                                name="streetName"
                                type="text"
                            />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Street Type (*)"
                                name="streetType"
                                defaultOptionLabel="Please select a street type."
                                options={streetTypeOptions}
                                value={streetType}
                                error={errors.streetType}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.apartmentUnit}
                                label="Apt. Unit"
                                onChange={onTextChange}
                                value={apartmentUnit}
                                name="apartmentUnit"
                                type="text"
                            />

                            {isOtherStreetTypeSelected &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.streetTypeOther}
                                    label="Street Type Other (*)"
                                    onChange={onTextChange}
                                    value={streetTypeOther}
                                    name="streetTypeOther"
                                    type="text"
                                />
                            }

                            <BootstrapSingleSelect
                                borderColour="border-successs"
                                label="Street Direction"
                                name="streetDirection"
                                defaultOptionLabel="Please select a street direction."
                                options={streetDirectionOptions}
                                value={streetDirection}
                                error={errors.streetDirection}
                                onSelectChange={onSelectChange}
                                helpText="Please pick direction if address has legally designated direction, ex.: `123 Centre Street South`."
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.postalCode}
                                label="Postal Code (*)"
                                onChange={onTextChange}
                                value={postalCode}
                                name="postalCode"
                                type="text"
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Proceed to Watch&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to={returnURL} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default ClientCreateStep5Component;