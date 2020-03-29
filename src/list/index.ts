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

        self.add(function () {
            var components = m.stream([]);

            async.mapSeries(attrs.data(), function (item, callback) {
                var component = function () {
                    return function () {
                        return typeof attrs.render === `function` ? attrs.render(item) : item;
                    };
                };

                new Component(`li`).add(component).decorate([
                    attrs.selectable ? `${__webpack_public_path__}selectable.js` : ``,
                ], {
                    selectable: attrs.selectable,
                    components: components,
                    selected: selected,
                    value: item,
                }, callback);
            }).then(attrs.data);

            return attrs.data;
        });
    }
};