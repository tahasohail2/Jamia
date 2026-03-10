interface DataRow {
    label: string;
    value: string;
    isLtr?: boolean;
}

interface DataTableProps {
    sectionTitle: string;
    rows: DataRow[];
}

export default function DataTable({ sectionTitle, rows }: DataTableProps) {
    return (
        <>
            <div className="table-section-header">{sectionTitle}</div>
            <table className="data-summary-table">
                <thead>
                    <tr>
                        <th>فیلڈ</th>
                        <th>درج شدہ قدر</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row) => (
                        <tr key={row.label}>
                            <td className="label-cell">{row.label}</td>
                            <td className={`value-cell${row.isLtr ? ' ltr' : ''}`}>
                                {row.value || '—'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export type { DataRow };
