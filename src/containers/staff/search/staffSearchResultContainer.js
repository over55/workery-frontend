import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import StaffSearchResultComponent from "../../../components/staff/search/staffSearchResultComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { pullStaffList } from "../../../actions/staffActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../constants/api";
import { localStorageGetObjectItem } from '../../../helpers/localStorageUtility';


class StaffSearchResultContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const search = localStorageGetObjectItem('workery-search-staff-details');
        this.state = {
            // Pagination
            offset: 0,
            sizePerPage: 1000,
            totalSize: 0,

            // Everything else
            isLoading: true,
            search: search,
        }
        this.getParametersMapFromState = this.getParametersMapFromState.bind(this);
        this.onStaffClick = this.onStaffClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    getParametersMapFromState() {
        const search = localStorageGetObjectItem('workery-search-staff-details');
        const parametersMap = new Map();
        if (search.keyword !== undefined && search.keyword !== "") {
            parametersMap.set("search", search.keyword);
        }
        if (search.givenName !== undefined && search.givenName !== "") {
            parametersMap.set("given_name", search.givenName);
        }
        if (search.lastName !== undefined && search.lastName !== "") {
            parametersMap.set("last_name", search.lastName);
        }
        if (search.telephone !== undefined && search.telephone !== "") {
            parametersMap.set("telephone", search.telephone);
        }
        if (search.email !== undefined && search.email !== "") {
            parametersMap.set("email", search.email);
        }
        console.log("FILTERING", parametersMap); // For debugging purposes only.
        return parametersMap;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        this.setState(
            { parametersMap: this.getParametersMapFromState(), isLoading: true, },
            ()=>{
                // STEP 3:
                // SUBMIT TO OUR API.
                this.props.pullStaffList(this.state.offset, this.state.sizePerPage, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        );
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessCallback(response) {
        console.log("onSuccessCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                offset: response.offset,
                totalSize: response.count,
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onStaffClick(e, staffId, staffGivenName, staffLastName) {
        this.setState(
            { isLoading: true },
            ()=>{
                this.props.history.push("/staff/"+staffId+"");
            }
        );
    }

    onNextClick(e) {
        const offset = this.state.offset + 1;
        this.setState(
            {
                offset: offset,
                isLoading: true,
            },
            ()=>{
                this.props.pullStaffList(offset, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        )
    }

    onPreviousClick(e) {
        const offset = this.state.offset - 1;
        this.setState(
            {
                offset: offset,
                isLoading: true,
            },
            ()=>{
                this.props.pullStaffList(offset, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        )
    }



    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { offset, sizePerPage, totalSize, isLoading, errors } = this.state;
        const staff = (this.props.staffList && this.props.staffList.results) ? this.props.staffList.results : [];
        const hasNext = this.props.staffList.next !== null;
        const hasPrevious = this.props.staffList.previous !== null;
        return (
            <StaffSearchResultComponent
                offset={offset}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                staff={staff}
                isLoading={isLoading}
                errors={errors}
                onStaffClick={this.onStaffClick}
                hasNext={hasNext}
                onNextClick={this.onNextClick}
                hasPrevious={hasPrevious}
                onPreviousClick={this.onPreviousClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        staffList: store.staffListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullStaffList: (offset, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullStaffList(offset, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffSearchResultContainer);
