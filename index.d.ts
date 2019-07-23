import { Source } from 'callbag';

export default function create<T>(producer?: (
  next: (data: T) => void,
  error: (reason: any) => void,
  complete: () => void
) => void | (() => void)): Source<T>
