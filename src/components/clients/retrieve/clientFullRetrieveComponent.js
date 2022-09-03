// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import {
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
    EXECUTIVE_ROLE_ID
} from '../../../constants/api';
import { FlashMessageComponent } from "../../flashMessageComponent";


export default class ClientFullRetrieveComponent extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const { id, client, flashMessage, errors, onClientClick, user, onAddJobClick } = this.props;
        const { typeOf } = client;
        const typeOfLabel = typeOf === 2 ? "Residential" : "Commercial"
        const isActiveState = client.state === "active";
        const isRezClient = typeOf === 2;
        const isCompany = client && client.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID;
        const canDeleteClient = user.roleId === EXECUTIVE_ROLE_ID;
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
                            <i className="fas fa-user"></i>&nbsp;{client && client.name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{client && client.name}</h1>

                {client.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This client is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/client/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/client/${id}/orders`}>
                                <span className="num"><i className="fas fa-wrench"></i>&nbsp;</span><span className="">Jobs</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/client/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/client/${id}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to={`/client/${id}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Details
                        </h2>

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-sitemap"></i>&nbsp;Type
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Type of Client</th>
                                    <td>{typeOfLabel}</td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-phone"></i>&nbsp;Contact
                                        <Link to={`/client/${id}/update/contact`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                {isCompany &&
                                    <tr>
                                        <th scope="row" className="bg-light">Company Name</th>
                                        <td>{client.organizationName}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Full Name</th>
                                    <td>{client.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Primary Telephone</th>
                                    <td><a href={`tel:${client.e164Telephone}`}>{client.telephone ? client.telephone : "-"}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Secondary Telephone</th>
                                    <td><a href={`tel:${client.otherTelephone}`}>{client.otherTelephone ? client.otherTelephone : "-"}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Email</th>
                                    <td><a href={`mailto:${client.email}`}>{client.email ? client.email : "-"}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Email?</th>
                                    <td>
                                        {client.isOkToEmail
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Text?</th>
                                    <td>
                                        {client.isOkToText
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-map-marker-alt"></i>&nbsp;Postal Address
                                        <Link to={`/client/${id}/update/address`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Location</th>
                                    <td>
                                        <a href={client.fullAddressUrl} target="_blank">{client.fullAddressWithoutPostalCode}&nbsp;<i className="fas fa-external-link-alt"></i></a>
                                    </td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                                        <Link to={`/client/${id}/update/metrics`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                {typeOf !== COMMERCIAL_CUSTOMER_TYPE_OF_ID && <tr>
                                    <th scope="row" className="bg-light">Date of Birth</th>
                                    <td>
                                        {client && client.birthdate
                                            ?<Moment format="MM/DD/YYYY">{client.birthdate}</Moment>
                                            :"-"
                                        }
                                    </td>
                                </tr>}
                                <tr>
                                    <th scope="row" className="bg-light">Gender</th>
                                    <td>{client.gender ? client.gender : "-"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{client.description ? client.description : "-"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tag(s)</th>
                                    <td>
                                        {client.tags && client.tags.map(
                                            (tag) => <TagItem tag={tag} key={tag.id} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Join Date</th>
                                    <td>
                                        {client && <Moment format="MM/DD/YYYY">{client.joinDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">How did they discover us?</th>
                                    <td>{client.howHearText ? client.howHearText : "-"}</td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;System
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Account #</th>
                                    <td>{client && client.id && client.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created At</th>
                                    <td>
                                        {client && <Moment format="MM/DD/YYYY hh:mm:ss a">{client.created}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created By</th>
                                    <td>{client.createdByName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified At</th>
                                    <td>
                                        {client && <Moment format="MM/DD/YYYY hh:mm:ss a">{client.lastModified}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified By</th>
                                    <td>{client.lastModifiedByName}</td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-project-diagram"></i>&nbsp;Functions
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Available Choices</th>
                                    <td>
                                        {client.state === 'inactive'
                                            ?<div>
                                                <i className="fas fa-lock"></i>&nbsp;Add Job Order&nbsp;<i className="fas fa-chevron-right"></i>
                                            </div>
                                            :<div>
                                                <Link onClick={onAddJobClick} className="btn btn-success btn-lg mt-4 pl-4 pr-4">
                                                    <i className="fas fa-plus"></i>&nbsp;Add Job
                                                </Link>
                                            </div>
                                        }
                                        {isActiveState
                                            ?<div>
                                                <Link to={`/client/${id}/archive`} className="btn btn-primary btn-lg mt-4 pl-4 pr-4">
                                                    <i className="fas fa-archive"></i>&nbsp;Archive
                                                </Link>
                                            </div>
                                            :<div>
                                                <Link to={`/client/${id}/unarchive`} className="btn btn-primary btn-lg mt-4 pl-4 pr-4">
                                                    Unarchive&nbsp;<i className="fas fa-box-open"></i>
                                                </Link>
                                            </div>
                                        }
                                        {isRezClient &&
                                            <div>
                                                <Link to={`/client/${id}/rez-upgrade`} className="btn btn-warning btn-lg mt-4 pl-4 pr-4">
                                                    <i className="fas fa-bolt"></i>&nbsp;Upgrade Client
                                                </Link>
                                            </div>
                                        }
                                        {canDeleteClient &&
                                            <div>
                                                <Link to={`/client/${id}/delete`} className="btn btn-danger btn-lg mt-4 pl-4 pr-4">
                                                    <i className="fas fa-trash"></i>&nbsp;Permanently Delete Client
                                                </Link>
                                            </div>
                                        }
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                { /*
                                <Link to={`/client/${id}/update`} className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4">
                                    <i className="fas fa-edit"></i>&nbsp;Update
                                </Link> */ }
                                <Link to={`/clients`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
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


class TagItem extends Component {
    render() {
        const { id, text } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={id}>{text}</span>
        );
    };
}
