import { select, take, takeLatest, takeEvery, call, put, spawn, delay, all } from 'redux-saga/effects';

import {
	GET_POSTS,
	GET_POST_DETAILS,
	SHOW_LOADER,
	HIDE_LOADER,
	SAVE_POSTS,
	SET_PAGE_NO,
} from 'redux/constants';

import requests from './requests';

export function* getPosts() {
	yield takeLatest(GET_POSTS, function* fetchRecords() {
		let posts = [];
		let pageNo = '';

		try {
			window.store.dispatch({ type: SHOW_LOADER, payload: {} });
			const response = yield call(requests.getPosts);
			posts = response.data.posts;
			pageNo = response.data.current_page;

			window.store.dispatch({ type: HIDE_LOADER, payload: {} });

			// save posts
			yield put({ type: SAVE_POSTS, payload: posts });

			// save page no
			yield put({ type: SET_PAGE_NO, payload: pageNo });
		} catch (error) {
			console.warn('error : ', error);
			return;
		}
	});
}

export function* getPostDetails() {
	yield takeLatest(GET_POST_DETAILS, function* fetchRecords() {
		let posts = [];
		let pageNo = '';

		try {
			window.store.dispatch({ type: SHOW_LOADER, payload: {} });
			const response = yield call(requests.getPostDetails);
			posts = response.data.posts;
			pageNo = response.data.current_page;

			window.store.dispatch({ type: HIDE_LOADER, payload: {} });

			// save posts
			yield put({ type: SAVE_POSTS, payload: posts });

			// save posts
			yield put({ type: SET_PAGE_NO, payload: pageNo });
		} catch (error) {
			console.warn('error : ', error);
			return;
		}
	});
}

export default function* rootSaga() {
	const sagas = [
		getPosts
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