
import Header from './header';
import SearchItem from './SearchItem';
import AddItem from './AddItem';
import Body2 from './Body2';
import Footer from './Footer';
import {useState,useEffect} from 'react'; 
import apiRequest from './apiRequest';

function App() {

  //localstorage is used in javascript to store the previous values present on the webpage.
  //after refreshing webpage we may get the previous data by default.
  //the below line actually represent the previous list of items stored in the localstorage.
  //const [items,setItems] =useState(JSON.parse(localStorage.getItem('shoppinglist')));

  //we can set the item using useffect. moreover  by using  useffect we can
  //also deal when we have to fetch the data from database.
  //you should not use dependency as [item] because it will create an endless loop of set the item.
/*   const [items,setItems] =useState([]);
  useEffect(()=>{
    setItems(JSON.parse(localStorage.getItem('shoppinglist')))
  },[]) */
  
   //this function set the state and stores it.
/*    const setAndSave=(newItems)=>{
    //this sets the state
    setItems(newItems);
    // this stores the state of the state.
    localStorage.setItem('shoppinglist',JSON.stringify(newItems));
   } */

   // we can perform the setAndSave func task by using useffect.
/*      const [items,setItems] =useState(JSON.parse(localStorage.getItem('shoppinglist'))|| []);
     useEffect(()=>{
      localStorage.setItem('shoppinglist',JSON.stringify(items))
     },[items]) */
   
     // till now we are fetching the data from the local storage but now we will fetch the data from the 
     // a particular json file using the useffect, async ,await fuctions.
    //for this we include the URL to our app.js file. URl of the json file can be created by typing the command "npx json-server -p 3500 -w folder_name/file_name"
    // after that URL will be created as ENDPOINT:url now you can use that url to fetch the JSON file
      const API_URL="http://localhost:3500/items";
      const [items,setItems] =useState([]);
      const [fetcherror,setFetcherror] =useState(null); // if error occurs it set the error.
      const [isloading,setIsloading]=useState(true); // it helps to simulate ,it helps to change the state while the data is loading

// fetching/get the data from Json file. the method get,post,patch,delete these are called as the crud operations.
      useEffect(()=>{
       const fetchItems=async()=>{
        try{
          const response=await fetch(API_URL);
          if(!response.ok) throw Error('Did not received data');
          const listItems =await response.json();
          setItems(listItems)
          setFetcherror(null); // if message properly received then set the error as null.
        }catch(err){
         setFetcherror(err.message);  // if error occur then set the message of error
        }
        finally{
          setIsloading(false);
        }
       }  
    setTimeout(()=>{
      (async()=>await fetchItems())();
    },2000)
      },[])

   //this function makes the checkbox ticked or unticked
   const handleCheck= async (id)=>{
    const listitems=items.map((item)=>item.id===id?{...item,
    checked:!item.checked}:item);
    setItems(listitems);

    //updating/PATCH the items in our json file . 
    //when we tick our items its checked status will change from false->true.
    const myItem=listitems.filter((item)=> item.id===id);
    const updateOptions={
      method:'PATCH',
      headers:{
        'Content-Type':'application/JSON'
      },
      body:JSON.stringify({checked: myItem[0].checked})
    }
    const reqUrl=`${API_URL}/${id}`; // in updating there is a change in specific item due to which it cannot directly fetch the url from apiurl, so a new url is created which also specify id in which change has to be done. 
    const result=await apiRequest(reqUrl,updateOptions);
    if(result) setFetcherror(result);
   }

   //this function deletes the items from the webpage
   const handledelete=async(id)=>{
    const listitems=items.filter((item)=>item.id!==id);
    setItems(listitems);  

    // deleting the items from the json file
    const updateOptions={
      method:'DELETE',
      headers:{
        'Content-Type':'application/JSON'
      },
    }
    const reqUrl=`${API_URL}/${id}`; // in updating there is a change in specific item due to which it cannot directly fetch the url from apiurl, so a new url is created which also specify id in which change has to be done. 
    const result=await apiRequest(reqUrl,updateOptions);
    if(result) setFetcherror(result);
   }


    //creating a controlled input for the list using usestate hooks
   const [newItem,setNewItem] =useState('')
   // function for adding the elements
   const addItem= async(item)=>{
    const id=items.length?items[items.length-1].id+1:1;
    const myNewItem={id,checked:false,item};
    const listitems=[...items,myNewItem];
    setItems(listitems);
 
//to post/add the data into our local json data file
const postOption={
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body: JSON.stringify(myNewItem)
}
const result=await apiRequest(API_URL,postOption);
if(result) setFetcherror(result) // since in our apirequest func the error is properly defined so we can just set that error here.
   }

   //the below function add the new item and the changes back the state to empty.
   const handleSubmit=(e)=>{
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem);
    setNewItem('');
   }

   //creating state hooks for searching an item in the list
   const [search,setSearch] =useState('');

  return (
    <div className="App">
     <Header title="Grocery List"/>

     <AddItem
     newItem={newItem}
     setNewItem={setNewItem}
     handleSubmit={handleSubmit}
     />

     <SearchItem
     search={search}
     setSearch={setSearch}
     />

    <main>
      {isloading && <p>Loading Items...</p>}
      {fetcherror && <p style={{color:'red'}}>{'Error : did not receive the data'}</p>}
    {!fetcherror && !isloading && <Body2 
     items={items.filter(item=>((item.item).toLowerCase()).includes
      (search.toLowerCase()))
    //the above code basically an prop 'items={items}' in which we have applied an filter javascript function
    //which help to search an item if  letter entered in search box are matched with the letters of item.  
    }
     handleCheck={handleCheck}
     handledelete={handledelete}
     />
  }
    </main>

     <Footer 
     length={items.length}/>

    </div>
  );
}

export default App;

