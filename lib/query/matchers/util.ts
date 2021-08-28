import type { Checkpoint } from '../types';
import type { Cursor } from '/parser/types';

export function skipSpaces<Ctx>(
  checkpoint: Checkpoint<Ctx>
): Checkpoint<Ctx> | null {
  let cursor: Cursor | undefined = checkpoint.cursor;
  let node = cursor.node;
  while (
    node.type === 'newline' ||
    node.type === 'whitespace' ||
    node.type === 'comment'
  ) {
    cursor = cursor.right;
    if (!cursor) {
      return null;
    }
    node = cursor.node;
  }
  return { ...checkpoint, cursor };
}
