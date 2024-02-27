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

//creating a linked list
class List {
  public head: Node | null;
  public tail: Node | null;
  constructor() {
    this.head = null;
    this.tail = null;
  }

  init(node: Node) {
    this.head = node;
    this.tail = node;
  }

  addNode(val: string | number) {
    let newNode = new Node(val);
    if (this.head === null) {
      this.init(newNode);
    }
    newNode.prev = this.tail;
    this!.tail!.next = newNode;
    this.tail = newNode;
    return newNode;
  }
}

export default List;
