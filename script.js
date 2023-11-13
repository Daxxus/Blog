const inpName = document.querySelector(".searchName")
const inpEmail = document.querySelector(".searchEmail")
const inpBody = document.querySelector(".searchBody")

const btnDelete = document.querySelector(".btn-danger")
const btnCheck = document.querySelector(".btn-warning")
const btnLeft = document.querySelector(".btnLeft")
const btnRight = document.querySelector(".btnRight")
const tbody = document.querySelector("#data")
const select = document.querySelector("#select")

let trArray = []
let pageSize = 5
let currentPage = 1
let paggArray = []

const fetchingData = async () => {
	const API = `https://jsonplaceholder.typicode.com/comments`

	try {
		const resp = await fetch(API)
		const data = await resp.json()
		processDataII(data)
	} catch (err) {
		console.error(err)
	}
}
const processDataII = (data) => {
	paggArray = data
	let eachRow
	paggArray
		.filter((row, index) => {
			let start = (currentPage - 1) * pageSize
			let end = currentPage * pageSize
			if (index >= start && index < end) return true
		})
		.forEach((el) => {
			eachRow += "<tr>"
			eachRow += `<td class="align-middle">${el.id}</td>`
			eachRow += `<td id="name" class="align-middle ">${el.name}</td>`
			eachRow += `<td id="email" class="align-middle">${el.email}</td>`
			eachRow += `<td id="body" class="align-middle">${el.body}</td>`
			eachRow += `<td><input type="checkbox" id="checkbox"></td>`
			;("</tr>")
		})

	tbody.innerHTML = eachRow
	trArray.push(tbody.children)
}

const prevPage = () => {
	if (currentPage > 1) {
		currentPage--
		fetchingData()
	}
}
const nextPage = () => {
	if (currentPage * pageSize < paggArray.length) {
		currentPage++
		fetchingData()
	}
}

const rows = () => {
	const dataRows = document.querySelectorAll("tbody > tr")
	Array.from(dataRows).forEach((el) => {
		const inputChecked = el.lastElementChild.firstChild
		if (inputChecked.checked) {
			// const indexArray = dataRows.indexOf(el)
			// dataRows.splice(indexArray, 1) //out of array
			el.remove()
		}
	})
}

const curseWord = () => {
	trArray.forEach((el) => {
		const [...t] = el
		t.forEach((el) => {
			const middleChild = el.querySelector("#email")
			const curseName = new RegExp("alias", "i").test(
				middleChild.previousElementSibling.innerHTML
			)
			const curseBody = new RegExp("harum", "i").test(
				middleChild.nextElementSibling.innerHTML
			)

			if (curseName || curseBody) {
				el.firstElementChild.style.backgroundColor = "gold"
				middleChild.previousElementSibling.style.backgroundColor = "gold"
				middleChild.nextElementSibling.style.backgroundColor = "gold"
				middleChild.style.backgroundColor = "gold"
			}
		})
	})
}

const search = (childIndex, value) => {
	trArray.forEach((el) => {
		const [...t] = el
		t.forEach((el) => {
			const nameContent = el.childNodes[childIndex].innerHTML
			const regExpName = new RegExp(value, "i").test(nameContent)
			regExpName
				? (el.style.display = "table-row")
				: (el.style.display = "none")
		})
	})
}

const postsTitle = async () => {
	const APISelect = `https://jsonplaceholder.typicode.com/posts?_page=&_limit=100`

	try {
		const resp = await fetch(APISelect)
		const data = await resp.json()
		processSelectData(data)
	} catch (err) {
		console.error(err)
	}
}

const processSelectData = (data) => {
	select.innerHTML = ` <option value="0" selected disabled>--Posts'title--</option> `
	data.forEach((post) => {
		const option = document.createElement("option")

		option.value = post.id
		option.innerText = post.title
		select.append(option)
	})
}

const getCommentForPosts = async () => {
	const value = select.value
	console.log(value)
	const APISelect = `https://jsonplaceholder.typicode.com/comments?postId=${value}`

	try {
		const resp = await fetch(APISelect)
		const data = await resp.json()
		displayPosts(data)
	} catch (err) {
		console.error(err)
	}
}

const displayPosts = (post) => {
	let eachRow
	tbody.innerHTML = ""
	Array.from(post).forEach((el) => {
		eachRow += "<tr>"
		eachRow += `<td class="align-middle">${el.postId}</td>`
		eachRow += `<td id="name" class="align-middle ">${el.name}</td>`
		eachRow += `<td id="email" class="align-middle">${el.email}</td>`
		eachRow += `<td id="body" class="align-middle">${el.body}</td>`
		eachRow += `<td><input type="checkbox" id="checkbox"></td>`
		;("</tr>")

		tbody.innerHTML = eachRow
	})
}

btnCheck.addEventListener("click", curseWord)
btnDelete.addEventListener("click", rows)
inpName.addEventListener("input", (e) => search(1, e.target.value))
// inpName.addEventListener("input", searchName)
inpEmail.addEventListener("input", (e) => search(2, e.target.value))
inpBody.addEventListener("input", (e) => search(3, e.target.value))
btnRight.addEventListener("click", nextPage)
btnLeft.addEventListener("click", prevPage)
select.addEventListener("click", postsTitle)
select.addEventListener("change", getCommentForPosts)

fetchingData()
