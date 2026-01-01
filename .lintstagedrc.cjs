const eslintCommand = "eslint --fix --max-warnings=0";
const prettierCommand = "prettier --write";
const typeCheckCommand = () => "tsc --noEmit";
const testCommand = () => "npm run test:unit";

module.exports = {
    "*.{js,jsx,ts,tsx}": [
        eslintCommand,
        prettierCommand,
        typeCheckCommand,
        testCommand,
    ],
    "*.{css,json,md}": [prettierCommand],
};