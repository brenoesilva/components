require(`systemjs/dist/system.js`);

System.import(`${__webpack_public_path__}index.js`).then(function ($) {
    $.ready(function () {
        return {
            view: function () {
                return m(``, `Hello`);
            }
        };
    });
});