import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../../../flashMessageComponent";


export default class AssociateOrderLiteRetrieveComponent extends Component {
    render() {
        const { id, order, flashMessage } = this.props;
        const isCancelled = order.state === "cancelled";
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/jobs`}><i className="fas fa-wrench"></i>&nbsp;Jobs</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-wrench"></i>&nbsp;Job # {id && id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-wrench"></i>&nbsp;View Job</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/job/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                    </div>
                </div>


                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Details
                        </h2>

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                {order.customerFullName &&
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-user-circle"></i>&nbsp;Client
                                        </th>
                                    </tr>
                                }
                                {order.customerFullName &&
                                    <tr>
                                        <th scope="row" className="bg-light">Name</th>
                                        <td>{order.customerFullName}</td>
                                    </tr>
                                }

                                {order.associateName &&
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-crown"></i>&nbsp;Associate
                                        </th>
                                    </tr>
                                }
                                {order.associateName && order.associateName &&
                                    <tr>
                                        <th scope="row" className="bg-light">Name</th>
                                        <td>
                                            <Link to={`/profile/associate/lite`} target="_blank">
                                                {order.associateName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                {order.associateName && order.associateTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">{order.associatePrettyTelephoneTypeOf} #</th>
                                        <td>{order.associateTelephone}</td>
                                    </tr>
                                }
                                {order.associateName && order.associateOtherTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Other {order.associatePrettyTelephoneTypeOf} #</th>
                                        <td>{order.associateOtherTelephone}</td>
                                    </tr>
                                }
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-wrench"></i>&nbsp;Job
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">ID #</th>
                                    <td>{order.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Status</th>
                                    <td>{order.prettyStatus}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job Type</th>
                                    <td>{order.prettyTypeOf}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{order.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Skill(s)</th>
                                    <td>
                                        {order.prettySkillSets && order.prettySkillSets.map(
                                            (skillSet) => <SkillSetItem skillSet={skillSet} key={`skillset-${skillSet.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tags(s)</th>
                                    <td>
                                        {order.prettyTags && order.prettyTags.map(
                                            (tag) => <TagItem tag={tag} key={`tag-${tag.id}`} />)
                                        }
                                    </td>
                                </tr>
                                {order.prettyLatestPendingTask &&
                                    <tr>
                                        <th scope="row" className="bg-light">Required Task</th>
                                        <td>
                                            <Link to={`/task/${order.latestPendingTaskTypeOf}/${order.latestPendingTask}/step-1`} target="_blank">
                                                {order.prettyLatestPendingTask}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                {order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Rating</th>
                                        <td>
                                            {order.score}/5
                                        </td>
                                    </tr>
                                }

                            </tbody>
                        </table>
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
