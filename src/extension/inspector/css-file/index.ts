import * as css from "css";
import { Position } from "vscode";

export function getStyles(code: string, activePosition: Position) {
  const ast = css.parse(code, { positions: true });
  css.walk(ast, (node: any) => {
    if (node.type === "Rule") {
      const { start, end } = node.loc;
      const ruleStart = new Position(start.line, start.column);
      const ruleEnd = new Position(end.line, end.column);

      if (isCursorWithinRule(ruleStart, ruleEnd, activePosition)) {
      }
    }
  });
}

function isCursorWithinRule(
  ruleStart: Position,
  ruleEnd: Position,
  cursorPosition: Position
) {
  return (
    cursorPosition.isAfterOrEqual(ruleStart) &&
    cursorPosition.isBeforeOrEqual(ruleEnd)
  );
}
