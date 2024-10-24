import {
  Typography as MuiTypography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TypographyProps,
} from "@mui/material";

import { colorTextPrimary, theme } from "../../theme";

const SAMPLE_TEXT = "The quick brown fox jumps over the lazy dog";
export const THEME_VARIANTS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "numbers",
  "body1",
  "body2",
  "button",
  "chip",
  "caption",
  "caption-semibold",
] as const;

import { pxToRem } from "@pagopa/mui-italia";

const EXTRA_VARIANTS = {
  chip: {
    color: colorTextPrimary,
    fontSize: pxToRem(16),
    fontWeight: 400,
    lineHeight: 22,
  },
  numbers: {
    color: colorTextPrimary,
    fontSize: pxToRem(16),
    fontWeight: 700,
    lineHeight: 20,
  },
};

type ThemeVariant = (typeof THEME_VARIANTS)[number];

interface Properties {
  fontSize: string;
  fontWeight: number;
  lineHeight: number | string;
}

export const TypographyTable = () => {
  const { ...variants } = theme.typography;
  const data = Object.entries({ ...variants, ...EXTRA_VARIANTS }).reduce(
    (acc, [key, value]) =>
      value !== null && typeof value === "object" && !Array.isArray(value)
        ? { ...acc, [key]: value }
        : acc,
    {} as Record<ThemeVariant, Properties>,
  );
  return (
    <Table sx={{ minWidth: 650 }}>
      <TableHead>
        <TableRow>
          <TableCell>Style name</TableCell>
          <TableCell>Font weight</TableCell>
          <TableCell>Font size</TableCell>
          <TableCell>Line height</TableCell>
          <TableCell>Sample</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {THEME_VARIANTS.map((val) => {
          const item = data[val];
          if (!item) return;
          return (
            <TableRow>
              <TableCell width="10%">{val}</TableCell>
              <TableCell width="10%">{item.fontWeight}</TableCell>
              <TableCell width="10%">
                {isNaN(Number(item.fontSize?.split("rem")[0]))
                  ? item.fontSize
                  : Math.floor(Number(item.fontSize.split("rem")[0]) * 16)}
              </TableCell>
              <TableCell width="10%">
                {typeof item.lineHeight === "number"
                  ? item.lineHeight.toFixed(2)
                  : item.lineHeight}
              </TableCell>
              <TableCell width="60%">
                <MuiTypography
                  style={{
                    fontSize: item.fontSize,
                    fontWeight: item.fontWeight,
                  }}
                >
                  {SAMPLE_TEXT}
                </MuiTypography>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export const Typography = (props: TypographyProps) => (
  <MuiTypography {...props} />
);
