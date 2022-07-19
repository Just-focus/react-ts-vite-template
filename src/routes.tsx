import React, {ReactNode} from 'react';
import Home from '@pages/home';


export interface IRoute {
	// 路由路径
	path: string;
	// 路由对应的组件
	component?: ReactNode;
	// 是否精确匹配
	exact?: boolean;
	// 启用懒加载的fallback
	fallback?: NonNullable<ReactNode> | null;
	// 嵌套路由
	routes?: IRoute[];
	// 重定向路径
	redirect?: string;
}

const routes: IRoute[] = [
	{
		path: '/signin/home', // 开奖首页
		exact: true,
		component: <Home />,
	},
];

export default routes;
