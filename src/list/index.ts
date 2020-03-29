import Component from '../component/index.ts';

declare const __webpack_public_path__;
declare const styles;
declare const _;

declare const async;
declare const m;

export default class ListComponent extends Component {
    public static getDependencies() {
        return Component.getDependencies().concat([
            `//www.unpkg.com/lodash@latest/lodash.min.js`,
        ]);
    }

    public constructor(attrs) {
        super(`ul`, attrs);
    }

    protected init(self, attrs) {
        var selected = attrs.selected || m.stream(attrs.selectable === `multiple` ? [] : ``);
        var filtered = attrs.filtered || m.stream(``);

        self.add(function () {
            var filter = m.stream(``);
            var children = {};

            if (attrs.filterable) {
                new Component(`li`).decorate([
                    `${__webpack_public_path__}filterable.js`,
                ], {
                    filtered: filtered,
                    data: attrs.data,
                }).then(filter);
            }

            (function (components) {
                async.eachSeries(attrs.data(), function (item, callback) {
                    var component = function () {
                        return function () {
                            return typeof attrs.render === `function` ? attrs.render(item) : item;
                        };
                    };

                    new Component(`li`).add(component).decorate([
                        attrs.strippable ? `${__webpack_public_path__}strippable.js` : ``,
                        attrs.selectable ? `${__webpack_public_path__}selectable.js` : ``,
                        attrs.hoverable ? `${__webpack_public_path__}hoverable.js` : ``,
                    ], {
                        selectable: attrs.selectable,
                        components: components,
                        selected: selected,
                        value: item,
                    }).then(function (component) {
                        children[JSON.stringify(item)] = component;
                        callback();
                    });
                });
            })(m.stream([]));

            return function () {
                return [
                    filter(),
                ].concat(_.map(attrs.data(), function (item) {
                    return children[JSON.stringify(item)];
                }).filter(Boolean));
            };
        });
    }
};