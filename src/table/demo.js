require(`systemjs/dist/system.js`);

System.import(`${__webpack_public_path__}index.css`).then(function (callback) {
    document.adoptedStyleSheets = document.adoptedStyleSheets.concat(callback.default);
});

System.import(`${__webpack_public_path__}index.js`).then(function ($) {
    $.ready(function () {
        return {
            oninit: function (vnode) {
                q.push(`${__webpack_public_path__}table.js`, function (error, Component) {
                    vnode.state.components.push(new Component({
                        data: m.stream([{
                            first: `Mark`,
                            last: `Otto`,
                            handle: `@mdo`,
                            link: `/mdo`
                        }, {
                            first: `Jacob`,
                            last: `Thornton`,
                            handle: `@fat`,
                            link: `/fat`
                        }, {
                            first: `Larry`,
                            last: `the Bird`,
                            handle: `@twitter`,
                            link: `/twitter`
                        }]),
                        cols: [{
                            name: `first`
                        }, {
                            name: `last`
                        }, {
                            name: `handle`,
                            render: function (row) {
                                return m(`a`, {
                                    href: `https://twitter.com${row.link}`,
                                    target: `_blank`
                                }, row.handle);
                            }
                        }]
                    }));
                });

                vnode.state.components = [];
            },
            view: function (vnode) {
                return vnode.state.components.map(function (component) {
                    return m(component);
                });
            }
        };
    });
});