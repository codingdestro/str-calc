import List, { Node } from "./lib/list.js";

type valType = string | number;

type addValueToNodeFunc = (prev: valType, char: string) => boolean;

const addValueToNode: addValueToNodeFunc = function (
  this: any,
  prev: valType,
  char: string,
) {
  let x = prev.toString();
  if (char == "+" || char == "x" || char == "/" || char == "-") {
    let ope = char;
    let val = parseFloat(x);

    this.list.addNode(val);
    let node = this.list.addNode(ope);
    if (ope == "+" || ope == "-") {
      this.Sstack.push(node);
    } else {
      this.Fstack.push(node);
    }
    return true;
  }
  return false;
};

class Calc {
  public str: string;
  public list: List;
  public Fstack: [];
  public Sstack: [];
  public val: number;
  constructor(str: string) {
    this.str = str;
    this.list = new List();
    this.Fstack = [];
    this.Sstack = [];
    this.val = 0;
  }

  split() {
    let prevValue = "";
    let ope = "";

    for (let i = 0; i < this.str.length; i++) {
      let char = this.str[i];
      if (char == "" || char == " ") continue;

      if (addValueToNode.call(this, prevValue, char)) {
        prevValue = "";
      } else {
        if (i == this.str.length - 1) {
          prevValue += char;
          let val = parseFloat(prevValue);
          this.list.addNode(val);
        }
        prevValue += char;
      }
    }
  }

  do() {
    let stack = [...this.Fstack, ...this.Sstack];
    let node = null;
    while (stack.length > 0) {
      node = stack.shift();

      let x = node!.prev.val;
      let y = node!.next.val;

      if (node!.val == "+") {
        x = x + y;
      } else if (node!.val == "-") {
        x = x - y;
      } else if (node!.val == "x") {
        x = x * y;
      } else if (node!.val == "/") {
        x = x / y;
      }
      this.val = x;

      let newNode = new Node(x);

      if (node!.next.next !== null) {
        let right = node!.next.next;
        right.prev = newNode;
        newNode.next = right;
      }
      if (node!.prev.prev !== null) {
        let left = node!.prev.prev;
        left.next = newNode;
        newNode.prev = left;
      }
    }

    return this.val;
  }
}

function parseExp(exp: string, i = 0) {
  let char = exp[i];

  let str = "";
  while (i < exp.length && char != ")") {
    //splitting work here
    if (char == "(") {
      let x = parseExp(exp, i + 1);
      i = x[0];
      str += x[1];
      char = exp[i];
    } else if (char !== " ") {
      str += char;
    }
    i++;
    char = exp[i];
  }
  let calc = new Calc(str);
  calc.split();
  let val = calc.do();
  return [i, val];
}

const stringCalc = (str: string) => {
  str = str[0] == "-" ? `0${str}` : str;

  let res = parseExp(str);
  return res[1];
};

export default stringCalc;
