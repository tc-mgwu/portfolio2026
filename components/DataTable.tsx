/* A small figures table: a label column and right-aligned numeric columns.
   Numbers arrive as numbers and are formatted here, so the content files stay
   plain. `placeholder` draws the values blurred and unreadable, for a table
   whose figures are still locked.

   Tables never scroll sideways. On wide screens the grid is a real table; on
   narrow screens each row stacks as its label with the column name beside
   every figure, so nothing is clipped and nothing needs a scrollbar. */

export type Cell = string | number;

function Value({ v, placeholder }: { v: Cell | undefined; placeholder: boolean }) {
  if (placeholder) {
    return (
      <span aria-hidden="true" className="select-none blur-[5px]">
        000,000
      </span>
    );
  }
  if (typeof v === "number") return <>{v.toLocaleString("en-US")}</>;
  return <>{v ?? ""}</>;
}

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
  const figures = columns.slice(1);
  /* A column of numbers sits flush right; a column of words reads from the
     left like the labels do. Locked columns are figures until proven otherwise. */
  const numeric = figures.map((_, c) =>
    placeholder ||
    !values ||
    values.every((row) => {
      const v = row[c];
      return typeof v === "number" || v === undefined || /^[\s\d.,%~\u00d7\u2014x+-]*$/.test(v);
    }),
  );
  return (
    <>
      {/* Wide: a table. The header's uppercase tracking adds space after its
          last letter; the span pulls back by that much so header and figures
          share one right edge, and the clip hides the blank overhang. */}
      <div className="hidden overflow-x-clip sm:block">
        <table className="w-full border-collapse text-[0.9375rem] leading-snug">
          <thead>
            <tr className="border-b border-ink/60">
              {columns.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={`label-sc py-2.5 font-medium text-ink-3 ${
                    i === 0 ? "pr-4 text-left" : numeric[i - 1] ? "pl-4 text-right" : "pl-4 text-left"
                  }`}
                >
                  <span className={i === 0 || !numeric[i - 1] ? undefined : "-mr-[0.16em] inline-block"}>{c}</span>
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
                {figures.map((_, c) => (
                  <td
                    key={c}
                    className={`py-3 pl-4 text-ink-2 ${numeric[c] ? "text-right tabular-nums" : "text-left"}`}
                  >
                    <Value v={values?.[r]?.[c]} placeholder={placeholder} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Narrow: one stacked block per row. */}
      <div className="border-t border-ink/60 sm:hidden">
        {rows.map((label, r) => (
          <div key={label} className="border-b border-hair py-3.5">
            <p className="text-[0.9375rem] leading-snug text-ink">{label}</p>
            <dl className="mt-2 grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5">
              {figures.map((c, i) => (
                <div key={c} className="contents">
                  <dt className="label-sc self-center">{c}</dt>
                  <dd className={`text-[0.9375rem] text-ink-2 ${numeric[i] ? "text-right tabular-nums" : "text-left"}`}>
                    <Value v={values?.[r]?.[i]} placeholder={placeholder} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}
