import List from './List';

//one level of prop drilling is done in the body component
//as we can see that the list of items is present in app.js and it has been accessed by the body component using props.

//passing the objects and functions in an component is called as destructuring as shown below.
const Body2 = ({items,handleCheck,handledelete}) => {
    return (
  <>
  {items.length?(
  <List
  items={items}
  handleCheck={handleCheck}
  handledelete={handledelete}
  />
  ):(
      <p style={{marginTop:'2rem'}}>Your list is empty</p>
  )}
  </>
    )
  }
  
  export default Body2