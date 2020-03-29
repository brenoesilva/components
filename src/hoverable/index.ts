import Decorator from '../decorator/index.ts';

declare const __webpack_public_path__;
declare const HoverableStyle;

export default class HoverableComponent extends Decorator {
    public static getDependencies() {
        return Decorator.getDependencies().concat([
            `${__webpack_public_path__}hoverable.css`,
        ]);
    }

    protected init(self, attrs) {
        self.selector += `.${HoverableStyle[`hoverable`]}`;
        this.component = self;
    }
};