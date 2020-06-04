var black = 0
var red = 1

class NullNode {
	constructor() {
		this.color = black
		this.isNull = true
		this.parent = null
	}
}

class Node {
	constructor(value) {
		let newNullNode = new NullNode()
		newNullNode.parent = this
		this.value = value
		this.color = red
		this.right = newNullNode
		this.left = newNullNode
		this.parent = null
		this.isNull = false
	}
}

//TODO: RBT STARTS TODO://
class RedBlackTree {
	constructor() {
		let newNullNode = new NullNode()
		this.root = newNullNode
	}

	//Helper functions
	//Rotate right
	rotateRight(node, toRecolor) {
		let parent = node.parent
		node.parent = parent.parent
		if (parent.parent !== null) {
			if (parent.parent.left === parent) {
				parent.parent.left = node
			} else {
				parent.parent.right = node
			}
		}
		let right = node.right
		node.right = parent
		parent.parent = node
		parent.left = right
		right.parent = parent
		if (toRecolor) {
			node.color = black
			parent.color = red
		}
	}

	//Rotate left
	rotateLeft(node, toRecolor) {
		let parent = node.parent
		node.parent = parent.parent
		if (parent.parent !== null) {
			if (parent.parent.right === parent) {
				parent.parent.right = node
			} else {
				parent.parent.left = node
			}
		}
		let left = node.left
		node.left = parent
		parent.parent = node
		parent.right = left
		left.parent = parent
		if (toRecolor) {
			node.color = black
			parent.color = red
		}
	}

	//Find sibling
	siblingOf(node) {
		if (node.parent === null) return null
		if (node.parent.left === node) {
			return node.parent.right
		} else {
			return node.parent.left
		}
	}

	//Finding min value
	findMin(node = this.root) {
		if (node.isNull) {
			//TODO:Handle Error
			return node
		} else if (node.left.isNull) {
			return node
		} else {
			return this.findMin(node.left)
		}
	}

	//Insert
	insert(value) {
		this.root = this.insertNode(null, this.root, value)
	}

	//Insert helper function
	insertNode(parent, node, value) {
		if (node.isNull) {
			let newNode = new Node(value)
			if (parent === null) {
				newNode.color = black
				return newNode
			} else {
				newNode.parent = parent
				return newNode
			}
		}

		if (typeof node === 'Node' && node.value === value) {
			//TODO:Handle error
			return node
		}

		let isLeft
		if (node.value > value) {
			let left = this.insertNode(node, node.left, value)
			if (left === node.parent) {
				return left
			}
			node.left = left
			isLeft = true
		} else {
			let right = this.insertNode(node, node.right, value)
			if (right === node.parent) {
				return right
			}
			node.right = right
			isLeft = false
		}

		if (isLeft) {
			if (node.left.color === red && node.color === red) {
				let sibling = this.siblingOf(node)
				if (sibling.color === black || sibling.isNull) {
					if (node.parent.left === node) {
						this.rotateRight(node, true)
					} else {
						this.rotateRight(node.left, false)
						node = node.parent
						this.rotateLeft(node, true)
					}
				} else {
					node.color = black
					sibling.color = black
					if (node.parent.parent != null) {
						node.parent.color = red
					}
				}
			}
		} else {
			if (node.right.color === red && node.color === red) {
				let sibling = this.siblingOf(node)
				if (sibling.color === black || sibling.isNull) {
					if (node.parent.right === node) {
						this.rotateLeft(node, true)
					} else {
						this.rotateLeft(node.left, false)
						node = node.parent
						this.rotateRight(node, true)
					}
				} else {
					node.color = black
					sibling.color = black
					if (node.parent.parent != null) {
						node.parent.color = red
					}
				}
			}
		}
		return node
	}

	//Delete Node
	remove(value, node = this.root) {
		if (node.isNull) {
			//TODO:Handle error
			return
		}
		if (node.value === value) {
			if (node.left.isNull || node.right.isNull) {
				this.deleteOneChild(node)
			} else {
				let smallestRight = this.findMin(node.right)
				node.value = smallestRight.value
				this.remove(smallestRight.value, smallestRight)
			}
		} else if (node.value > value) {
			this.remove(value, node.left)
		} else {
			this.remove(value, node.right)
		}
	}

	//Delete helper functions
	deleteOneChild(node) {
		let child

		if (node.left.isNull) {
			child = node.right
		} else {
			child = node.left
		}
		this.replaceChild(child, node)
		if (node.color === black) {
			if (child.color === red) child.color = black
			else this.deleteCase1(child)
		}
	}

	//All cases
	deleteCase1(node) {
		if (node.parent === null) {
			this.root = node
			return
		}
		this.deleteCase2(node)
	}

	deleteCase2(node) {
		let sibling = this.siblingOf(node)
		if (sibling.color === red) {
			if (sibling.parent.left === sibling)
				this.rotateRight(sibling, true)
			else this.rotateLeft(sibling, true)
			if (sibling.parent === null) this.root = sibling
		}
		this.deleteCase3(node)
	}

	deleteCase3(node) {
		let sibling = this.siblingOf(node)
		if (
			node.parent.color === black &&
			sibling.color === black &&
			sibling.left.color === black &&
			sibling.right.color === black
		) {
			sibling.color = red
			this.deleteCase1(node.parent)
		} else {
			this.deleteCase4(node)
		}
	}

	deleteCase4(node) {
		let sibling = this.siblingOf(node)
		if (
			node.parent.color === red &&
			sibling.color === black &&
			sibling.left.color === black &&
			sibling.right.color === black
		) {
			sibling.color = red
			node.parent.color = back
			return
		} else {
			this.deleteCase5(node)
		}
	}

	deleteCase5(node) {
		let sibling = this.siblingOf(node)
		if (sibling.color === black) {
			if (
				node.parent.left === node &&
				sibling.right.color === black &&
				sibling.left.color === red
			) {
				this.rotateRight(sibling.left, true)
			} else if (
				node.parent.left === node &&
				sibling.left.color === black &&
				sibling.right.color === red
			) {
				this.rotateLeft(sibling.right, true)
			}
		}
		this.deleteCase6(node)
	}
	
	deleteCase6(node) {
		let sibling = this.siblingOf(node)
		sibling.color = sibling.parent.color
		sibling.parent.color = black
		if (node.parent.left === node) {
			sibling.right.color = black
			this.rotateLeft(sibling, false)
		} else {
			sibling.left.color = black
			this.rotateRight(sibling, false)
		}
		if (sibling.parent === null) {
			this.root = sibling
		}
	}

	replaceChild(child, node) {
		child.parent = node.parent
		if (node.parent === null) this.root = child
		else {
			if (node.parent.left === node) {
				node.parent.left = child
			} else {
				node.parent.right = child
			}
		}
	}

	//search
	search(value, node = this.root) {
		if (node.isNull) return false
		else if (node.value === value) return true
		else if (node.value > value) return this.search(value, node.left)
		else return this.search(value, node.right)
	}

	//Temp FUnction TODO:REMOVE THIS
	inorder(node = this.root) {
		if (!node.isNull) {
			this.inorder(node.left)
			console.log(node.value, node.color)
			this.inorder(node.right)
		}
	}
}

//testing
let rb = new RedBlackTree()

// rb.insert(1)
// rb.insert(2)
// rb.insert(10)
// rb.insert(8)
// rb.insert(7)
// rb.insert(5)
// rb.insert(-10)
// rb.insert(-11)
// rb.insert(-1)
// rb.insert(200)
// rb.insert(50)

// console.log(rb.root.right.right)
// rb.inorder()

//DELETE TEST
//case 4
// rb.insert(10)
// rb.insert(-10)
// rb.insert(30)
// rb.insert(20)
// rb.insert(38)

// rb.inorder()
// rb.remove(20)
// console.log('After');

// rb.inorder()

//case 6
// rb.insert(10)
// rb.insert(-10)
// rb.insert(30)
// rb.insert(25)
// rb.insert(40)

// rb.inorder()
// rb.remove(-10)
// console.log('After');
// rb.inorder()
// console.log(rb.root)

//case 3 and 1
// rb.insert(10)
// rb.insert(-10)
// rb.insert(30)

// rb.inorder()
// rb.remove(-10)
// console.log('After');

// rb.inorder()

//case 3, 5, 6
// rb.insert(10)
// rb.insert(-30)
// rb.insert(50)
// rb.insert(-40)
// rb.insert(-20)
// rb.insert(30)
// rb.insert(70)
// rb.insert(15)
// rb.insert(40)

// rb.inorder()
// rb.remove(-40)
// console.log('After');
// rb.inorder()
// console.log(rb.root.right.left);

//case 2
rb.insert(10)
rb.insert(-10)
rb.insert(40)
rb.insert(-20)
rb.insert(-5)
rb.insert(20)
rb.insert(60)
rb.insert(50)
rb.insert(80)
console.log(rb.search(10))
// rb.inorder()
rb.remove(10)
console.log(rb.search(10))
// console.log('after');

// rb.inorder()
// console.log(rb.root.right.left);
