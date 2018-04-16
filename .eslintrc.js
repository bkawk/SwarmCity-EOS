module.exports = {
    "extends": ["eslint:recommended", "google"],
    "parser": "babel-eslint",
    "env": {
        "browser": true
    },
    "rules": {
        "brace-style": "off",
        "new-cap": ["error", { "capIsNewExceptions": ["Polymer"] }],
        "require-jsdoc": "off",
        "max-len": ["error", 100]
    },
    "globals": {
        "Polymer": true,
        "Promise": true,
        "webpack": true,
    },
    "plugins": [
        "html"
    ],
};