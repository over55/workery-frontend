import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ClientCreateStep2Component from "../../../components/clients/create/clientCreateStep2Component";
import { pullClientList } from "../../../actions/clientActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../constants/api";


class ClientCreateStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            givenName: localStorage.getItem("workery-create-client-givenName"),
            lastName: localStorage.getItem("workery-create-client-lastName"),
            email: localStorage.getItem("workery-create-client-email"),
            phone: localStorage.getItem("workery-create-client-phone"),
            isLoading: true,
            errors: {},
            offset: 0,
            limit: STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION,
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.getParametersMapFromState = this.getParametersMapFromState.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    getParametersMapFromState() {
        const parametersMap = new Map();
        if (this.state.givenName !== undefined && this.state.givenName !== null) {
            parametersMap.set('givenName', this.state.givenName);
        }
        if (this.state.lastName !== undefined && this.state.lastName !== null) {
            parametersMap.set('lastName', this.state.lastName);
        }
        if (this.state.email !== undefined && this.state.email !== null) {
            parametersMap.set('email', this.state.email);
        }
        if (this.state.phone !== undefined && this.state.phone !== null) {
            parametersMap.set('phone', this.state.phone);
        }
        return parametersMap;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        const { offset, limit } = this.state;
        this.props.pullClientList(offset, limit, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
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

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onNextClick(e) {
        let { offset, limit } = this.state;
        offset = offset + 1;
        this.setState(
            {
                offset: offset,
                isLoading: true,
            },
            ()=>{
                this.props.pullClientList(
                    offset, limit, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback
                );
            }
        )
    }

    onPreviousClick(e) {
        let { offset, limit } = this.state;
        offset = offset - 1;
        this.setState(
            {
                offset: offset,
                isLoading: true,
            },
            ()=>{
                this.props.pullClientList(
                    offset, limit, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback
                );
            }
        )
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const clients = (this.props.clientList && this.props.clientList.results) ? this.props.clientList.results : [];
        const hasNext = this.props.clientList.next !== null;
        const hasPrevious = this.props.clientList.previous !== null;
        return (
            <ClientCreateStep2Component
                {...this}
                {...this.state}
                {...this.props}
                clients={clients}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        clientList: store.clientListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullClientList: (offset, limit, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullClientList(offset, limit, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientCreateStep2Container);
