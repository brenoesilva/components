import Component from '../component/index.ts';

declare const __webpack_public_path__;
declare const PopperStyle;

declare const Popper;
declare const fa;
declare const m;

export default class PopperComponent extends Component {
    public static getDependencies() {
        return Component.getDependencies().concat([
            `//www.unpkg.com/@popperjs/core@latest/dist/umd/popper.min.js`,
            `${__webpack_public_path__}popper.css`,
        ]);
    }

    public constructor(attrs) {
        super(`details.${PopperStyle[`details`]}`, attrs);
    }

    protected init(self, attrs) {
        fa.load(`S-EllipsisV`);
        var popper = null;

        self.add([
            new Component(`summary.${PopperStyle[`summary`]}`).set(`onclick`, function () {
                if (!popper) {
                    m.redraw.sync();
                }

                popper.update();
            }).add(typeof attrs.label === `function` ? attrs.label(attrs) : attrs.label),
            new Component(`.${PopperStyle[`div`]}`).set(`onupdate`, function (vnode) {
                popper = Popper.createPopper(vnode.dom.parentNode, vnode.dom, {
                    placement: attrs.placement,
                    modifiers: [
                        {
                            name: `preventOverflow`,
                            options: {
                                boundary: document.body,
                            },
                        },
                    ],
                });
            }).add(typeof attrs.content === `function` ? attrs.content(attrs) : attrs.content),
        ]);
    }
};