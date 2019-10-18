import React, { useState } from 'react';
import { Button, Input } from 'antd';

const Record = ({index, id, name, getAccounts}) => {
    
    const [userName, setUserName] = useState(name);
    
    const [isEdit, setIsEdit] = useState(false);
    
    const onUserNameChange = (e) => {
        setUserName(e.target.value)
    }
    const editName = () => {
        fetch(`http://localhost:8080/account/${id}`, {
            method: 'PUT',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                id,
                name : userName
            })
        }).then( res => res.json())
        .then((res) => {
            getAccounts();
            setIsEdit(false); 
        })
    }
    
    const deleteUserName = () => {
        fetch(`http://localhost:8080/account/${id}`, {
            method: 'DELETE'
        }).then((res) => {
            getAccounts();
        })
    }

    return(
        <div style={{'padding' : '10px 0px'}}>
            {index + 1} :
                {  !isEdit ? 
                    <span>
                        <span onClick={() => setIsEdit(true)}> {userName} </span> 
                        <Button style={{marginLeft : '1%'}} onClick={deleteUserName}>Delete</Button> 
                    </span> : 
                     <span >
                         <Input value={userName} onChange={onUserNameChange} style={{ width: '200px'}} placeholder="user name" />
                         <Button style={{marginLeft : '1%'}} onClick={editName}>Set</Button>
                    </span>
                } 
        </div>
    )
}

export default Record;