export class Node {
  public val: string | number;
  public next: Node | null;
  public prev: Node | null;

  constructor(val: string | number) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

export class List {
  private head: Node | null;
  private tail: Node | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  public isEmpty(): boolean {
    return this.head === null;
  }

  public addNode(val: string | number): Node {
    const newNode = new Node(val);
    
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      if (this.tail) {
        newNode.prev = this.tail;
        this.tail.next = newNode;
        this.tail = newNode;
      }
    }
    
    return newNode;
  }

  public getHead(): Node | null {
    return this.head;
  }

  public getTail(): Node | null {
    return this.tail;
  }
}

export default List;
