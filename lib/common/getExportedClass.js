module.exports = function getExportedClass(programNode, context) {
    var namedExportClasses = [];
    for (var i = 0; i < programNode.body.length; i += 1) {
        var node = programNode.body[i];

        // export default ...
        if (node.type === "ExportDefaultDeclaration") {
            if (node.declaration.type === 'ClassDeclaration' || node.declaration.type === 'ClassExpression') {
                return node.declaration;
            }
        }

        if (node.type === "ExportNamedDeclaration") {
            if (node.declaration.type === 'ClassDeclaration') {
                namedExportClasses.push(node.declaration);
            }
        }

        // module.exports = ...
        if (node.type === "ExpressionStatement" &&
            node.expression.type === "AssignmentExpression" &&
            node.expression.left.type === "MemberExpression" &&
            node.expression.left.object.type === "Identifier" &&
            node.expression.left.object.name === "module" &&
            node.expression.left.property.type === "Identifier" &&
            node.expression.left.property.name === "exports"
        ) {
            if (node.expression.right.type === 'ClassDeclaration' || node.expression.right.type === 'ClassExpression') {
                return node.expression.right;
            }
            if (node.expression.right.type === 'Identifier') {
                var scope = context.getScope();
                for (var j = 0; j < scope.childScopes.length; j += 1) {
                    var childScope = scope.childScopes[j];
                    if (childScope.set.get(node.expression.right.name)) {
                        var variable = childScope.set.get(node.expression.right.name);
                        if (variable.defs[0].node.type === 'ClassDeclaration' || variable.defs[0].node.type === 'ClassExpression') {
                            return variable.defs[0].node;
                        }
                    }
                }
            }
        }
    }
    if (namedExportClasses.length === 1) {
        return namedExportClasses[0];
    }
};
