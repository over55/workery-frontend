import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import Report19Component from "../../components/reports/report19Component";
import { getTagReactSelectOptions, pullTagList } from "../../actions/tagActions";
import { validateReport19Input } from "../../validators/reportValidator";
import { WORKERY_REPORT_NINETEEN_CSV_DOWNLOAD_API_URL } from "../../constants/api";
import { getAccessTokenFromLocalStorage } from "../../helpers/jwtUtility";


class Report19Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            tags: [],
            tagOptions: [],
            isTagsLoading: true,
            fromDate: "",
            toDate: "",
            jobState: "",
            errors: {},
            isLoading: false
        }

        this.onTagMultiChange = this.onTagMultiChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onFromDateChange = this.onFromDateChange.bind(this);
        this.onToDateChange = this.onToDateChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onTagsListCallback = this.onTagsListCallback.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // DEVELOPERS NOTE: Fetch our tags list.
        const filtersMap = new Map();
        this.props.pullTagList(0, 1000, filtersMap, this.onTagsListCallback);
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

     onTagMultiChange(...args) {
         // Extract the select options from the parameter.
         const selectedOptions = args[0];

         // Set all the tags we have selected to the STORE.
         this.setState({
             tags: selectedOptions,
         });
    }

    onTagsListCallback(response) {
        this.setState({
            tagOptions: getTagReactSelectOptions(response),
            isTagsLoading: false,
        });
    }

    onSuccessfulSubmissionCallback(staff) {
        // --- Update the GUI ---
        this.setState({ errors: {}, isLoading: true, })

        // --- Move to our next page ---
        this.props.history.push("/reports");
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

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            [optionKey]: option,
        });
    }

    onFromDateChange(dateObj) {
        this.setState({ fromDate: dateObj, });
    }

    onToDateChange(dateObj) {
        this.setState({ toDate: dateObj, });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateReport19Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            // Disable the button so the user cannot double click and download
            // the file multiple times.
            this.setState({ isLoading: true, })

            // Extract the selected options and convert to ISO string format, also
            // create our URL to be used for submission.
            const { tags, fromDate, toDate, jobState } = this.state;
            console.log(tags);

            let tagIds = "";
            for (let i = 0; i < tags.length; i++) {
                let value = tags[i].value;
                console.log(value);
                tagIds = tagIds + value + ",";
            }

            // If there are more then one keys then we must remove the last comma character.
            let url = null;
            if (tags.length > 0) {
                tagIds = tagIds.slice(0, -1); // Removed last character.
            }
            const toDateString = toDate.getTime();
            const fromDateString = fromDate.getTime();
            const accessToken = getAccessTokenFromLocalStorage();
            url = WORKERY_REPORT_NINETEEN_CSV_DOWNLOAD_API_URL + "?token="+accessToken +  "&tag_ids=" + tagIds + "&from_dt="+fromDateString+"&to_dt="+toDateString+"&state="+jobState;

            // For debugging purposes only.
            console.log(url);

            // The following code will open up a new browser tab and load up the
            // URL that you inputted.
            var win = window.open(url, '_blank');
            win.focus();

            // Add minor delay and then run to remove the button ``disable`` state
            // so the user is able to click the download button again.
            setTimeout(() => {
                this.setState({ isLoading: false, errors: [], })
            }, 100); // 0.10 seconds.

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
            tags, tagOptions, isTagsLoading, fromDate, toDate, jobState,
            errors, isLoading
        } = this.state;


        return (
            <Report19Component
                tags={tags}
                tagOptions={tagOptions}
                isTagsLoading={isTagsLoading}
                onTagMultiChange={this.onTagMultiChange}
                fromDate={fromDate}
                toDate={toDate}
                jobState={jobState}
                isLoading={isLoading}
                errors={errors}
                onSelectChange={this.onSelectChange}
                onFromDateChange={this.onFromDateChange}
                onToDateChange={this.onToDateChange}
                onClick={this.onClick}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        tags: store.tagsState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullTagList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTagList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Report19Container);
