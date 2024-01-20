import './App.css';
import React, {useEffect, useState } from 'react';

function App() {

  const [name,setName]=useState('');
  const [datetime,setDatetime]=useState('');
  const [description, setDescription]= useState('');
  const [transactions,setTransactions]=useState([]);

  useEffect(()=>{
    getTransactions().then(setTransactions)
  },[])

  async function getTransactions(){
    const url="https://money-tracker-backend-qszu.onrender.com/api/transactions";
    const response = await fetch(url);
    return await response.json();
  
  }

  function addNewTransaction(ev){
    ev.preventDefault();
    const url="https://money-tracker-backend-qszu.onrender.com/api/transaction";

    const price=name.split(' ')[0];


    fetch(url,{
      method:'POST',
      headers:{'Content-type':'application/json'},
      body:JSON.stringify(
        {
          price,
          name:name.substring(price.length+1),
          description,
          datetime,
        })

    }).then(response =>{
      response.json().then(json=>{
        console.log('result',json);
      });
    });
  }



  let balance=0;
  for(const transaction of transactions)
  {
    balance+=transaction.price;
  }


  balance=balance.toFixed(2);
  const fraction=balance.split('.')[1];
  balance=balance.split('.')[0];

  return (


    <main>
      <h1>Rs : {balance}<span>. {fraction}</span></h1>
      <form action='' onSubmit={addNewTransaction} >
        <div className="basic" >
          <input type="text" value={name} onChange={ev=> setName(ev.target.value)} placeholder={'+200 new cover'} />
          <input type="datetime-local" value={datetime} onChange={ev => setDatetime(ev.target.value)} />
        </div>
        <div className="description" >
          <input value={description} onChange={ev => setDescription(ev.target.value)} type="text" placeholder={'description'} />
        </div>
        <button type="submit" className='btn' >Add new transaction</button>




      </form>
      <div className="transactions" >
        {transactions.length>0 && transactions.map(transaction=>(
                  <div className="transaction" >
                  <div className="left" >
                    <div className="name" >{transaction.name}</div>
                    <div className="description" >{transaction.description}</div>
                  </div>
                  <div className="right" >
                    {console.log(transaction.price)}
                    <div className={"price "+(transaction.price<0?'red':'green') }>{transaction.price}</div>
                    <div className="datetime" >2024-1-11 15:45</div>
                  </div>
        
                  </div>
        ))}





        </div>
    </main>
  );
}

export default App;