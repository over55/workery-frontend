import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import Moment from 'react-moment';
// import 'moment-timezone';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
// import overlayFactory from 'react-bootstrap-table2-overlay';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import { FRONTLINE_ROLE_ID } from "../../../../constants/api";
import AwayLogAlertComponent from "../awayLogAlertComponent";

const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);

const selectOptions = {
    0: 'Archived',
    1: 'New',
    2: 'Declined',
    3: 'Pending',
    4: 'Cancelled',
    5: 'Ongoing',
    6: 'In-progress',
    7: 'Completed and Unpaid',
    8: 'Completed and Paid',
};

class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            orders,

            // Everything else.
            onTableChange, isLoading, user, onNextClick, onPreviousClick,
        } = this.props;

        const columns = [{
            dataField: 'typeOf',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'id',
            text: 'Job #',
            sort: true,
            formatter: idFormatter,
        },{
            dataField: 'customerName',
            text: 'Customer',
            // sort: true, // Commented by b/c of https://github.com/over55/workery-frontend/issues/302
            formatter: customerNameFormatter,
        },{
            dataField: 'assignmentDate',
            text: 'Assign Date',
            sort: true,
            formatter: assignmentDateFormatter,
        },{
            dataField: 'startDate',
            text: 'Start Date',
            sort: true,
            formatter: startDateFormatter,
        },{
            dataField: 'completionDate',
            text: 'Completion Date',
            sort: true,
            formatter: completionDateFormatter,
        },{
            dataField: 'state',
            text: 'Status',
            sort: false,
            filter: selectFilter({
                options: selectOptions
            }),
            formatter: statusFormatter
        },{
            dataField: 'slug',
            text: 'Financial',
            sort: false,
            formatter: externalFinancialLinkFormatter
        },{
            dataField: 'slug',
            text: 'Details',
            sort: false,
            formatter: externalDetailLinkFormatter
        }];

        // The following code will hide the financial details if the
        // authenticated user belongs to the frontline staff.
        if (user && user.roleId === FRONTLINE_ROLE_ID) {
            columns.splice(7, 1);
        }

        const defaultSorted = [{
            dataField: 'id',
            order: 'desc'
        }];

        return (
            <BootstrapTable
                bootstrap4
                keyField='id'
                data={ orders }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no orders at the moment"
                remote
                onTableChange={ onTableChange }
                filter={ filterFactory() }
                loading={ isLoading }
                // overlay={ overlayFactory({ spinner: true, styles: { overlay: (base) => ({...base, background: 'rgba(0, 128, 128, 0.5)'}) } }) }
            />
        );
    }
}


function iconFormatter(cell, row){
    const icons = [];
    if (row.typeOf === 2) {
        icons.push(<i className="fas fa-building"></i>)
    }
    else if (row.typeOf === 1) {
        icons.push(<i className="fas fa-home"></i>)
    }
    else {
        icons.push(<i className="fas fa-question"></i>)
    }
    if (row.isOngoing) {
        icons.push(" ");
        icons.push(<i className="fas fa-redo-alt"></i>)
    }
    return <div>{icons}</div>;
}


function idFormatter(cell, row){
    return (
        row.id && row.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
    );
}


function customerNameFormatter(cell, row){
    if (row.customerName === null || row.customerName === undefined || row.customerName === "None") { return "-"; }
    return (
        <Link to={`/client/${row.customer}`} target="_blank">
            {row.customerName}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    )
}


function startDateFormatter(cell, row){
    return row.startDate ? <Moment format="MM/DD/YYYY">{row.startDate}</Moment> : "-";
}


function assignmentDateFormatter(cell, row){
    return row.assignmentDate ? <Moment format="MM/DD/YYYY">{row.assignmentDate}</Moment> : "-";
}


function completionDateFormatter(cell, row){
    return row.completionDate ? <Moment format="MM/DD/YYYY">{row.completionDate}</Moment> : "-";
}


function statusFormatter(cell, row){
    return selectOptions[row.state];
}


function externalDetailLinkFormatter(cell, row){
    return (
        <Link to={`/order/${row.id}`} target="_blank" rel='noopener'>
            View&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    )
}


function externalFinancialLinkFormatter(cell, row){
    return (
        <Link to={`/financial/${row.id}`} target="_blank" rel='noopener'>
            View&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    )
}


export default class AdminAssociateOrderListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            orderList,

            // Everything else...
            flashMessage, onTableChange, isLoading, id, clientDetail, user, onNextClick, onPreviousClick, associate
        } = this.props;

        const orders = orderList.results ? orderList.results : [];

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/associates"><i className="fas fa-crown"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{associate && associate.name}
                        </li>
                    </ol>
                </nav>

                <AwayLogAlertComponent associate={associate} />

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{associate && associate.name}</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/associate/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/associate/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/associate/${id}/activity-sheets`}>
                                <span className="num"><i className="fas fa-id-card-alt"></i>&nbsp;</span><span className="">Activity</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-wrench"></i>&nbsp;</span><span className="">Jobs</span>
                            </strong>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/associate/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to={`/associate/${id}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        <div id="step-7" className="st-grey">
                            <Link to={`/associate/${id}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-table"></i>&nbsp;List
                        </h2>
                        <RemoteListComponent
                            offset={offset}
                            limit={limit}
                            totalSize={totalSize}
                            orders={orders}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                            user={user}
                        />
                        <span className="react-bootstrap-table-pagination-total">&nbsp;Total { totalSize } Results</span>

                        <button type="button" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onNextClick}>
                            <i className="fas fa-check-circle"></i>&nbsp;Next
                        </button>

                        <button type="button" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onPreviousClick} disabled={offset === 0}>
                            <i className="fas fa-check-circle"></i>&nbsp;Previous
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
