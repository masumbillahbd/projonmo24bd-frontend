import React, { useState } from 'react';

const FormSubmit = () => {
    const [FormObj, SetFormObj] = useState({fName:"", lName:"", city:"", gender:""})

    const InputOnChange = (property,value) =>{
        SetFormObj(prevObj=>({
            ...prevObj,
            [property]:value
        }))
    }

    const formSubmit = (e) => {
        e.preventDefault();
        console.log(FormObj);
        alert(JSON.stringify(FormObj))
    }
    
    return (
        <div>
            <h1>Form Submit Component</h1>
            <form onSubmit={formSubmit}>
                <input onChange={(e)=>{InputOnChange("fName",e.target.value)}} value={FormObj.fName} type="text" placeholder='First Name' />
                <input onChange={(e)=>{InputOnChange("lName",e.target.value)}} value={FormObj.lName} type="text" placeholder='Last Name' />
                <select onChange={(e)=>{InputOnChange("city",e.target.value)}} value={FormObj.city}>
                    <option value="">Choose City</option>
                    <option value="Dahaka">Dhaka</option>
                    <option value="Barisal">Barisal</option>
                </select>
                <input onChange={()=>{InputOnChange("gender","Male")}} checked={FormObj.gender === 'Male'} type="radio" name='gender' />Male
                <input onChange={()=>{InputOnChange("gender","Female")}} checked={FormObj.gender === 'Female'} type="radio" name='gender' />Female
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
};

export default FormSubmit;