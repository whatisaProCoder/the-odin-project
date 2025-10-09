import { HashMap } from "./hash_map.js"

function runTests() {
  const map = new HashMap();

  console.log("=== TEST 1: set() & get() ===");
  map.set("apple", "red");
  map.set("banana", "yellow");
  console.assert(map.get("apple") === "red", "❌ apple should be red");
  console.assert(map.get("banana") === "yellow", "❌ banana should be yellow");
  console.assert(map.get("carrot") === null, "❌ carrot should not exist");
  console.log("✅ set() & get() passed\n");

  console.log("=== TEST 2: has() ===");
  console.assert(map.has("apple") === true, "❌ should have apple");
  console.assert(map.has("carrot") === false, "❌ should not have carrot");
  console.log("✅ has() passed\n");

  console.log("=== TEST 3: remove() ===");
  const removed = map.remove("banana");
  console.assert(removed === true, "❌ remove() should return true");
  console.assert(map.get("banana") === null, "❌ banana should be removed");
  console.assert(map.has("banana") === false, "❌ should not have banana after removal");
  console.log("✅ remove() passed\n");

  console.log("=== TEST 4: keys(), values(), entries() ===");
  map.set("carrot", "orange");
  map.set("dog", "brown");
  const keys = map.keys();
  const values = map.values();
  const entries = map.entries();
  console.assert(keys.includes("apple") && keys.includes("carrot"), "❌ keys missing");
  console.assert(values.includes("red") && values.includes("orange"), "❌ values missing");
  console.assert(
    entries.some(([k, v]) => k === "dog" && v === "brown"),
    "❌ entries missing dog"
  );
  console.log("✅ keys(), values(), entries() passed\n");

  console.log("=== TEST 5: length() ===");
  const len = map.length();
  console.assert(len === 3, `❌ length should be 3 but got ${len}`);
  console.log("✅ length() passed\n");

  console.log("=== TEST 6: clear() ===");
  map.clear();
  console.assert(map.length() === 0, "❌ clear() did not empty the map");
  console.assert(map.keys().length === 0, "❌ keys() not empty after clear()");
  console.log("✅ clear() passed\n");

  console.log("=== TEST 7: load factor growth ===");
  const bigMap = new HashMap();
  const initial = bigMap.metrics().capacity;
  for (let i = 0; i < 20; i++) bigMap.set("key" + i, "val" + i);
  const after = bigMap.metrics().capacity;
  console.assert(after > initial, "❌ capacity did not increase after exceeding load factor");
  console.log("✅ load factor test passed\n");

  console.log("All tests passed ✅🎉");
}

runTests();
