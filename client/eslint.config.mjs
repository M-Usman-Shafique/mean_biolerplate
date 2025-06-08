import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import angular from "@angular-eslint/eslint-plugin";
import angularTemplate from "@angular-eslint/eslint-plugin-template";
import angularTemplateParser from "@angular-eslint/template-parser";
import { defineConfig } from "eslint/config";

export default defineConfig([
    {
        files: ["**/*.{ts,js}"],
        ignores: ["**/*.spec.ts", ".angular/**", "dist/**", "node_modules/**", "coverage/**"],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                project: ["./tsconfig.app.json", "./tsconfig.spec.json"],
                ecmaVersion: "latest",
                sourceType: "module",
            },
            globals: globals.browser,
        },
        plugins: {
            "@typescript-eslint": tseslint.plugin,
            prettier: eslintPluginPrettier,
            "@angular-eslint": angular,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...angular.configs.recommended.rules,
            ...prettierConfig.rules,
            "no-console": "warn",
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "prettier/prettier": "warn",
        },
    },
    {
        files: ["**/*.html"],
        languageOptions: {
            parser: angularTemplateParser,
        },
        plugins: {
            "@angular-eslint/template": angularTemplate,
        },
        rules: {
            ...angularTemplate.configs.recommended.rules,
        },
    },
]);
