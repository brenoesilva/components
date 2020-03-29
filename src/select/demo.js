require(`systemjs/dist/system.js`);

System.import(`${__webpack_public_path__}index.css`).then(function (callback) {
    document.adoptedStyleSheets = document.adoptedStyleSheets.concat(callback.default);
});

System.import(`${__webpack_public_path__}index.js`).then(function ($) {
    $.ready(function () {
        return {
            oninit: function (vnode) {
                q.push(`${__webpack_public_path__}select.js`, function (error, Component) {
                    var d = new Date();

                    vnode.state.components.push(new Component({
                        selected: m.stream(`${d.getFullYear()}-${_.padStart(d.getMonth() + 1, 2, `0`)}-${_.padStart(d.getDate() + 1, 2, `0`)}`),
                        placement: `bottom-start`,
                        selectable: true,
                        content: function (attrs) {
                            return function () {
                                var component = m.stream(``);

                                Component.strategize(`${__webpack_public_path__}calendar.js`, {
                                    selectable: attrs.selectable,
                                    selected: attrs.selected
                                }).then(component);

                                return component;
                            };
                        }
                    }));

                    vnode.state.components.push(new Component({
                        placement: `bottom-start`,
                        content: function (attrs) {
                            return function () {
                                var component = m.stream(``);

                                Component.strategize(`${__webpack_public_path__}list.js`, {
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
                                }).then(component);

                                return component;
                            };
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