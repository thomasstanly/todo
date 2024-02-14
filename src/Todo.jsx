import React,{useState,useRef,useEffect} from 'react'
import { MdOutlineDelete } from "react-icons/md";
import { MdOutlineEdit   } from "react-icons/md";
import { MdOutlineDone   } from "react-icons/md";
import { Tooltip } from 'react-tooltip'
import './Todo.css'

function Todo() {
    const [todo,setTodo] = useState('');
    const [todolist,setTodolist] = useState([]);
    const [validate,setValidate] = useState('');
    const [editId,setEditId] = useState(0)
    const inputRef = useRef(null);

    useEffect(()=>{
        inputRef.current.focus();
    })
    
    const handleSubmit = (event) => {
        event.preventDefault();
        if (todo.trim() === ''){
            setValidate('Enter your activity for today');
            return;
        }
        if (editId != 0){
            let change = todolist.map((list)=>{
                if (editId === list.id){
                    list.event = todo
                }
            })
            setEditId(0)
            setValidate('');
            setTodo('');
            return
        }
        setTodolist([...todolist,{event:todo,id:Date.now(),status:false}])
        setTodo('');
        setValidate('');

    }
    const onDelete = (id) =>{
        let remove = todolist.filter((list)=> list.id !== id)
        setTodolist(remove)
    }

    const onDone = (id) =>{
        let complete = todolist.map((list)=>{
            if (list.id === id){
                return ({...list,status:!list.status})
            }
            return list
        })
        setTodolist(complete)
    }

    const onEdit = (id) =>{
        let edit = todolist.find((to) => to.id === id)
        setTodo(edit.event)
        setEditId(edit.id)
    }
    
    return (
        <div className='container'>
            <Tooltip id="my-tooltip" />
            <h2>To Do App</h2>
            <form className="todo-form" onSubmit={handleSubmit}>
                <input className='form-control' value={todo}  type="text" placeholder='Enter your ....'  ref={inputRef} onChange={(e) => setTodo(e.target.value)}/>
                <button className="submit-button btn btn-success" >{editId?'Edit':'Add'}</button>
            </form>
            {validate && <p style={{color: 'white'}}>{validate}</p>}
            <div className="todo-list">
                <ul>
                    {
                        todolist.map((to,index) => (
                            <li key={index} className='form-control'>
                               <div className='todo-list'>
                                    <span className='done' >
                                        <MdOutlineDone id='done'
                                        data-tooltip-id="my-tooltip" 
                                        data-tooltip-content="Done" 
                                        data-tooltip-place="bottom"
                                        onClick={()=>onDone(to.id)}/>
                                    </span>
                                    <span className='todo' id={to.status ? 'strike-todo' : ''}>
                                        {to.event}
                                    </span>
                                    <span className='crud'>
                                        <MdOutlineEdit id='edit'
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="Edit" 
                                        data-tooltip-place="bottom"
                                        onClick={to.status ? '' : () => onEdit(to.id)}/>
                                        &nbsp; &nbsp;
                                        <MdOutlineDelete id='delete'
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content="Delete"
                                        data-tooltip-place="bottom"
                                        onClick={()=>onDelete(to.id)}/>
                                    </span>
                               </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Todo;