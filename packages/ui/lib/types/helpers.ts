/**
 * This type helper allows you to define a type where at least one of the properties
 * of an interface (can be any property) is required to exist.
 */
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Partial<Pick<T, Exclude<keyof T, K>>> &
    Required<Pick<T, K>>;
}[keyof T];
