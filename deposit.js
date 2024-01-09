

function Deposit(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [balance, setBalance]         = React.useState('');
  const [deposit, setDeposit]       = React.useState('');
  const ctx = React.useContext(UserContext);  

 //deposit button event handler
 const deposit_btn = document.getElementById('deposit-btn');
 deposit_btn.addEventListener('click', function(){

     const depositStringToInt = getInputNumb("deposit-amount");

     updateSpanTest("current-deposit", depositStringToInt);
     updateSpanTest("current-balance", depositStringToInt);

     //setting up the input field blank when clicked
     document.getElementById('deposit-amount').value = "";

 })

  //withdraw button event handler
  const withdraw_btn = document.getElementById('withdraw-btn');
  withdraw_btn.addEventListener('click', function(){
     const withdrawNumb = getInputNumb("withdraw-amount");

     updateSpanTest("current-withdraw", withdrawNumb);
     updateSpanTest("current-balance", -1 * withdrawNumb);
     //setting up the input field blank when clicked
     document.getElementById('withdraw-amount').value = "";
 })

 //function to parse string input to int
 function getInputNumb(idName){
     const amount = document.getElementById(idName).value;
     const amountNumber = parseFloat(amount);
     return amountNumber;
 }

 function updateSpanTest(idName, addedNumber){
     //x1.1 updating balance the same way
     const current = document.getElementById(idName).innerText;
     const currentStringToInt = parseFloat(current);

     const total = currentStringToInt + addedNumber;

     //x1.2 setting this value in balance
     document.getElementById(idName).innerText = total;
 }


  function validate(field, label){
      if (field < 1) {
        setStatus('Error: ' + label + ' must be a positive number.');
        setTimeout(() => setStatus(''),3000);
        return false;
      }
      return true;
  }

  function handleCreate(){
    console.log(balance,deposit);
    if (!validate(balance,     'balance'))     return;
    if (!validate(deposit,    'deposit'))    return;
    ctx.users.push({balance,deposit,balance:100});
    setShow(false);
  }    

  function clearForm(){
    setBalance('');
    setDeposit('');
    setShow(true);
  }

  return (
    <Card
      bgcolor="primary"
      header="Deposit"
      status={status}
      body={show ? (  
              <>
              Balance<br/>
              <span id="current-balnce">0</span> <br/>
              Deposit<br/>
              <input type="text" className="form-control" id="deposit-amount" placeholder="Enter deposit amount"  /><br/>
              <button type="submit" className="btn btn-light" onClick={handleCreate}>Submit Deposit</button>
              </>
            ):(
              <>
              <h5>Success</h5>
              <button type="submit" className="btn btn-light" onClick={clearForm}>New Deposit</button>
              </>
            )}
    />
  )
}


