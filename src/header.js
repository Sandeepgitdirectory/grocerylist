//const Header =(props)=>{
    const Header=({title})=>{
        //the above both line will work same. the only change you have to do in jsx for 2 line is
        //the <p>{title}</p>  
      
          //adding inline css to javascript
      /* const styleheader ={
          backgroundColor: 'royalblue',
          color:'#fff'
      }; */
          return (
              // this represent our header section of our file
          <header /* style={styleheader} */>
             <p>{title}</p> 
          </header>
          )
      }
      
      //default props: these provide some default values to the props. If there is no value provided to props
      //in app.js then this value is loaded in the webpage else this value get override by the value provided by the user.
      Header.defaultProps={
          title:"Default Title"
      }
      
      export default Header