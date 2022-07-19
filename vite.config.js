/*
 * @Author: alex_chen
 * @Date: 2022-04-08 16:28:14
 * @LastEditors: alex_chen
 * @LastEditTime: 2022-04-27 08:48:23
 * @Description: vite 配置
 */
import path from 'path';
import { defineConfig } from "vite";
import reactRefresh from '@vitejs/plugin-react-refresh';
import { viteMockServe } from 'vite-plugin-mock';
import vitePluginImp from 'vite-plugin-imp';
import ip from 'ip';

const devServerHost = ip.address() ?? '127.0.0.1';

export default defineConfig(({ command }) => {
  return {
    root: 'src',
    plugins: [
      reactRefresh(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: process.env.mock === 'true' && command === 'serve',
      }),
      vitePluginImp(

        {
          libList:[
            {
              libName:'@bigboy/movie-component-lazyimage',
              style(){
                return`@bigboy/movie-component-lazyimage/es/index.css`
              }
            },
            {
              libName:'@bigboy/bigboy-component-toast',
              style(){
                return`@bigboy/bigboy-component-toast/es/index.css`
              }
            },
            {
              libName:'@bigboy/movie-component-popup',
              style(){
                return`@bigboy/movie-component-popup/es/index.css`
              }
            },
            {
              libName:'@bigboy/bigboy-component-navbar',
              style(){
                return`@bigboy/bigboy-component-navbar/es/index.css`
              }
            },
            {
              libName:'@bigboy/movie-component-list',
              style(){
                return`@bigboy/movie-component-list/es/index.css`
              }
            },
            {
              libName:'@bigboy/bigboy-component-switch',
              style(){
                return`@bigboy/bigboy-component-switch/es/index.css`
              }
            }
          ]
        }
      )
    ],
    resolve: {
      alias: {
        '@': path.join(process.cwd(), 'src'),
        '@src': path.join(process.cwd(), 'src'),
        '@pages': path.join(process.cwd(), 'src/pages'),
        '@images': path.join(process.cwd(), 'src/images'),
        '@styles': path.join(process.cwd(), 'src/styles'),
        '@components': path.join(process.cwd(), 'src/components'),
        '@service': path.join(process.cwd(), 'src/service'),
        '@utils': path.join(process.cwd(), 'src/utils'),
        '@reducer': path.join(process.cwd(), 'src/reducer'),
        '@hooks': path.join(process.cwd(), 'src/hooks')
      }
    },
    server: {
      proxy:
        process.env.noproxy === 'true'
          ? false
          : {
              '/appapi': {
                target: 'http://activity-bigboy-stg.bigboy.club/',
                changeOrigin: true,
              },
            },
      host: devServerHost
    },
  };
});
