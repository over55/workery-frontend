import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../flashMessageComponent";
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID } from '../../../constants/api';


export default class StaffLiteRetrieveComponent extends Component {
    render() {
        const { id, isLoading, staff, flashMessage, onStaffClick } = this.props;
        const isCompany = staff && staff.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/staff`}><i className="fas fa-user-tie"></i>&nbsp;Staff</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{staff && staff.name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{staff && staff.name}</h1>

                {staff.state === 0 &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This staff is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/staff/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/staff/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/staff/${id}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to={`/staff/${id}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row mt-0 pt-3 mb-4 pb-2">
                    <div className="col-md-9 mx-auto rounded bg-light border p-2">
                        <div className="row">
                            <div className="col-sm-4">
                                <Link to={`/staff/${id}/avatar`}>
                                    {staff && staff.avatarFileUrl !== undefined && staff.avatarFileUrl !== null
                                        ? <img src={staff.avatarFileUrl} className="img-fluid rounded" alt="Profile" id={`staff-avatar-${id}`} />
                                        : <img src="/img/placeholder.png" className="img-fluid rounded" alt="Profile" id={`avatar-placeholder`}/>
                                    }
                                    <p><i className="fas fa-edit"></i>Click here to change photo</p>
                                </Link>
                            </div>
                            <div className="col-sm-8 px-4 py-3">
                                {isCompany &&
                                    <h1>{staff.organizationName}</h1>
                                }
                                <h3>
                                    {staff && staff.name}
                                </h3>
                                {staff && staff.fullAddressWithPostalCode &&
                                    <p className="text-muted">
                                        <a href={staff.fullAddressUrl}>{staff.fullAddressWithPostalCode}&nbsp;<i className="fas fa-map-marker-alt"></i></a>
                                    </p>
                                }
                                {staff && staff.email &&
                                    <p>
                                        <a href={`mailto:${staff.email}`}><i className="fas fa-envelope"></i>&nbsp;{staff.email}</a>
                                    </p>
                                }
                                {staff && staff.telephone &&
                                    <p>
                                        <a href={`tel:${staff.telephone}`}>
                                            <i className="fas fa-phone-square"></i>&nbsp;{staff.telephone}
                                        </a>
                                    </p>
                                }
                                <p className="m-0"><strong>Tags:</strong></p>
                                {staff &&
                                    <p>
                                        {staff.tags && staff.tags.map(
                                            (tag) => <TagItem tag={tag} key={tag.id} />)
                                        }
                                    </p>
                                }
                            </div>
                        </div>
                    </div>
                    {/*
					<div className="col-sm-12 mx-auto text-center mt-4">
						{staff.state === 'inactive'
                            ? <button className="btn btn-orange btn-lg">
                                <i className="fas fa-lock"></i>&nbsp;Add Job
                              </button>
                            : <Link className="btn btn-success btn-lg" onClick={onStaffClick}>
                                <i className="fas fa-plus"></i>&nbsp;Add Job
                              </Link>
                        }
					</div>
                    */}
                </div>


            </div>
        );
    }
}



class TagItem extends Component {
    render() {
        const { text, id } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={id}>{text}</span>
        );
    };
}
