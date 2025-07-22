export class CircularQueue<T = unknown> {
  private items: T[] = [];
  private index = 0;

  constructor(items: T[]) {
    this.items = items;
  }

  get current(): T {
    return this.items[this.index];
  }

  get next(): T {
    return this.items[this.calculateNextIndex()];
  }

  get prev(): T {
    return this.items[this.calculatePrevIndex()];
  }

  get totalItems(): number {
    return this.items.length;
  }

  moveNext(): void {
    this.index = this.calculateNextIndex();
  }

  movePrev(): void {
    this.index = this.calculatePrevIndex();
  }

  moveTo( index: number ): void {
    if( !this.isValidIndex( index ) ) return;
    this.index = index;
  }

  getCurrentIndex(): number {
    return this.index;
  }

  isLastIndex(): boolean{
    return (this.index === this.items.length - 1) ? true : false;
  }

  isFirstIndex(): boolean {
    return ( this.index === 0 ) ? true : false;
  }

  protected calculateNextIndex(): number {
    return (this.index + 1) % this.items.length;
  }
  protected calculatePrevIndex(): number {
    return (this.index - 1 + this.items.length) % this.items.length;
  }

  isValidIndex(index: number): boolean {
    if (index < 0) return false;
    return ( index <= this.items.length - 1 ) ? true : false;
  }
}
