
import ItemLine from './ItemLine';


// two level prop drilling is done in the list components as we can see that items list is present in app.js
// then it has been accessed by the list using props.
//app.js--->body2.js---->list.js 
const List = ({items,handleCheck,handledelete}) => {
  return (
    <ul>
    {items.map((item)=>(
   <ItemLine
   key={item.id}
    item={item}
    handleCheck={handleCheck}
    handledelete={handledelete}
    />
   ))}
</ul>
  )
}

export default List
