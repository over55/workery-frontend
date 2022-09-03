import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import OrderLiteUpdateComponent from "../../../../components/orders/admin/update/adminOrderLiteUpdateComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateLiteUpdateInput } from "../../../../validators/orderValidator";
import { getTagReactSelectOptions, getPickedTagReactSelectOptions, pullTagList } from "../../../../actions/tagActions";
import { getSkillSetReactSelectOptions, getPickedSkillSetReactSelectOptions, pullSkillSetList } from "../../../../actions/skillSetActions";
import { putOrderLiteDetail } from '../../../../actions/orderActions';



class AdminOrderLiteUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        console.log("COMP", this.props.orderDetail.completionDate);

        // Get our dates based on our browsers timezone.
        // https://github.com/angular-ui/bootstrap/issues/2628#issuecomment-55125516
        var assignmentDate = this.props.orderDetail.assignmentDate
        if (assignmentDate !== null) {
            var assignmentDate = new Date(assignmentDate);
            assignmentDate.setMinutes( assignmentDate.getMinutes() + assignmentDate.getTimezoneOffset() );
        }

        var completionDate = this.props.orderDetail.completionDate;
        if (completionDate !== null) {
            completionDate = new Date(completionDate);
            completionDate.setMinutes( completionDate.getMinutes() + completionDate.getTimezoneOffset() );
        }

        this.state = {
            errors: {},
            isLoading: false,
            id: parseInt(id),
            description: this.props.orderDetail.description,
            skillSets: this.props.orderDetail.skillSets,
            isSkillSetsLoading: true,
            homeSupport: this.props.orderDetail.isHomeSupportService ? 1 : 0,
            tags: this.props.orderDetail.tags,
            isTagsLoading: true,
            assignmentDate: assignmentDate,
            completionDate: completionDate,
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSkillSetMultiChange = this.onSkillSetMultiChange.bind(this);
        this.onTagMultiChange = this.onTagMultiChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onSuccessfulTagsFetchCallback = this.onSuccessfulTagsFetchCallback.bind(this);
        this.onSuccessfulSkillSetsFetchCallback = this.onSuccessfulSkillSetsFetchCallback.bind(this);
        this.onAssignmentDateChange = this.onAssignmentDateChange.bind(this);
        this.onCompletionDateChange = this.onCompletionDateChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        if (this.state.assignmentDate !== null && this.state.assignmentDate instanceof Date) {
            const assignmentDateMoment = moment(this.state.assignmentDate);
            postData.assignmentDate = assignmentDateMoment.format("YYYY-MM-DD")
        }

        if (this.state.completionDate !== null && this.state.completionDate instanceof Date) {
            const completionDateMoment = moment(this.state.completionDate);
            postData.completionDate = completionDateMoment.format("YYYY-MM-DD")
        }

        // Boolean handler.
        postData.isHomeSupportService = parseInt(this.state.homeSupport) === 1 ? true : false;

        //
        // Generate our PKs.
        //

        let ssPKs = [];
        for (let ss of this.state.skillSets) {
            ssPKs.push(ss.skillSetId);
        }
        postData.skillSets = ssPKs;

        let tagPKs = [];
        for (let t of this.state.tags) {
            tagPKs.push(t.tagId);
        }
        postData.tags = tagPKs;

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
        const parametersMap = new Map();
        parametersMap.set("state", 1);
        this.props.pullSkillSetList(0, 10000, parametersMap, this.onSuccessfulSkillSetsFetchCallback);
        this.props.pullTagList(0,10000, parametersMap, this.onSuccessfulTagsFetchCallback);
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

    onSuccessfulSubmissionCallback(order) {
        this.setState({ errors: {}, isLoading: false, })
        this.props.setFlashMessage("success", "Order has been successfully updated.");
        this.props.history.push("/order/"+this.state.id+"/full");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({errors: errors, isLoading: false,});

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSuccessfulSkillSetsFetchCallback(skillSets) {
        this.setState({ isSkillSetsLoading: false, });
    }

    onSuccessfulTagsFetchCallback(tags) {
        this.setState({ isTagsLoading: false, });
    }

    onAssignmentDateChange(dateObj) {
        this.setState({
            assignmentDate: dateObj,
        })
    }

    onCompletionDateChange(dateObj) {
        this.setState({
            completionDate: dateObj,
        })
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({ [e.target.name]: e.target.value, });
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
        this.setState({ skillSets: pickedSkillSets, });
    }

    onTagMultiChange(...args) {
        // Extract the select options from the parameter.
        const selectedOptions = args[0];

        // We need to only return our `id` values, therefore strip out the
        // `react-select` options format of the data and convert it into an
        // array of integers to hold the primary keys of the `Tag` items selected.
        let pickedTags = [];
        if (selectedOptions !== null && selectedOptions !== undefined) {
            for (let i = 0; i < selectedOptions.length; i++) {
                let pickedOption = selectedOptions[i];
                pickedOption.tagId = pickedOption.value;
                pickedTags.push(pickedOption);
            }
        }
        this.setState({ tags: pickedTags, });
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-order-"+[e.target.name];
        const storageLabelKey =  "workery-create-order-"+[e.target.name].toString()+"-label";
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

        // Perform client-side validation.
        const { errors, isValid } = validateLiteUpdateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({
                isLoading: true, errors: {},
            },()=>{
                this.props.putOrderLiteDetail(
                    this.getPostData(),
                    this.onSuccessfulSubmissionCallback,
                    this.onFailedSubmissionCallback
                );
            });

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
        const { tags, skillSets } = this.state;

        const tagOptions = getTagReactSelectOptions(this.props.tagList);
        const transcodedTags = getPickedTagReactSelectOptions(tags, this.props.tagList)

        const skillSetOptions = getSkillSetReactSelectOptions(this.props.skillSetList);
        const transcodedSkillSets = getPickedSkillSetReactSelectOptions(skillSets, this.props.skillSetList)

        console.log(transcodedSkillSets);

        return (
            <OrderLiteUpdateComponent
                {...this}
                {...this.state}
                {...this.props}
                tags={transcodedTags}
                tagOptions={tagOptions}
                skillSets={transcodedSkillSets}
                skillSetOptions={skillSetOptions}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        skillSetList: store.skillSetListState,
        tagList: store.tagListState,
        orderDetail: store.orderDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullTagList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTagList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        pullSkillSetList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullSkillSetList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        putOrderLiteDetail: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putOrderLiteDetail(data, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminOrderLiteUpdateContainer);
