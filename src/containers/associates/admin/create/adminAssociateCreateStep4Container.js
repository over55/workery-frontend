import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AdminAssociateCreateStep4Component from "../../../../components/associates/admin/create/adminAssociateCreateStep4Component";
import { validateStep4CreateInput } from "../../../../validators/associateValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    TELEPHONE_CONTACT_POINT_TYPE_OF_ID
} from '../../../../constants/api';
import { localStorageGetIntegerItem, localStorageSetObjectOrArrayItem } from '../../../../helpers/localStorageUtility';


class AdminAssociateCreateStep4Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            typeOf: localStorageGetIntegerItem("workery-create-associate-typeOf"),
            organizationName: localStorage.getItem("workery-create-associate-organizationName"),
            organizationTypeOf: localStorageGetIntegerItem("workery-create-associate-organizationTypeOf"),
            givenName: localStorage.getItem("workery-create-associate-givenName"),
            lastName: localStorage.getItem("workery-create-associate-lastName"),
            telephone: localStorage.getItem("workery-create-associate-telephone"),
            otherTelephone: localStorage.getItem("workery-create-associate-otherTelephone"),
            email: localStorage.getItem("workery-create-associate-email"),
            isOkToEmail: localStorageGetIntegerItem("workery-create-associate-isOkToEmail"),
            isOkToText: localStorageGetIntegerItem("workery-create-associate-isOkToText"),
            errors: {},
            isLoading: false
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
        localStorage.setItem("workery-create-associate-telephoneTypeOf", TELEPHONE_CONTACT_POINT_TYPE_OF_ID);
        localStorage.setItem("workery-create-associate-otherTelephoneTypeOf", TELEPHONE_CONTACT_POINT_TYPE_OF_ID);
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

    onSuccessfulSubmissionCallback(associate) {
        this.props.history.push("/associates/add/step-5");
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
        const key = "workery-create-associate-"+[e.target.name];
        localStorage.setItem(key, e.target.value);
    }

    onSelectChange(option) {
        console.log(option);
        const optionKey = [option.selectName]+"Option";
        this.setState(
            { [option.selectName]: option.value, [optionKey]: option, },
            ()=>{
                localStorage.setItem('workery-create-associate-'+[option.selectName].toString(), option.value);
                localStorage.setItem('workery-create-associate-'+[option.selectName].toString()+"Label", option.label);
                localStorageSetObjectOrArrayItem('workery-create-associate-'+optionKey, option);
                console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
            }
        );
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-associate-"+[e.target.name];
        const storageLabelKey =  "workery-create-associate-"+[e.target.name].toString()+"-label";
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

        // Perform associate-side validation.
        const { errors, isValid } = validateStep4CreateInput(this.state);

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
        return (
            <AdminAssociateCreateStep4Component
                {...this}
                {...this.state}
                {...this.props}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
    };
}

const mapDispatchToProps = dispatch => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateCreateStep4Container);
