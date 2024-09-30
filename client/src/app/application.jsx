import React, {useState} from "react";
export function Application(){
    const [activeUser, setActiveUser] =  useState("");
    function handleSubmit(e){
        e.preventDefault();
        setActiveUser("");
    }
    return <>
        <form onSubmit={handleSubmit}>
            <h3>Logg inn for å se dine bookinger</h3>
            <input value={activeUser} onChange={e => setActiveUser(e.target.value)}/>
            <button type={"submit"}>Submit</button>
        </form>
    </>
}