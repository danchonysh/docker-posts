const toLocal = (item, store) => localStorage.setItem(store, JSON.stringify(item))

export default toLocal