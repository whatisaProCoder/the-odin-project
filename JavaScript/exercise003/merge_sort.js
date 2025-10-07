function merge(list1, list2) {
  let combined = []
  let i = 0, j = 0
  while (i < list1.length && j < list2.length) {
    if (list1[i] < list2[j])
      combined.push(list1[i++])
    else
      combined.push(list2[j++])
  }
  while (i < list1.length)
    combined.push(list1[i++])
  while (j < list2.length)
    combined.push(list2[j++])
  return combined
}

function mergeSort(myList) {
  if (myList.length === 1)
    return myList
  const midIndex = Math.trunc(myList.length / 2)
  const left = mergeSort(myList.slice(0, midIndex))
  const right = mergeSort(myList.slice(midIndex))
  return merge(left, right)
}

const originalList = [9, 4, 6, 5]

const sortedList = mergeSort(originalList)

console.log("Original List :", originalList)
console.log("Sorted   List :", sortedList)