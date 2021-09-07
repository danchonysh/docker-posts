import axios from 'axios'

class Api {
  	constructor({ headers = {}, auth = {}, api_url = '' }) {
		this.headers = headers
		this.api_url = api_url
		this.auth = auth
		this.instance = axios.create({
			baseURL: api_url,
			timeout: 60000
		})
		this.instance.interceptors.request.use(response => ({ 
			...response, 
			headers: { ...response.headers, ...this.headers }
		}))
  	}

	setError = (key, fun = () => {}) => {
		this.error[key] = fun
	}

	updateHeader = (headers = {}) => {
		this.headers = Object.assign({}, headers)
	}

	setHeader = (headers = {}) => {
		this.headers = Object.assign({}, this.headers, headers)
	}

	async request(params) {
		return await this.instance.request(params) 
	}

	simpleApi(url) {
		return {
			list: async () => {
				const res = await this.request({ url, method: 'GET' })
				return res.data
			},
			get: async _id => {
				const res = await this.request({ url: `${url}/${_id}`, method: 'GET' })
				return res.data
			},
			post: async data => {
				const res = await this.request({ url, method: 'POST', data })
				return res.data
			},
			delete: async _id => {
				const res = await this.request({ url: `${url}/${_id}`, method: 'DELETE' })
				return res.data
			},
			patch: async (_id, data) => {
				const res = await this.request({ url: `${url}/${_id}`, method: 'PATCH', data })
				return res.data
			},
		}
	}
}

export default Api