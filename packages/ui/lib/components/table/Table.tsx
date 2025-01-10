import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { CSSProperties, ReactElement } from "react";

type WidthFactor = 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9;
export interface Column<T> {
  columnStyle?: CSSProperties;
  key: keyof T;
  render?: (key: Column<T>["key"], item: T) => ReactElement;
  title: string;
  widthFactor?: WidthFactor;
}

export interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
}

export const Table = <T,>({ columns, rows }: TableProps<T>) => (
  <TableContainer component={Paper}>
    <MuiTable aria-label="table">
      <TableHeader columns={columns} />
      <TableContent columns={columns} rows={rows} />
    </MuiTable>
  </TableContainer>
);

interface TableHeaderProps<T> {
  columns: Column<T>[];
}

const TableHeader = <T,>({ columns }: TableHeaderProps<T>) => {
  const columnsWidths = calculateWidth(columns);

  return (
    <TableHead>
      <TableRow>
        {columns.map(({ columnStyle = {}, key, title }, index) => (
          <TableCell
            key={`${key.toString()}-${index}`}
            sx={{
              backgroundColor: "text.primary",
              color: "background.default",
              paddingX: 1.5,
              paddingY: 2,
              width: `${columnsWidths[index] * 100}%`,
              ...columnStyle,
            }}
          >
            {title}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const TableContent = <T,>({ columns, rows }: TableProps<T>) => (
  <TableBody>
    {rows.map((row, index) => (
      <TableRow
        key={index}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          "&>td, &>th": { borderBottom: "1px solid #CBD5E1" },
        }}
      >
        {columns.map(({ key, render }, cellIndex) => (
          <TableCell
            component="th"
            key={`${key.toString()}-${index}-${cellIndex}`}
            scope="row"
            sx={{
              padding: 1.5,
            }}
          >
            {render ? (
              render(key, row)
            ) : (
              <Typography
                color="text.secondary"
                fontWeight="regular"
                textAlign="initial"
                variant="body1"
              >
                {row[key] as string}
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);

function calculateWidth<T>(columns: Column<T>[]) {
  const widths = columns.map(({ widthFactor }) => widthFactor);
  const { emptyCount, sum } = widths.reduce<{
    emptyCount: number;
    sum: number;
  }>(
    ({ emptyCount, sum }, width) =>
      width
        ? { emptyCount, sum: sum + width }
        : { emptyCount: emptyCount + 1, sum },
    { emptyCount: 0, sum: 0 },
  );

  const defaultWidth = emptyCount
    ? Number(((1 - sum) / emptyCount).toFixed(1))
    : Number((1 / columns.length).toFixed(1));
  return widths.map((width) => (width ? width : defaultWidth));
}
