function onSubmitTodo(e){
    e.preventDefault();
    const todo = document.querySelector(".input-todo").value
    const config = JSON.parse(localStorage.getItem("state"))
    config.todos.push(todo)
    localStorage.setItem("state",JSON.stringify(config))
    document.querySelector(".todolist-list").innerHTML = ""
    createTodos()
    document.querySelector(".input-todo").value = ""
}

function createTodos() {
    const todos = JSON.parse(localStorage.getItem("state")).todos

    todos.forEach(el => {
        const div = document.createElement('div')
        div.classList.add('list-item')

        const input = document.createElement('input')
        input.classList.add('todo-checkbox')
        input.type = "checkbox"
        input.name = "agree"
        input.value = "1"

        const li = document.createElement('li')
        li.textContent = el
        li.style.listStyle = "none"


        div.append(input, li)
        document.querySelector(".todolist-list").append(div)
    }
)}

function deleteToDo(e) {
    const config = JSON.parse(localStorage.getItem("state"))

    if (e.target.classList[0] === "todo-checkbox") {
        const todo = e.target.nextSibling.textContent

        const newConfig = config.todos.filter(block => block != todo)
        config.todos = newConfig
        localStorage.setItem("state",JSON.stringify(config))
        document.querySelector(".todolist-list").innerHTML = ""
        createTodos()
    }
}

document.querySelector(".todolist-list").addEventListener("click", deleteToDo)

export {onSubmitTodo, createTodos}