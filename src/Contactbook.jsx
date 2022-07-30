import React, { useEffect, useState } from "react";
import "./index.css";



const getItemsBack = () =>
{
    let contVal = localStorage.getItem("contactDetails");
    if (contVal) {
        return JSON.parse(contVal);
    } else {
        return [];
    }
};



const Contactbook = () =>
{


    const [vision, setVision] = useState("hidden");
    const [display, setDisplay] = useState("hidden");


    const [contact, setContact] = useState({
        name: "",
        phone: "",
        email: ""
    });

    

    const ContactData = (e) =>
    {
        const ipValue = e.target.value;
        const ipname = e.target.name;

        setContact((preval) =>
        {
            return {
                ...preval,
                [ipname]: ipValue,
            };
        });
    };



    const [items, setItems] = useState(getItemsBack());
    

    const addContact = (event) =>
    {
        event.preventDefault();

        setItems((preval) =>
        {

            if (contact.name === "" || contact.phone === "" || contact.email === "") {

                alert("please enter name, phone no. & email properly");

                return [...preval];

            } else if (togglebtn === "Save") {
                
                return (items.map((ele, indx) =>
                {
                    if (indx === editid) {

                        return contact;

                    } else {

                        return ele;
                    }
                }));
                
            } else {
                return [...preval, contact];
                
            }

           
        });


        setContact({
            name: "",
            phone: "",
            email: ""
        });
        setTogglebtn("Add");
        setDisplay("visible");

        
    }



    useEffect(() =>
    {
        localStorage.setItem("contactDetails", JSON.stringify(items));
    }, [items]);

   


    const [srchValue, setSearchValue] = useState("");
    const [srchitem, setSrchItem] = useState([]);
    

    const searchItems = (e) =>
    {
        setSearchValue(e.target.value);
    

        const filteredValue = items.filter((ele, index) =>
        {
            const firstColumn = ele.name.toUpperCase();
            const rows = srchValue.toUpperCase();
            return firstColumn.includes(rows);
        });
        
        
        
        if (srchValue.length > -1) {
            setSrchItem(filteredValue);
            setVision("visible");
            setDisplay("hidden");
            
        };
        
        
        
    };



    const showOrginalTable = () =>
    {
     
            if (!srchValue) {
                setDisplay("visible");
                setVision("hidden");
            }
    }

       

    const deleteContact = (id) =>
    {
        setItems((olditems) =>
        {
            return olditems.filter((element, indx) =>
            {
                return indx !== id;
            });
        });

    };

    

    const [togglebtn, setTogglebtn] = useState("Add");
    const [editid, setEditid] = useState();

    
    const editContact = (id) =>
{
        const editableItems = items.find((element, indx) =>
        {
            return indx === id;
        });

        setContact(editableItems);
        setTogglebtn("Save");
        setEditid(id);
}    
   
    

    return (
        <>
            <div className="main_div">
            <div className="child_div">
                   <h1>Contacts</h1>
                    <input type="search" name="searchbox" className="srch" placeholder="search by names..."
                     onChange={searchItems} value={srchValue} onKeyDown={showOrginalTable}
                   />
                <div className="form_div">
                    <form onSubmit={addContact}>
                        <label>Name:</label>
                            <input type="text" name="name" autoComplete="off" 
                         style={{textTransform: "capitalize"}} onChange={ContactData} value={contact.name} /><br />
                        <label>Phone:</label>
                            <input type="number" name="phone" autoComplete="off" onChange={ContactData}
                            value={contact.phone} /><br />
                        <label>Email:</label>
                            <input type="email" name="email" autoComplete="off" onChange={ContactData}
                            value={contact.email} /><br />
                            <button> {togglebtn} </button>
                    </form>
                    </div>
                    
                    <div className="table_div">
                        
                    <diV className="tdiv1">
                    <table style={{visibility: display}} >
                        <tr>
                            <th style={{ width: "200px", height:"20px"}} >Name</th>
                            <th style={{width: "100px", height:"20px"}} >Phone</th>
                            <th style={{ width: "200px", height: "20px" }}>Email</th>
                            <th>Action</th>
                        </tr>
                         
                                {items.map((eleVal, index) =>
                                {
                                    return (
                                        <tr key={index} >
                                            <td style={{textTransform: "capitalize"}} > {eleVal.name} </td>
                                            <td> {eleVal.phone} </td>
                                            <td> {eleVal.email} </td>
                                            <td>
                                                <button style={{ backgroundColor: "green", color: "white", border: "2px solid green" }}
                                                onClick={() => {editContact(index)} }  >Edit</button>
                                                <button style={{ backgroundColor: "red", color: "white", border: "2px solid red" }}
                                                 onClick={() => { deleteContact(index) }}> Delete </button>
                                            </td>
                                
                                        </tr>
                                    );
                            })}
                    
                            </table>
                        </diV>

                    <diV className="tdiv2">
                    <table style={{visibility: vision}} >
                    <tr>
                            <th style={{ width: "200px", height: "20px" }}>Name</th>
                            <th style={{width: "100px", height:"20px"}} >Phone</th>
                            <th style={{ width: "200px", height: "20px" }}>Email</th>
                        
                        </tr>
                         
                                {srchitem.map((value, index) =>
                                {
                                    return (
                                  
                                        <tr>
                                            <td style={{textTransform: "capitalize"}} > {value.name} </td>
                                            <td> {value.phone} </td>
                                            <td> {value.email} </td>
                                           
                                        </tr>
                                    );
                          })}
                    
                            </table>
                        </diV>

                </div>            
            </div>
        </div>

        </>
    )
};


export default Contactbook;