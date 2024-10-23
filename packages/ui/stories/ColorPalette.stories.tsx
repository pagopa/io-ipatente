/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Meta, StoryObj } from "@storybook/react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

import {
  colorErrorContainedHover,
  colorPrimaryContainedHover,
  colorSecondaryContainedHover,
  colorSuccessContainedHover,
  colorWarningContainedHover,
  theme,
} from "../lib/theme";

const Circle = ({ color }: { color: string }) => {
  const circleStyle = {
    backgroundColor: color,
    borderRadius: "50%",
    display: "inline-block",
    height: "40px",
    width: "40px",
  };
  return <div style={circleStyle}></div>;
};

const PaletteTable = ({ config }: { config: Record<string, string>[] }) => (
  <Table sx={{ minWidth: 650 }}>
    <TableHead>
      <TableRow>
        <TableCell>Variable name</TableCell>
        <TableCell>Sample</TableCell>
        <TableCell>Hex</TableCell>
        <TableCell>Description</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {config.map((val) => (
        <TableRow>
          <TableCell width="30%">{val.name}</TableCell>
          <TableCell width="10%">
            <Circle color={val.sample} />
          </TableCell>
          <TableCell width="15%">{val.sample}</TableCell>
          <TableCell width="45%">{val.description}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const ColorPalette = ({
  configuration,
}: {
  configuration: { config: Record<string, string>[]; title: string }[];
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
    {configuration.map(({ config, title }) => (
      <div
        style={{ background: theme.palette.background.default, padding: "8px" }}
      >
        <TableHead>
          <TableRow>
            <TableCell>{title}</TableCell>
          </TableRow>
        </TableHead>
        <PaletteTable config={config} />
      </div>
    ))}
  </div>
);

const meta = {
  component: ColorPalette,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Foundation/ColorPalette",
} satisfies Meta<typeof ColorPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    configuration: [
      {
        config: [
          {
            description: "Main color used by most components",
            name: "Main",
            sample: theme.palette.primary.main,
          },
          {
            description: "Alternative light shade",
            name: "Light",
            sample: theme.palette.primary.light,
          },
          {
            description:
              "Fill background color for contained variant components in hover state (button, FAB, etc) - Warning: Not a Mui Theme Color",
            name: "Contained Hover Background",
            sample: colorPrimaryContainedHover,
          },
          {
            description:
              "Color that keeps a contrast ratio above AA when XX.main is used as a bg. color",
            name: "Contrast",
            sample: theme.palette.primary.contrastText,
          },
        ],
        title: "Primary",
      },
      {
        config: [
          {
            description: "Secondary color used by most components",
            name: "Main",
            sample: theme.palette.secondary.main,
          },
          {
            description: "Alternative light shade",
            name: "Light",
            sample: theme.palette.secondary.light,
          },
          {
            description:
              "Fill background color for contained variant components in hover state (button, FAB, etc) - Warning: Not a Mui Theme Color",
            name: "Contained Hover Background",
            sample: colorSecondaryContainedHover,
          },
          {
            description:
              "Color that keeps a contrast ratio above AA when XX.main is used as a bg. color",
            name: "Contrast",
            sample: theme.palette.secondary.contrastText,
          },
        ],
        title: "Secondary",
      },
      {
        config: [
          {
            description: "Text disabled",
            name: "Disabled",
            sample: theme.palette.text.disabled,
          },
          {
            description: "Text primary",
            name: "Primary",
            sample: theme.palette.text.primary,
          },
          {
            description: "Text secondary",
            name: "Secondary",
            sample: theme.palette.text.secondary,
          },
        ],
        title: "Text",
      },
      {
        config: [
          {
            description: "Main color used by most components",
            name: "Main",
            sample: theme.palette.error.main,
          },
          {
            description: "Alternative dark shade",
            name: "Dark",
            sample: theme.palette.error.dark,
          },
          {
            description: "Alternative light shade",
            name: "Light",
            sample: theme.palette.error.light,
          },
          {
            description:
              "Fill background color for contained variant components in hover state (button, FAB, etc) - Warning: Not a Mui Theme Color",
            name: "Contained Hover Background",
            sample: colorErrorContainedHover,
          },
        ],
        title: "Error",
      },
      {
        config: [
          {
            description: "Main color used by most components",
            name: "Main",
            sample: theme.palette.success.main,
          },
          {
            description: "Alternative dark shade",
            name: "Dark",
            sample: theme.palette.success.dark,
          },
          {
            description: "Alternative light shade",
            name: "Light",
            sample: theme.palette.success.light,
          },
          {
            description:
              "Fill background color for contained variant components in hover state (button, FAB, etc) - Warning: Not a Mui Theme Color",
            name: "Contained Hover Background",
            sample: colorSuccessContainedHover,
          },
        ],
        title: "Success",
      },
      {
        config: [
          {
            description: "Main color used by most components",
            name: "Main",
            sample: theme.palette.warning.main,
          },
          {
            description: "Alternative dark shade",
            name: "Dark",
            sample: theme.palette.warning.dark,
          },
          {
            description: "Alternative light shade",
            name: "Light",
            sample: theme.palette.warning.light,
          },

          {
            description:
              "Fill background color for contained variant components in hover state (button, FAB, etc) - Warning: Not a Mui Theme Color",
            name: "Contained Hover Background",
            sample: colorWarningContainedHover,
          },
        ],
        title: "Warning",
      },
      {
        config: [
          {
            description: "Fill background",
            name: "Paper Light",
            sample: theme.palette.background.paper,
          },
          {
            description: "Fill background",
            name: "Default",
            sample: theme.palette.background.default,
          },
          {
            description: "Fill background",
            name: "Page Header",
            sample: "#DFF1F3",
          },
        ],
        title: "Background",
      },
      {
        config: [
          {
            description:
              "Fill color for components in active state (List, Table, etc.)",
            name: "Active",
            sample: theme.palette.action.active,
          },
          {
            description:
              "Fill background for components in hover state (List, Table, etc.)",
            name: "Hover",
            sample: theme.palette.action.hover,
          },
          {
            description:
              "Fill background for components in selected state (List, Table, etc.)",
            name: "Selected",
            sample: theme.palette.action.selected,
          },
          {
            description:
              "Content color for components in disable state (Button, List, Table, etc.)",
            name: "Disabled",
            sample: theme.palette.action.disabled,
          },
          {
            description:
              "Fill background for components in disable state (Button, List, Table, etc.)",
            name: "Disabled Background",
            sample: theme.palette.action.disabledBackground,
          },
          {
            description:
              "Fill background for components in focus state (List, Table, etc.)",
            name: "Focus",
            sample: theme.palette.action.focus,
          },
        ],
        title: "Action",
      },
    ],
  },
};
