class nodeTrie {
	constructor(key) {
		this.isEnd = false
		this.children = {}
		this.parent = null
		this.key = key
	}
}

class Trie {
	constructor() {
		this.root = new nodeTrie(null)
	}

	//Insert
	insert(word) {
		//TODO:Handle error
		if (word === '') return
		word = word.trim()
		word = word.toUpperCase()
		let node = this.root
		for (let i = 0; i < word.length; i++) {
			if (!node.children[word[i]]) {
				node.children[word[i]] = new nodeTrie(word[i])
				node.children[word[i]].parent = node
			}
			node = node.children[word[i]]
			if (i === word.length - 1) node.isEnd = true
		}
	}

	//SearchWord
	searchWord(word) {
		//TODO:Handle error
		if (word === '') return false
		word = word.trim()
		word = word.toUpperCase()
		let node = this.root
		for (let i = 0; i < word.length; i++) {
			if (!node.children[word[i]]) return false
			node = node.children[word[i]]
			if (i == word.length - 1) return node.isEnd
		}
		return false
	}

	//Delete word
	deleteWord(word) {
		//TODO:Handle error
		if (!this.searchWord(word)) return
		word = word.trim()
		word = word.toUpperCase()
		let node = this.root
		for (let i = 0; i < word.length; i++) {
			node = node.children[word[i]]
		}
		node.isEnd = false
		if (
			Object.keys(node.children).length === 0 &&
			node.children.constructor === Object
		) {
			node = node.parent
			for (let i = word.length - 1; i >= 0; i--) {
				if (node == this.root) {
					delete node.children[word[i]]
					break
				}
				if (node.isEnd) {
					delete node.children[word[i]]
					break
				}
				node = node.parent
			}
		}
	}

	//findPrefix
	findPrefix(word) {
		if (word === '') return false
		word = word.trim()
		word = word.toUpperCase()
		let node = this.root
		for (let i = 0; i < word.length; i++) {
			if (!node.children[word[i]]) return false
			node = node.children[word[i]]
		}
		return true
	}

	//Find all words
	findAllWords() {
		let node = this.root
		let allWords = []
		for (let i = 0; i < Object.keys(node.children).length; i++) {
			this.findAllWords2(
				node.children[Object.keys(node.children)[i]],
				allWords
			)
		}
		return allWords
	}

	findAllWords2(node, allWords, word = '') {
		word += node.key
		if (node.isEnd) allWords.push(word)
		for (let i = 0; i < Object.keys(node.children).length; i++) {
			this.findAllWords2(
				node.children[Object.keys(node.children)[i]],
				allWords,
				word
			)
		}
	}
}

//Testing
let t = new Trie()

console.log(words)
// var allWORDS 
// fetch(
// 	'./words.json'
// )
// 	.then(function(resp) {
//     resp.json()
//   })
// 	.then(function(data) {
//     console.log(data)
//   })

// console.log(allWORDS)

// t.insert('vandan')
// t.insert('van')
// t.insert('khushali')
// t.insert('Rita')
// t.insert('Shailesh')
// t.insert('Dev')
// t.insert('Jay')
// t.insert('ice')
// t.insert('icecream')
// t.insert('')
// // t.deleteWord('khushali')
// let prefix = t.findPrefix('ice')
// // console.log(prefix)
// let ans = t.findAllWords()
// console.log(ans)
// // ans = t.searchWord('VanDAN')
// // console.log(`CHeck VANdan: ${ans}`);

// // let ans
// ans = t.searchWord('Van')
// console.log(`CHeck VAN: ${ans}`);

// t.deleteWord('van')

// ans = t.searchWord('Van')
// console.log(`CHeck VAN: ${ans}`);

// ans = t.searchWord('Vandan')
// console.log(`CHeck VANDAN: ${ans}`);

// // console.log(t.root);
// // console.log(ans);
// console.log(t.root.children);
