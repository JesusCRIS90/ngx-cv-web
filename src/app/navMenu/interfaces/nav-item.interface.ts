type GenericFunction = ( arg0: unknown ) => unknown;

export interface NavItem {
  id: string,
  icon: string | null,
  title: string | null,
  subtitle: string | null,
  navAction: NavCaller | null,
}

export interface NavCaller {
  action: GenericFunction,
  link: string
}
