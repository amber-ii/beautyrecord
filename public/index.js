//selectors
let todoInput = document.querySelector('.todo-input')
let todoButton = document.querySelector('.todo-button')
let todoList = document.querySelector('.todo-list')
let txtDate = document.querySelector('.todo-input1')
let txtWeight = document.querySelector('.todo-input2')
let filterSelect = document.querySelector('.filter-todo')
let totalGrade = document.querySelector('.totalGrade')



//Event Listeners
document.addEventListener('DOMContentLoaded', getTodo)
document.addEventListener('DOMContentLoaded', countLose)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)
filterSelect.addEventListener('click', filterTodo)


//Functions
function addTodo(event) {
    event.preventDefault()
        // 新增
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    const newTodo = document.createElement('li')

    newTodo.innerText = txtDate.value + " " + txtWeight.value
        // newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    saveLocalTodos(txtDate.value + ' ' + txtWeight.value)


    // CHECKED
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class="bi bi-check-square"></i>'
    completedButton.classList.add('complete-btn')
    todoDiv.appendChild(completedButton)



    // 刪除
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="bi bi-trash-fill"></i>'
    trashButton.classList.add('trash-btn')
    todoDiv.appendChild(trashButton)
    todoList.appendChild(todoDiv)
    txtDate.value = ''
    txtWeight.value = ''
}


function deleteCheck(e) {
    const item = e.target
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement
        todo.classList.add('fall')
        todo.addEventListener('transitionend', function() {
            todo.remove()
        })
        removeLocalTodo(todo)
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}


function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(todo => {
        switch (e.target.value) {
            case 'all':
                todo.style.display = 'flex'
                break
            case 'gotit':
                if (todo.classList.contains("completed")) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
            case 'fight':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break
        }
    })
}


function saveLocalTodos(todos) {
    let todo
    if (localStorage.getItem('todo') === null) {
        todo = []
    } else {
        todo = JSON.parse(localStorage.getItem('todo'))
    }

    todo.push(todos)
    localStorage.setItem('todo', JSON.stringify(todo))
}

function getTodo() {
    let todo
    if (localStorage.getItem('todo') === null) {
        todo = []
    } else {
        todo = JSON.parse(localStorage.getItem('todo'))
    }

    todo.forEach((todos) => {
        const todoDiv = document.createElement('div')
        todoDiv.classList.add('todo')
        const newTodo = document.createElement('li')
        newTodo.innerText = todos
        newTodo.classList.add('todo-item')
        todoDiv.appendChild(newTodo)

        // CHECKED
        const completedButton = document.createElement('button')
        completedButton.innerHTML = '<i class="bi bi-check-square"></i>'
        completedButton.classList.add('complete-btn')
        todoDiv.appendChild(completedButton)

        // 刪除
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="bi bi-trash-fill"></i>'
        trashButton.classList.add('trash-btn')
        todoDiv.appendChild(trashButton)
        todoList.appendChild(todoDiv)
    })

}

function removeLocalTodo(value) {
    let todo
    if (localStorage.getItem('todo') === null) {
        todo = []
    } else {
        todo = JSON.parse(localStorage.getItem('todo'))
    }
    const todoIndex = value.children[0].innerText
    todo.splice(todo.indexOf(todoIndex), 1)
    localStorage.setItem('todo', JSON.stringify(todo))
}

const dateDiff = (a, b) => parseInt(Math.abs(new Date(a) - new Date(b)) / 1000 / 60 / 60 / 24)
const roundDecimal = function(val, precision) {
    return Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) / Math.pow(10, precision || 0)
}

function countLose() {
    let kg = 0;
    let days = 0;
    if (todoList.children[0]) {
        let todoFirst = todoList.children[0].innerText
        let todoLast = todoList.children[todoList.childNodes.length - 1].innerText
        todoFirst = todoFirst.split(' ')
        todoLast = todoLast.split(' ')
        kg = roundDecimal(todoFirst[1] - todoLast[1], 1)
        days = dateDiff(todoLast[0], todoFirst[0])
        totalGrade.innerHTML = `歷經 ${days} 天，共減了 ${kg} 公斤，很不錯唷`
    }
}