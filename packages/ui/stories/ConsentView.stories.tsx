import type { Meta, StoryObj } from "@storybook/react";

import { ConsentView } from "../lib/components/consent-view";

const meta = {
  component: ConsentView,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/ConsentView",
} satisfies Meta<typeof ConsentView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    primaryActionProps: {
      onClick: () => {},
      value: "Consenti",
    },
    secondaryActionProps: {
      onClick: () => {},
      value: "Annulla",
    },
    description:
      "Per proseguire autorizza PagoPA S.p.A. a utilizzare i tuoi dati forniti dal Ministero delle Infrastrutture e dei Trasporti, per mostrarti il servizio <strong>Le mie patenti</strong>",
    moreInfo:
      'Per maggiori informazioni, leggi l’<a style="color: #0073E6; font-weight: 600" href="https://sample-url" target="_blank">Informativa sulla Privacy</a>',
    requiredData: {
      data: ["Nome", "Cognome", "Codice fiscale"],
      title: "Dati necessari",
    },
    title: "Consenti l’utilizzo dei tuoi dati",
  },
};
