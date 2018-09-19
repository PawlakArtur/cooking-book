module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "extends": [
        "plugin:react/recommended",
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "indent": [
            "error",
            "tab"
        ],
        "linebreak-style": [
            "error",
            "windows"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "warn"
        ],
        "no-extra-boolean-cast": [
            "error"
        ],
        "no-extra-parens": [
            "warn",
            "functions"
        ],
        "no-extra-semi": [
            "warn"
        ],
        "no-irregular-whitespace": [
            "warn"
        ],
        "no-template-curly-in-string": [
            "warn"
        ],
        "no-unreachable": [
            "warn"
        ],
        "valid-typeof": [
            "warn"
        ],
        "array-callback-return": [
            "warn"
        ],
        "block-scoped-var": [
            "warn"
        ],
        "class-methods-use-this": [
            "warn"
        ],
        "consistent-return": [
            "error"
        ],
        "curly": [
            "error",
            "all"
        ],
        "dot-location": [
            "error",
            "property"
        ],
        "eqeqeq": [
            "error"
        ],
        "no-alert": [
            "error"
        ],
        "no-else-return": [
            "error"
        ],
        "no-eq-null": [
            "error"
        ],
        "no-eval": [
            "error"
        ],
        "no-extra-bind": [
            "warn"
        ],
        "no-implied-eval": [
            "error"
        ],
        "no-invalid-this": [
            "error"
        ],
        "no-labels": [
            "warn"
        ],
        "no-lone-blocks": [
            "warn"
        ],
        "no-loop-func": [
            "warn"
        ],
        "no-multi-spaces": [
            "error"
        ],
        "no-new": [
            "warn"
        ],
        "no-new-func": [
            "warn"
        ],
        "no-new-wrappers": [
            "warn"
        ],
        "no-param-reassign": [
            "warn"
        ],
        "no-proto": [
            "warn"
        ],
        "no-redeclare": [
            "error"
        ],
        "no-return-assign": [
            "warn"
        ],
        "no-self-compare": [
            "error"
        ],
        "no-sequences": [
            "error"
        ],
        "no-throw-literal": [
            "error"
        ],
        "no-unmodified-loop-condition": [
            "warn"
        ],
        "no-useless-call": [
            "warn"
        ],
        "no-useless-concat": [
            "warn"
        ],
        "no-useless-return": [
            "warn"
        ],
        "no-void": [
            "error"
        ],
        "no-shadow": [
            "error"
        ],
        "no-undef": [
            "error"
        ],
        "no-undef-init": [
            "error"
        ],
        "no-undefined": [
            "warn"
        ],
        "no-unused-vars": [
            "warn"
        ],
        "no-use-before-define": [
            "error"
        ],
        "global-require": [
            "warn"
        ],
        "block-spacing": [
            "warn"
        ],
        "brace-style": [
            "warn",
            "1tbs"
        ],
        "comma-spacing": [
            "warn"
        ],
        "consistent-this": [
            "warn",
            "self"
        ],
        "eol-last": [
            "warn"
        ],
        "func-call-spacing": [
            "warn"
        ],
        "jsx-quotes": [
            "warn",
            "prefer-double"
        ],
        "key-spacing": [
            "warn"
        ],
        "keyword-spacing": [
            "warn"
        ],
        "line-comment-position": [
            "error"
        ],
        "no-lonely-if": [
            "error"
        ],
        "no-mixed-operators": [
            "warn"
        ],
        "no-mixed-spaces-and-tabs": [
            "error"
        ],
        "no-multi-assign": [
            "warn"
        ],
        "no-multiple-empty-lines": [
            "warn",
            {
                "max": 1
            }
        ],
        "no-negated-condition": [
            "warn"
        ],
        "no-nested-ternary": [
            "warn"
        ],
        "no-trailing-spaces": [
            "error"
        ],
        "no-unneeded-ternary": [
            "warn"
        ],
        "no-whitespace-before-property": [
            "warn"
        ],
        "object-curly-newline": [
            "warn",
            {
                "ObjectExpression": {
                    "multiline": true,
                    "minProperties": 4,
                    "consistent": true
              },
              "ObjectPattern": "never"
            }
        ],
        "object-curly-spacing": [
            "warn",
            "always",
            {
                "arraysInObjects": false,
                "objectsInObjects": false
            }
        ],
        "one-var": [
            "warn",
            "never"
        ],
        "operator-linebreak": [
            "warn",
            "before"
        ],
        "padded-blocks": [
            "error",
            "never"
        ],
        "quote-props": [
            "warn",
            "consistent-as-needed"
        ],
        "quotes": [
            "error",
            "single",
            {
                "avoidEscape": true,
                "allowTemplateLiterals": true
            }
        ],
        "semi": [
            "error"
        ],
        "semi-spacing": [
            "error"
        ],
        "semi-style": [
            "error"
        ],
        "space-before-blocks": [
            "warn"
        ],
        "space-before-function-paren": [
            "warn",
            {
                "anonymous": "always",
                "named": "never",
                "asyncArrow": "always"
            }
        ],
        "space-in-parens": [
            "warn",
            "never"
        ],
        "space-infix-ops": "warn",
        "space-unary-ops": [
            "warn",
            {
                "words": true,
                "nonwords": false,
                "overrides": {
                    "typeof": false
                }
            }
        ],
        "spaced-comment": [
            "warn",
            "always",
            {
                "exceptions": [
                    "-",
                    "+",
                    "/"
                ]
            }
        ],
        "switch-colon-spacing": "warn",
        "arrow-body-style": "warn",
        "arrow-parens": [
            "warn",
            "as-needed"
        ],
        "arrow-spacing": "warn",
        "no-duplicate-imports": "warn",
        "no-useless-constructor": "warn",
        "react/no-deprecated": "warn",
        "react/no-string-refs": "warn",
        "react/prop-types": "warn",
        "react/jsx-key": "warn",
        "react/jsx-no-duplicate-props": "warn",
        "react/jsx-no-undef": "warn",
        "react/jsx-uses-vars": "warn",
        "react/no-direct-mutation-state": "warn",
        "react/no-unescaped-entities": "warn",
        "react/no-unknown-property": "warn",
        "react/require-render-return": "warn"
    }
};