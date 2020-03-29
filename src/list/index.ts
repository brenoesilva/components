import Component from '../component/index.ts';

declare const __webpack_public_path__;
declare const _;

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
        self.add(_.map(attrs.data(), function (item) {
            var component = typeof attrs.render === `function` ? attrs.render(item) : item;
            return new Component(`li`).add(component);
        }));
    }
};