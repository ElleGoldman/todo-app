let todos = [
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
function getUncompletedItem(title, index) {
    return `
        <li data-index="${index}">
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
function getCompletedItem(title, index) {
    return `
        <li class="is-completed" data-index="${index}">
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
    data.forEach((item, index) => {
        list.innerHTML += item.isCompleted
            ? getCompletedItem(item.title, index)
            : getUncompletedItem(item.title, index);
    })
}
generateTodos(todos);

// Search
const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('search');

function searchTodo(e) {
    e.preventDefault();
    const filteredTodos = todos.filter((item) => {
        return item.title.toLowerCase().includes(searchInput.value);
    })
    generateTodos(filteredTodos);
}
searchForm.addEventListener('submit', searchTodo);
searchInput.addEventListener('input', searchTodo);

// Add
const addButton = document.getElementById('add');
function addTodo() {
    const title = window.prompt('Enter Title')
    todos.unshift({
        title: title,
        isCompleted: false,
    })
    generateTodos(todos);
}
addButton.addEventListener('click', addTodo);

// -----------

function toggleTodoStatus(index) {
    todos[index].isCompleted = !todos[index].isCompleted
    generateTodos(todos);
}

function editTodo(index) {
    const newTitle = window.prompt('Update Title', todos[index].title)
    todos[index].title = newTitle;
    console.log(todos);
    generateTodos(todos);
}

function copyTodo(index) {
    todos.splice(index, 0, {...todos[index]});
    generateTodos(todos);
}

function deleteTodo(index) {
    todos = todos.filter((todo, i) => i !== index)
    generateTodos(todos);
}

list.addEventListener("click",function(e) {
    const index = +e.target.closest('li').getAttribute('data-index');
    
    const checkClicked = e.target.matches("span.task-status") || e.target.matches("i.fa-check");
    if (checkClicked) toggleTodoStatus(index);

    const editButtonClicked = e.target.matches("button.is-edit") || e.target.matches("i.fa-pen-to-square");
    if (editButtonClicked) editTodo(index);
    
    const copyButtonClicked = e.target.matches("button.is-copy") || e.target.matches("i.fa-copy");
    if (copyButtonClicked) copyTodo(index);

    const deleteButtonClicked = e.target.matches("button.is-danger") || e.target.matches("i.fa-trash");
    if (deleteButtonClicked) deleteTodo(index);
});