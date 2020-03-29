import Component from '../component/index.ts';

declare const __webpack_public_path__;
declare const TableStyle;
declare const _;

export default class TableComponent extends Component {
    public static getDependencies() {
        return Component.getDependencies().concat([
            `//www.unpkg.com/lodash@latest/lodash.min.js`,
            `${__webpack_public_path__}table.css`,
        ]);
    }

    public constructor(attrs) {
        super(`table.${TableStyle[`table`]}`, attrs);
    }

    protected init(self, attrs) {
        self.add([
            new Component(`thead.${TableStyle[`thead`]}`).add(
                new Component(`tr.${TableStyle[`tr`]}`).add(
                    _.map(attrs.cols || [], function (col) {
                        return new Component(`th.${TableStyle[`th`]}`).add(
                            _.startCase(_.lowerCase(col.name)),
                        );
                    }),
                ),
            ),
            new Component(`tbody.${TableStyle[`tbody`]}`).add(
                _.map(attrs.data() || [], function (row) {
                    return new Component(`tr.${TableStyle[`tr`]}`).add(
                        _.map(attrs.cols || [], function (col) {
                            return new Component(`td.${TableStyle[`td`]}`).add(
                                typeof col.render === `function` ? col.render(row) : row[col.name],
                            ).set(`data-label`, _.startCase(_.lowerCase(col.name)));
                        }),
                    );
                }),
            ),
        ]);
    }
};