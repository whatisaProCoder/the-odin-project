import { LinkedList } from './linked_list.js'
import { HashMap } from './hash_map.js'

function assertEqual(actual, expected, message) {
  const pass = JSON.stringify(actual) === JSON.stringify(expected)
  if (pass) {
    console.log(`✅ PASS: ${message}`)
  } else {
    console.log(`❌ FAIL: ${message}`)
    console.log(`   Expected: ${expected}`)
    console.log(`   Got:      ${actual}`)
  }
}

function printDivider(title) {
  console.log("\n==============================")
  console.log(`🚀 ${title}`)
  console.log("==============================\n")
}

// =========================
// 🚀 LINKED LIST TESTS
// =========================
printDivider("LINKED LIST TESTS START")

const list = new LinkedList()

assertEqual(list.size(), 0, "initial size should be 0")

list.append(10)
list.append(20)
list.append(30)
assertEqual(list.size(), 3, "size should be 3 after appending 3 nodes")

list.prepend(5)
assertEqual(list.head().value, 5, "head should be 5 after prepend")
assertEqual(list.tail().value, 30, "tail should be 30 after prepend")

assertEqual(list.find(20), 2, "find(20) should return index 2")
assertEqual(list.find(100), null, "find(100) should return null")
assertEqual(list.contains(30), true, "contains(30) should be true")
assertEqual(list.contains(99), false, "contains(99) should be false")
assertEqual(list.at(2).value, 20, "at(2) should be 20")

list.removeAt(1)
assertEqual(list.size(), 3, "size should be 3 after removing one element")
assertEqual(list.at(1).value, 20, "index 1 should now be 20 after removeAt(1)")

list.insertAt(15, 1)
assertEqual(list.at(1).value, 15, "insertAt(1, 15) should make index 1 value = 15")

const poppedNode = list.pop()
assertEqual(poppedNode.value, 30, "pop() should remove and return last node with value 30")
assertEqual(list.size(), 3, "size should be 3 after pop")

// Edge cases
list.removeAt(0) // remove head
assertEqual(list.head().value, 15, "head should now be 15 after removing index 0")

const emptyList = new LinkedList()
assertEqual(emptyList.pop(), null, "popping empty list should return null")
assertEqual(emptyList.removeAt(0), null, "removeAt on empty list should return null")
assertEqual(emptyList.find(999), null, "find in empty list should return null")

// Structural printout
console.log("\n✅ LinkedList final structure:")
let temp = list.head()
let printed = []
while (temp) {
  printed.push(temp.value)
  temp = temp.nextNode
}
console.log("   ", printed.join(" -> "))

printDivider("LINKED LIST TESTS COMPLETE")


// =========================
// 🚀 HASH MAP TESTS
// =========================
printDivider("HASH MAP TESTS START")

const map = new HashMap()
assertEqual(map.metrics().entries, 0, "initial entries should be 0")

map.set("apple", 10)
map.set("banana", 20)
map.set("orange", 30)
assertEqual(map.get("apple"), 10, "get(apple) should be 10")
assertEqual(map.get("banana"), 20, "get(banana) should be 20")
assertEqual(map.get("orange"), 30, "get(orange) should be 30")

// Update value test
map.set("apple", 100)
assertEqual(map.get("apple"), 100, "updating existing key should overwrite value")

assertEqual(map.has("apple"), true, "has(apple) should be true")
assertEqual(map.has("grape"), false, "has(grape) should be false")
assertEqual(map.length(), 3, "length() should return 3 after 3 inserts")

map.remove("banana")
assertEqual(map.has("banana"), false, "banana should be removed")
assertEqual(map.length(), 2, "length() should be 2 after removing banana")

// Test collision handling manually (same hash for different keys)
map.set("a", 1)
map.set("b", 2)
assertEqual(map.has("a"), true, "collision: key a should exist")
assertEqual(map.has("b"), true, "collision: key b should exist")
assertEqual(map.get("b"), 2, "collision: key b should retrieve correct value")

// Test many insertions to trigger rehash
for (let i = 0; i < 40; i++) map.set("key" + i, i)
assertEqual(map.has("key5"), true, "rehash should retain keys (key5)")
assertEqual(map.get("key10"), 10, "rehash should retain correct values")
assertEqual(map.length() > 40, true, "length should grow beyond 40 after rehash")

// Keys/Values/Entries
const keys = map.keys()
const values = map.values()
const entries = map.entries()
assertEqual(keys.includes("apple"), true, "keys() should include apple")
assertEqual(values.includes(100), true, "values() should include 100 (updated apple)")
assertEqual(Array.isArray(entries[0]), true, "entries() should return array of pairs")
assertEqual(entries.every(e => e.length === 2), true, "each entry should be [key, value]")

// Remove + Reinsert
map.remove("key0")
map.set("key0", 123)
assertEqual(map.get("key0"), 123, "reinserted key0 should return new value")

// Clear test
map.clear()
assertEqual(map.length(), 0, "length() should be 0 after clear()")
assertEqual(map.keys().length, 0, "keys() should be empty after clear()")
assertEqual(map.values().length, 0, "values() should be empty after clear()")
assertEqual(map.entries().length, 0, "entries() should be empty after clear()")

// Stress test with large insertions
for (let i = 0; i < 1000; i++) map.set("item" + i, i)
assertEqual(map.length(), 1000, "length() should be 1000 after bulk insert")
assertEqual(map.get("item999"), 999, "get(item999) should be 999")

// Deletion after bulk
for (let i = 0; i < 500; i++) map.remove("item" + i)
assertEqual(map.length(), 500, "length() should be 500 after deleting 500 keys")
assertEqual(map.get("item500"), 500, "remaining key item500 should still be retrievable")

printDivider("HASH MAP TESTS COMPLETE")
