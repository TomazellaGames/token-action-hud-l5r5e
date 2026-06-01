import terser from '@rollup/plugin-terser'

export default {
    input: 'scripts/init.js',
    output: {
        file: 'scripts/token-action-hud-l5r5e.min.js',
        format: 'es',
        sourcemap: true,
    },
    plugins: [terser()],
}
