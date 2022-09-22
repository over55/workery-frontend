import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AdminInvoiceCreateComponent from "../../../../components/financials/admin/create/adminInvoiceCreateStep1Component";
import { pullOrderDetail } from "../../../../actions/orderActions";
import { validateInvoiceSectionOneInput } from "../../../../validators/orderValidator";
import { localStorageGetIntegerItem, localStorageGetDateItem, localStorageSetObjectOrArrayItem } from '../../../../helpers/localStorageUtility';
import { putStaffContactDetail } from '../../../../actions/staffActions';


class AdminInvoiceCreateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        var invoiceDate = this.props.orderDetail.invoiceDate
                        ? moment(this.props.orderDetail.invoiceDate, 'YYYY-MM-DD').toDate()
                        : null;

        const invoiceIds = this.props.orderDetail.invoiceIds;

        this.state = {
            orderId: parseInt(id),
            invoiceId: invoiceIds,
            invoiceDate: invoiceDate,
            associateName: localStorage.getItem("workery-create-invoice-associateName"),
            associateTelephone: localStorage.getItem("workery-create-invoice-associateTelephone"),
            associateTaxId: localStorage.getItem("workery-create-invoice-associateTaxId"),
            customerName: localStorage.getItem("workery-create-invoice-customerName"),
            customerAddress: localStorage.getItem("workery-create-invoice-customerAddress"),
            customerEmail: localStorage.getItem("workery-create-invoice-customerEmail"),

            errors: {},
            isLoading: false
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
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

        if (this.state.invoiceDate !== undefined && this.state.invoiceDate !== null && !isNaN(this.state.invoiceDate) ) {
            const invoiceDateMoment = moment(this.state.invoiceDate);
            postData.invoiceDate = invoiceDateMoment.format("YYYY-MM-DD")
        }


        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullOrderDetail(this.state.orderId, this.onSuccessCallback, this.onFailureCallback);
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

    onSuccessfulSubmissionCallback(staff) {
        this.props.history.push("/staff/"+this.state.id+"/full");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSuccessCallback(response) {
        console.log(response);

        var invoiceDateObj = response.invoiceDate
                           ? moment(response.invoiceDate, 'YYYY-MM-DD').toDate()
                           : null;

        if (response.associate !== undefined && response.associate.associate !== null && response.associate.associate !== "" && response.associate.associate !== "null") {
            this.setState({
                isLoading: false,
                invoiceDate: invoiceDateObj,
                associateName: response.associate.name,
                associateTelephone: response.associate.telephone,
                associateTaxId: response.associate.taxId,
                customerName: response.customer.name,
                customerAddress: response.customer.streetAddress,
                customerEmail: response.customer.telephone,
            });

            localStorage.setItem("workery-create-invoice-associateName", response.associate.name);
            localStorage.setItem("workery-create-invoice-associateTelephone", response.associate.telephone);
            localStorage.setItem("workery-create-invoice-associateTaxId", response.associate.taxId);
            localStorage.setItem("workery-create-invoice-customerName", response.customer.name);
            localStorage.setItem("workery-create-invoice-customerAddress", response.customer.streetAddress);
            localStorage.setItem("workery-create-invoice-customerEmail", response.customer.telephone);
        } else {
            this.setState({
                isLoading: false,
                invoiceDate: invoiceDateObj,
            });
        }
    }

    onFailureCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({ [e.target.name]: e.target.value, });
        localStorage.setItem('workery-create-invoice-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            [optionKey]: option,
        });
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-staff-"+[e.target.name];
        const storageLabelKey =  "workery-create-staff-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform staff-side validation.
        const { errors, isValid } = validateInvoiceSectionOneInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.history.push("/financial/"+this.state.orderId+"/invoice/create/step-2");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            orderId, errors, invoiceId, invoiceDate, associateName, associateTelephone, associateTaxId, customerName, customerAddress, customerEmail,
        } = this.state;
        return (
            <AdminInvoiceCreateComponent
                associateName={associateName}
                associateTelephone={associateTelephone}
                associateTaxId={associateTaxId}
                customerName={customerName}
                customerAddress={customerAddress}
                customerEmail={customerEmail}
                orderId={orderId}
                order={this.props.orderDetail}
                invoiceId={invoiceId}
                invoiceDate={invoiceDate}
                errors={errors}
                onTextChange={this.onTextChange}
                onRadioChange={this.onRadioChange}
                onSelectChange={this.onSelectChange}
                onClick={this.onClick}
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
        putStaffContactDetail: (data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(putStaffContactDetail(data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback))
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
)(AdminInvoiceCreateContainer);
