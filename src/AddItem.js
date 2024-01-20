import {FaPlus} from 'react-icons/fa';
import {useRef} from 'react';

//htmlfor is also used to provide focus to the html field. when you click on the label which contain an 'htmlfor=additem' it focuses on 
// the input as it has id=additem
const AddItem = ({newItem,setNewItem,handleSubmit}) => {
  const inputRef=useRef();
  return (
  <form className='addForm' onSubmit={handleSubmit}>
    <label htmlFor='addItem'>Add Item</label>
    <input
    autoFocus
    ref={inputRef}
    id='addItem'
    type='text'
    placeholder='Add Item'
    required
    value={newItem}
    onChange={(e)=>setNewItem(e.target.value)}
    />
    <button type='submit'
    onClick={()=>inputRef.current.focus()}>
      <FaPlus/>
    </button>
  </form>
  )
}

export default AddItem