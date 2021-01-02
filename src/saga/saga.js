import { push } from 'connected-react-router';
import { isEmpty } from 'lodash';
import { select, take, takeLatest, takeEvery, call, put, spawn, delay, all } from 'redux-saga/effects';

import {
	GET_POSTS,
	GET_POST_DETAILS,
	SHOW_LOADER,
	HIDE_LOADER,
	SAVE_POSTS,
	SET_PAGE_NO,
	SAVE_POST_DETAILS,
	API_ERROR_RESPONSE
} from 'redux/constants';

import requests from './requests';

export function* getPosts() {
	yield takeLatest(GET_POSTS, function* fetchRecords(payload) {
		let posts = [];

		let { pageNo, limit } = payload.payload;
		console.log('pageNo', pageNo);
		console.log('limit', limit);

		try {
			window.store.dispatch({ type: SHOW_LOADER, payload: {} });
			const response = yield call(requests.getPosts, pageNo, limit);
			if ('data' in response && response.data) {
				posts = response.data.posts;
				pageNo = response.data.current_page;

				window.store.dispatch({ type: HIDE_LOADER, payload: {} });

				console.log('posts', posts);

				// save posts
				yield put({ type: SAVE_POSTS, payload: posts });

				// save page no
				yield put({ type: SET_PAGE_NO, payload: pageNo });
			}
			else {
				// window.location.href = '/error';
				window.store.dispatch(push('/error'));
				return;
			}
		} catch (error) {
			console.warn('error : ', error);
			yield put({ type: API_ERROR_RESPONSE, payload: error });
			// window.location.href = '/error';
			window.store.dispatch(push('/error'));
			return;
		}
	});
}

export function* getPostDetails() {
	yield takeLatest(GET_POST_DETAILS, function* fetchRecords(payload) {
		let currentPost = {};

		let { slug } = payload.payload;
		console.log('slug', slug);

		try {
			window.store.dispatch({ type: SHOW_LOADER, payload: {} });

			const response = yield call(requests.getPostDetails, slug);
			if ('data' in response && response.data) {
				window.store.dispatch({ type: HIDE_LOADER, payload: {} });
				currentPost = response.data.posts.shift();
				// save posts
				yield put({ type: SAVE_POST_DETAILS, payload: currentPost });
			}
			else {
				// window.location.href = '/error';
				window.store.dispatch(push('/error'));
				return;
			}
		} catch (error) {
			let errorData = error.response;
			console.log('errorData', errorData);
			window.store.dispatch({ type: API_ERROR_RESPONSE, payload: errorData });
			// window.location.href = '/error';
			window.store.dispatch(push('/error'));
			return;
		}
	});
}

export default function* rootSaga() {
	const sagas = [
		getPosts,
		getPostDetails,
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