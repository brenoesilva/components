import Component from '../component/index.ts';
import Decorator from '../decorator/index.ts';

declare var __webpack_public_path__;
declare var SortableStyle;
declare var _;

declare var fa;
declare var m;

export default class SortableComponent extends Decorator {
    public static getDependencies() {
        return Decorator.getDependencies().concat([
            `${__webpack_public_path__}sortable.css`,
        ]);
    }

    protected init(self, attrs) {
        fa.load(`S-CaretDown`, `S-CaretUp`, `S-Sort`);

        this.component = new Component(`a.${SortableStyle[`sortable`]}`).set(`onclick`, function () {
            if (attrs.sort()[attrs.name] === undefined) {
                attrs.data(_.sortBy(attrs.data(), [attrs.name]));
                attrs.sort({});
            } else {
                _.reverse(attrs.data());
            }

            attrs.sort()[attrs.name] = !attrs.sort()[attrs.name];
        }).add([
            self,
            new Component(`svg.${SortableStyle[`svg`]}`).add(function () {
                return function () {
                    return new Component(`use`).set(`xlink:href`, (function () {
                        switch (attrs.sort()[attrs.name]) {
                            case undefined:
                                return `#fas-sort`;
                            case false:
                                return `#fas-caret-down`;
                            case true:
                                return `#fas-caret-up`;
                            default:
                                return `#`;
                        }
                    })());
                };
            }),
        ]).set(`href`, `javascript:void(0)`);
    }
};