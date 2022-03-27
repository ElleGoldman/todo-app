const todos = [
    {
        title: 'Task 1',
        isCompleted: false,
    },
    {
        title: 'Task 2',
        isCompleted: false,
    },
    {
        title: 'Here can be some long title task',
        isCompleted: false,
    },
    {
        title: 'Task 4',
        isCompleted: false,
    },
    {
        title: 'Task 5',
        isCompleted: true,
    },
    {
        title: 'Task 6',
        isCompleted: true,
    },
];

// Markup
const list = document.getElementById('todosList');
function getUncompletedItem(title) {
    return `
        <li>
            <span class="task-status"></span>
            <p class="task-title">${title}</p>
            <div class="task-actions">
                <button class="is-edit"><i class="fa-solid fa-pen-to-square"></i></button>
                <button class="is-copy"><i class="fa-solid fa-copy"></i></button>
                <button class="is-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
        </li>
    `
}
function getCompletedItem(title) {
    return `
        <li class="is-completed">
            <span class="task-status">
                <i class="fa-solid fa-check"></i>
            </span>
            <p class="task-title">${title}</p>
            <div class="task-actions">
                <button class="is-danger"><i class="fa-solid fa-trash"></i></button>
            </div>
        </li>
    `
}
function generateTodos(data) {
    list.innerHTML = '';
    data.forEach((item) => {
        list.innerHTML += item.isCompleted
            ? getCompletedItem(item.title)
            : getUncompletedItem(item.title);
    })
}
generateTodos(todos);

// Search
const searchForm = document.getElementById('searchForm')
const searchInput = document.getElementById('search')

function searchTodo(e) {
    e.preventDefault();
    const filteredTodos = todos.filter((item) => {
        return item.title.toLowerCase().includes(searchInput.value)
    })
    generateTodos(filteredTodos);
}
searchForm.addEventListener('submit', searchTodo)
searchInput.addEventListener('input', searchTodo)
// Add
const addButton = document.getElementById('add')
function addTodo() {
    const title = window.prompt('Enter Title')
    todos.unshift({
        title: title,
        isCompleted: false,
    })
    generateTodos(todos);
}
addButton.addEventListener('click', addTodo)