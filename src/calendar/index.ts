import Component from '../component/index.ts';

declare const __webpack_public_path__;
declare const CalendarStyle;
declare const _;

declare const moment;
declare const fa;
declare const m;

export default class CalendarComponent extends Component {
    public static getDependencies() {
        return Component.getDependencies().concat([
            `//www.unpkg.com/moment@2.24.0/min/moment.min.js`,
            `//www.unpkg.com/lodash@latest/lodash.min.js`,
            `${__webpack_public_path__}calendar.css`,
        ]);
    }

    public constructor(attrs) {
        super(`table.${CalendarStyle[`table`]}`, attrs);
    }

    protected init(self, attrs) {
        fa.load(`S-CaretRight`, `S-CaretLeft`);
        var date = attrs.date || moment();

        self.add([
            new Component(`thead.${CalendarStyle[`thead`]}`).add([
                new Component(`tr.${CalendarStyle[`tr`]}`).add([
                    new Component(`th.${CalendarStyle[`th`]}`).add(
                        new Component(`button.${CalendarStyle[`button`]}`).set(`onclick`, function () {
                            date.subtract(1, `months`);
                        }).add(new Component(`svg.${CalendarStyle[`svg`]}`).add(
                            new Component(`use`).set('xlink:href', `#fas-caret-left`),
                        )),
                    ),
                    new Component(`th[colspan=5].${CalendarStyle[`th`]}`).add(function () {
                        return function () {
                            return date.format(`MMMM YYYY`);
                        };
                    }),
                    new Component(`th.${CalendarStyle[`th`]}`).add(
                        new Component(`button.${CalendarStyle[`button`]}`).set(`onclick`, function () {
                            date.add(1, `months`);
                        }).add(new Component(`svg.${CalendarStyle[`svg`]}`).add(
                            new Component(`use`).set('xlink:href', `#fas-caret-right`),
                        )),
                    ),
                ]),
                new Component(`tr.${CalendarStyle[`tr`]}`).add(_.map(moment.weekdaysMin(), function (day) {
                    return new Component(`th.${CalendarStyle[`th`]}`).add(day);
                })),
            ]),
            new Component(`tbody.${CalendarStyle[`tbody`]}`).add(function () {
                return function () {
                    return _.map(_.chunk(self.getDates(date), 7), function (row) {
                        return new Component(`tr.${CalendarStyle[`tr`]}`).add(_.map(row, function (col) {
                            var selector = `span.${CalendarStyle[`span`]}`;

                            if (_.indexOf([6, 7], col.isoWeekday()) !== -1) {
                                selector += `.${CalendarStyle[`week-end`]}`;
                            }

                            if (col.month() !== date.month()) {
                                selector += `.${CalendarStyle[`out-of-month`]}`;
                            }

                            return new Component(`td.${CalendarStyle[`td`]}`).add(
                                new Component(selector).add(col.format(`DD`)),
                            );
                        }));
                    });
                };
            }),
        ]);
    }

    private getDates(date) {
        var first = date.clone().startOf(`month`);
        first.subtract(first.weekday(), `days`);

        var last = date.clone().endOf(`month`).add(14, `days`);
        var dates = [];

        while (first < last) {
            dates.push(first.clone());
            first.add(1, `days`);
        }

        return _.slice(dates, 0, 42);
    }
};