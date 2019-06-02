import { FileHandler, SupportedFiletypes, UpdateActiveBlockType } from '../file-handlers/types';

export interface TestCaseSetup {
  name: string;
  inspector: FileHandler;
  languageId: SupportedFiletypes;
  testFileName: string;
  parseTestCases: ParseFileTestCase[];
  updateCssTestCases: ModifyCSSTestCase[];
  addCssTestCases: ModifyCSSTestCase[];
  removeCssTestCases: ModifyCSSTestCase[];
  modificationIntegrityTestCases: ModificationIntegrityTestCase[];
}

export interface Description {
  description?: string;
}

export interface LineCol {
  line: number;
  column: number;
}

export interface PropValType {
  prop: any;
  value: string;
  type: UpdateActiveBlockType;
}

export interface Expected {
  expected: any;
}

export type ParseFileTestCase = Description & LineCol & Expected;
export type ModifyCSSTestCase = Description & LineCol & PropValType & Expected;

export interface ModificationIntegrityTestCase {
  description?: string;
  transformations: (LineCol & PropValType)[];
  inputCssString: string;
  outputCssString: string;
}
