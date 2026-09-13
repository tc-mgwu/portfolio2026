/* A small figures table: a label column and right-aligned numeric columns.
   Numbers arrive as numbers and are formatted here, so the content files stay
   plain. `placeholder` draws the body blurred and unreadable, for a table
   whose values are still locked. */

export type Cell = string | number;

export default function DataTable({
  columns,
  rows,
  values,
  placeholder = false,
}: {
  columns: string[];
  rows: string[];
  values?: Cell[][];
  placeholder?: boolean;
}) {
  const width = columns.length - 1;
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[0.9375rem] leading-snug">
        <thead>
          <tr className="border-b border-ink/60">
            {columns.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={`label-sc py-2.5 pr-4 font-medium text-ink-3 ${i === 0 ? "text-left" : "text-right"}`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((label, r) => (
            <tr key={label} className="border-b border-hair">
              <th scope="row" className="py-3 pr-4 text-left font-normal text-ink">
                {label}
              </th>
              {Array.from({ length: width }, (_, c) => {
                const v = values?.[r]?.[c];
                return (
                  <td
                    key={c}
                    className="py-3 pl-4 text-right text-ink-2 tabular-nums"
                  >
                    {placeholder ? (
                      <span
                        aria-hidden="true"
                        className="select-none blur-[5px]"
                      >
                        000,000
                      </span>
                    ) : typeof v === "number" ? (
                      v.toLocaleString("en-US")
                    ) : (
                      v ?? ""
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
