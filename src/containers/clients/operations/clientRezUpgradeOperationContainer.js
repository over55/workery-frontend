import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ClientRezUpgradeOperationComponent from "../../../components/clients/operations/clientRezUpgradeOperationComponent";
import { validateStep4BizCreateInput } from "../../../validators/clientValidator";
import {
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
    PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES,
    SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES
} from '../../../constants/api';
import { localStorageSetObjectOrArrayItem, localStorageGetIntegerItem } from '../../../helpers/localStorageUtility';


class ClientRezUpgradeOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            companyName: localStorage.getItem("workery-create-client-biz-companyName"),
            contactFirstName: localStorage.getItem("workery-create-client-biz-contactFirstName"),
            contactLastName: localStorage.getItem("workery-create-client-biz-contactLastName"),
            primaryPhone: localStorage.getItem("workery-create-client-biz-primaryPhone"),
            primaryPhoneTypeOf: localStorageGetIntegerItem("workery-create-client-biz-primaryPhoneTypeOf"),
            secondaryPhone: localStorage.getItem("workery-create-client-biz-secondaryPhone"),
            secondaryPhoneTypeOf: localStorageGetIntegerItem("workery-create-client-biz-secondaryPhoneTypeOf"),
            email: localStorage.getItem("workery-create-client-biz-email"),
            isOkToEmail: localStorageGetIntegerItem("workery-create-client-biz-isOkToEmail"),
            isOkToText: localStorageGetIntegerItem("workery-create-client-biz-isOkToText"),
            errors: {},
            isLoading: false,
            client: {},
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // DEVELOPERS NOTE:
        // Since we are in this page, we need to assign the user to be
        // a business type user.
        localStorage.setItem("workery-create-client-typeOf", COMMERCIAL_CUSTOMER_TYPE_OF_ID);
        localStorage.setItem("workery-create-client-typeOf-label", "Business");
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

    onSuccessfulSubmissionCallback(client) {
        this.props.history.push("/clients/add/step-5");
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

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
        const key = "workery-create-client-biz-"+[e.target.name];
        localStorage.setItem(key, e.target.value);
    }

    onSelectChange(option) {
        console.log(option);
        const optionKey = [option.selectName]+"Option";
        this.setState(
            { [option.selectName]: option.value, [optionKey]: option, },
            ()=>{
                localStorage.setItem('workery-create-client-biz-'+[option.selectName].toString(), option.value);
                localStorage.setItem('workery-create-client-biz-'+[option.selectName].toString()+"Label", option.label);
                localStorageSetObjectOrArrayItem('workery-create-client-biz-'+optionKey, option);
                console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
            }
        );
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-client-biz-"+[e.target.name];
        const storageLabelKey =  "workery-create-client-biz-"+[e.target.name].toString()+"-label";
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

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateStep4BizCreateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.onSuccessfulSubmissionCallback();

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
            companyName, contactFirstName, contactLastName, primaryPhone, primaryPhoneTypeOf, secondaryPhone, secondaryPhoneTypeOf, email, isOkToText, isOkToEmail, errors
        } = this.state;
        return (
            <ClientRezUpgradeOperationComponent
                companyName={companyName}
                contactFirstName={contactFirstName}
                contactLastName={contactLastName}
                primaryPhone={primaryPhone}
                primaryPhoneTypeOf={primaryPhoneTypeOf}
                primaryPhoneTypeOfOptions={PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES}
                secondaryPhone={secondaryPhone}
                secondaryPhoneTypeOf={secondaryPhoneTypeOf}
                secondaryPhoneTypeOfOptions={SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES}
                email={email}
                isOkToEmail={isOkToEmail}
                isOkToText={isOkToText}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
                onClick={this.onClick}
                client={this.props.clientDetail}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        clientDetail: store.clientDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientRezUpgradeOperationContainer);
