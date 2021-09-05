export default function formatting(time, current, lang = 'en') {
	const date = new Date(time)
	
	const year = date.getFullYear()
	const month = date.getMonth() > 8 
		? date.getMonth() + 1 
		: `0${date.getMonth() + 1}`
	const day = date.getDate() > 9 
		? date.getDate() 
		: `0${date.getDate()}`

	const hour = date.getHours() > 9 
		? date.getHours() 
		: `0${date.getHours()}`
	const minute = date.getMinutes() > 9 
		? date.getMinutes() 
		: `0${date.getMinutes()}`

	const differenceMin = Math.floor((current - date)/60000)
	const differenceHour = Math.floor(differenceMin/60)
	const differenceDay = Math.floor(differenceHour/24)
	const differenceWeek = Math.floor(differenceDay/7)

	let minWord = 'minutes', hourWord = 'hours', dayWord = 'days', weekWord = 'weeks', ago = 'ago',
		justNow = 'just now', singleHour = 'An hour', singleDay = 'A day', singleWeek = 'A week'

	if (lang === 'ru') {	
		const getWord = (one, few, many, number) => {
			let word
			if (number <= 20) {
				if (number >= 2) {
					word = few
				}
				if (number >= 5) {
					word = many
				}
			} else {
				if (number%10 === 1) {
					word = one
				}
				if (number%10 > 1) {
					word = few
				}
				if (number%10 > 4 || number%10 === 0) {
					word = many
				}
			}
			return word
		}
	
		ago = 'назад'
		justNow = 'Только что'
		singleHour = 'Час'
		singleDay = 'День'
		singleWeek = 'Неделю'
		minWord = getWord('минуту', 'минуты', 'минут', differenceMin)
		hourWord = getWord('час', 'часа', 'часов', differenceHour)
		dayWord = getWord('день', 'дня', 'дней', differenceDay)
		weekWord = getWord('неделю', 'недели', 'недель', differenceWeek)
	} 

	if (differenceMin < 5) return justNow
	if (differenceMin <= 59) return `${differenceMin} ${minWord} ${ago}` 
	if (differenceHour === 1) return `${singleHour} ${ago}`
	if (differenceHour <= 23) return `${differenceHour} ${hourWord} ${ago}`
	if (differenceDay === 1) return `${singleDay} ${ago}`
	if (differenceDay <= 6) return `${differenceDay} ${dayWord} ${ago}`
	if (differenceWeek === 1) return `${singleWeek} ${ago}`
	if (differenceWeek > 1 && differenceWeek <= 3) return `${differenceWeek} ${weekWord} ${ago}`
	if (differenceWeek > 4) return `${day}.${month}.${year}`
}