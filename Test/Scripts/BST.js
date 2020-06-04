class Node {
	constructor(value) {
		this.value = value
		this.left = null
		this.right = null
	}
}

class BST {
	constructor(num = 0) {
		this.root = null
		if (num) {
			this.generateRandomBST(num)
		}
	}

	//inserting a new node
	insert(value) {
		var newNode = new Node(value)
		if (this.root === null) this.root = newNode
		else this.insertNode(this.root, newNode)
	}

	insertNode(node, newNode) {
		if (newNode.value < node.value) {
			if (node.left === null) node.left = newNode
			else this.insertNode(node.left, newNode)
		} else {
			if (node.right === null) node.right = newNode
			else this.insertNode(node.right, newNode)
		}
	}

	//Finding max value
	findMax(node = this.root) {
		if (node == null) {
			//TODO:Handle Error
			return node
		} else if (node.right == null) {
			return node
		} else {
			return this.findMax(node.right)
		}
	}

	//Finding min value
	findMin(node = this.root) {
		if (node == null) {
			//TODO:Handle Error
			return node
		} else if (node.left == null) {
			return node
		} else {
			return this.findMin(node.left)
		}
	}

	//Deleting node
	remove(value) {
		this.root = this.removeNode(this.root, value)
	}

	removeNode(node, value) {
		if (node === null) return null
		//TODO:Handle Error
		else if (value < node.value) {
			node.left = this.removeNode(node.left, value)
			return node
		} else if (value > node.value) {
			node.right = this.removeNode(node.right, value)
			return node
		} else {
			if (node.left === null && node.right === null) {
				node = null
				return node
			}
			if (node.left === null) {
				node = node.right
				return node
			} else if (node.right === null) {
				node = node.left
				return node
			}
			var minNodeOfRight = this.findMin(node.right)
			node.value = minNodeOfRight.value

			node.right = this.removeNode(node.right, minNodeOfRight.value)
			return node
		}
	}

	//Find height
	height(node = this.root) {
		if (node === null) return -1
		let ans
		ans = this.height(node.left)
		ans = Math.max(this.height(node.right), ans)
		return ans + 1
	}

	//Count number of nodes
	countNodes(node = this.root) {
		if (node === null) return 0
		return (
			this.countNodes(node.left) + 1 + this.countNodes(node.right)
		)
	}

	//BST traversal
	//TODO:Handle them in html
	preorder(node = this.root) {
		if (node !== null) {
			console.log(node.value)
			this.preorder(node.left)
			this.preorder(node.right)
		}
	}

	inorder(node = this.root) {
		if (node !== null) {
			this.inorder(node.left)
			console.log(node.value)
			this.inorder(node.right)
		}
	}

	postorder(node = this.root) {
		if (node !== null) {
			this.postorder(node.left)
			this.postorder(node.right)
			console.log(node.value)
		}
	}

	//Search
	search(value, node = this.root) {
		if (node === null) return false
		else if (node.value === value) return true
		else if (node.value > value) return this.search(value, node.left)
		else return this.search(value, node.right)
	}

	//Random Tree generator
	generateRandomBST(num) {
		let upper = 0
		let lower = num * 2 + 10
		for (let i = 0; i < num; i++) {
			let value =
				Math.floor(Math.random() * (upper - lower + 1)) + lower
			this.insert(value)
		}
	}

	//BST Checker
	//Main Checker function
	checkBST() {
		if (this.isBalanced()) {
			//TODO:Handle this in html
			console.log('Given BST is balanced')
		}
		if (this.isComplete()) {
			//TODO:Handle this in html
			console.log('Given BST is complete')
		}
		if (this.isPerfect()) {
			//TODO:Handle this in html
			console.log('Given BST is perfect')
		}
		if (this.isFull()) {
			//TODO:Handle this in html
			console.log('Given BST is full')
		}
	}

	//Subfunctions
	//balance
	isBalanced(node = this.root) {
		if (node === null) return true
		let leftH = this.height(node.left)
		let rightH = this.height(node.right)
		if (Math.abs(leftH - rightH) <= 1) {
			return this.isBalanced(node.left) && this.isBalanced(node.right)
		} else {
			return false
		}
	}

	//complete
	isComplete() {
		let totalNodes = this.countNodes()
		return this.isComplete2(0, totalNodes)
	}
	isComplete2(index, totalNodes, node = this.root) {
		if (node === null) return true
		else if (index >= totalNodes) return false
		else {
			let ans = this.isComplete2(index * 2 + 1, totalNodes, node.left)
			ans &= this.isComplete2(index * 2 + 2, totalNodes, node.right)
			return ans
		}
	}

	//perfect
	isPerfect() {
		return this.isFull() && this.isComplete()
	}

	//full
	isFull(node = this.root) {
		if (node === null) return true
		else if (node.left === null && node.right === null) return true
		else if (node.left !== null && node.right !== null) {
			let ans
			ans = this.isFull(node.left)
			ans &= this.isFull(node.right)
			return ans
		} else return false
	}

	//Balancing BST
	balance(node = this.root) {
		let nodes = []
		this.BSTToArr(node, nodes)
		let l = nodes.length
		this.root = this.makeBST(nodes, 0, l - 1)
	}

	//Balancing sub functions
	BSTToArr(node, nodes) {
		if (node !== null) {
			this.BSTToArr(node.left, nodes)
			nodes.push(node)
			this.BSTToArr(node.right, nodes)
		}
	}

	//making BST from array
	makeBST(nodes, start, end) {
		if (start > end) {
			return null
		}
		let mid = Math.floor((start + end) / 2)
		let node = nodes[mid]
		node.left = this.makeBST(nodes, start, mid - 1)
		node.right = this.makeBST(nodes, mid + 1, end)
		return node
	}
}

var t = new BST()

let insertButton = document.querySelector('#insertButton')
let searchButton = document.querySelector('#searchButton')
let deleteButton = document.querySelector('#deleteButton')

insertButton.addEventListener('click', () => {
	let input = document.querySelector('#insertInput').value
	if (input !== '') t.insert(input)
	else 	alert('Give some input')
 
})
searchButton.addEventListener('click', () => {
	let input = document.querySelector('#searchInput').value
	if (input !== '') {
		if (t.search(input)) {
			console.log(t.search(input));
			
			alert('Found it!')
		}
	}
	else 	alert('Give some input')
})
deleteButton.addEventListener('click', () => {
	let input = document.querySelector('#deleteInput').value
	if (input !== '') t.remove(input)
	else 	alert('Give some input')
 
})