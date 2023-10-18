import {
  ComponentRenderer,
  ScreenBreakpoints,
} from "../../types/ScreenBreakpoints.type";

export interface GridLayoutProps {
  schema: GridLayoutSchema | GridLayoutSchema[];
}

export interface GridLayoutSchema {
  screenBreakpoints?: ScreenBreakpoints;
  defaultItemBreakpoints?: ScreenBreakpoints;
  gridItems: AvailGridItemVariants[];
  isVisible?: () => boolean;
  groupLabel?: string;
  groupLabelEl?: React.ReactNode;
  bottomItemSpace?: string;
  bottomSpace?: string;
  hasTopDivider?: boolean;
  topDividerEl?: React.ReactNode;
  groupContainerEl?: ((data: { children: any }) => JSX.Element) | React.FC;
}

export type AvailGridItemVariants =
  | GridLayoutItem
  | ComponentRenderer
  | GridLayoutSchema
  | Array<
      | GridLayoutItem
      | ComponentRenderer
      | GridLayoutSchema
      | AvailGridItemVariants
    >;

export interface GridLayoutItem {
  component: AvailGridItemVariants;
  isVisible?: () => boolean;
  screenBreakpoints?: ScreenBreakpoints;
  bottomSpace?: string;
  topSpace?: string;
  shouldAffectGroupVisibility?: boolean;
}

export interface renderComponentsFromSchemaOutput {
  hasRenderedComponent: boolean;
  componentView: React.ReactNode;
}

export interface renderGridItemOutput {
  hasRenderedComponent: boolean;
  componentView: React.ReactNode;
  shouldAffectGroupVisibility: boolean;
}

export interface renderGridItemParams {
  gridItem: AvailGridItemVariants;
  schema: GridLayoutSchema;
  isRenderedFromComponentGridItem?: boolean;
}
