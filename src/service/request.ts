import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import JSEncrypt from 'jsencrypt';

import {getConfig} from '@utils/helper';

// 数据请求封装
/**
 * Construct a type with a set of properties K of type T
 * type Record<K extends keyof any, T> = {
 * 	[P in K]: T;
 * };
 */
enum IHttpMethods {
	GET = 'get',
	POST = 'post',
	DELETE = 'delete',
	PUT = 'put',
}

const methods = ['get', 'post', 'delete', 'put'];

interface IHttpFn {
	<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

type IHttp = Record<IHttpMethods, IHttpFn>;

// 加密
const cPublicCode = (cid: string | number = '657267') => {
	const encryptor = new JSEncrypt({}); // 创建加密对象实例
	//之前ssl生成的公钥，复制的时候要小心不要有空格
	const pubKey =
		'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvaqmbDgx7yne91Bai3oyLpdy6Qbhb5Uo / DhR8LcxJiiL + ji32Nk89RNv0okLfk9mhXoxS + Ijdy / ADsAzN3zEHeqex3NCMcc / pL5dO7t90M8ofZldDjvDpfW7u4klTvQDOtxHV6diFvmAWt6KOekbVqg6uiTkPn5hbac1ES3NgD152EKAJhlqohrL8ri9wZQDuLYIeQLsfBC90bk2DgkCku + 1L5PGSAroDmU0EGIYGEKUqpi0XRBmFr / Ozyqy1SRRshNTOkFlLEXwKyPgigC5LX04K17nTDa0NlE9jARIwiKju + rdK / TF6lEqeX76B6bZx5gqKKQ2ueFtJtuDInzTmwIDAQAB';
	encryptor.setPublicKey(pubKey); //设置公钥
	const key = `bigboy${cid}`;
	const rsaPassWord = encryptor.encrypt(key); // 对内容进行加密
	return encodeURIComponent(rsaPassWord);
};

// 基本设置
const configs = getConfig();
const {version = '1.0.0', token, cid} = configs;
const prefix = `/appapi/3/${version}`;

export const code = cPublicCode(cid);
export const genCid = cid;

const instance = axios.create({
	baseURL: prefix, // 默认api
	timeout: 10000, // 默认超时时间 10s
	withCredentials: true, // 带cookie
	headers: {
		// 默认携带token
		token,
		cid,
		cid_v2: code,
	},
});

// 拦截返回
instance.interceptors.response.use(
	(
		response: AxiosResponse<{
			code: string;
			errorMsg: string | undefined;
			data: any;
		}>,
	) => {
		// 当code返回SUCCESS为有效数据
		const {code, data, errorMsg} = response.data;
    // 防沉迷 --> 直接返回结果
    if(code?.includes('ANTI_ADDICTION')){
      return response.data
    }
		if (code !== 'SUCCESS') {
			return Promise.reject(errorMsg);
		}
		return data;
	},
	() => {
		return Promise.reject('请求错误');
	},
);

// 请求函数分装
const request: IHttp = methods.reduce((map: any, method: string) => {
	map[method] = (url: string, options: AxiosRequestConfig = {}) => {
		const {data, ...config} = options;

		if(method === 'get') {
			return (instance as any)[method](url, {
				...data,
				...config
			});
		}
		return (instance as any)[method](url, data, config);
	};
	return map;
}, {});

export default request;
