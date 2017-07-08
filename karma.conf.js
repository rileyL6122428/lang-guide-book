module.exports = (config) => {
    config.set({
        frameworks: ["jasmine", "karma-typescript"],
        files: [
            'node_modules/es6-shim/es6-shim.js',
            { pattern: "frontend/**/*.ts" }, // *.tsx for React Jsx
        ],
        preprocessors: {
            "**/*.ts": ["karma-typescript"], // *.tsx for React Jsx
        },
        reporters: ["progress", "karma-typescript"],
        browsers: ["Chrome"],
    });
};
