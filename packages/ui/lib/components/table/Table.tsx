import { Badge, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import MuiTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { theme } from "@pagopa/mui-italia";

export interface TableProps {
  columns: string[];
  rows: {
    date: string;
    detail: string;
    key: string;
    variation: number;
  }[];
}

const VariationViewer = ({ variation }: { variation: number }) => (
  <Badge badgeContent={variation} color={"primary"}></Badge>
);

export const Table = ({ columns, rows }: TableProps) => (
  <TableContainer component={Paper}>
    <MuiTable aria-label="simple table">
      <TableHead>
        <TableRow>
          {columns.map((title) => (
            <TableCell
              style={{
                background: theme.palette.text.primary,
                border: "1px solid #BFDFFF",
                color: theme.palette.background.default,
              }}
            >
              {title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.key}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Typography
                color="text.secondary"
                fontWeight="regular"
                paddingTop={2}
                textAlign="initial"
                variant="body1"
              >
                {row.date}
              </Typography>
              <Typography
                color="text.secondary"
                fontWeight="medium"
                paddingTop={2}
                textAlign="initial"
                variant="body1"
              >
                {row.detail}
              </Typography>
            </TableCell>
            <TableCell align="right">
              {<VariationViewer variation={row.variation} />}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </MuiTable>
  </TableContainer>
);
