import React, { Component } from 'react';
import { connect } from 'react-redux';

import  AdminOrderCreateStep4Component from "../../../../components/orders/admin/create/adminOrderCreateStep4Component";
import { validateStep4CreateInput } from "../../../../validators/orderValidator";
import { getSkillSetReactSelectOptions, getPickedSkillSetReactSelectOptions, pullSkillSetList } from "../../../../actions/skillSetActions";
import {
    localStorageGetObjectItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetArrayItem,
    localStorageGetIntegerItem,
    localStorageGetDateItem
} from '../../../../helpers/localStorageUtility';

class  AdminOrderCreateStep4Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            isSkillsetLoading: true,
            description: localStorage.getItem("workery-create-order-description"),
            skillSets: localStorageGetArrayItem("workery-create-order-skillSets"),
            isLoading: true,
            errors: {},
            page: 1,
        }
        this.onTextChange = this.onTextChange.bind(this);
        this.onSkillSetMultiChange = this.onSkillSetMultiChange.bind(this);
        this.onSkillSetSuccessFetch = this.onSkillSetSuccessFetch.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // DEVELOPERS NOTE: Fetch our skillset list.
        const parametersMap = new Map();
        parametersMap.set("state", 1);
        this.props.pullSkillSetList(0, 1000, parametersMap, this.onSkillSetSuccessFetch);
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

    onSkillSetSuccessFetch(howHearList) {
        this.setState({ isSkillsetLoading: false, });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        // Update our state.
        this.setState({
            [e.target.name]: e.target.value,
        });

        // Update our persistent storage.
        const key = "workery-create-order-"+[e.target.name];
        localStorage.setItem(key, e.target.value)
    }

    onSkillSetMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // We need to only return our `id` values, therefore strip out the
        // `react-select` options format of the data and convert it into an
        // array of integers to hold the primary keys of the `Tag` items selected.
        let pickedSkillSets = [];
        if (selectedOptions !== null && selectedOptions !== undefined) {
            for (let i = 0; i < selectedOptions.length; i++) {
                let pickedOption = selectedOptions[i];
                pickedOption.skillSetId = pickedOption.value;
                pickedSkillSets.push(pickedOption);
            }
        }
        this.setState({ skillSets: pickedSkillSets, }, ()=>{
            // // Set all the tags we have selected to the STORAGE.
            const key = 'workery-create-order-' + args[1].name;
            localStorageSetObjectOrArrayItem(key, selectedOptions);
        });
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // console.log(this.state); // For debugging purposes only.

        // Perform client-side validation.
        const { errors, isValid } = validateStep4CreateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.history.push("/orders/add/step-5");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({
                isLoading: false,
                errors: errors,
            })
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            skillSets,
        } = this.state;

        const skillSetOptions = getSkillSetReactSelectOptions(this.props.skillSetList);
        const transcodedSkillSets = getPickedSkillSetReactSelectOptions(skillSets, this.props.skillSetList)

        return (
            < AdminOrderCreateStep4Component
                {...this}
                {...this.state}
                {...this.props}
                skillSets={transcodedSkillSets}
                skillSetOptions={getSkillSetReactSelectOptions(this.props.skillSetList)}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        skillSetList: store.skillSetListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullSkillSetList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullSkillSetList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)( AdminOrderCreateStep4Container);
