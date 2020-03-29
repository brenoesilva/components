import async from 'async';
import m from 'mithril';

window.async = async;
window.fa = null;
window.m = m;

window.q = (function queue() {
    return async.queue(function (task, callback) {
        if (System.has(task)) {
            callback(null, System.get(task).default);
        } else {
            System.import(task).then(function (module) {
                var q = queue();
                m.redraw();

                if (typeof module.default.getDependencies === `function`) {
                    var dependencies = module.default.getDependencies();
                }

                async.each(dependencies || [], function (module, callback) {
                    q.push(module, function (error, styles) {
                        if (module.endsWith(`.css`)) {
                            document.adoptedStyleSheets = document.adoptedStyleSheets.concat(styles);
                        }

                        callback(error);
                    });
                }, function (error) {
                    callback(error, module.default);
                    System.set(task, module);
                });
            });
        }
    }, 5);
})();

export function ready(component) {
    m.mount(document.body, {
        oninit: function (vnode) {
            q.push(`${__webpack_public_path__}fa.js`, function (error, module) {
                vnode.state.component = component();
                fa = module;
            });
        },
        view: function (vnode) {
            return m(vnode.state.component || ``);
        }
    });
};