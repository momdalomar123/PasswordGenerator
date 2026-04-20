 
 let storedPasswords=JSON.parse(localStorage.getItem('passwords')) || [];

 const bodyElement=document.getElementById('body-id');
 const changeThemeButtonElement=document.getElementById('change-theme-button-id');
  const passwordStoredMessageButton=document.getElementById('password-store-button');
    const showStoredPasswordsElement=document.getElementById('password-show-button');
 const passwordHeaderElement=  document.getElementById('password-header');
 const themeMode=localStorage.getItem('theme');
 console.log(themeMode);
 const gridContainerELement= document.getElementById('passwords-grid-container-id');
 let showPasswordsFlag=Number(localStorage.getItem('displayflag'));
 console.log(showPasswordsFlag);
 if(showPasswordsFlag===1)
 {
    displayStoredPasswords();
 }
   let changeThemeButton =
    localStorage.getItem('emoji') || '🌙';
let resetMessageFlag=1;
const searchPasswordsInputElement=document.getElementById('search-passwords');
changeThemeButtonElement.innerHTML = changeThemeButton;
 passwordHeaderElement.innerHTML='Password Generator'
        const passwordGenerateButton=document.getElementById('password-generator-button');
        const resetResponseNo=document.getElementById('reset-button-no-response');
          const resetResponseYes=document.getElementById('reset-button-yes-response');
        passwordGenerateButton.addEventListener('click',generateRandomPassword);
         let userSelection=8;
          const userSelectedPasswordLength=document.getElementById('password-length-selector');
        const passwordResetButton=document.getElementById('password-reset-button');
        const buttonsArray=[
            passwordGenerateButton,passwordStoredMessageButton,passwordResetButton,showStoredPasswordsElement,
            resetResponseNo,resetResponseYes];
            loadTheme();
            function loadTheme()
            {
                if(localStorage.getItem('theme')==='dark')changeThemeToDark();

                else changeThemeToLight();
                
            }
        passwordResetButton.addEventListener('click',()=>{
          resetShowMessageWithResponse();
            resetEverythingNoResponse();
            
        });
       
        userSelection=userSelectedPasswordLength.value;
        userSelectedPasswordLength.addEventListener('change',(event)=>{
           userSelection =event.target.value;
            
        })
        changeTheme();
       function changeTheme()
        {
            changeThemeButtonElement.addEventListener('click',()=>{

                let currentTheme =
                    localStorage.getItem('theme');

                if(currentTheme === 'light')
                {
                    changeThemeToDark();
                    changeThemeButton='☀️';
                }
                else
                {
                    changeThemeToLight();
                    changeThemeButton='🌙';
                }

                changeThemeButtonElement.innerHTML =
                    changeThemeButton;
            });
        }
        function changeThemeToDark(changeThemeButton)
        {
                    bodyElement.classList.add('dark-theme');
                    bodyElement.classList.remove('light-theme');
                    changeThemeButtonElement.style.background='#d3cccc';
                    userSelectedPasswordLength.style.color='#ffff';
                    userSelectedPasswordLength.style.background='#3e3a3acf';
                    storeThemelocalStorage('dark','☀️');
                    changeStylingForButtonsDark();
        }
        function changeThemeToLight()
        {
            
                    bodyElement.classList.add('light-theme');
                    bodyElement.classList.remove('dark-theme');
                     changeThemeButtonElement.style.background='#2c2727';
                    userSelectedPasswordLength.style.color='#000000';
                    userSelectedPasswordLength.style.background='#cbc5c5';
                    storeThemelocalStorage('light','🌙');
                     changeStylingForButtonsLight();

        }
        function changeStylingForButtonsDark()
        {
          buttonsArray.forEach((button)=>
        {
            button.classList.add('dark-theme-buttons-hover');
            button.classList.remove('light-theme-buttons-hover');
        });

        }
        function changeStylingForButtonsLight()
        {
              buttonsArray.forEach((button)=>
        {
            button.classList.add('light-theme-buttons-hover');
            button.classList.remove('dark-theme-buttons-hover');
            });
               
        }

        function generateRandomPassword(){
        const characters=['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','!','@','#','$'];
        let password='';
        for(let i=0;i<userSelection;i++)
        {
            password+=characters[Math.floor(Math.random()*characters.length)];

        }
     
        passwordHeaderElement.innerHTML=password;
    }
    passwordStoreMessage();
    function passwordStoreMessage()
    {
        const passwordStoredMessageElement=document.getElementById('password-stored-message');
         let messageId
             
        passwordStoredMessageButton.addEventListener('click',()=>{
      
           clearTimeout(messageId);
           if(passwordHeaderElement.innerText==='Password Generator')
           {
               passwordStoredMessageButton.innerHTML='Tap Generate !';
             messageId=setTimeout(()=>{
                passwordStoredMessageButton.innerHTML='Store Password';
            },1000);

           }
           if(passwordHeaderElement.innerHTML!=='Password Generator'){
            let passwordText=passwordHeaderElement.innerHTML;
             if(checkIfPasswordsExist(passwordText)===null)
           {
             passwordStoredMessageButton.innerHTML='Already Exists !';
             messageId=setTimeout(()=>{
                passwordStoredMessageButton.innerHTML='Store Password';
            },1000);
            
           }
            
          
           else{
            addPasswordToArray(passwordText);
            passwordStoredMessageButton.innerHTML='Added';
            if(showPasswordsFlag===1)displayStoredPasswords();
             messageId=setTimeout(()=>{
                passwordStoredMessageButton.innerHTML='Store Password';
            },1000);
           
             }
            }
            
            
        });
    }
 
    function storePasswordsLocalStorage()
    {
        localStorage.setItem('passwords',JSON.stringify(storedPasswords));
        
    }
    function storeThemelocalStorage(theme,emoji)
    {
        localStorage.setItem('theme',theme);
        localStorage.setItem('emoji',emoji);
    }
    function storeDisplayFlagLocalStorage(flag)
    {
        localStorage.setItem('displayflag',flag)
    }
    function checkIfPasswordsExist(password)
    {
         for(let i=0;i<storedPasswords.length;i++)
        {
            if(password===storedPasswords[i])
                return null;
        }
    }
    function addPasswordToArray(password)
    {
       
    storedPasswords.push(password);
    console.log(storedPasswords);
    storePasswordsLocalStorage();
    }
     function hideStoredPasswords()
     {
        gridContainerELement.style.display='none';
     }


    displayStoredPasswordsOnClick();
   function displayStoredPasswordsOnClick()
   {
    
    showStoredPasswordsElement.addEventListener('click',()=>{
        if(showPasswordsFlag===0)
        {
            gridContainerELement.style.display='grid';
            displayStoredPasswords();
            showPasswordsFlag=1;
            storeDisplayFlagLocalStorage(showPasswordsFlag);
            
        }
        else{
            hideStoredPasswords();
            showPasswordsFlag=0;
             storeDisplayFlagLocalStorage(showPasswordsFlag);
        }

    });
   }
   
    function displayStoredPasswords()
    {
        let passwordsGridHTML='<h1 style="height:50px;">Passwords:</h1>';
            if (storedPasswords.length === 0) {
        passwordsGridHTML += `
        <p class="no-passwords-message">
            No stored passwords
        </p>`;
    }
        for(let i=0;i<storedPasswords.length;i++)
        {
            passwordsGridHTML+=`<div class="password-text-delete-button-container">
            <div>
                <p class="password-text">
                ${i+1}- ${storedPasswords[i]}
                </p>
                </div>
                <div class="copy-delete-buttons-container">
                <button class="copy-password-button" 
                data-copy-password-id="${i+1}">
                Copy Password
                </button>
                <button class="delete-password-button" 
                data-delete-password-id="${i+1}">
                Delete Password
                </button>
                </div>
            </div>`
        }
        
        gridContainerELement.innerHTML=passwordsGridHTML;
    }
    function deleteStoredPassword(button)
    {
        const buttonId=button.dataset.deletePasswordId;
        const deleteIndex=buttonId-1;
        storedPasswords.splice(deleteIndex,1);
        displayStoredPasswords();
        storePasswordsLocalStorage();
    }
    deleteStoredPasswordsEvent();
    function deleteStoredPasswordsEvent()
    {
        document.addEventListener('click',(e)=>{
            if(e.target.classList.contains('delete-password-button'))
            {
                deleteStoredPassword(e.target);
            }
        });
    }
    function copyStoredPassword(button)
    {
        const buttonId=button.dataset.copyPasswordId;
        const copyIndex=buttonId-1;
        const passowrdText=storedPasswords[copyIndex];
       
    
        navigator.clipboard.writeText(passowrdText).then(()=>{
           

            });
        
    }
    copyStoredPasswordEvent();
    function copyStoredPasswordEvent()
    {

        document.addEventListener('click',(e)=>{
            if(e.target.classList.contains('copy-password-button'))
            {
                copyStoredPassword(e.target);
                copiedPasswordFeedbackMessage(e.target);
            }
        });
    }
    function copiedPasswordFeedbackMessage(button)
{
    
        let timeoutId;
        const copyPasswordElementFeedback=document.querySelector('.copy-password-button');
       
                  button.innerHTML='Password Copied';
            clearTimeout(timeoutId);
            setTimeout(()=>{
            button.innerHTML='Copy Password';
            },1000);
}
function resetShowMessageWithResponse()
{
    const resetMessageContainerElement=document.getElementById('reset-message-container');
    if(resetMessageFlag===0)
    {
   resetMessageContainerElement.classList.add('reset-message-toggle');
        resetMessageFlag=1;
    }
    else
    {
        resetMessageContainerElement.classList.remove('reset-message-toggle');
        resetMessageFlag=0;
    }

}

   
     let resetTimoutId;
     
    resetResponseYes.addEventListener('click',()=>{

        if(storedPasswords.length<=0)
        {
            
             passwordResetButton.innerHTML='Empty !';
       clearTimeout(resetTimoutId);
        resetTimoutId=setTimeout(()=>{
            passwordResetButton.innerHTML='Reset';
        },1000);
        resetMessageFlag=0;
        resetShowMessageWithResponse();
        return;
        }

        else{
      
        passwordResetButton.innerHTML='Reseted';
       clearTimeout(resetTimoutId);
        resetTimoutId=setTimeout(()=>{
            passwordResetButton.innerHTML='Reset';
        },1000);
        passwordHeaderElement.innerHTML='Password Generator'
            userSelectedPasswordLength.value=8;
            storedPasswords.splice(0,storedPasswords.length);
            storePasswordsLocalStorage();
            
                if (showPasswordsFlag === 1) {
            displayStoredPasswords();
             }

            resetMessageFlag=0;
            resetShowMessageWithResponse();
        }
    });


function resetEverythingNoResponse()
{
    resetResponseNo.addEventListener('click',()=>{
         resetMessageFlag=0;
        resetShowMessageWithResponse();

    });
   
}
searchPasswordsInput();
function searchPasswordsInput()
{
searchPasswordsInputElement.addEventListener('input',()=>{
    const searchPasswordsInputvalue=searchPasswordsInputElement.value.toLowerCase();
    FilterPasswords(searchPasswordsInputvalue);
});

}
function FilterPasswords(searchPasswordsInputvalue)
{
    if(searchPasswordsInputvalue==='')
    {
        
        displayStoredPasswords();
        return;
    }

    let filteredArray=storedPasswords.filter((password,number)=>{
        return password.toLowerCase().includes(searchPasswordsInputvalue);

    }
    );

    displayFilteredPasswords(filteredArray);
    


}
function displayFilteredPasswords(filteredArray)
{
     let passwordsGridHTML='<h1 style="height:50px;">Passwords:</h1>';
            if (storedPasswords.length === 0) {
        passwordsGridHTML += `
        <p class="no-passwords-message">
            No stored passwords
        </p>`;
    }
        for(let i=0;i<filteredArray.length;i++)
        {
            passwordsGridHTML+=`<div class="password-text-delete-button-container">
            <div>
                <p class="password-text">
                ${i+1}- ${filteredArray[i]}
                </p>
                </div>
                <div class="copy-delete-buttons-container">
                <button class="copy-password-button" 
                data-copy-password-id="${i+1}">
                Copy Password
                </button>
                <button class="delete-password-button" 
                data-delete-password-id="${i+1}">
                Delete Password
                </button>
                </div>
            </div>`
        }
        
        gridContainerELement.innerHTML=passwordsGridHTML;


}
enableTransition();
function enableTransition()
{
    window.addEventListener("load", () => {
    document.documentElement.classList.add("enable-transition-body");
   
    
});
}