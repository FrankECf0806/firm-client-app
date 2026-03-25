import { TabsProps } from "@mui/material";

export interface TabItem {
  label: string;
  path: string;
  disabled?: boolean;
}

export interface TabAppProps {
  basePath?: string;
  tabs: TabItem[];
  tabsProps?: Partial<TabsProps>;
}
