import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
    {
        ignores: ["node_modules/**", "dist/**", "coverage/**"],
    },
    {
        files: ["**/*.js"],
        ignores: ["**/*.spec.js"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: globals.node,
        },
        plugins: {
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...eslintConfigPrettier.rules,
            "prettier/prettier": "warn",
            "no-console": "warn",
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        },
    },
]);
