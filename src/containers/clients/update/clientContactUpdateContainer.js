import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import ClientContactUpdateComponent from "../../../components/clients/update/clientContactUpdateComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateContactInput } from "../../../validators/clientValidator";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID, COMMERCIAL_CUSTOMER_TYPE_OF_ID
} from '../../../constants/api';
import { getHowHearReactSelectOptions, pullHowHearList } from "../../../actions/howHearActions";
import { getTagReactSelectOptions, getPickedTagReactSelectOptions, pullTagList } from "../../../actions/tagActions";
import { putClientContactDetail } from "../../../actions/clientActions";


class ClientUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        // Map the API fields to our fields.
        const isOkToEmail = this.props.clientDetail.isOkToEmail === true ? 1 : 0;
        const isOkToText = this.props.clientDetail.isOkToText === true ? 1 : 0;

        this.state = {
            errors: {},
            isLoading: false,
            id: id,

            // STEP 3
            typeOf: this.props.clientDetail.typeOf,

            // STEP 4
            organizationName: this.props.clientDetail.organizationName,
            organizationTypeOf: this.props.clientDetail.organizationTypeOf,
            givenName: this.props.clientDetail.givenName,
            lastName: this.props.clientDetail.lastName,
            organizationName: this.props.clientDetail.organizationName,
            organizationTypeOf: this.props.clientDetail.organizationTypeOf,
            givenName: this.props.clientDetail.givenName,
            lastName: this.props.clientDetail.lastName,
            telephone: this.props.clientDetail.telephone,
            telephoneTypeOf: this.props.clientDetail.telephoneTypeOf,
            otherTelephone: this.props.clientDetail.otherTelephone,
            otherTelephoneTypeOf: this.props.clientDetail.otherTelephoneTypeOf,
            email: this.props.clientDetail.email,
            isOkToEmail: isOkToEmail,
            isOkToText: isOkToText,
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailedCallback = this.onFailedCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // (6) Organization Type Of - This field may not be null, therefore make blank.
        if (this.state.organizationTypeOf === undefined || this.state.organizationTypeOf === null) {
            postData.organizationTypeOf = "";
        }

        if (this.state.organizationName === undefined || this.state.organizationName === null) {
            postData.organizationName = "";
        }

        // (8) Telephone type: This field is required.;
        if (this.state.telephoneTypeOf === undefined || this.state.telephoneTypeOf === null || this.state.telephoneTypeOf === "") {
            postData.telephoneTypeOf = 1;
        }
        if (this.state.otherTelephoneTypeOf === undefined || this.state.otherTelephoneTypeOf === null || this.state.otherTelephoneTypeOf === "") {
            postData.otherTelephoneTypeOf = 1;
        }

        // Boolean handler.
        postData.isOkToEmail = parseInt(this.state.isOkToEmail) === 1 ? true : false;
        postData.isOkToText = parseInt(this.state.isOkToText) === 1 ? true : false;

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

        // Fetch all our GUI drop-down options which are populated by the API.
        this.props.pullHowHearList(0,1000);
        this.props.pullTagList(0,1000);
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

    onSuccessCallback(client) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Client has been successfully updated.");
        this.props.history.push("/client/"+this.state.id+"/full");
    }

    onFailedCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

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

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateContactInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ errors: {}, isLoading: true, }, ()=>{
                this.props.putClientContactDetail(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailedCallback
                );
            });

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedCallback(errors);
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
        const storageValueKey = "nwapp-create-client-"+[e.target.name];
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"-label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <ClientContactUpdateComponent
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
        clientDetail: store.clientDetailState,
        howHearList: store.howHearListState,
        tagList: store.tagListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullHowHearList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullHowHearList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        pullTagList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTagList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        putClientContactDetail: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putClientContactDetail(data, onSuccessCallback, onFailureCallback)
            )
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientUpdateContainer);
