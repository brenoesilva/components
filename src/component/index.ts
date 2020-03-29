declare const async;
declare const q;
declare const m;

export default class Component {
    private static decorators = {};
    private static strategies = {};

    private attrs = {};
    private children;

    public constructor(protected selector = ``, attrs = {}) {
        this.init(typeof selector === 'string' ? this : selector, attrs);
    }

    public static getDependencies() {
        return [];
    }

    public static strategize(strategy, attrs = {}) {
        return new Promise(function (resolve) {
            q.push(strategy, function (error, Strategy) {
                resolve(new Strategy(attrs));
            });
        });
    }

    protected init(self, attrs) {
        // Do nothing
    }

    public decorate(decorators, attrs = {}, callback = null) {
        var promise = async.reduce(decorators.filter(Boolean), this, function (memo, item, callback) {
            q.push(item, function (error, Decorator) {
                callback(error, new Decorator(memo, attrs));
            });
        }, callback);

        if (typeof callback !== `function`) {
            return promise;
        }
    }

    public add(children) {
        this.children = typeof children === `function` ? children().bind(this) : children;
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

        if (typeof children === `function`) {
            children = children();
        }

        if (Array.isArray(children)) {
            children = children.filter(Boolean).map(this.render);
        } else {
            children = this.render(children);
        }

        return m(this.selector, this.attrs, children);
    }
};