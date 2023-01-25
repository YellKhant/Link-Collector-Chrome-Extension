let links = []
const inputEl = document.querySelector("#input-el")
const saveBtn = document.querySelector("#save-btn")
const tabBtn = document.querySelector("#tab-btn")
const removeBtn = document.querySelector("#remove-btn")
const deleteBtn = document.querySelector("#delete-btn")
const ulEL= document.querySelector("#ul-el")
const linksFromLocalStorage = JSON.parse(localStorage.getItem("links")) //array

if (linksFromLocalStorage) {
    links = linksFromLocalStorage
    render(links)
}

function render(links) {
    let linksList = ""
    for (let i = 0; i < links.length; i++) {
        linksList += 
        `<li> 
            <a href="${links[i]}" target="_blank">
                ${links[i]} 
            </a> 
        </li>`
    }
    ulEL.innerHTML = linksList
}

saveBtn.addEventListener("click", function() {
    links.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("links", JSON.stringify(links))
    render(links)
})


tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        links.push(tabs[0].url)
        localStorage.setItem("links", JSON.stringify(links))
        render(links)
    })
})

removeBtn.addEventListener("dblclick", function() {
    localStorage.links = JSON.stringify(linksFromLocalStorage.slice(0, -1))
    // + start = remove from first
    // - start = get from last
    // + end = get from first
    // - end = remove from last
    links.pop()
    render(links)
})

deleteBtn.addEventListener("dblclick", function() {
    localStorage.clear("links")
    links = []
    render(links)
})




