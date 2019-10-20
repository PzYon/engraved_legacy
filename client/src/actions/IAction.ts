export interface ILabeled {
  label: string;
}

export interface IAction extends ILabeled {
  url?: string;
  onClick?: () => void;
  isContextualAction?: boolean;
}
