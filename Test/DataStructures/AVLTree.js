class Node {
	constructor(value) {
		this.value = value
		this.left = null
		this.right = null
		this.height = 0
	}
}

class AVL {
	constructor() {
		this.root = null
	}

	//Helper functions
	rotateRight(node) {
		let tempNode = node.left
		node.left = node.left.right
		tempNode.right = node
		tempNode.height = this.setHeight(tempNode)
		node.height = this.setHeight(node)
		return tempNode
	}

	rotateLeft(node) {
		let tempNode = node.right
		node.right = node.right.left
		tempNode.left = node
		tempNode.height = this.setHeight(tempNode)
		node.height = this.setHeight(node)
		return tempNode
	}

	setHeight(node) {
		if (node === null) return -1
		let leftHeight = node.left !== null ? node.left.height : -1
		let rightHeight = node.right !== null ? node.right.height : -1
		return Math.max(leftHeight, rightHeight) + 1
	}

	balanceCheck(node) {
		if (node === null) return 0
		let leftHeight = node.left !== null ? node.left.height : -1
		let rightHeight = node.right !== null ? node.right.height : -1
		return leftHeight - rightHeight
	}

	balance(node) {
		let balance = this.balanceCheck(node)
		if (balance > 1) {
			if (
				this.setHeight(node.left.left) >
				this.setHeight(node.left.right)
			) {
				node = this.rotateRight(node)
			} else {
				node.left = this.rotateLeft(node.left)
				node = this.rotateRight(node)
			}
		} else if (balance < -1) {
			if (
				this.setHeight(node.right.right) >
				this.setHeight(node.right.left)
			) {
				node = this.rotateLeft(node)
			} else {
				node.right = this.rotateRight(node.right)
				node = this.rotateLeft(node)
			}
		}
		if (node !== null) node.height = this.setHeight(node)
		return node
	}

	findMax(node = this.root) {
		if (node == null) {
			return node
		} else if (node.right == null) {
			return node
		} else {
			return this.findMax(node.right)
		}
	}

	findMin(node = this.root) {
		if (node == null) {
			return node
		} else if (node.left == null) {
			return node
		} else {
			return this.findMin(node.left)
		}
	}

	//Insert node
	insert(value) {
		var newNode = new Node(value)
		if (this.root === null) this.root = newNode
		else this.root = this.insertNode(this.root, newNode)
	}

	insertNode(node, newNode) {
		if (newNode.value < node.value) {
			if (node.left === null) node.left = newNode
			else node.left = this.insertNode(node.left, newNode)
		} else {
			if (node.right === null) node.right = newNode
			else node.right = this.insertNode(node.right, newNode)
		}
		node = this.balance(node)
		return node
	}

	//Deleting node
	remove(value) {
		this.root = this.removeNode(this.root, value)
	}

	removeNode(node, value) {
		if (node === null || typeof node === 'undefined') return null
		//TODO:Handle Error
		else if (value < node.value) {
			node.left = this.removeNode(node.left, value)
		} else if (value > node.value) {
			node.right = this.removeNode(node.right, value)
		} else {
			if (node.left === null && node.right === null) {
				node = null
			} else if (node.left === null) {
				node = node.right
			} else if (node.right === null) {
				node = node.left
			} else {
				var minNodeOfRight = this.findMin(node.right)
				node.value = minNodeOfRight.value

				node.right = this.removeNode(node.right, minNodeOfRight.value)
			}
		}
		node = this.balance(node)
		return node
	}

	//Temp FUnction TODO:REMOVE THIS
	inorder(node = this.root) {
		if (node !== null) {
			this.inorder(node.left)
			console.log(node.value, node.height)
			this.inorder(node.right)
		}
	}
}

/*
//Test
let a = new AVL()

a.insert(1)
a.insert(10)
a.insert(0)
a.insert(2)
a.insert(-1)
a.insert(-10)
a.insert(100)
a.insert(1000)
a.insert(-12452)
a.insert(26)
a.insert(-13)
a.insert(-106)

a.inorder()
console.log('After deleting')

a.remove(26)
a.remove(-13)
a.remove(-106)

// console.log(a.root)

a.inorder()
*/