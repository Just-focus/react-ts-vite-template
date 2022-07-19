import Task from '@bigboy/mint-bridge';
import commonPlugins from '@bigboy/mint-bridge-common-plugins';
import type {PluginTypes as CommonPluginsTypes} from '@bigboy/mint-bridge-common-plugins';
import CallApp from '@bigboy/mint-callapp';

export type PluginTypes = CommonPluginsTypes;
export const totalPlugin = [...commonPlugins];
export const bridge = Task.plugin<PluginTypes>(totalPlugin);

export default bridge;

// 唤起App 设置
const options = {
	scheme: {
		protocol: 'bigboy',
	},
	universal: {
		host: 'www.bigboy.club',
		pathKey: 'url',
	},
	appstore: 'https://itunes.apple.com/cn/app/id1542958217?mt=8',
	fallback: 'https://bigboy.hupu.com/mapp/shared/download',
	timeout: 2500,
	yingyongbao: 'https://a.app.qq.com/o/simple.jsp?pkgname=com.bigboy.zao',
};
export const callApp = new CallApp(options);

// 获取客户端信息
interface LaunchOptionProps {
	cid: string; // 设备id
	client: string; // 客户端client
	token?: string; // 用户识别码
	nickname: string; // 用户昵称
	avatar: string; // 用户头像
	platform: 'Android' | 'iOS'; // 平台
	puid?: string; // 用户pid
	version: string; // 客户端版本
	statusbar_height: number; // 顶部状态栏
	status_bar_height: number;
	client_width?: number; // 安卓特有，机型宽高
	client_height?: number; // 安卓特有，机型宽高
	env: number; // 环境识别
}
export const getConfig = (): LaunchOptionProps => {
	const config = window.webview?.getLaunchOptions();

	if (typeof config === 'string') {
		return JSON.parse(config ?? '{}');
	}

	return config ?? {version: '4.0.1'};
	// return (
	// 	config ?? {
	// 		platform: 'Android',
	// 		version: '4.0.1',
	// 		token:
	// 			'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTc2MTgwNjcsInVzZXJJZCI6NTAwMTAxOX0.jbMmhfYbY_yrQxO4jiPhziGrYY8w-RKi04JVK2sjtDI',
	// 	}
	// );
};

// 检测是否登录
export const checkLoginStatus = () => {
  const {token} = getConfig();

  return new Promise(resolve => {
    if(!token) {
      bridge.openLogin();
      return;
    }
    resolve('')
  })
}

// 版本对比
export const semverCompare = (
	verionA: string,
	versionB: string,
): -1 | 0 | 1 => {
	const {isNaN} = Number;
	const splitA = verionA.split('.');
	const splitB = versionB.split('.');
	const minLength = Math.min(splitA.length, splitB.length) || 3;

	for (let i = 0; i < minLength; i++) {
		const snippetA = Number(splitA[i]);
		const snippetB = Number(splitB[i]);

		if (snippetA > snippetB) return 1;
		if (snippetB > snippetA) return -1;

		// e.g. '1.0.0-rc' -- Number('0-rc') = NaN
		if (!isNaN(snippetA) && isNaN(snippetB)) return 1;
		if (isNaN(snippetA) && !isNaN(snippetB)) return -1;
	}

	return 0;
};

// 获取高度栏
export const getStatusBar = (): number => {
	const {
		platform = null,
		statusbar_height,
		status_bar_height,
		client_height,
		version = '1.1.0',
	} = getConfig();
	if (!platform) {
		return 0;
	}
	if (platform === 'iOS') {
		return statusbar_height;
	}

	// 版本控制
	// 1.3.2 以上版本 直接取客户端给的数值
	const height =
		semverCompare(version, '1.3.2') >= 0 ? status_bar_height : statusbar_height;

	return client_height
		? Math.ceil((window.innerHeight / client_height) * height)
		: 0;
};

// 设置神策信息
export const setSensorsConfig = (
	name: string,
	info?: Record<string, any>,
): void => {
	window.sensors && window.sensors.track(name, info);
};

// 获取Url参数
export const getUrlParams = (name: string): undefined | string => {
	const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i'); //定义正则表达式
	const r = window.location.search.substr(1).match(reg);
	if (r !== null) return decodeURIComponent(r[2]);
	return undefined;
};
