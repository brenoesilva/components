import Component from '../component/index.ts';
import Decorator from '../decorator/index.ts';

declare const __webpack_public_path__;
declare const styles;
declare const _;

declare const m;

export default class FilterableComponent extends Decorator {
    public static getDependencies() {
        return Decorator.getDependencies().concat([
            `//www.unpkg.com/lodash@latest/lodash.min.js`,
        ]);
    }

    protected init(self, attrs) {
        var data = attrs.data();

        var selector = function () {
            self.selector = _.replace(self.selector, `[value=${attrs.filtered()}]`, ``);

            if (_.includes(attrs.filtered(), attrs.value)) {
                self.selector += `[value=${attrs.filtered()}]`;
            }
        };

        self.add(new Component(`input[placeholder=Filter ...]`).set(`oninput`, function (e) {
            attrs.filtered(e.target.value.toLowerCase());

            if (e.target.value.toLowerCase()) {
                attrs.data(_.filter(attrs.data(), function (item) {
                    return _.includes(item.toLowerCase(), e.target.value.toLowerCase());
                }));
            } else {
                attrs.data(data);
            }

            selector();
        }));

        this.component = self;
        selector();
    }
};