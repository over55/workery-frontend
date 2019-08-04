import React, { Component } from 'react';
import { connect } from 'react-redux';

import PartnerSearchResultComponent from "../../../components/partners/search/partnerSearchResultComponent";


class PartnerSearchResultContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

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

    onSuccessfulSubmissionCallback(profile) {
        console.log(profile);
    }

    onFailedSubmissionCallback(errors) {
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
        const results = [{
            'slug': 'argyle',
            'icon': 'home',
            'number': 1,
            'firstName': 'Shinji',
            'lastName': 'Ikari',
            'phone': '(789) 789-7890',
            'email': 'shinji.ikari@nerv.worldgov',
            'absoluteUrl': '/partner/argyle'
        },{
            'slug': 'byron',
            'icon': 'home',
            'number': 2,
            'firstName': 'Mariya',
            'lastName': 'Takeuchi',
            'phone': '(321) 321-3210',
            'email': 'plastic_lover@gmail.com',
            'absoluteUrl': '/partner/byron'
        },{
            'slug': 'carling',
            'icon': 'briefcase',
            'number': 3,
            'firstName': 'Rei',
            'lastName': 'Ayanami',
            'phone': '(123) 123-1234',
            'email': 'rei.ayanami@nerv.worldgov',
            'absoluteUrl': '/partner/carling'
        }];
        return (
            <PartnerSearchResultComponent
                results={results}
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerSearchResultContainer);
