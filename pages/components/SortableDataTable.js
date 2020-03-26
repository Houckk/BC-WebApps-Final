import React, { useCallback, useState } from "react";
import { Card, DataTable, Page } from "@shopify/polaris";

export default function SortableDataTableExample() {
  const [sortedRows, setSortedRows] = useState(null);

  const initiallySortedRows = [
    ["FAQ 1", 300, 0.9],
    ["FAQ 2", 400, 0.2],
    ["FAQ 3", 200, 0.5]
  ];
  const rows = sortedRows ? sortedRows : initiallySortedRows;

  const handleSort = useCallback(
    (index, direction) => setSortedRows(sortNumber(rows, index, direction)),
    [rows]
  );

  return (
    <Page title="Sales by product">
      <Card>
        <DataTable
          columnContentTypes={["text", "numeric", "numeric"]}
          headings={["Question ID", "Number of Clicks", "Helpfulness Rating"]}
          rows={rows}
          totals={[]}
          sortable={[false, true, true]}
          defaultSortDirection="descending"
          initialSortColumnIndex={1}
          onSort={handleSort}
        />
      </Card>
    </Page>
  );
  function sortNumber(rows, index, direction) {
    return [...rows].sort((rowA, rowB) => {
      const amountA = parseFloat(rowA[index]);
      const amountB = parseFloat(rowB[index]);

      return direction === "descending" ? amountB - amountA : amountA - amountB;
    });
  }
}
