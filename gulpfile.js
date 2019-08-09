const { src, series, dest } = require('gulp');
const jsonTransform = require('gulp-json-transform');

function copyE2eTestFiles() {
    return src("./src/*")
        .pipe(dest("dist/e2e-test"));
}

function transformE2eManifest() {
    return src("./src/manifest.json")
        .pipe(jsonTransform(function (json, file) {
            json.content_scripts[0].matches = "<all_urls>";
            return JSON.stringify(json, null, '\t');
        }))
        .pipe(dest("dist/e2e-test"));
}

function copyReleaseFiles() {
    return src("./src/*")
        .pipe(dest("dist/release"));
}

exports.default = series(copyE2eTestFiles, transformE2eManifest, copyReleaseFiles);