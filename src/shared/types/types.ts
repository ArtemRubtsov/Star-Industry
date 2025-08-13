export type Cell =
  | { type: 'cash' | 'zero'; value: number }
  | { type: 'x2' | 'bomb' | 'stop' };

export type ModalType = '' | 'bomb' | 'claim';

