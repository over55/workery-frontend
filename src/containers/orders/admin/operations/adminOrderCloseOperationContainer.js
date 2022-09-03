import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AdminOrderCloseOperationComponent from "../../../../components/orders/admin/operations/adminOrderCloseOperationComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateCloseInput } from "../../../../validators/orderValidator";
import { postOrderClose } from "../../../../actions/orderActions";
import { pullOrderDetail } from "../../../../actions/orderActions";


class AdminOrderCloseOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        this.state = {
            id: parseInt(id),
            errors: {},
            isLoading: false,
            completionDate: "",
            wasSuccessfullyFinished: "",
            reason: "",
            reasonOther: "",
            comment: "",
            showModal: false,
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onCompletionDate = this.onCompletionDate.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onShowModalClick = this.onShowModalClick.bind(this);
        this.onCloseModalClick = this.onCloseModalClick.bind(this);
        this.onAgreeModalClick = this.onAgreeModalClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.workOrderId = parseInt(this.state.id);

        if (this.state.completionDate !== undefined && this.state.completionDate !== null && !isNaN(this.state.completionDate) && this.state.completionDate !== "" ) {
            const completionDateMoment = moment(this.state.completionDate);
            postData.completionDate = completionDateMoment.format("YYYY-MM-DD")
        } else {
            postData.completionDate = null;
        }

        // Set default reason if was successfully closed.
        if (this.state.wasSuccessfullyFinished === 1 || this.state.wasSuccessfullyFinished === "1") {
            postData.reason = 1;
        }

        postData.wasSuccessfullyFinished = parseInt(this.state.wasSuccessfullyFinished) === 1 ? true : false;

        // Finally: Return our new modified data.
        console.log("state |", this.state);
        console.log("getPostData |", postData);
        return postData;
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
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(order) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Order has been successfully closed.");
        this.props.history.push("/order/"+this.state.id+"");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

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

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateCloseInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.postOrderClose(
                this.getPostData(),
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }

    onSelectChange(option) {
        const optionKey = [option.selectName].toString()+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        console.log([option.selectName], optionKey, "|",option); // For debugging purposes only.
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-client-"+[e.target.name];
        const storageLabelKey =  "workery-create-client-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.
        localStorage.setItem(storageLabelKey, label) // Save to storage.

        // For the debugging purposes only.
        console.log({
            "STORE-VALUE-KEY": storageValueKey,
            "STORE-VALUE": value,
            "STORAGE-VALUE-KEY": storeValueKey,
            "STORAGE-VALUE": value,
            "STORAGE-LABEL-KEY": storeLabelKey,
            "STORAGE-LABEL": label,
        });
    }

    onMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // Set all the tags we have selected to the STORE.
        this.setState({
            tags: selectedOptions,
        });
    }

    onDOBDateTimeChange(dateOfBirth) {
        this.setState({
            dateOfBirth: dateOfBirth,
        });
    }

    onShowModalClick(e) {
        e.preventDefault();
        this.setState({
            showModal: true,
        })
    }

    onCloseModalClick(e) {
        e.preventDefault();
        this.setState({
            showModal: false
        })
    }

    onAgreeModalClick(e) {
        e.preventDefault();
        this.setState({
            showModal: false
        }, ()=>{
            this.onClick(e);
        });
    }

    onCompletionDate(dateObj) {
        this.setState({ completionDate: dateObj, }, ()=> {
            console.log("onCompletionDate | state:", this.state);
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { id, errors, wasSuccessfullyFinished, completionDate, reason, reasonOther, comment, isLoading, showModal, onCompletionDate } = this.state;
        const order = this.props.orderDetail ? this.props.orderDetail : {};
        return (
            <AdminOrderCloseOperationComponent
                id={id}
                order={order}
                errors={errors}
                wasSuccessfullyFinished={wasSuccessfullyFinished}
                completionDate={completionDate}
                reason={reason}
                reasonOther={reasonOther}
                comment={comment}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
                onCompletionDate={this.onCompletionDate}
                isLoading={isLoading}
                showModal={showModal}
                onShowModalClick={this.onShowModalClick}
                onCloseModalClick={this.onCloseModalClick}
                onAgreeModalClick={this.onAgreeModalClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        orderDetail: store.orderDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postOrderClose: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(postOrderClose(postData, onSuccessCallback, onFailureCallback))
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
)(AdminOrderCloseOperationContainer);
