import React, { useState } from 'react'

const Todo = () => {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [sortTodo, setSortTodo] = useState(1);
    const [search, setSearch] = useState('');


    function debounce(cb, d) {
        let timer;
        return function (...args) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                cb(...args);
            }, d)
        }
    };

    const debounceSearch = debounce((val) => {
        // console.log('searchVal', search);
    }, 2000)

    const handleSearch = (e) => {
        setSearch(e.target.value);

        console.log('searchVal', search);
        debounceSearch()

    }

    const handleAddTodo = () => {
        if (todo.trim()) {
            const newTodo = { id: new Date(), task: todo, completed: false };
            setTodos([...todos, newTodo]);
            setTodo(' ')
        } else {
            alert('Write something');
        }
    }

    const handleDelete = (id) => {
        setTodos(todos.filter((item) => item.id !== id))
    }

    const handleCompleteTodo = (id) => {
        setTodos(todos.map(item => (item.id === id ? { ...item, completed: !item.completed } : item)));
    }

    const handleSort = () => {
        const sortedTodo = todos.sort((a, b) => {
            if (sortTodo === 1) {
                return a.task.toLowerCase() > b.task.toLowerCase() ? 1 : -1;
            } else {
                return a.task.toLowerCase() < b.task.toLowerCase() ? 1 : -1;
            }
        });
        setTodos(sortedTodo)
        setSortTodo(sortTodo === 1 ? -1 : 1)
    }
    return (
        <>
            <input type="text" placeholder='Search' value={search} onChange={handleSearch} className='border-2 border-black' />
            <button onClick={handleSort}>Sort Todo</button> <br />
            <div className="flex">
                <input type="text" placeholder='Enter Todo' value={todo} onChange={(e) => setTodo(e.target.value)} className='border border-black' />
                <button onClick={handleAddTodo}>Add Todo</button>
            </div>
            {todos && todos.map((todo) => (
                <div>
                    <div className="flex gap-4 p-2 items-center">
                        <input type="checkbox" value={todo} onChange={() => handleCompleteTodo(todo.id)} />
                        <div className={`${todo.completed ? 'line-through' : 'text-gray-900'}`}>{todo.task}</div>
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </div>
                </div>
            ))}

        </>
    )
}

export default Todo
