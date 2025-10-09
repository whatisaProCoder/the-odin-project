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
  #rehash() {
    const oldBuckets = this.buckets;
    this.buckets = new Array(this.#capacity);
    this.#entries = 0;

    for (const bucket of oldBuckets) {
      if (bucket != undefined) {
        let temp = bucket.head();
        while (temp) {
          const [key, value] = temp.value;
          this.set(key, value);
          temp = temp.nextNode;
        }
      }
    }
  }
  set(key, value) {
    if (this.#capacity * this.#loadFactor < (this.#entries + 1)) {
      this.#capacity *= 2
      this.#rehash();
    }
    const index = this.hash(key)
    if (this.buckets[index] === undefined) {
      this.buckets[index] = new LinkedList()
    }

    const existingIndex = this.buckets[index].find(key)
    if (existingIndex != null) {
      this.buckets[index].at(existingIndex).value[1] = value
    } else {
      this.buckets[index].append([key, value])
      this.#entries += 1
    }
  }
  get(key) {
    const index = this.hash(key)
    if (this.buckets[index] != undefined) {
      const requiredNodeIndex = this.buckets[index].find(key)
      if (requiredNodeIndex != null) {
        return this.buckets[index].at(requiredNodeIndex).value[1]
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
      const listIndex = this.buckets[index].find(key)
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
      if (bucket != undefined) {
        numberOfKeys += bucket.size()
      }
    }
    return numberOfKeys
  }
  clear() {
    this.#entries = 0
    this.buckets = []
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