pragma solidity ^0.4.11;

contract QueueObject {
  address private _next;
  int256  private _data;

  function QueueObject(int256 data) {
    _data = data;
    _next = 0x0;
  }

  function set(address next) {
    _next = next;
  }

  function data() returns (int256) {
    return _data;
  }

  function next() returns (address) {
    return _next;
  }
}

contract Queue {
  QueueObject private head;
  QueueObject private tail;
  uint        public  count;

  function Queue() {
    count = 0;
  }

  function push(int256 data) {
    QueueObject q = new QueueObject(data);

    if (address(tail) == 0x0) { /* no items */
      head = tail = q;
    } else {
      tail.set(address(q));
      tail = q;
    }

    count++;
  }

  function pop() returns (int256) {
    int256  ret = -1024;

    if (address(head) != 0x0) {
      QueueObject ohead = head;
      QueueObject nhead = QueueObject(head.next());

      if (address(nhead) == 0x0) {
        head = tail = nhead;
      } else {
        head = nhead;
      }

      ret = ohead.data();
      count--;
    }

    return ret;
  }
}
