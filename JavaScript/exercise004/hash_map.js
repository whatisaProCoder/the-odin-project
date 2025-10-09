import { LinkedList } from "./linked_list.js"

export class HashMap {
  #loadFactor
  #capacity
  #entries
  constructor() {
    this.buckets = []
    this.#loadFactor = 0.75
    this.#capacity = 16
    this.#entries = 0
  }
  metrics() {
    return {
      "capacity": this.#capacity,
      "entries": this.#entries,
      "loadFactor": this.#loadFactor
    }
  }
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.#capacity;
    }
    return hashCode;
  }
  set(key, value) {
    this.#entries += 1
    if (this.#capacity * this.#loadFactor < this.#entries) {
      this.#capacity *= 2
    }
    const index = this.hash(key)
    if (this.buckets[index] === undefined) {
      this.buckets[index] = new LinkedList()
    }
    this.buckets[index].append([key, value])
  }
  get(key) {
    const index = this.hash(key)
    if (this.buckets[index] != undefined) {
      const requiredNode = this.buckets[index].find(key)
      if (requiredNode != null) {
        return requiredNode.value[1]
      }
    }
    return null
  }
  has(key) {
    const index = this.hash(key)
    if (this.buckets[index] != undefined) {
      return this.buckets[index].contains(key)
    }
    return false
  }
  remove(key) {
    const index = this.hash(key)
    if (this.buckets[index] != undefined) {
      const listIndex = this.buckets[index].find([key, this.get(key)])
      if (listIndex != null) {
        this.buckets[index].removeAt(listIndex)
        this.#entries -= 1
        return true
      }
    }
    return false
  }
  length() {
    let numberOfKeys = 0
    for (const bucket of this.buckets) {
      numberOfKeys += bucket.size()
    }
    return numberOfKeys
  }
  clear() {
    this.buckets.length = 0
  }
  keys() {
    const allKeys = []
    for (const bucket of this.buckets) {
      if (bucket != undefined) {
        let temp = bucket.head()
        while (temp) {
          allKeys.push(temp.value[0])
          temp = temp.nextNode;
        }
      }
    }
    return allKeys
  }
  values() {
    const allValues = []
    for (const bucket of this.buckets) {
      if (bucket != undefined) {
        let temp = bucket.head()
        while (temp) {
          allValues.push(temp.value[1])
          temp = temp.nextNode;
        }
      }
    }
    return allValues
  }
  entries() {
    const allEntries = []
    for (const bucket of this.buckets) {
      if (bucket != undefined) {
        let temp = bucket.head()
        while (temp) {
          allEntries.push(temp.value)
          temp = temp.nextNode;
        }
      }
    }
    return allEntries
  }
}