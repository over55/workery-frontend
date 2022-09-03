import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize } from 'humps';
import isEmpty from 'lodash/isEmpty';

import {
    ARCHIVED_CLIENT_LIST_REQUEST,
    ARCHIVED_CLIENT_LIST_FAILURE,
    ARCHIVED_CLIENT_LIST_SUCCESS
} from '../constants/actionTypes';
import { WORKERY_ARCHIVED_CLIENT_LIST_API_URL } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getDeactivatedClientReactSelectOptions(deactivatedClientList=[], selectName="deactivatedClient") {
    const deactivatedClientOptions = [];
    const isNotProductionsEmpty = isEmpty(deactivatedClientList) === false;
    if (isNotProductionsEmpty) {
        const results = deactivatedClientList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let deactivatedClient = results[i];
                deactivatedClientOptions.push({
                    selectName: selectName,
                    value: deactivatedClient.slug,
                    label: deactivatedClient.name
                });
                // console.log(deactivatedClient);
            }
        }
    }
    return deactivatedClientOptions;
}


export const setDeactivatedClientListRequest = () => ({
    type: ARCHIVED_CLIENT_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        offset: 0,
        errors: {}
    },
});


export const setDeactivatedClientListFailure = (info) => ({
    type: ARCHIVED_CLIENT_LIST_FAILURE,
    payload: info,
});


export const setDeactivatedClientListSuccess = (info) => ({
    type: ARCHIVED_CLIENT_LIST_SUCCESS,
    payload: info,
});


/**
 *  Function will pull the ``instrument`` API endpoint and override our
 *  global application state for the 'dashboard'.
 */
export function pullDeactivatedClientList(offset=0, limit=10, filtersMap=new Map(), onSuccessCallback=null, onFailureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setDeactivatedClientListRequest()
        );

        console.log(offset, limit, filtersMap, onSuccessCallback, onFailureCallback);

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = WORKERY_ARCHIVED_CLIENT_LIST_API_URL+"?offset="+offset+"&limit="+limit;
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
                setDeactivatedClientListSuccess(data)
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

                console.log("pullDeactivatedClientList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setDeactivatedClientListFailure({
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
