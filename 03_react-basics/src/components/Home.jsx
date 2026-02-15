// import "./FirstComponent.css";
import styles from "./Home.module.css"
import styles2 from "./Home2.module.css"
function Home({namesProps}) {
    console.log(namesProps);

    const  cssStyles ={
        backgroundColor:"lightblue",
        fontFamily:"sans-serif",
        margin:"1rem",
        padding:"1rem",
    };
// const isDarkmode=true;
  return (
    <div>
       <header
        // {/* style={cssStyles} */}
        style={{
            backgroundColor:"lightblue",
            fontFamily:"sans-serif",
            margin:"1rem",
            padding:"1rem",
        }}
        // {/* className={isDarkmode ? "bg-dark" :null}
        //  className={isDarkmode && "bg-dark" }
        // className={`container ${isDarkmode &&"bg-dark"}`}
        // className={`container ${isDarkmode ? "bg-dark" :""}`}
        // className={`container ${isDarkmode ? "bg-dark" :null}`} */}

        className ={`${styles.container} ${styles2["bg-dark"]}`}
        //{/* className={`${styles.container} ${isDarkmode ? styles2["bg-dark"] :""}`} */}
        >
        <h1>
            {namesProps.map((value,index)=>{
            return(
                <div key={index}>
                    <h1>{value}</h1>
                    </div>
            )
        })}
        </h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita impedit facere repudiandae commodi? Perspiciatis veritatis facere animi illo soluta consectetur labore modi ipsa, molestiae error sit, itaque natus quisquam voluptates id est quas fuga.</p>
        <nav>
            <ul>
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
        </nav>
       </header>
    </div>
  );
}

export default Home;
// if we dont write default.
// export {Home};
// In one file we can only default Export one component.