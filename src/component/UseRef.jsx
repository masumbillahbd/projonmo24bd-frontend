import {React} from 'react';
import { useRef } from 'react';

const UseRef = () => {

    let myHeadline = useRef();
    let myHeadline2 = useRef();
    let muImg = useRef();
    let firstName,lastName = useRef();
    let number = useRef(0);


    const changeUseRef = () => {
        myHeadline.current.innerText="Push inner text using useRef";
        myHeadline.current.classList.add("text-danger");
        myHeadline.current.classList.remove("text-success");
        myHeadline2.innerHTML="<ul><li>useRef 2</li><li>useRef 3</li></ul>";
        muImg.current.src="https://picsum.photos/id/237/200/300";
        muImg.current.setAttribute("height", "200");
        muImg.current.setAttribute("width", "200");
        let fName = firstName.value;
        let lName = lastName.value;
        console.log(number.current++)
        console.log(fName+" "+lName)
    }

    let APIData = useRef(null);
    let myPTag = useRef();
    const fetchData = async () => {
        const response = await fetch("https://dummyjson.com/products");
        APIData.current = await response.json();
    }

    const showData = () => {
        myPTag.current.innerText=JSON.stringify(APIData.current)
    }

    return (
        <div>
            <h1 className="p-3  bg-primary-subtle border border-primary-subtle rounded-3 text-success" ref={myHeadline}>content change using useRef</h1>
            <h1 className="text-success" ref={(h1)=>myHeadline2=h1}></h1>
            <img ref={muImg} src="https://picsum.photos/200/300" alt="" /><br />
            <input ref={(a)=>firstName=a} type="text" placeholder="First Name" /><br />
            <input ref={(a)=>lastName=a} type="text" placeholder="Last Name" /><br />
            <button onClick={changeUseRef}>UseRef</button>
            <p ref={myPTag}></p>
            <button onClick={fetchData}>Call API</button>
            <button onClick={showData}>Show Data</button>
        </div>
    );
};

export default UseRef;