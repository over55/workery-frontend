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

import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../flashMessageComponent";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
} from '../../../constants/api';


export default class PartnerSearchResultComponent extends Component {
    render() {
        const {
            partners, isLoading, errors, hasNext, onNextClick, hasPrevious, onPreviousClick, onPartnerClick
        } = this.props;
        const hasNoPartners = partners.length <= 0;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/partners`}><i className="fas fa-crown"></i>&nbsp;Partners</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/partners/search`}><i className="fas fa-search"></i>&nbsp;Search</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-search"></i>&nbsp;Partners Search</h1>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </h2>

                        {hasNoPartners
                            ?<div className="jumbotron">
                                <h1 className="display-4">No Results Found</h1>
                                <p className="lead">It appears nothing was found for your search results. Please try again by clicking below.</p>

                                <p className="lead">
                                    <Link className="btn btn-primary btn-lg" to="/partners/search">Try Again&nbsp;<i class="fas fa-chevron-right"></i></Link>
                                </p>
                            </div>
                            :<div className="card-group row">
                                {partners && partners.map(
                                    (partner) => <CardComponent partner={partner} key={partner.id} isLoading={isLoading} onPartnerClick={onPartnerClick} />)
                                }
                            </div>
                        }

                    </div>
                </div>
            </div>
        );
    }
}



class CardComponent extends Component {
    render() {
        const { partner, isLoading, onPartnerClick } = this.props;
        return (
            <div className="col-sm-3">
                <div className="card bg-light">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/partner/${partner.id}`}>
                                <strong><i className="fas fa-home"></i>&nbsp;{partner.givenName}&nbsp;{partner.lastName}</strong>
                            </Link>
                        </h5>
                        <p className="card-text">
                            {partner.streetAddress}<br />
                            {partner.addressLocality}, {partner.addressRegion}<br />
                            {partner.telephone}
                        </p>
                        <button type="button" className="btn btn-primary btn-lg btn-block" disabled={isLoading} onClick={ (event)=>{ onPartnerClick(event, partner.id, partner.givenName, partner.lastName) } }>
                            Select&nbsp;<i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
