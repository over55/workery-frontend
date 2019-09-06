import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import VehicleTypeCreateComponent from "../../../../components/settings/vehicleTypes/create/vehicleTypeCreateComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import validateInput from "../../../../validators/vehicleTypeValidator";
import { postVehicleTypeDetail } from "../../../../actions/vehicleTypeActions";


class VehicleTypeCreateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            text: "",
            description: "",
            errors: {},
            isLoading: false
        }
        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
    }

    getPostData() {
        let postData = Object.assign({}, this.state);

        // Translate to API fields.
        // postData.tagText = this.state.tagText;
        // postData.tagDesc = this.state.tagDesc;

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

    onSuccessCallback(vehicleType) {
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Vehicle type has been successfully created.");
        this.props.history.push("/settings/vehicle-types");
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors, isLoading: false,
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

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({
                errors: [], isLoading: true,
            }, ()=>{
                this.props.postVehicleTypeDetail(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailureCallback
                );
            });

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailureCallback(errors);
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { text, description, errors, isLoading } = this.state;
        return (
            <VehicleTypeCreateComponent
                text={text}
                description={description}
                errors={errors}
                onTextChange={this.onTextChange}
                onClick={this.onClick}
                isLoading={isLoading}
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
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postVehicleTypeDetail: (postData, successCallback, failedCallback) => {
            dispatch(postVehicleTypeDetail(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VehicleTypeCreateContainer);
