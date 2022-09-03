import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import PartnerCreateStep3BizComponent from "../../../components/partners/create/partnerCreateStep3Component";
import { validateStep3CreateInput } from "../../../validators/partnerValidator";
import {
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
    PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES,
    SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES
} from '../../../constants/api';
import { localStorageSetObjectOrArrayItem, localStorageGetIntegerItem } from '../../../helpers/localStorageUtility';

class PartnerCreateStep3BizContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            organizationName: localStorage.getItem("workery-create-partner-organizationName"),
            organizationTypeOf: localStorageGetIntegerItem("workery-create-partner-organizationTypeOf"),
            givenName: localStorage.getItem("workery-create-partner-givenName"),
            lastName: localStorage.getItem("workery-create-partner-lastName"),
            telephone: localStorage.getItem("workery-create-partner-telephone"),
            telephoneTypeOf: localStorageGetIntegerItem("workery-create-partner-telephoneTypeOf"),
            otherTelephone: localStorage.getItem("workery-create-partner-otherTelephone"),
            otherTelephoneTypeOf: localStorageGetIntegerItem("workery-create-partner-otherTelephoneTypeOf"),
            email: localStorage.getItem("workery-create-partner-email"),
            isOkToEmail: localStorageGetIntegerItem("workery-create-partner-isOkToEmail"),
            isOkToText: localStorageGetIntegerItem("workery-create-partner-isOkToText"),
            isActive: localStorageGetIntegerItem("workery-create-partner-isActive"),
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

        // DEVELOPERS NOTE:
        // Since we are in this page, we need to assign the user to be
        // a business type user.
        localStorage.setItem("workery-create-partner-typeOf", COMMERCIAL_CUSTOMER_TYPE_OF_ID);
        localStorage.setItem("workery-create-partner-typeOf-label", "Business");
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

    onSuccessfulSubmissionCallback(partner) {
        this.props.history.push("/partners/add/step-4");
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
        const key = "workery-create-partner-"+[e.target.name];
        localStorage.setItem(key, e.target.value);
    }

    onSelectChange(option) {
        console.log(option);
        const optionKey = [option.selectName]+"Option";
        this.setState(
            { [option.selectName]: option.value, [optionKey]: option, },
            ()=>{
                localStorage.setItem('workery-create-partner-'+[option.selectName].toString(), option.value);
                localStorage.setItem('workery-create-partner-'+[option.selectName].toString()+"Label", option.label);
                localStorageSetObjectOrArrayItem('workery-create-partner-'+optionKey, option);
                console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
            }
        );
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-partner-"+[e.target.name];
        const storageLabelKey =  "workery-create-partner-"+[e.target.name].toString()+"-label";
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

        // Perform partner-side validation.
        const { errors, isValid } = validateStep3CreateInput(this.state);

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
            <PartnerCreateStep3BizComponent
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
)(PartnerCreateStep3BizContainer);
