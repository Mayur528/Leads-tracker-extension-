
/*in this poject i learnt about working with small database by storing leads using chrome api and rendering it out on the web page */

let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("inputBtn")
const tabBtn = document.getElementById("tabBtn")//save the current tab
const deleteBtn = document.getElementById("deleteBtn")//delete stored values
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const ulEl = document.getElementById("ul-el")//to showcase the added values


//----------checking the value is truty or falsey ,if its falsey(null,0) it will not return anything 

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

//------------------------tab saving button--------------------------
/*working with chrome api to get the currentwindow tab , tabs[object].url,store the given value in localstorage */
tabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})


//-------------------------------Render function -----------------------------
//leads he ek input che parameter mhanun use kelya jail, i is an input value 
//create a for loop to in render funtion to render listitems as an link .(note-i willbe an object url mhanje i he ek lead ahe url chi)

function render(leads) {
    let listItems = ""
    for (i = 0; i < leads.length; i++) {
        listItems += `<li> <a target="_blank" href='${leads[i]}'>
    ${leads[i]}
    </a></li>`
    }
    ulEl.innerHTML = listItems
}

//-------------------------------delete button-----------------------------------

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})


//-------------------input button ----------------------------------------------

inputBtn.addEventListener("click", function () {
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))//saving the leads
    render(myLeads)
})
