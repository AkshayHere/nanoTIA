// This file contains the sagas used for async actions in our app. It's divided into
// "effects" that the sagas call (`fetch` ) and the actual sagas themselves,
// which listen for actions.

// Sagas help us gather all our side effects (network requests in this case) in one place

//import {browserHistory} from 'react-router'
import { select, take, call, put, spawn, delay, all, fork } from 'redux-saga/effects';
import serverRequest from './serverRequest';

// import moment from 'moment';
import { isEmpty, cloneDeep } from 'lodash';

import {
	/*
    COMMON APP ACTIONS
    */
	API,
	API_SAVE_RESPONSE,
	UPDATE_COMMON_VALUES,
	ADD_NOTIFICATION,

	//UI Effects
    SHOW_PAGE_LOADER,
	HIDE_PAGE_LOADER,
	
	MY_PROFILE

} from 'redux/constants';

// import NotificationPayLoad from 'components/NotificationPayload'


/*
 * Selector. The query depends by the state shape
 */
export const getBearerToken = (state) => state.common.token;
//export const getSteps = (state) => state.steps;

function* executeAPICall(url, data, identifier,method){
	let uniqueIdentifier = identifier;
		if (isEmpty(uniqueIdentifier)) {
			// uniqueIdentifier = moment().valueOf();
		}

		//we save the request to store
		let saveApiPayload = {
			[uniqueIdentifier]: {
				request: cloneDeep(data),
				response: {},
				axioError: false
			}
		}

		let config = {};
		
		//using browser cookie httponly credentials
		let token = null; // yield select(getBearerToken);

		//show the page loader
        yield put({ type: SHOW_PAGE_LOADER })

		const { status, ...response } = yield call(serverRequest.api, url, data, config, token, method);

		const responseData = "data" in response && response.data ? response.data : null;
		// console.log('responseData here : ', responseData);


		if (status !== 200) {
			//not http status 200
			saveApiPayload[uniqueIdentifier].axioError = true;

		} else {
			if (responseData && 'success' in responseData && responseData.success) {
				// successful scenario
				if (responseData.success === 'ok') {

				} else if (responseData.success === 'error') {
					console.warn('this error happened!');
					if ('errors' in responseData && responseData.errors.length) {
                        for (var i = 0; i < responseData.errors.length; i++) {
                            // let notification = new NotificationPayLoad(responseData.errors[i].message, 'error');
                            // window.store.dispatch({ type: ADD_NOTIFICATION, notification: notification });
                        }
                    }
    
                    if ('error' in responseData && responseData.error) {
                        // let notificationText = new NotificationPayLoad(responseData.error, 'error');
                        // window.store.dispatch({ type: ADD_NOTIFICATION, notification: notificationText });
                    } 
				}
			} else {
				saveApiPayload[uniqueIdentifier].axioError = true;
			}
		}

		//we save the response to store
		saveApiPayload[uniqueIdentifier].response = cloneDeep(responseData);

		yield put({ type: API_SAVE_RESPONSE, payload: saveApiPayload })

		//hide the page loader        
        yield put({ type: HIDE_PAGE_LOADER })
}

// send request to api
export function* apiFlow() {
	while (true) {
		const request = yield take(API);

		const { url, data, identifier,method } = request.payload;

		yield fork(executeAPICall, url, data, identifier,method)


	}
}

//retrieve profile
export function* retrieveProfileFlow() {
	while (true) {
		const request = yield take(MY_PROFILE);

		//const { token } = request.payload;
		const url = process.env.REACT_APP_PAS2_URL +"int/account/myProfile";
		window.store.dispatch({
			type: API, payload: {
				identifier: "getmyprofile",
				method: "get",
				url: url
			}
		});

	}
}

//retrieve profile
export function* retrieveProfileCompleteFlow() {
	while (true) {
		const { payload } = yield take(API_SAVE_RESPONSE);
		const { getmyprofile } = payload;

		if (!isEmpty(getmyprofile)) {
			//received response from server
			const { response } = getmyprofile;

			if (!isEmpty(response)) {
				//we got ther response
				const { profile, success } = response;

				if (!isEmpty(success) && success === 'ok' && !isEmpty(profile)) {
					//save the profile
					window.store.dispatch({
						type: UPDATE_COMMON_VALUES,
						payload: {
							profile: profile
						}
					})
				}

			}

		}




	}
}

//https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/RootSaga.md
export default function* root() {
	const sagas = [
		apiFlow,
		retrieveProfileFlow,
		retrieveProfileCompleteFlow
	];

	yield all(
		sagas.map((saga) =>
			spawn(function* () {
				while (true) {
					try {
						yield call(saga);
						break;
					} catch (e) {
						yield delay(1000); // Avoid infinite failures blocking app TODO use backoff retry policy...
					}
				}
			})
		)
	);
}
