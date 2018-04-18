module.exports = {
    staticFileGlobs: [
    'manifest.json',
    'src/**/*',
    ],
    runtimeCaching: [
    {
        urlPattern: /\/@webcomponents\/webcomponentsjs\//,
        handler: 'fastest'
    }
    ],
};