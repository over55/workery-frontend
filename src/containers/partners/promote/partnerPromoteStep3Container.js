import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import { AREA_COORDINATOR_GROUP_ID, ASSOCIATE_GROUP_ID } from "../../../constants/api";
import PartnerPromoteStep3Component from "../../../components/partners/promote/partnerPromoteStep3Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { localStorageGetIntegerItem, localStorageGetBooleanItem, localStorageGetDateItem } from "../../../helpers/localStorageUtility";


class PartnerPromoteStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { slug } = this.props.match.params;

        // Update state.
        this.state = {
            slug: slug,
            errors: [],
            groupId: localStorageGetIntegerItem("nwapp-partner-promote-group-id"),
            areaCoordinatorAgreement: localStorageGetBooleanItem("nwapp-partner-promote-areaCoordinatorAgreement"),
            conflictOfInterestAgreement: localStorageGetBooleanItem("nwapp-partner-promote-conflictOfInterestAgreement"),
            codeOfConductAgreement: localStorageGetBooleanItem("nwapp-partner-promote-codeOfConductAgreement"),
            confidentialityAgreement: localStorageGetBooleanItem("nwapp-partner-promote-confidentialityAgreement"),
            associateAgreement: localStorageGetBooleanItem("nwapp-partner-promote-associateAgreement"),
            policeCheckDate: localStorageGetDateItem("nwapp-partner-promote-policeCheckDate"),
        }

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
        this.props.setFlashMessage("success", "Partner has been successfully created.");
        this.props.history.push("/partners");
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
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        this.setState({
            isLoading: true,
        })
        this.props.setFlashMessage("success", "Partner has been successfully promoted.");
        if (this.state.groupId === AREA_COORDINATOR_GROUP_ID) {
            this.props.history.push("/area-coordinator/"+this.state.slug+"/full");
        }
        else if (this.state.groupId === ASSOCIATE_GROUP_ID) {
            this.props.history.push("/associate/"+this.state.slug+"/full");
        } else {
            this.props.history.push("/partner/"+this.state.slug+"/full");
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const partnerData = {
            'slug': 'Argyle',
            'number': 1,
            'name': 'Argyle',
            'absoluteUrl': '/partner/argyle'
        };
        return (
            <PartnerPromoteStep3Component
                slug={this.state.slug}
                partnerData={partnerData}
                groupId={this.state.groupId}
                areaCoordinatorAgreement={this.state.areaCoordinatorAgreement}
                conflictOfInterestAgreement={this.state.conflictOfInterestAgreement}
                codeOfConductAgreement={this.state.codeOfConductAgreement}
                confidentialityAgreement={this.state.confidentialityAgreement}
                associateAgreement={this.state.associateAgreement}
                policeCheckDate={this.state.policeCheckDate}
                errors={this.state.errors}
                onBack={this.onBack}
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
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerPromoteStep2Container);