export default class Content {
	constructor(config = {}) {
		this.pattern = config.pattern || 'any'
		this.createOwnId = config.createOwnId
		this.createOwnDate = config.createOwnDate
		const keys = [...this.pattern]
		const array = config.content.filter(el => this.validate(el)) || []
		if (this.createOwnId) {
			keys.push(this.createOwnId)
			this.counter = 0
			array.forEach(el => el[this.createOwnId] = this.counter++)
		} 
		if (this.createOwnDate) {
			keys.push(this.createOwnDate)
			array.forEach(el => el[this.createOwnDate] = this.getDate())
		}
		this.content = array
		keys.forEach(field => {
			this[`getBy${this.capitalize(field)}`] = function(...values) {
				return values.reduce((found, value) => {
					this.content.filter(el => el[field] === value) && found.push(...this.content.filter(el => el[field] === value))
					return found.length === 1 ? found[0] : found
				}, [])
			}
		})
	}

	capitalize([first, ...rest]) { return first.toUpperCase() + rest.join('') }
	validate(object) {
		if (this.pattern === 'any') return true
		let result = true
		this.pattern.forEach(el => !object.hasOwnProperty(el) ? result = false : null)
		let numberOfKeys = 0
		for (let key in object) object.hasOwnProperty(key) ? numberOfKeys++ : null
		return result && numberOfKeys === this.pattern.length
	}
	getDate() { return new Date(Date.now()).toLocaleString() }
	search(search, except = false) {
		return this.content.filter(el => {
			let result = true
			if (except) {
				for (let key in search) if (el[key] === search[key]) result = false
			} else {
				for (let key in search) if (el[key] !== search[key]) result = false
			}
			return result
		})
	}

	add(...items) {
		const pushing = el => {
			if (this.createOwnId) el[this.createOwnId] = this.counter++
			if (this.createOwnDate) el[this.createOwnDate] = this.getDate()
			this.content.push(el)
		}
		items.forEach(el => el instanceof Array 
			? el.forEach(el => this.validate(el) ? pushing(el) : null) 
			: this.validate(el) ? pushing(el) : null)
	}
	remove(search) {
		this.content = this.search(search, true)
	}
	edit(search, object) {
		this.search(search).forEach(el => {
			if (this.createOwnDate) el[this.createOwnDate] = this.getDate()
			for (let key in object) {
				el.hasOwnProperty(key) && this.pattern.find(el => el === key) !== -1 ? el[key] = object[key] : null
			}
		})
	}

	get getAll() { return this.content }
	get newFirst() { return this.content.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)) }
	get oldFirst() { return this.newFirst().reverse() }
}