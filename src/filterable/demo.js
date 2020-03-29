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
                        filterable: true,
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
                            selectable: `multiple`,
                            compare: 'includes',
                            name: `first`,
                            filter: function (attrs) {
                                return function () {
                                    var component = m.stream(``);

                                    Component.strategize(`${__webpack_public_path__}list.js`, {
                                        data: m.stream(_.map(attrs.data(), 'first')),
                                        filterable: attrs.filterable,
                                        selectable: attrs.selectable,
                                        selected: attrs.selected,
                                        render: function (item) {
                                            var styles = `display:inline-block;height:1rem;margin-right:0.25rem;width:0.5rem`;

                                            return m(`[style=padding:0.25rem]`, [
                                                m(`svg[style=${styles}]`, [
                                                    m(`use[xlink:href=#fas-check]`)
                                                ]),
                                                item
                                            ]);
                                        }
                                    }).then(component);

                                    return component;
                                };
                            }
                        }, {
                            selectable: `multiple`,
                            compare: 'includes',
                            name: `last`,
                            filter: function (attrs) {
                                return function () {
                                    var component = m.stream(``);

                                    Component.strategize(`${__webpack_public_path__}list.js`, {
                                        data: m.stream(_.map(attrs.data(), 'last')),
                                        filterable: attrs.filterable,
                                        selectable: attrs.selectable,
                                        selected: attrs.selected,
                                        render: function (item) {
                                            var styles = `display:inline-block;height:1rem;margin-right:0.25rem;width:0.5rem`;

                                            return m(`[style=padding:0.25rem]`, [
                                                m(`svg[style=${styles}]`, [
                                                    m(`use[xlink:href=#fas-check]`)
                                                ]),
                                                item
                                            ]);
                                        }
                                    }).then(component);

                                    return component;
                                };
                            }
                        }, {
                            selectable: `multiple`,
                            compare: 'includes',
                            name: `handle`,
                            filter: function (attrs) {
                                return function () {
                                    var component = m.stream(``);

                                    Component.strategize(`${__webpack_public_path__}list.js`, {
                                        data: m.stream(_.map(attrs.data(), 'handle')),
                                        filterable: attrs.filterable,
                                        selectable: attrs.selectable,
                                        selected: attrs.selected,
                                        render: function (item) {
                                            var styles = `display:inline-block;height:1rem;margin-right:0.25rem;width:0.5rem`;

                                            return m(`[style=padding:0.25rem]`, [
                                                m(`svg[style=${styles}]`, [
                                                    m(`use[xlink:href=#fas-check]`)
                                                ]),
                                                item
                                            ]);
                                        }
                                    }).then(component);

                                    return component;
                                };
                            },
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
                        filterable: true,
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