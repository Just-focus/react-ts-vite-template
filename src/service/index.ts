import request from './request';

// 新人签到活动首页
export const getHomePage = <T = any>(params: {
	platform: number;
}): Promise<T> => {
	return request.get('/boxTopicSignInActivity/homePage');
};

// 签到功能
export const createDraw = <T = any>(): Promise<T> => {
	return request.post('/boxTopicSignInActivity/signIn');
};
