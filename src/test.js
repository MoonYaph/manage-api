function bubble(arr) {
  var low = 0
  var high = arr.length - 1
  var j
  var tmp
  console.time('2.改进后冒泡排序耗时')
  while (low < high) {
    for (j = low; j < high; ++j) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j + 1], arr[j]] = [arr[j], arr[j + 1]]
      }
    }
    --high

    for (j = high; j > low; --j)
      if (arr[j] < arr[j - 1]) {
        ;[arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      }
    ++low
  }
  console.timeEnd('2.改进后冒泡排序耗时')

  return arr
}
const a = [1, 3, 4, 7, 32, 5, 6, 34, 22, 89, 890]

function getArr() {
  const arr = new Set()
  for (let index = 0; index < 1000; index++) {
    arr.add(Math.floor(Math.random() * 1e6))
  }
  return arr
}
console.log(bubble(getArr()))
