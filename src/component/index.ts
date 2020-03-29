declare const m;

export default class Component {
    private attrs = {};
    private children;

    public constructor(private selector = ``, attrs = {}) {
        this.init(typeof selector === 'string' ? this : selector, attrs);
    }

    public static getDependencies() {
        return [];
    }

    protected init(self, attrs) {
        // Do nothing
    }

    public add(children) {
        this.children = children;
        return this;
    }

    public get(key) {
        return this.attrs[key];
    }

    public set(key, value) {
        this.attrs[key] = value;
        return this;
    }

    private render(child) {
        return typeof child.view === `function` ? child.view() : child;
    }

    public view() {
        var children = this.children || [];

        if (Array.isArray(children)) {
            children = children.filter(Boolean).map(this.render);
        } else {
            children = this.render(children);
        }

        return m(this.selector, this.attrs, children);
    }
};