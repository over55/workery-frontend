import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import PartnerCreateStep5Component from "../../../components/partners/create/partnerCreateStep5Component";
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem
} from '../../../helpers/localStorageUtility';
import { validateStep5CreateInput } from "../../../validators/partnerValidator";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';
import { BASIC_STREET_TYPE_CHOICES, STREET_DIRECTION_CHOICES } from "../../../constants/api";



class PartnerCreateStep5Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Get the type of.
        const typeOf = parseInt(localStorage.getItem("nwapp-create-partner-typeOf"));
        let returnURL;
        if (typeOf === RESIDENCE_TYPE_OF || typeOf === COMMUNITY_CARES_TYPE_OF) {
            returnURL = "/partners/add/step-4-rez-or-cc";
        }
        else if (typeOf === BUSINESS_TYPE_OF) {
            returnURL = "/partners/add/step-4-biz";
        }

        this.state = {
            returnURL: returnURL,
            typeOf: typeOf,
            streetNumber: localStorage.getItem("nwapp-create-partner-streetNumber"),
            streetName: localStorage.getItem("nwapp-create-partner-streetName"),
            streetType: localStorage.getItem("nwapp-create-partner-streetType"),
            apartmentUnit: localStorage.getItem("nwapp-create-partner-apartmentUnit"),
            streetTypeOption: localStorageGetObjectItem('nwapp-create-partner-streetTypeOption'),
            streetTypeOther: localStorage.getItem("nwapp-create-partner-streetTypeOther"),
            streetDirection: localStorage.getItem("nwapp-create-partner-streetDirection"),
            streetDirectionOption: localStorageGetObjectItem('nwapp-create-partner-streetDirectionOption'),
            postalCode: localStorage.getItem("nwapp-create-partner-postalCode"),
            errors: {},
            isLoading: false
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
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
        this.setState({ errors: {}, isLoading: true, })
        this.props.history.push("/partners/add/step-6");
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
        });
        localStorage.setItem('nwapp-create-partner-'+[e.target.name], e.target.value);
    }

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        });
        localStorage.setItem('nwapp-create-partner-'+[option.selectName], option.value);
        localStorageSetObjectOrArrayItem('nwapp-create-partner-'+optionKey, option);
        // console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform partner-side validation.
        const { errors, isValid } = validateStep5CreateInput(this.state);

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
        const { returnURL, streetNumber, streetName, streetType, apartmentUnit, streetTypeOther, streetDirection, postalCode, errors } = this.state;
        return (
            <PartnerCreateStep5Component
                returnURL={returnURL}
                streetNumber={streetNumber}
                streetName={streetName}
                streetType={streetType}
                apartmentUnit={apartmentUnit}
                streetTypeOptions={BASIC_STREET_TYPE_CHOICES}
                streetTypeOther={streetTypeOther}
                streetDirection={streetDirection}
                streetDirectionOptions={STREET_DIRECTION_CHOICES}
                postalCode={postalCode}
                errors={errors}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onClick={this.onClick}
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
)(PartnerCreateStep5Container);
