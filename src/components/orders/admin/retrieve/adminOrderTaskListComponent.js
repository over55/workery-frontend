import isEmpty from "lodash/isEmpty";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import Moment from 'react-moment';
// import 'moment-timezone';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
// import overlayFactory from 'react-bootstrap-table2-overlay';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);


class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            tasks,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        // DEVELOPERS NOTE:
        // Where did `2` and `3` values come from? These are the `true` and
        // `false` values specified by `django-rest-framework` in the API.
        const isClosedSelectOptions = {
            3: 'Pending',
            2: 'Closed',
        };

        const typeOfSelectOptions = {
            1: 'Assign associate',
            2: 'Follow up is job complete',
            3: 'Follow up customer survey',
            4: 'Follow up did associate accept job',
            5: 'Follow up was ongoing job updated',
        };

        const columns = [{
            dataField: 'orderTypeOf',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'dueDate',
            text: 'Due Date',
            sort: true,
            formatter: dueDateFormatter,
        },{
            dataField: 'typeOf',
            text: 'Task',
            sort: true,
            filter: selectFilter({
                options: typeOfSelectOptions,
                // defaultValue: 4, // Note: `4` is `pending`.
                // withoutEmptyOption: true
            }),
            formatter: typeOfFormatter,
        },{
            dataField: 'customerName',
            text: 'Client',
            sort: true,
        },{
            dataField: 'associateName',
            text: 'Associate',
            sort: true,
        },{
            dataField: 'state',
            text: 'Status',
            sort: false,
            filter: selectFilter({
                options: isClosedSelectOptions,
            }),
            formatter: statusFormatter
        },{
            dataField: 'id',
            text: '',
            sort: false,
            formatter: detailLinkFormatter
        }];

        const defaultSorted = [{
            dataField: 'dueDate',
            order: 'desc'
        }];

        return (
            <BootstrapTable
                bootstrap4
                keyField='id'
                data={ tasks }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no tasks at the moment"
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
    switch(row.orderTypeOf) {
        case 2:
            return <i className="fas fa-building"></i>;
            break;
        case 1:
            return <i className="fas fa-home"></i>;
            break;
        default:
            return <i className="fas fa-question"></i>;
            break;
    }
}


function typeOfFormatter(cell, row){
    return row.title
}


function dueDateFormatter(cell, row){
    return row.dueDate ? <Moment format="MM/DD/YYYY">{row.dueDate}</Moment> : "-";
}


function statusFormatter(cell, row){
    switch(row.state) {
        case 1:
            return <i className="fas fa-clock"></i>;
            break;
        case 2:
            return <i className="fas fa-check-circle"></i>;
            break;
        default:
        return <i className="fas fa-question-circle"></i>;
            break;
    }
}


function financialExternalLinkFormatter(cell, row){
    return (
        <a target="_blank" href={`/financial/${row.id}`}>
            View&nbsp;<i className="fas fa-external-link-alt"></i>
        </a>
    )
}


function detailLinkFormatter(cell, row){
    if (row.typeOf === 3) { // Add code to prevent the deprecated task from being accessible.
        return (
            <div>
                <i className="fas fa-lock"></i>&nbsp;Locked
            </div>
        );
    }
    if (row.isClosed === true) { return "Closed"; }
    return (
        <Link to={`/task/${row.typeOf}/${row.id}/step-1`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


class AdminOrderTaskListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            taskList,

            // Everything else...
            flashMessage, onTableChange, isLoading, id, orderDetail
        } = this.props;

        const tasks = (taskList && taskList.results) ? taskList.results : [];

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="offset">
                            <Link to={`/orders`}><i className="fas fa-wrench"></i>&nbsp;Orders</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="offset">
                            <i className="fas fa-wrench"></i>&nbsp;Order # {id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-wrench"></i>&nbsp;View Order</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/order/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/order/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-tasks"></i>&nbsp;</span><span className="">Tasks</span>
                            </strong>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/order/${id}/activity-sheets`}>
                                <span className="num"><i className="fas fa-id-badge"></i>&nbsp;</span><span className="">Activity</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/order/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to={`/order/${id}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        <div id="step-7" className="st-grey">
                            <Link to={`/order/${id}/operations`}>
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
                        {isEmpty(orderDetail)===false &&
                            <RemoteListComponent
                                offset={offset}
                                limit={limit}
                                totalSize={totalSize}
                                tasks={tasks}
                                onTableChange={onTableChange}
                                isLoading={isLoading}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminOrderTaskListComponent;
