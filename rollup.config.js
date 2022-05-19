import packageJson from './package.json';
import css from 'rollup-plugin-import-css';

export default [
    {
        input: './src/index.js',
        output: [
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            }
        ],
        plugins: [
            css(),
        ],
    },
];