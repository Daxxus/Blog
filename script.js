const inpName = document.querySelector(".searchName")
const inpEmail = document.querySelector(".searchEmail")
const inpBody = document.querySelector(".searchBody")

const btnDelete = document.querySelector(".btn-danger")
const btnCheck = document.querySelector(".btn-warning")
const btnLeft = document.querySelector(".btnLeft")
const btnRight = document.querySelector(".btnRight")
const tbody = document.querySelector("#data")
const select = document.querySelector("#select")
let page = 0
let trArray = []
let selectArray = []

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

// const comments = async () => {
// 	// const API = `https://jsonplaceholder.typicode.com/comments`
// 	const API = `https://jsonplaceholder.typicode.com/comments?_page=${page++}&_limit=2`
// 	try {
// 		const resp = await fetch(API)
// 		const data = await resp.json()
// 		processData(data)
// 	} catch (err) {
// 		console.error(err)
// 	}
// }
// const processData = (each) => {
// 	each.forEach((el) => {
// 		const tr = document.createElement("tr")
// 		tr.innerHTML += `
// 	        <td class="align-middle">${el.postId}</td>
// 	        <td id="name" class="align-middle">${el.name}</td>
// 	        <td id="email" class="align-middle">${el.email}</td>
// 	        <td id="body" class="align-middle">${el.body}</td>
// 	        <td><input type="checkbox" id="checkbox"></td>
// 	        `
// 		tbody.append(tr)
// 		trArray.push(tr)
// 	})
// }

const delRows = () => {
	trArray.forEach((el) => {
		const [...rowsArray] = el
		rowsArray.forEach((elem) => {
			const check = elem.lastElementChild.firstChild

			if (check.checked) {
				const indexArray = rowsArray.indexOf(elem)
				rowsArray.splice(indexArray, 1)
				elem.remove()
			}
		})
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
				// el.firstElementChild.classList.toggle('active')
				// middleChild.previousElementSibling.classList.toggle('active')
				// middleChild.nextElementSibling.classList.toggle('active')
				// middleChild.classList.toggle('active')

				el.firstElementChild.style.backgroundColor = "gold"
				middleChild.previousElementSibling.style.backgroundColor = "gold"
				middleChild.nextElementSibling.style.backgroundColor = "gold"
				middleChild.style.backgroundColor = "gold"
			}
		})
	})
}

const searchName = () => {
	trArray.forEach((el) => {
		const [...t] = el
		t.forEach((el) => {
			const nameContent = el.childNodes[1].innerHTML
			const regExpName = new RegExp(inpName.value, "i").test(nameContent)
			regExpName
				? (el.style.display = "table-row")
				: (el.style.display = "none")
		})
	})
}
const searchEmail = () => {
	trArray.forEach((el) => {
		const [...t] = el
		t.forEach((el) => {
			const emailContent = el.childNodes[2].textContent
			const regExpEmail = new RegExp(inpEmail.value, "i").test(emailContent)
			regExpEmail
				? (el.style.display = "table-row")
				: (el.style.display = "none")
		})
	})
}
const searchBody = () => {
	trArray.forEach((el) => {
		const [...t] = el
		t.forEach((el) => {
			const bodyContent = el.childNodes[3].textContent
			const regExpBody = new RegExp(inpBody.value, "i").test(bodyContent)
			regExpBody
				? (el.style.display = "table-row")
				: (el.style.display = "none")
		})
	})
}

const postsTitle = async () => {
	const APISelect = `https://jsonplaceholder.typicode.com/posts?_page=${page++}&_limit=100`
	try {
		const resp = await fetch(APISelect)
		const data = await resp.json()
		processSelectData(data)
	} catch (err) {
		console.error(err)
	}
}

const processSelectData = (data) => {
	data.forEach((post) => {
		const option = document.createElement("option")
		option.innerHTML = `
		<option>${post.title}</option>
		`
		select.append(option)
		selectArray.push(post.title)
	})
}

// 	//     Dodaj select który wyświetli tytuły postów, z API
// 	// a następnie spraw aby po wybraniu postu pokazywały się komentarze tylko do niego (filtrowanie po parametrze postId z /comments)
// }

btnCheck.addEventListener("click", curseWord)
btnDelete.addEventListener("click", delRows)
inpName.addEventListener("input", searchName)
inpEmail.addEventListener("input", searchEmail)
inpBody.addEventListener("input", searchBody)
btnRight.addEventListener("click", nextPage)
btnLeft.addEventListener("click", prevPage)
select.addEventListener("click", postsTitle)

// comments()

fetchingData()
