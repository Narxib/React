module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es2021": true,
        "root":true
    },
    "extends": [
        "standard-with-typescript",
        "plugin:react/recommended",
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        "eslint:recommended"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": ['*.ts', '*.tsx',"*.ts"],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "project": ['./tsconfig.eslint.json'],
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "@typescritp-eslint/explicit-function-return-type":"off",
        "react/react-in-jsx-scope":"off"
    }
}
