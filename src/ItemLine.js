import React from 'react'
import{ FaTrashAlt } from 'react-icons/fa';

//this is three level prop drilling
//app.js--->body2.js---->list.js---->itemline.js
//as we move more deeper we have to provide an key to the childs.If we don't do that it
//will throw error in console
const ItemLine = ({item,handleCheck,handledelete}) => {
  return (
    <li className='item'>
    <input type="checkbox"  
    onChange={()=>handleCheck(item.id)} 
    checked={item.checked}/>

    <label style={(item.checked)?{textDecoration:'line-through'}:null} 
    onDoubleClick={()=>handleCheck(item.id)}>{item.item}</label>
    
   <FaTrashAlt  
   onClick={()=>handledelete(item.id)} 
   role="button" 
   tabIndex="0"
   />
    </li>
  )
}

export default ItemLine