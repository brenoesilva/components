declare const __webpack_public_path__;
declare const fa;

fa.config.autoAddCss = false;
fa.dom.watch();

export default class FontAwesome {
    private static icons = {};

    public static getDependencies() {
        return [
            `${__webpack_public_path__}fa.css`,
        ];
    };

    private static handler(icon) {
        var tag = document.createElement(`i`);
        document.body.append(tag);

        tag.setAttribute(`data-fa-symbol`, `${icon.prefix}-${icon.iconName}`);
        tag.classList.add(icon.prefix, `fa-${icon.iconName}`);

        fa.library.add(icon.definition);
    };

    public static load() {
        for (var i = 0; i < arguments.length; ++i) {
            if (FontAwesome.icons[arguments[i]] === undefined) {
                FontAwesome.icons[arguments[i]] = true;
                var parts = arguments[i].split(`-`);

                switch (parts[0]) {
                    case `B`:
                        import(`@fortawesome/free-brands-svg-icons/fa${parts[1]}.js`).then(FontAwesome.handler);
                        break;
                    case `R`:
                        import(`@fortawesome/free-regular-svg-icons/fa${parts[1]}.js`).then(FontAwesome.handler);
                        break;
                    case `S`:
                        import(`@fortawesome/free-solid-svg-icons/fa${parts[1]}.js`).then(FontAwesome.handler);
                        break;
                    default:
                        break;
                }
            }
        }
    };
};