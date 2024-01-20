 /*using state hooks: these generally used to control the states of the webpage.Means it assigns the default components on 
    webpage and helps in assigning the new values or components.
     for this we have to import usestate*/
     import {useState} from 'react'; 

     const Body=()=>{
     // using the state hooks.this will set the default name as sandeep.
     const [name,setName] =useState('Sandeep');
     const [count,setCount]=useState(0);
     //example of set state.
         const namechanges =()=>{
             const names=['aniket','tushar','gaurav'];
             const int =Math.floor(Math.random()*3);
             setName (names[int]); //on clicking the button names will be changed.
         } 
     //another example of set state : here on clicking the func is called it first executes consolelog value then set the value to new state.
         const handleclick3 =()=>{
             setCount(count+1);
             setCount(count+1);
             console.log(count);
         }
         
         // this function will instantly called whenever the jsx complied because it has been directly called in the jsx.there is no role
         //of pressing the button.
         const handleclick =()=>{
             console.log("you clicked it")
         }
         // this function will called only when the button is clicked, due anonymous function used in the jsx as shown
         // below
         const handleclick2 =(name)=>{
             console.log({name})
         }
     
         
         return(
         <main>
             <p>Good Morning {name}</p>
             <button onClick={namechanges}>change name</button>
             <button onClick={handleclick3}>change count</button>
     
     
             <button onClick={handleclick()}>Click it!</button>
             <button onClick={()=>handleclick2('Sandeep')}>Click it!</button>
         </main>
         )
     }
     export default Body