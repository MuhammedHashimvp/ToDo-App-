import React from 'react'
import './Todo.css'
import { useState, useRef, useEffect } from 'react'
import { MdDelete, MdDoneAll } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { IoMdDoneAll } from "react-icons/io";




function Todo() {
    const [input, setInput] = useState('')
    const [todos, setTodos] = useState([])
    const [editId,setEditID]=useState(0)

    const handlesubmit = (e) => {
        e.preventDefault();
    }

    const addTodo = () => {
       if(input!==''){
        setTodos([...todos, {list:input,id:Date.now(),status:false} ]);
        console.log(todos)
        setInput('')
       }
       if(editId){
        const editTodo=todos.find((input)=>input.id==editId)
        const updateTodo=todos.map((val)=>val.id===editTodo.id
        ?(val={id:val.id,list:input})
        :(val={id:val.id,list:val.list}))
        setTodos(updateTodo)
        setEditID(0);
        setInput('')
       }
    }


    const inputRef = useRef('null')

    useEffect(() => {
        inputRef.current.focus();
    })

    const onDelete=(id)=>{
        setTodos(     todos.filter((val)=>val.id !==id))
    }

    const onComplete=(id)=>{
    let complete=todos.map((list)=>{
        if(list.id===id){
            return({...list,status:!list.status})
        }
        return list
    })
    setTodos(complete)
    }

    const onEdit=(id)=>{
       const editTodo= todos.find((val)=>val.id===id)
       setInput(editTodo.list)
       setEditID(editTodo.id)
    }



    return (
        <div className='container'>
            <h2 >
                TODO APP
            </h2>
            <form className='form-group' onSubmit={handlesubmit}>
                <input type="text" value={input} ref={inputRef} placeholder='Enter Your TODO' className='form-control' onChange={(event) => setInput(event.target.value)} />
                <button onClick={addTodo}>{editId ? 'EDIT':'ADD'}</button>
            </form>
            <div className='list'>
                <ul>
                    {
                        todos.map((val) => (
                            <li className='list-items'>
                                <div className='list-item-list' id={val.status? 'list-item' :""}>{val.list}</div>
                                <span>
                                    <FaEdit className='list-item-icons' id='edit' title='edit' onClick={()=>onEdit(val.id)} />
                                    <MdDelete className='list-item-icons' id='delete' title='delete' onClick={()=>onDelete(val.id)} />
                                    <IoMdDoneAll className='list-item-icons' id='complete' title='complete' onClick={()=>onComplete(val.id)} />
                                </span>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Todo