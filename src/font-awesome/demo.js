require(`construct-style-sheets-polyfill`);
require(`systemjs/dist/system.js`);

System.import(`${__webpack_public_path__}index.css`).then(function (callback) {
    document.adoptedStyleSheets = document.adoptedStyleSheets.concat(callback.default);
});

System.import(`${__webpack_public_path__}index.js`).then(function ($) {
    $.ready(function () {
        return {
            oninit: function () {
                fa.load(`S-Home`);
            },
            view: function () {
                return m(`svg`, m(`use`, {
                    'xlink:href': `#fas-home`
                }));
            }
        };
    });
});