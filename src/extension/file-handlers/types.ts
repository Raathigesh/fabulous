import { Declaration, NodeSource, Rule } from 'postcss';

export type SupportedFiletypes =
  | 'html'
  | 'css'
  | 'scss'
  | 'postcss'
  | 'javascript'
  | 'typescript'
  | 'javascriptreact'
  | 'typescriptreact'
  | 'svelte'
  | 'vue'
  | '';

export type UpdateActiveBlockType = 'add' | 'remove';

/**
 * File handler is responsible for parsing and extracting EditableBlocks.
 * Also deals with updating CSS properties.
 *
 * We curretnly have two handlers as below
 * - JS File handler - Deals with .js/.jsx/.ts/.tsx files to support styled components editing
 * - CSS File handler - Deals with .css files to support CSS editing
 */
export interface FileHandler {
  getEditableBlocks(fileContent: string, languageId: SupportedFiletypes): EditableBlock[];
  updateProperty(activeBlock: EditableBlock, prop: string, value: string, languageId: string): string;
  removeProperty(activeBlock: EditableBlock, prop: string): string;
}

/**
 * An abstract representation of an editable CSS block
 *
 * A block could be either a CSS rule from a .css file like below
 * .header {
 *    font-color: green;
 * }
 *
 * or a styled-component's template literal like below
 * const MyCustomComponent = styled.div`
 *    font-color: green;
 * `
 */
export interface EditableBlock {
  selector: string;
  declarations: Declaration[];
  source?: NodeSource;
  rule: Rule;
}

export interface StyleExpressions {
  name: string;
  cssString: string;
  location: NodeSource;
}

export interface LocationPosition {
  column: 0;
  line: 0;
}
