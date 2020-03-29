import Component from '../component/index.ts';
import Popper from '../popper/index.ts';

declare const __webpack_public_path__;
declare const SelectStyle;
declare const _;

declare const fa;
declare const m;

export default class SelectComponent extends Popper {
    public static getDependencies() {
        return Popper.getDependencies().concat([
            `//www.unpkg.com/lodash@latest/lodash.min.js`,
            `${__webpack_public_path__}select.css`,
        ]);
    }

    protected init(self, attrs) {
        attrs.selected = attrs.selected || m.stream(attrs.selectable === `multiple` ? [] : ``);

        attrs.label = new Component(`span.${SelectStyle[`label`]}`).add(function () {
            var component = new Component(`svg.${SelectStyle[`svg`]}`).set(`onclick`, function (e) {
                attrs.selected(attrs.selectable === `multiple` ? [] : ``);
                setTimeout(m.redraw.sync, 1);
                e.preventDefault();
            }).add(new Component(`use`).set('xlink:href', `#fas-times`))

            return function () {
                return [
                    (attrs.selectable === `multiple` ? `${_.size(attrs.selected())} selected` : attrs.selected()) || `Select ...`,
                    _.size(attrs.selected()) ? component : ``,
                ]
            }
        });

        fa.load(`S-Check`, `S-Times`);
        super.init(self, attrs);
    }
};