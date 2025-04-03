// filepath: /home/raph/Documents/GitHub/React_Project/Worldly/.eslintrc.cjs
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime",
        "plugin:react-hooks/recommended",
    ],
    ignorePatterns: ["dist", ".eslintrc.cjs"],
    parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    settings: { react: { version: "18.2" } },
    plugins: ["react-refresh", "css-modules"], // Add 'css-modules' here
    rules: {
        "react-refresh/only-export-components": [
            "warn",
            { allowConstantExport: true },
        ],
        // 'css-modules/no-unused-class': 'warn', // Warn for unused CSS classes
        "css-modules/no-undef-class": "error", // Error for undefined CSS classes
        "react/prop-types": "off", // Disable prop-types rule globally
    },
};