import { useState } from "react";

const UseStateComp = () => {

    const [number, setNumber] = useState(0);
    const [myObj, setMyObj] = useState({
        key1:"Value 1",
        key2:"Value 2",
        key3:"Value 3",
        key4:"Value 4",
        key5:"Value 5",
    });

    const stateObjChange = () => {
        // change all object
        // setMyObj({
        //     key1:"New Value 1",
        //     key2:"New Value 2",
        //     key3:"New Value 3",
        //     key4:"New Value 4",
        //     key5:"New Value 5",
        // })

        // change specific object value 
        setMyObj(
            prevObj=>({
                ...prevObj,
                key1:"New Value for key 1",
                key3:"New Value for key 3"
            })
        )


    }

    const [list, setList] = useState([]);
    const [item, setItem] = useState("");

    const AddToList = () =>{
        list.push(item)
        setList([...list])
    }

    const RemoveItem = (index) =>{
        // alert(index)
        list.splice(index,1)
        setList([...list])
    }

    return (
        <div>
            <h1>Number: {number}</h1>
            <button onClick={()=>setNumber(number+1)}>Click</button>
            <br />
            <h1>Object: {myObj.key1}</h1>
            <h1>Object: {myObj.key3}</h1>
            <button onClick={stateObjChange}>State object chnage</button>
     
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <table  className="table">
                            <thead className="thead-dark">
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Item</th>
                                <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.length!==0?(
                                        list.map((element,index)=>{
                                            return(
                                                <tr key={index.toString()}>
                                                    <td>{index+1}</td>
                                                    <td>{element}</td>
                                                    <td><button onClick={()=>{RemoveItem(index)}}>Remove</button></td>
                                                </tr>
                                            )
                                        })      
                                    ):(<tr className="text-center"><td colSpan={3}>No data available</td></tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <input onChange={(e)=>setItem(e.target.value)} type="text" placeholder="item" />
            <button onClick={AddToList}>Add</button>

        </div>
    );
};

export default UseStateComp;