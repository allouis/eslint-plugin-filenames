/**
 * @fileoverview Rule to ensure that filenames match the exports of the file
 * @author Stefan Lau
 */

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

var path = require('path'),
    parseFilename = require('../common/parseFilename'),
    isIgnoredFilename = require('../common/isIgnoredFilename'),
    getExportedName = require('../common/getExportedName'),
    getExportedClass = require('../common/getExportedClass');

module.exports = function(context) {
    return {
        "Program": function (node) {
            var filename = context.getFilename(),
                absoluteFilename = path.resolve(filename),
                parsed = parseFilename(absoluteFilename),
                shouldIgnore = isIgnoredFilename(filename),

                exportedName = getExportedName(node, context.options),
                exportedClass = getExportedClass(node, context),

                expectedExport = parsed.name,
                matchesExported = expectedExport === exportedName;
            
            if (shouldIgnore) return;

            if (!matchesExported && exportedClass) {
                context.report(node, "Filename '{{name}}' does not match exported class '{{exportName}}'.", {
                    name: parsed.name + parsed.ext,
                    exportName: exportedName,
                    extension: parsed.ext
                });
            }
        }
    }
};

module.exports.schema = [];
