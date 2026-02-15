import "./FirstComponent.css";

function FirstComponent() {
    const heading = "React World";
/*
    // function declaration :
    function firstName(name){
        return name.toUpperCase();
    };
    // function expression:
    const firstName = function (name){
        return name.toUpperCase();
    };
    // arrow function:
    const firstName =(name)=>{
        return name.toUpperCase();

    }
*/
const firstName =()=>{
    name.toUpperCase();
}
  return (
    <>
    <h1 className="bg-dark"> Hello{firstName(heading)} </h1>
    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam placeat laborum blanditiis labore veritatis, laboriosam voluptas numquam non ab deleniti. Ipsum delectus temporibus tempore odit culpa illum expedita ipsam, exercitationem tempora! Eos, quisquam reiciendis?</p>
    <h2>Form</h2>
    <form>
        <label htmlFor="fname">FirstName:</label>
        <input type="text" id="fname" />
    </form>
    </>
    
  );
}

export default FirstComponent