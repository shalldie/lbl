import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => {
    Object.assign(process.env, loadEnv(mode, process.cwd()));

    return {
        plugins: [dts()],

        resolve: {
            alias: {
                '~': path.join(__dirname, 'src')
            }
        },

        build: {
            lib: {
                entry: path.join(__dirname, 'src/anno.ts'),
                name: 'Anno',
                fileName: format => `my-lib.${format}.js`,
                formats: ['es', 'umd']
            }
        },

        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: [
                        //
                        `$PREFIX: ${process.env.VITE_CSS_PREFIX};`,
                        `@import "${__dirname}/src/assets/variables.scss";`
                    ].join('')
                }
            }
        }
    };
});
