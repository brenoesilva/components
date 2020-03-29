import Decorator from '../decorator/index.ts';

declare const __webpack_public_path__;
declare const StrippableStyle;

export default class StrippableComponent extends Decorator {
    public static getDependencies() {
        return Decorator.getDependencies().concat([
            `${__webpack_public_path__}strippable.css`,
        ]);
    }

    protected init(self, attrs) {
        self.selector += `.${StrippableStyle[`strippable`]}`;
        this.component = self;
    }
};