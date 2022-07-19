import {Dispatch, useReducer} from 'react';

export type StateType<T = any> = {
	loading: boolean;
	error?: string;
	info?: T;
};
export type ActionType = {
	type: 'FETCH_SUCCESS' | 'FETCH_ERROR' | 'FETCH_INIT';
	payload?: any;
};

// 初始请求
const initialState = {
	loading: true,
	error: undefined,
	info: undefined,
};
// 初始动作
const RequestReducer: <T>(
	state: StateType<T>,
	action: ActionType,
) => StateType<T> = (state, action) => {
	switch (action.type) {
		case 'FETCH_INIT':
			return {
				...state,
				loading: true,
				error: undefined,
				info: undefined,
			};
		case 'FETCH_SUCCESS':
			return {
				...state,
				loading: false,
				error: undefined,
				info: action.payload,
			};
		case 'FETCH_ERROR':
			return {
				...state,
				loading: false,
				error: (action.payload as any) ?? '暂无数据',
			};
		default:
			return state;
	}
};

export function useRequestReducer<T>(): [StateType<T>, Dispatch<ActionType>] {
	return useReducer<(state: StateType<T>, action: ActionType) => StateType<T>>(
		RequestReducer,
		initialState,
	);
}
