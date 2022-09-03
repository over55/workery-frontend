import React, { Component } from 'react';
import { connect } from 'react-redux';

import AdminOrderFullRetrieveComponent from "../../../../components/orders/admin/retrieve/adminOrderFullRetrieveComponent";
import { pullOrderDetail } from "../../../../actions/orderActions";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { getHowHearReactSelectOptions } from "../../../../actions/howHearActions";
import { getTagReactSelectOptions } from "../../../../actions/tagActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';


class OrderFullRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            id: parseInt(id),
            order: {}
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullOrderDetail(this.state.id, this.onSuccessCallback, this.onFailureCallback);
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

    onSuccessCallback(profile) {
        console.log(profile);
    }

    onFailureCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const order = this.props.orderDetail ? this.props.orderDetail : {};
        return (
            <AdminOrderFullRetrieveComponent
                {...this}
                {...this.state}
                {...this.props}
                order={order}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        orderDetail: store.orderDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullOrderDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullOrderDetail(id, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderFullRetrieveContainer);
