import React, { useEffect, useState } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import Record from './Records';
const uuidv4 = require('uuid/v4');
const Page = () => {
    
    const [names, setNames] = useState([]);
    const [userName, setUserName] = useState('');
    
    const onUserNameChange = (e) => {
        setUserName(e.target.value);
    }
    
    const onKeyEnter = (e) => {
        if(e.key === 'Enter') {
            AddUser();
        }
    }
    
    const add = x => _ => x + 1;
    const inc = add(5000)
    
    const AddUser = () => {
        fetch(`http://localhost:8080/account`, {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({
                id: inc(),
                name : userName
            })
        }).then( res => res.json())
        .then((res) => {
            getAccounts();
            setUserName('');
        })
    }
  
    const getAccounts = () => {
        fetch('http://localhost:8080/accounts')
            .then((res) => res.json())
            .then((res) => setNames(res));
    }
    
    useEffect(() => {
        getAccounts();
    }, [])
    
    return(
         <div>
            <h1> Enter Your Name</h1>
            <Input
              className="page_username_field"
              value={userName}
              onChange={onUserNameChange}
              onKeyUp={onKeyEnter}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Enter Your Name"
            />
            <div className="page_submit_wrapper" style={{display: 'inline', marginLeft: '1%'}}>
                    <Button 
                        type="primary"
                        onClick={AddUser}
                    >
                        Add
                    </Button>
            </div>
            
            <hr style={{borderTop: '1px solid lightgray'}}/>
            
            {
                names.length > 0 && 
                  names.map((n,index) => <Record key={n.id} 
                                        getAccounts={getAccounts}
                                        index={index}
                                        {...n}/>)   
            }
            
         </div>
    )
}

export default Page;