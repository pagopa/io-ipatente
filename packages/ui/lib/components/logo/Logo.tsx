import { LogoIPatente } from "./svg/LogoIPatente";

export const Logos = {
  ipatente: LogoIPatente,
} as const;

export type LogoType = keyof typeof Logos;

interface LogoProps {
  name: LogoType;
  size?: number;
  title?: string;
}

export const Logo = ({ name, size = 32, ...props }: LogoProps) => {
  const LogoElement = Logos[name];
  return <LogoElement {...props} size={size} />;
};
