import axios from 'axios';

// 获取微信配置
export const getWxConfig = <T = any>(params: {href: string}): Promise<T> => {
	return axios.get(`//bigboy.hupu.com/service/getWeChatSignature`, {
		params,
	});
};
