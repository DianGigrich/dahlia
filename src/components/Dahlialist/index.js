import React,{useState,useEffect} from 'react'
import API from '../../utils/API'

export default function DahliaList(props) {
    const [newItem, setNewItem] = useState("")
    const [newItemPriority, setNewItemPriority] = useState("med")
    const [tasks, setTasks] = useState([
       
    ])
    useEffect(()=>{
        API.getUserTodos(props.userId).then(data=>{
            console.log(data)
            setTasks(data.Todos)
        })
    },[props.userId])

    const handleFormSubmit = e=>{
        e.preventDefault();
        const newTask = {
            task:newItem,
            priority:newItemPriority,
            isComplete:false
        }
        setNewItem("")
        setNewItemPriority("med")
       API.createTodo(newTask,props.token).then(newTodoData=>{
        API.getUserTodos(props.userId).then(data=>{
            setTasks(data.Todos)
        })
       })
    }

    const deleteTask = id=>{
       API.deleteTodo(id,props.token).then(del=>{
        API.getUserTodos(props.userId).then(data=>{
            setTasks(data.Todos)
        })
       })
    }
    const editTask = (id,newTask)=>{
        API.editTodo(newTask,id,props.token).then(updateData=>{
            API.getUserTodos(props.userId).then(data=>{
                setTasks(data.Todos)
            })
        })
    }
  return (
    <div className="DahliaList">
        <form onSubmit={handleFormSubmit}>
            <input name="newItem" placeholder="new item!" value={newItem} onChange={e=>setNewItem(e.target.value)}/>
            <select value={newItemPriority} onChange={e=>setNewItemPriority(e.target.value)}>
                <option value="low">Low Priority</option>
                <option value="med">Medium Priority</option>
                <option value="high">High Priority</option>
            </select>
            <button>Add to list!</button>
        </form>
        <ul>
            {tasks.map((item)=><BucketItem 
            key={item.id} 
            id={item.id} 
            task={item.task} 
            priority={item.priority} 
          
            deleteTask={deleteTask} 
            editTask={editTask} 
            isComplete={item.isComplete}/>)}
        </ul>
    </div>
  )
}
