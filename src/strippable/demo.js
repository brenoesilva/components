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
                        strippable: true,
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

                q.push(`${__webpack_public_path__}list.js`, function (error, Component) {
                    vnode.state.components.push(new Component({
                        strippable: true,
                        data: m.stream([
                            `Alpha`,
                            `Beta`,
                            `Gamma`
                        ]),
                        render: function (item) {
                            var styles = `display:inline-block;height:1rem;margin-right:0.25rem;width:0.5rem`;

                            return m(`[style=padding:0.25rem]`, [
                                m(`svg[style=${styles}]`, [
                                    m(`use[xlink:href=#fas-check]`)
                                ]),
                                item
                            ]);
                        }
                    }));
                });

                vnode.state.components = [];
                fa.load(`S-Check`);
            },
            view: function (vnode) {
                return vnode.state.components.map(function (component) {
                    return m(component);
                });
            }
        };
    });
});