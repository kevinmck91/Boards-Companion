const { src, series, dest } = require('gulp');
const jsonTransform = require('gulp-json-transform');

function copyE2eTestFiles() {
    return src("./src/**")
        .pipe(dest("dist/e2e-test/Chrome"))
        .pipe(dest("dist/e2e-test/Firefox"));
}

function copyReleaseFiles() {
    return src("./src/**")
        .pipe(dest("dist/release/Chrome"))
        .pipe(dest("dist/release/Firefox"));
}

function transformE2eManifest() {
    return src("./src/manifest.json")
        .pipe(jsonTransform(function (json, file) {
            json.content_scripts[0].matches[0] = "<all_urls>";
            json.name = "Boards Companion End-To-End Test";
            return JSON.stringify(json, null, '\t');
        }))
        .pipe(dest("dist/e2e-test/Chrome"))
        .pipe(dest("dist/e2e-test/Firefox"));
}

function transformE2eFirefoxManifest() {
    return src("dist/e2e-test/Firefox/manifest.json")
        .pipe(jsonTransform(function (json, file) {
            json.content_scripts[0].js[0] = "modules-load/Firefox/loadMain.js"
            return JSON.stringify(json, null, '\t');
        }))
        .pipe(dest("dist/e2e-test/Firefox"));
}

function transformReleaseFirefoxManifest() {
    return src("dist/release/Firefox/manifest.json")
        .pipe(jsonTransform(function (json, file) {
            json.content_scripts[0].js[0] = "modules-load/Firefox/loadMain.js"
            return JSON.stringify(json, null, '\t');
        }))
        .pipe(dest("dist/release/Firefox"));
}

exports.default = series(copyE2eTestFiles, transformE2eManifest, transformE2eFirefoxManifest, copyReleaseFiles, transformReleaseFirefoxManifest);