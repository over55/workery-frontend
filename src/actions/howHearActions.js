import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize, decamelizeKeys } from 'humps';
import isEmpty from 'lodash/isEmpty';

import {
    HOW_HEAR_LIST_REQUEST, HOW_HEAR_LIST_FAILURE, HOW_HEAR_LIST_SUCCESS,
    HOW_HEAR_DETAIL_REQUEST, HOW_HEAR_DETAIL_FAILURE, HOW_HEAR_DETAIL_SUCCESS
} from '../constants/actionTypes';
import { WORKERY_HOW_HEAR_LIST_API_URL, WORKERY_HOW_HEAR_DETAIL_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


////////////////////////////////////////////////////////////////////////////////
//                                 LIST                                       //
////////////////////////////////////////////////////////////////////////////////

export function pullHowHearList(offset=0, limit=10, filtersMap=new Map(), onSuccessCallback=null, onFailureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setHowHearListRequest()
        );

        console.log(offset, limit, filtersMap, onSuccessCallback, onFailureCallback);

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = WORKERY_HOW_HEAR_LIST_API_URL+"?offset="+offset+"&limit="+limit;
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
                setHowHearListSuccess(data)
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

                console.log("pullHowHearList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setHowHearListFailure({
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

export function postHowHearDetail(postData, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setHowHearDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.post(WORKERY_HOW_HEAR_LIST_API_URL, decamelizedData).then( (successResponse) => {
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
                setHowHearDetailSuccess(device)
            );
        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("postHowHearDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setHowHearDetailFailure({
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

export function pullHowHearDetail(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setHowHearDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_HOW_HEAR_DETAIL_API_URL+id;

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            const responseData = successResponse.data;
            // console.log(successResult); // For debugging purposes.

            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            console.log("pullHowHearDetail | Success:", profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setHowHearDetailSuccess(profile)
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

                console.log("pullHowHearDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setHowHearDetailFailure({
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

export function putHowHearDetail(postData, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setHowHearDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.put(WORKERY_HOW_HEAR_DETAIL_API_URL+postData.id, decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setHowHearDetailSuccess(device)
            );

            // Run our success callback function.
            successCallback(device);

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putHowHearDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setHowHearDetailFailure({
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
//                                 DELETE                                     //
////////////////////////////////////////////////////////////////////////////////

export function deleteHowHearDetail(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setHowHearDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_HOW_HEAR_DETAIL_API_URL+id;

        customAxios.delete(aURL).then( (successResponse) => { // SUCCESS
            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setHowHearDetailSuccess(null)
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

                console.log("deleteHowHearDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setHowHearDetailFailure({
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

export const setHowHearListRequest = () => ({
    type: HOW_HEAR_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        offset: 0,
        errors: {}
    },
});


export const setHowHearListFailure = (info) => ({
    type: HOW_HEAR_LIST_FAILURE,
    payload: info,
});


export const setHowHearListSuccess = (info) => ({
    type: HOW_HEAR_LIST_SUCCESS,
    payload: info,
});


export const setHowHearDetailRequest = () => ({
    type: HOW_HEAR_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setHowHearDetailSuccess = howHearDetail => ({
    type: HOW_HEAR_DETAIL_SUCCESS,
    payload: howHearDetail,
});


export const setHowHearDetailFailure = howHearDetail => ({
    type: HOW_HEAR_DETAIL_FAILURE,
    payload: howHearDetail,
});


////////////////////////////////////////////////////////////////////////////////
//                                 UTILITY                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getHowHearReactSelectOptions(howHearList=[], selectName="howHearId") {
    const howHearOptions = [];
    const isNotProductionsEmpty = isEmpty(howHearList) === false;
    if (isNotProductionsEmpty) {
        const results = howHearList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let howHear = results[i];
                howHearOptions.push({
                    selectName: selectName,
                    value: howHear.id,
                    label: howHear.text,
                    howHearId: howHear.id,
                });
                // console.log(howHear);
            }
        }
    }
    return howHearOptions;
}
