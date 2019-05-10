import { EditableBlock } from "./utils";

export interface Inspector {
  getEdiableBlocks(fileContent: string): EditableBlock[];
  updateProperty(
    activeBlock: EditableBlock,
    prop: string,
    value: string
  ): string;
}
