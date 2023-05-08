var exportedRule = require("../../lib/rules/match-exported-class"),
    RuleTester = require("eslint").RuleTester;

var exportedJsxClassCode = "module.exports = class Foo { render() { return <span>Test Class</span>; } };",
    exportedClassCode = "module.exports = class Foo {};",
    exportedJsxFunctionCode = "module.exports = function foo() { return <span>Test Fn</span> };",
    exportedEs6ClassCode = "export default class Foo {};",
    exportedEs6ClassNotDefaultCode = "export class Foo {};",
    exportedNotDefaultCode = "export const Foo = 5",
    exportedEs6ClassExpression = "export default Foo = class {};",
    exportedEs6JsxClassCode = "export default class Foo { render() { return <span>Test Class</span>; } };",
    exportedEs6Variable = "export default Foo = 'blah'", 
    exportedClassFromVariable = "class Foo {}; module.exports = Foo",
    exportedFunctionFromVariable = "function Foo () {}; module.exports = Foo",
    exportedOutOfScopeVariable = "function Foo () {}; module.exports = Bar",
    ruleTester = new RuleTester();

ruleTester.run("lib/rules/match-exported-class", exportedRule, {
    valid: [
        {
            code: exportedClassCode,
            filename: "/some/dir/Foo.js",
            parserOptions: { ecmaVersion: 6, sourceType: 'module' }
        },
        {
            code: exportedClassFromVariable,
            filename: "/some/dir/Foo.js",
            parserOptions: { ecmaVersion: 6, sourceType: 'module' }
        },
        {
            code: exportedOutOfScopeVariable,
            filename: "/some/dir/Foo.js",
            parserOptions: { ecmaVersion: 6, sourceType: 'module' }
        },
        {
            code: exportedFunctionFromVariable,
            filename: "/some/dir/blah.js",
            parserOptions: { ecmaVersion: 6, sourceType: 'module' }
        },
        {
            code: exportedEs6Variable,
            filename: "/some/dir/doesn-tMAttER.js",
            parserOptions: { ecmaVersion: 6, sourceType: 'module' }
        },
        {
            code: exportedEs6ClassExpression,
            filename: "/some/dir/Foo.js",
            parserOptions: { ecmaVersion: 6, sourceType: 'module'}
        },
        {
            code: exportedJsxClassCode,
            filename: "/some/dir/Foo.js",
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { jsx: true } }
        },
        {
            code: exportedEs6ClassNotDefaultCode,
            filename: "/some/dir/Foo.js",
            parserOptions: { ecmaVersion: 6, sourceType: 'module' }
        },
        {
            code: exportedNotDefaultCode,
            filename: "/some/dir/foo.js",
            parserOptions: { ecmaVersion: 6, sourceType: 'module' }
        },
        {
            code: exportedJsxFunctionCode,
            filename: "/some/dir/foo.js",
            parserOptions: { ecmaFeatures: { jsx: true } }
        },
        {
            code: exportedEs6ClassCode,
            filename: "/some/dir/Foo.js",
            parserOptions: { ecmaVersion: 6, sourceType: "module" }
        },
        {
            code: exportedEs6JsxClassCode,
            filename: "/some/dir/Foo.js",
            parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { jsx: true } }
        },
        {
            code: exportedEs6JsxClassCode,
            filename: "<input>",
            parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { jsx: true } }
        }
    ],

    invalid: [
        {
            code: exportedClassCode,
            filename: "/some/dir/foo-class.js",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Filename 'foo-class.js' does not match exported class 'Foo'."
            }]
        },
        {
            code: exportedEs6ClassNotDefaultCode,
            filename: "/some/dir/foo.js",
            parserOptions: { ecmaVersion: 6, sourceType: 'module' },
            errors: [{
                message: "Filename 'foo.js' does not match exported class 'Foo'."
            }]
        },
        {
            code: exportedJsxClassCode,
            filename: "/some/dir/foo.js",
            parserOptions: { ecmaVersion: 6, ecmaFeatures: { jsx: true } },
            errors: [{
                message: "Filename 'foo.js' does not match exported class 'Foo'."
            }]

        },
        {
            code: exportedEs6ClassCode,
            filename: "/some/Foo/index.js",
            parserOptions: { ecmaVersion: 6, sourceType: "module" },
            errors: [{
                message: "Filename 'index.js' does not match exported class 'Foo'."
            }]

        },
        {
            code: exportedEs6JsxClassCode,
            filename: "/some/Foo/main.js",
            parserOptions: { ecmaVersion: 6, sourceType: "module", ecmaFeatures: { jsx: true } },
            errors: [{
                message: "Filename 'main.js' does not match exported class 'Foo'."
            }]

        },
        {
            code: exportedClassFromVariable,
            filename: "/some/dir/main.js",
            parserOptions: { ecmaVersion: 6, sourceType: 'module' },
            errors: [{
                message: "Filename 'main.js' does not match exported class 'Foo'."
            }]
        }
    ]
});
