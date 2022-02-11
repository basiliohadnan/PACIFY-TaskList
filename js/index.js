var table = document.querySelector("table")
var btnAddTask = document.querySelector("#btn-add-task")

btnAddTask.addEventListener("click", (e) => {
    e.preventDefault()
    var form = document.querySelector("#task-form")
    var task = getTask(form)
    var errorList = validateTask(task)
    if (errorList.length > 0) {
        showErrorMessage(errorList)
        return
    }
    addTask(task)
    form.reset()
    var errorList = document.querySelector("#error-messages")
    errorList.innerHTML = ""
})

table.addEventListener("dblclick", (e) => {
    if (e.target.tagName == 'TD') {
        e.target.parentNode.classList.add("fadeOut")
        setTimeout(() => {
            e.target.parentNode.remove()
        }, 500)   
    }
})

var filter = document.querySelector("#filter-table")

filter.addEventListener("input", function() {
    var tasks = document.querySelectorAll(".task-item")
    if (this.value.length > 0) {
        tasks.forEach((task) => {
            var tdDescription = task.querySelector(".task-description")
            var description = tdDescription.textContent
            var expression = new RegExp(this.value, "i")
            if (expression.test(description)) task.classList.remove("invisible")
            else task.classList.add("invisible")
        }) 
    } else tasks.forEach((task) => task.classList.remove("invisible"))
})

function getTask (form)  {
    var task = {
        description: form.description.value,
        label: form.label.value,
        priority: form.priority.value,
        dueDate: form.duedate.value,
        dependencies: form.dependencies.value,
        externalUrl: form.externalurl.value
    }
    return task
}

function createTr(task) {
    var taskTr = document.createElement("tr")
    taskTr.classList.add("task-item")
    taskTr.appendChild(createTd(task.description, "task-description"))
    taskTr.appendChild(createTd(task.label, "task-label"))
    taskTr.appendChild(createTd(task.priority, "task-priority"))
    taskTr.appendChild(createTd(task.dueDate, "task-duedate"))
    taskTr.appendChild(createTd(task.dependencies, "task-dependencies"))
    taskTr.appendChild(createUrlTd(task.externalUrl, "task-externalurl"))
    return taskTr
}

function createUrlTd (value, _class) {
    var td = document.createElement("td")
    var a = document.createElement("a")
    a.href = value
    a.textContent = "Link"
    td.appendChild(a)
    td.classList.add(_class)
    return td
}

function createTd(value, _class) {
    var td = document.createElement("td")
    td.classList.add(_class)
    td.textContent = value
    return td
}

function addTask(task) {
    if (!validateTask(task))
        return
    
    var taskTr = createTr(task)
    var table = getTaskTable()
    table.appendChild(taskTr)
}

getTaskTable = () =>
    document.querySelector("#task-table")

function validateTask(task) {
    var errorList = []
    if (task.description.length == 0)
        errorList.push("Insira uma descrição válida!")
    return errorList
}

function showErrorMessage(errorList) {
    var ul = document.querySelector("#error-messages")
    ul.innerHTML = ""
    errorList.forEach((erro) => {
        var li = document.createElement("li")
        li.textContent = erro
        ul.appendChild(li)
    })
}