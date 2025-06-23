// Mobile nav menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'block' ? 'none' : 'block';
  });
  document.body.addEventListener('click', (e) => {
    if (window.innerWidth < 750 && e.target !== menuToggle && !navLinks.contains(e.target)) {
      navLinks.style.display = 'none';
    }
  });
}

// ToDo List Logic
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const taskCount = document.getElementById('task-count');
const completedCount = document.getElementById('completed-count');
const progressBar = document.getElementById('progress-bar');
const filterBtns = document.querySelectorAll('.filter-btn');

let todos = JSON.parse(localStorage.getItem('simple_todos') || '[]');
let filter = 'all';

function renderTodos() {
  if (!todoList) return;
  todoList.innerHTML = '';
  let filtered = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });
  filtered.forEach((todo, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    li.innerHTML = `
      <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-idx="${idx}"/>
      <span class="todo-text">${escapeHTML(todo.text)}</span>
      <div class="todo-actions">
        <button class="action-btn" title="Delete" data-action="delete" data-idx="${idx}">🗑️</button>
      </div>
    `;
    todoList.appendChild(li);
  });
  updateStats();
}
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'}[tag]));
}
function updateStats() {
  if (!taskCount || !completedCount || !progressBar) return;
  const total = todos.length;
  const completed = todos.filter(t => t.completed).length;
  taskCount.textContent = 'Tasks: ' + total;
  completedCount.textContent = 'Completed: ' + completed;
  progressBar.style.width = total ? (completed / total) * 100 + '%' : '0%';
}

if (todoForm && todoInput) {
  todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
      todos.push({ text, completed: false });
      todoInput.value = '';
      saveAndRender();
    }
  });
}

if (todoList) {
  todoList.addEventListener('click', e => {
    const idx = e.target.dataset.idx;
    if (e.target.classList.contains('todo-checkbox')) {
      todos[idx].completed = !todos[idx].completed;
      saveAndRender();
    }
    if (e.target.dataset.action === 'delete') {
      todos.splice(idx, 1);
      saveAndRender();
    }
  });
}

if (filterBtns.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filter = btn.dataset.filter;
      renderTodos();
    });
  });
}

function saveAndRender() {
  localStorage.setItem('simple_todos', JSON.stringify(todos));
  renderTodos();
}

document.addEventListener('DOMContentLoaded', () => {
  renderTodos();
});