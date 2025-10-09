export class Node {
  constructor(value) {
    this.value = value
    this.nextNode = null
  }
}

export class LinkedList {
  #head
  #tail
  #size
  constructor() {
    this.#head = null
    this.#tail = null
    this.#size = 0
  }
  head() {
    return this.#head
  }
  tail() {
    return this.#tail
  }
  size() {
    return this.#size
  }
  prepend(value) {
    let newNode = new Node(value)
    if (this.#size == 0) {
      this.#head = newNode
      this.#tail = newNode
      this.#size = 1
    }
    else {
      newNode.nextNode = this.#head
      this.#head = newNode
      this.#size += 1
    }
    return true
  }
  append(value) {
    let newNode = new Node(value)
    if (this.#size == 0) {
      this.#head = newNode
      this.#tail = newNode
      this.#size = 1
    }
    else {
      this.#tail.nextNode = newNode
      this.#tail = newNode
      this.#size += 1
    }
    return true
  }
  at(index) {
    if (index >= 0 && index < this.#size) {
      let temp = this.#head;
      for (let i = 0; i < index; i++) {
        temp = temp.nextNode;
      }
      return temp
    } else {
      return null;
    }
  }
  pop() {
    if (this.#size == 0) {
      return null;
    } else if (this.#size == 1) {
      let temp = this.#head
      this.#head = null
      this.#tail = null
      this.#size = 0
      return temp
    } else {
      let temp = this.#head
      let prev = null
      while (temp.nextNode) {
        prev = temp
        temp = temp.nextNode
      }
      prev.nextNode = null
      this.#tail = prev
      this.#size -= 1
      return temp;
    }
  }
  popFirst() {
    if (this.#size == 0) {
      return null
    } else if (this.#size === 1) {
      let temp = this.#head
      this.#head = null
      this.#tail = null
      this.#size = 0
      return temp
    } else {
      let temp = this.#head
      this.#head = this.#head.nextNode
      temp.nextNode = null
      this.#size -= 1
      return temp
    }
  }
  contains(value) {
    let temp = this.#head
    while (temp) {
      if (temp.value === value) {
        return true
      }
      temp = temp.nextNode
    }
    return false
  }
  find(value) {
    let index = 0
    let temp = this.#head
    while (temp) {
      if (temp.value === value) {
        return index
      }
      temp = temp.nextNode
      index += 1
    }
    return null
  }
  toString() {
    let string = ''
    let temp = this.#head
    while (temp) {
      string += `( ${temp.value} ) -> `
      temp = temp.nextNode
    }
    string += 'null'
    return string
  }
  insertAt(value, index) {
    if (index < 0 || index > this.#size) {
      return false
    } else if (index === 0) {
      return this.prepend(value)
    } else if (index === this.#size) {
      return this.append(value)
    } else {
      let newNode = new Node(value)
      let prevNode = this.at(index - 1)
      newNode.nextNode = prevNode.nextNode
      prevNode.nextNode = newNode
      this.#size += 1
      return true
    }
  }
  removeAt(index) {
    if (index < 0 || index >= this.#size) {
      return null
    } else if (index === 0) {
      return this.popFirst()
    } else if (index === this.#size - 1) {
      return this.pop()
    } else {
      let prevNode = this.at(index - 1)
      let temp = prevNode.nextNode
      prevNode.nextNode = temp.nextNode
      temp.nextNode = null
      this.#size -= 1
      return temp
    }
  }
}
