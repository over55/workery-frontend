import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize, decamelizeKeys } from 'humps';
import isEmpty from 'lodash/isEmpty';

import {
    TAG_LIST_REQUEST, TAG_LIST_FAILURE, TAG_LIST_SUCCESS,
    TAG_DETAIL_REQUEST, TAG_DETAIL_FAILURE, TAG_DETAIL_SUCCESS
} from '../constants/actionTypes';
import { WORKERY_TAG_LIST_API_URL, WORKERY_TAG_DETAIL_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


////////////////////////////////////////////////////////////////////////////////
//                                 LIST                                       //
////////////////////////////////////////////////////////////////////////////////

export function pullTagList(offset=0, limit=10, filtersMap=new Map(), onSuccessCallback=null, onFailureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setTagListRequest()
        );

        console.log(offset, limit, filtersMap, onSuccessCallback, onFailureCallback);

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = WORKERY_TAG_LIST_API_URL+"?offset="+offset+"&limit="+limit;
        filtersMap.forEach(
            (value, key) => {
                let decamelizedkey = decamelize(key)
                aURL += "&"+decamelizedkey+"="+value;
            }
        )

        // Make the API call.
        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            const responseData = successResponse.data;

            console.log(responseData); // For debugging purposes.

            let data = camelizeKeys(responseData);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};
            data['offset'] = offset;

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setTagListSuccess(data)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(data);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("pullTagList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setTagListFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (onFailureCallback) {
                    onFailureCallback(errors);
                }
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                 CREATE                                     //
////////////////////////////////////////////////////////////////////////////////

export function postTagDetail(postData, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setTagDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.post(WORKERY_TAG_LIST_API_URL, decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;

            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Run our success callback function.
            successCallback(device);

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setTagDetailSuccess(device)
            );
        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("postTagDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setTagDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (failedCallback) {
                    failedCallback(errors);
                }
            }

        }).then( () => {
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                RETRIEVE                                    //
////////////////////////////////////////////////////////////////////////////////

export function pullTagDetail(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setTagDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_TAG_DETAIL_API_URL+id;

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            const responseData = successResponse.data;
            // console.log(successResult); // For debugging purposes.

            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            console.log("pullTagDetail | Success:", profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setTagDetailSuccess(profile)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(profile);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("pullTagDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setTagDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (onFailureCallback) {
                    onFailureCallback(errors);
                }
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                UPDATE                                      //
////////////////////////////////////////////////////////////////////////////////

export function putTagDetail(postData, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setTagDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        const aURL = WORKERY_TAG_DETAIL_API_URL+postData.id;
        console.log("URL:", aURL);

        // Perform our API submission.
        customAxios.put(aURL, decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setTagDetailSuccess(device)
            );

            // Run our success callback function.
            successCallback(device);

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960;

                let errors = camelizeKeys(responseData);

                console.log("putTagDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setTagDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (failedCallback) {
                    failedCallback(errors);
                }
            }

        }).then( () => {
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                RETRIEVE                                    //
////////////////////////////////////////////////////////////////////////////////

export function deleteTagDetail(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setTagDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_TAG_DETAIL_API_URL+id;

        customAxios.delete(aURL).then( (successResponse) => { // SUCCESS
            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setTagDetailSuccess(null)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(null);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("deleteTagDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setTagDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (onFailureCallback) {
                    onFailureCallback(errors);
                }
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                REDUX ACTIONS                               //
////////////////////////////////////////////////////////////////////////////////

export const setTagListRequest = () => ({
    type: TAG_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        offset: 0,
        errors: {}
    },
});


export const setTagListFailure = (info) => ({
    type: TAG_LIST_FAILURE,
    payload: info,
});


export const setTagListSuccess = (info) => ({
    type: TAG_LIST_SUCCESS,
    payload: info,
});


export const setTagDetailRequest = () => ({
    type: TAG_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setTagDetailSuccess = tagDetail => ({
    type: TAG_DETAIL_SUCCESS,
    payload: tagDetail,
});


export const setTagDetailFailure = tagDetail => ({
    type: TAG_DETAIL_FAILURE,
    payload: tagDetail,
});


////////////////////////////////////////////////////////////////////////////////
//                                 UTILITY                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getTagReactSelectOptions(tagList=[], selectName="tag") {
    const tagOptions = [];
    const isNotProductionsEmpty = isEmpty(tagList) === false;
    if (isNotProductionsEmpty) {
        const results = tagList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let tag = results[i];
                tagOptions.push({
                    selectName: selectName,
                    value: tag.id,
                    label: tag.text
                });
                // console.log(tag);
            }
        }
    }
    return tagOptions;
}


/**
 * Utlity function takes an array of `Tag` primary keys and the `Tags` results
 * from the API and returns the HTML dropdown selections which will be consumed
 * by the GUI powered by `react-select`.
 */
export function getPickedTagReactSelectOptions(pickedTagsArray, tagList=[], selectName="tag") {
    const tagOptions = [];
    const isAPIResponseNotEmpty = isEmpty(tagList) === false;
    const isPickedArrayNotEmpty = isEmpty(pickedTagsArray) === false;
    if (isAPIResponseNotEmpty && isPickedArrayNotEmpty) {
        const results = tagList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < pickedTagsArray.length; i++) {
                let pickedTag = pickedTagsArray[i];

                for (let j = 0; j < results.length; j++) {
                    let tag = results[j];

                    if (tag.id === pickedTag.tagId) {
                        tagOptions.push({
                            selectName: selectName,
                            value: tag.id,
                            label: tag.text,
                            tagId: tag.id,
                        });
                        // console.log(tag);
                    } // end IF

                } //end FOR

            } // end FOR

        } // end IF
    }
    return tagOptions;
}
