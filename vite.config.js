import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import ViteCompression from 'vite-plugin-compression';
import ViteComponents from 'unplugin-vue-components/vite';
import {AntDesignVueResolver} from 'unplugin-vue-components/resolvers';
import {resolve} from 'path';

export default defineConfig(({command}) => {
    const isBuild = command === 'build';
    return {
        resolve: {
            alias: {
                '@/': resolve(__dirname, 'src') + '/',
                'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
            }
        },
        plugins: [
            vue(),
            // 组件按需引入
            ViteComponents({
                dts: false,
                resolvers: [
                    AntDesignVueResolver({
                        importStyle: 'less'
                    })
                ]
            }),
            // gzip 压缩
            ViteCompression({
                disable: !isBuild,
                threshold: 10240,
                algorithm: 'gzip',
                ext: '.gz'
            }),
            // 兼容低版本浏览器
            legacy({
                targets: ['Chrome 63'],
                modernPolyfills: true
            })
        ],
        css: {
            preprocessorOptions: {
                less: {
                    javascriptEnabled: true
                }
            }
        },
        optimizeDeps: {
            include: [
                'ant-design-vue',
                'ant-design-vue/es',
                '@ant-design/icons-vue',
                'dayjs'
            ]
        },
        build: {
            target: 'chrome63'
        }
    }
});