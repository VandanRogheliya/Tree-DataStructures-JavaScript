class MaxHeap {
	constructor() {
		// this.size = size
		this.end = 0
		this.heap = []
	}

	heapifyUp(j) {
		if (j === 0) return
		let p = j
		if (p % 2 === 0) p -= 2
		else p--
		p /= 2
		if (this.heap[p] < this.heap[j]) {
			;[this.heap[p], this.heap[j]] = [this.heap[j], this.heap[p]]
			this.heapifyUp(p)
		}
	}

	heapifyDown(p = 0) {
		let c1 = 2 * p + 1
		let c2 = c1 + 1

		if (c2 >= this.end || c1 >= this.end) return
		if (this.heap[p] < this.heap[c1] || this.heap[p] < this.heap[c2]) {
			if (this.heap[c1] > this.heap[c2]) {
				[this.heap[p], this.heap[c1]] = [this.heap[c1], this.heap[p]]
				this.heapifyDown(c1)
			} else {
				[this.heap[p], this.heap[c2]] = [this.heap[c2], this.heap[p]]
				this.heapifyDown(c2)
			}
		}
  }
  isEmpty() {
    return (this.end === 0)
  }
  insert(value) {
    this.heap[this.end] = value
    this.heapifyUp(this.end++)
  }

  removeTop() {
    //TODO:Handle error
    if (this.isEmpty()) return -111111 
    let temp = this.heap[0]
    this.heap[0] = this.heap[--this.end]
    this.heapifyDown();
    this.heap.pop()
    // console.log(temp)
    return temp
  }

  deleteEl(value) {
    let index = this.heap.indexOf(value)
    //TODO:Handle error
    if (index === -1) return
    this.heap[index] = Number.POSITIVE_INFINITY
    this.heapifyUp(index)
    this.removeTop()
  }
}

//TESTING
let h1 = new MaxHeap()

h1.insert(1)
h1.insert(2)
h1.insert(10)
h1.insert(16)
h1.insert(14)
h1.insert(12)
h1.insert(0)
h1.insert(-1)
h1.insert(-10)

console.log(h1.heap, h1.end);
h1.removeTop()
console.log(h1.heap, h1.end);
h1.removeTop()
console.log(h1.heap, h1.end);
h1.removeTop()
console.log(h1.heap, h1.end);
h1.removeTop()
console.log(h1.heap, h1.end);
h1.removeTop()
console.log(h1.heap, h1.end);
h1.deleteEl(-1)
console.log(h1.heap, h1.end);
