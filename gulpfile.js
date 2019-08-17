const { src, series, dest } = require('gulp');
const jsonTransform = require('gulp-json-transform');
const rollup = require('rollup-stream');
const del = require('del');
const source = require('vinyl-source-stream');

function clean(cb) {
    del('dist/e2e-test/Firefox/*');
    del('dist/e2e-test/Chrome/*')
    del('dist/release/Firefox/*');
    del('dist/release/Chrome/*')
    cb();
}

function copyChromeReleaseFiles() {
    return src("./src/**")
        .pipe(dest("dist/release/Chrome"));
}

function copyFirefoxReleaseFiles(cb) {
    rollup({
        input: './src/main.js',
        format: 'iife'
    })
        .pipe(source('bundle.js'))
        .pipe(dest('dist/release/Firefox'));

    src("./src/css/**")
        .pipe(dest("dist/release/Firefox/css"));

    src("./src/fontawesome/**")
        .pipe(dest("dist/release/Firefox/fontawesome"));

    src("./src/icons/**")
        .pipe(dest("dist/release/Firefox/icons"));

    src("./src/popup/**")
        .pipe(dest("dist/release/Firefox/popup"));

    src("./src/storage/**")
        .pipe(dest("dist/release/Firefox/storage"));

    src("./src/manifest.json")
        .pipe(dest("dist/release/Firefox"));

    cb();
}

function copyE2eTestFiles() {
    return src("./src/**")
        .pipe(dest("dist/e2e-test/Chrome"))
        .pipe(dest("dist/e2e-test/Firefox"));
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

function transformReleaseFirefoxManifest(cb) {
    src("dist/release/Firefox/manifest.json")
        .pipe(jsonTransform(function (json, file) {
            json.content_scripts[0].js[0] = "bundle.js"
            return JSON.stringify(json, null, '\t');
        }))
        .pipe(dest("dist/release/Firefox"));
    cb();
}

exports.default = series(clean, copyE2eTestFiles, transformE2eManifest, transformE2eFirefoxManifest, copyFirefoxReleaseFiles, copyChromeReleaseFiles, transformReleaseFirefoxManifest);