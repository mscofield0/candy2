import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'index.ts',
    output: [
        {
            file: 'dist/main.cjs.js',
            format: 'cjs',
            exports: 'named'
        },
        {
            file: 'dist/main.esm.js',
            format: 'esm',
            exports: 'named'
        },
        {
            file: 'dist/main.umd.js',
            format: 'umd',
            name: 'candy2',
            exports: 'named'
        },
    ],
    plugins: [
        resolve({
            customResolveOptions: {
                moduleDirectory: 'node_modules'
            },
        }),
        typescript(),
        commonjs({ extensions: ['.js', '.ts'] }),
    ]
};

