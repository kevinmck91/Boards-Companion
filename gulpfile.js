const { src, series, dest } = require('gulp');
const jsonTransform = require('gulp-json-transform');
const rollup = require('rollup-stream');
const del = require('del');
const source = require('vinyl-source-stream');

function clean() {
    return Promise.all([
        del('dist/e2e-test/Firefox/*'),
        del('dist/e2e-test/Chrome/*'),
        del('dist/release/Firefox/*'),
        del('dist/release/Chrome/*')
    ]);
}

function copyChromeFiles(destinationFolder) {
    return copyGlob("./src/**", destinationFolder);
}

function rollupFirefoxMain(destinationFolder) {
    return rollup({
        input: './src/main.js',
        format: 'iife'
    })
        .pipe(source('bundle.js'))
        .pipe(dest(destinationFolder));
}

function copyGlob(glob, destinationFolder) {
    return new Promise(function (resolve, reject) {
        src(glob)
            .pipe(dest(destinationFolder).on('end', resolve))
    });
}

function copyFirefoxFiles(destinationFolder) {
    return Promise.all([
        rollupFirefoxMain(destinationFolder),
        copyGlob("./src/css/**", destinationFolder + "/css"),
        copyGlob("./src/fontawesome/**", destinationFolder + "/fontawesome"),
        copyGlob("./src/icons/**", destinationFolder + "/icons"),
        copyGlob("./src/popup/**", destinationFolder + "/popup"),
        copyGlob("./src/storage/**", destinationFolder + "/storage"),
        copyGlob("./src/manifest.json", destinationFolder),
        copyGlob("./src/ApplicationSettings.js", destinationFolder)
    ]);
}

function copyE2eFiles() {
    return Promise.all([
        copyChromeFiles("dist/e2e-test/Chrome"),
        copyFirefoxFiles('dist/e2e-test/Firefox/')
    ]);
}

function copyReleaseFiles() {
    return Promise.all([
        copyChromeFiles("dist/release/Chrome"),
        copyFirefoxFiles('dist/release/Firefox')
    ]);
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

function transformE2eFirefoxManifest(cb) {
    return transformFirefoxManifest("dist/e2e-test/Firefox");
}

function transformReleaseFirefoxManifest(cb) {
    return transformFirefoxManifest("dist/release/Firefox");
}

function transformFirefoxManifest(manifestFolder) {
    return src(manifestFolder + "/manifest.json")
        .pipe(jsonTransform(function (json, file) {
            json.content_scripts[0].js[0] = "bundle.js";
            json.browser_specific_settings = {
                "gecko": {
                    "id": "{87846437-1077-4212-abfb-433482c7a63f}"
                }
            };
            json.content_scripts[0].js[2] = "fontawesome/firefox-fix.js";
            return JSON.stringify(json, null, '\t');
        }))
        .pipe(dest(manifestFolder));
}

exports.default = series(
    clean,
    copyE2eFiles,
    transformE2eManifest,
    transformE2eFirefoxManifest,
    copyReleaseFiles,
    transformReleaseFirefoxManifest
);