import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
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
            page, sizePerPage, totalSize,

            // Data
            insuranceRequirements,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        const selectOptions = {
            3: 'Active',
            2: 'Archived',
        };

        const columns = [{
            dataField: 'text',
            text: 'Text',
            sort: true
        },{
            dataField: 'description',
            text: 'Description',
            sort: true
        },{
            dataField: 'isArchived',
            text: 'Status',
            sort: false,
            filter: selectFilter({
                options: selectOptions,
                defaultValue: 3,
                withoutEmptyOption: true
            }),
            formatter: isArchivedFormatter
        },{
            dataField: 'id',
            text: '',
            sort: false,
            formatter: detailLinkFormatter
        }];

        const defaultSorted = [{
            dataField: 'text',
            order: 'asc'
        }];

        const paginationOption = {
            page: page,
            sizePerPage: sizePerPage,
            totalSize: totalSize,
            sizePerPageList: [{
                text: '10', value: 10
            }, {
                text: '25', value: 25
            }, {
                text: '50', value: 50
            }, {
                text: '100', value: 100
            }, {
                text: 'All', value: totalSize
            }],
            showTotal: true,
            paginationTotalRenderer: customTotal,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
        };

        return (
            <BootstrapTable
                bootstrap4
                keyField='id'
                data={ insuranceRequirements }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no insurance requirements at the moment"
                remote
                onTableChange={ onTableChange }
                pagination={ paginationFactory(paginationOption) }
                filter={ filterFactory() }
                loading={ isLoading }
                // overlay={ overlayFactory({ spinner: true, styles: { overlay: (base) => ({...base, background: 'rgba(0, 128, 128, 0.5)'}) } }) }
            />
        );
    }
}


function isArchivedFormatter(cell, row){
    if (row.isArchived === false) {
        return <i className="fas fa-check-circle" style={{ color: 'green' }}></i>
    } else {
        return <i className="fas fa-archive" style={{ color: 'blue' }}></i>
    }
}


function detailLinkFormatter(cell, row){
    return (
        <div>
            {row.isArchived
                ?""
                :<div>
                    <Link to={`/settings/insurance-requirement/${row.id}/update`} className="btn btn-primary pl-4 pr-4">
                        <i className="fas fa-edit"></i>&nbsp;Edit
                    </Link>&nbsp;&nbsp;&nbsp;
                    <Link to={`/settings/insurance-requirement/${row.id}/delete`} className="btn btn-danger pl-4 pr-4">
                        <i className="fas fa-minus"></i>&nbsp;Remove
                    </Link>
                </div>
            }
        </div>
    )
}


class InsuranceRequirementListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            insuranceRequirementList,

            // Everything else...
            flashMessage, onTableChange, isLoading
        } = this.props;

        const insuranceRequirements = insuranceRequirementList.results ? insuranceRequirementList.results : [];

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-balance-scale"></i>&nbsp;Insurance Requirements
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-balance-scale"></i>&nbsp;Insurance Requirements</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-12 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/settings/insurance-requirement/add" className="d-block link-ndecor" title="InsuranceRequirements">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Insurance Requirement</div>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-table"></i>&nbsp;List
                        </h2>
                        <RemoteListComponent
                            page={page}
                            sizePerPage={sizePerPage}
                            totalSize={totalSize}
                            insuranceRequirements={insuranceRequirements}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default InsuranceRequirementListComponent;
