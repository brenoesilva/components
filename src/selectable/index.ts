import Decorator from '../decorator/index.ts';

declare const __webpack_public_path__;
declare const SelectableStyle;
declare const m;

declare const _;

export default class SelectableComponent extends Decorator {
    public static getDependencies() {
        return Decorator.getDependencies().concat([
            `${__webpack_public_path__}selectable.css`,
        ]);
    }

    public static selector(self, selected, value) {
        self.selector = _.replace(self.selector, `.${SelectableStyle[`selected`]}`, ``);

        if (!_.includes(self.selector, SelectableStyle[`selectable`])) {
            self.selector += `.${SelectableStyle[`selectable`]}`;
        }

        if (_.includes(selected, value)) {
            self.selector += `.${SelectableStyle[`selected`]}`;
        }
    }

    protected init(self, attrs) {
        attrs.components().push({
            value: attrs.value,
            self: self
        });

        self.set(`onclick`, function () {
            if (`multiple` === attrs.selectable) {
                if (_.includes(attrs.selected(), attrs.value)) {
                    _.pull(attrs.selected(), attrs.value);
                } else {
                    attrs.selected().push(attrs.value);
                }
            } else {
                attrs.selected(_.includes(attrs.selected(), attrs.value) ? `` : attrs.value);
            }

            _.each(attrs.components(), function (component) {
                SelectableComponent.selector(component.self, attrs.selected(), component.value);
            });
        }).set(`onupdate`, function () {
            SelectableComponent.selector(self, attrs.selected(), attrs.value);
        });

        SelectableComponent.selector(self, attrs.selected(), attrs.value);
        this.component = self;
    }
};