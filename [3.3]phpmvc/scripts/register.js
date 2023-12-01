

function getIPAddress(){

    let publicIP = '';

    fetch('https://api64.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            publicIP = data.ip;
            document.getElementById("ip_address").value = publicIP;
        })
        .catch(error => {
            console.error('Error:', error);
        });
       
}

let add_str = ['','','',''];



function getRegion() {
    //alert('hid');
    const url = "../api/ProcessRequest.php?action=populateAddressSelect&level=region";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                alert('problem connecting to server');
            }
            
            return response.json();
        })
        .then(data => {
            //alert(data);
            populateRegion(data);
        })
        .catch(error => {
            console.error("Error:", error);
            // Handle error here
        });
}

// function getRegion() {
//     alert('hi');
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", "../api/ProcessRequest.php?action=populateAddressSelect&level=region", true);
//     xhr.onload = function() {
//         if (xhr.status === 200) {
            
//             const data = JSON.parse(xhr.responseText);
//             populateRegion(data);
//             //alert(JSON.parse(xhr.responseText));
//         } 
//         else {
//             alert("Error fetching data.");
//         }
//     };
//     xhr.send();
// }



function populateRegion(data){

    let element = document.getElementById("region");

    let dummy = document.createElement("option");
    dummy.innerHTML = "CHOOSE REGION";
    element.appendChild(dummy);

    for (let x in data) {
        let temp_element = document.createElement("option");
        temp_element.innerHTML = data[x];
        element.appendChild(temp_element);
    }
}

window.addEventListener("load",getIPAddress);
window.addEventListener("load",getRegion);





let prov_Code = '';
let obj1 = {};

function updateProvCode(){
    let selected = document.getElementById("province").value;
    
    for(let i = 0; i < obj1.length;i++){
        if(obj1[i]["provDesc"] == selected){
            prov_Code = obj1[i]["provCode"];
        }  
    }
    document.getElementById("test3").innerHTML = prov_Code;
}

function getProvince(){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../api/ProcessRequest.php?action=populateAddressSelect&level=province", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            
            const data = JSON.parse(xhr.responseText);
            obj1 = data;

            populateProvince(obj1);
            updateProvCode();

            
        } else {
            alert("Error fetching data.");
        }
    };

    const val = document.getElementById("region").value;
    const obj = {regDesc : String(val)};
    xhr.send(JSON.stringify(obj));

    add_str[1] = '';
    add_str[2] = '';
    add_str[3] = '';
    add_str[0] = '';
    add_str[0] = val;
    document.getElementById("address_string").value = add_str + ' ';
}

// function getProvince(){
//     const val = document.getElementById("region").value;
//     const obj = {regDesc : String(val)};

//     const url = "";
//     const options = {
//         method: "POST",
//         headers: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify(obj)
//     };

//     fetch(url, options)
//         .then(response => {
//                 if(!response.ok){
//                     throw new Error("Error fetching data.");
//                 }
//                 return response.json();
//             }
//         )
//         .then(data => {
//                 obj1 = data;
//                 populateProvince(obj1);
//                 updateProvCode();
//             }
//         )
//         .catch(error => {
//             console.error("Error:", error);
//         });
        
//         add_str[1] = '';
//         add_str[2] = '';
//         add_str[3] = '';
//         add_str[0] = '';
//         add_str[0] = val;
//         document.getElementById("address_string").value = add_str + ' ';

// }

function populateProvince(data){
    let element = document.getElementById("province");
    element.innerHTML = '';
    document.getElementById("municipality").innerHTML = "";
    document.getElementById("brgy").innerHTML = "";

    let dummy = document.createElement("option");
    dummy.innerHTML = "CHOOSE PROVINCE";
    element.appendChild(dummy);

    for (let x in data) {
        let temp_element = document.createElement("option");
        temp_element.innerHTML = data[x]["provDesc"];
        element.appendChild(temp_element);
    }

    prov_Code = '';
    Mun_Code = '';
    Brgy_Code = '';
    document.getElementById("test3").innerHTML = prov_Code;
    document.getElementById("test4").innerHTML = Mun_Code;
    document.getElementById("test5").innerHTML = Brgy_Code;
}

function updateProvCodeAndgetMunicipalities(){
    updateProvCode();
    getMunicipalities();

    add_str[2] = '';
    add_str[3] = '';
    add_str[1] = '';
    add_str[1] = ' ' + document.getElementById('province').value;
    document.getElementById("address_string").value =  add_str;
}





let Mun_Code = '';
let obj2 = {};

function updateMunCode(){
    let selected = document.getElementById("municipality").value;
    
    for(let i = 0; i < obj2.length;i++){
        if(obj2[i]["citymunDesc"] == selected){
            Mun_Code = obj2[i]["citymunCode"];
        }  
    }
    document.getElementById("test4").innerHTML = Mun_Code;
}

function getMunicipalities(){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../api/ProcessRequest.php?action=populateAddressSelect&level=city", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            
            const data = JSON.parse(xhr.responseText);
            obj2 = data;
            
            populateMunicipalities(obj2);
            updateMunCode();

            
        } else {
            alert("Error fetching data.");
        }
    };  
    const obj = {provCode : String(prov_Code)};
    xhr.send(JSON.stringify(obj));
 
}

function populateMunicipalities(data){
    let element = document.getElementById("municipality");
    element.innerHTML = '';
    document.getElementById("brgy").innerHTML = "";

    let dummy = document.createElement("option");
    dummy.innerHTML = "CHOOSE CITY/MUNICIPALITY";
    element.appendChild(dummy);
   

    for (let x in data) {
        let temp_element = document.createElement("option");
        temp_element.innerHTML = data[x]["citymunDesc"];
        element.appendChild(temp_element);
    }

    Mun_Code = '';
    document.getElementById("test4").innerHTML = Mun_Code;
}


function updateMunCodeAndGetBrgy(){
    updateMunCode();
    getBrgy();

    add_str[3] = '';
    add_str[2] = '';
    add_str[2] = ' ' + document.getElementById('municipality').value;
    document.getElementById("address_string").value = add_str;
}




let Brgy_Code = '';
let obj3 = {};

function updateBrgyCode(){
    let selected = document.getElementById("brgy").value;
            
    
    for(let i = 0; i < obj3.length;i++){
        if(obj3[i]["brgyDesc"] == selected){
            Brgy_Code = obj3[i]["brgyCode"];
        }  
    }
    document.getElementById("test5").innerHTML = Brgy_Code;

    if(document.getElementById('brgy').value != 'CHOOSE BRGY'){
        add_str[3] = '';
        add_str[3] = ' ' + document.getElementById('brgy').value;
        document.getElementById("address_string").value = add_str;
    }
    
}

function getBrgy(){
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "../api/ProcessRequest.php?action=populateAddressSelect&level=brgy", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            
            const data = JSON.parse(xhr.responseText);
            obj3 = data;
 
            populateBrgy(obj3);
            updateBrgyCode();
 
        } else {
            alert("Error fetching data.");
        }
    };  

    const obj = {citymunCode : String(Mun_Code)};
    xhr.send(JSON.stringify(obj));
}

function populateBrgy(data){
    let element = document.getElementById("brgy");
    element.innerHTML = '';

    let dummy = document.createElement("option");
    dummy.innerHTML = "CHOOSE BRGY";
    element.appendChild(dummy);

    for (let x in data) {
        let temp_element = document.createElement("option");
        temp_element.innerHTML = data[x]["brgyDesc"];
        element.appendChild(temp_element);
    }

    Brgy_Code = '';
    document.getElementById("test5").innerHTML = Brgy_Code;
}



function createObjectFromInputs(){

     // employee data
     let first_name = document.getElementById("first_name").value;
     let last_name = document.getElementById("last_name").value;
     let middle_name = document.getElementById("middle_name").value;
     let birth = document.getElementById("birthday").value;
     let gender = document.getElementById("gender").value;
 
     let address_code = Brgy_Code;
     let address_string = document.getElementById("address_string").value;
 
     let email = document.getElementById("email").value;
     let phone = document.getElementById("phone_number").value;
     
     let user_name = document.getElementById("user_name").value;
     let password = document.getElementById("password").value;
 
 
     const obj = {
         first_name : first_name,
         last_name : last_name,
         middle_name : middle_name,
         birth : birth,
         gender: gender,
 
         address_code : address_code,
         address_string : address_string,
 
         email : email,
         phone : phone,
 
         user_name : user_name,
         password : password
     };
     return obj;
}

function submit(){

    
}

let data_valid = false;

function client_side_validation(){
    // [1] name
        // must not contain number
        // 35 char max for first, middle, last

        //automatically capitalize the first letter of the string
    //  [2] age
        // no filter must be  at least 18 years old
    // [3] Address string // put a note that if brgy doesnt exist, just manually type it
        // max char of 200
    // [4] email 
        // no validation
    // [5] phone 
        // must only contain number
        // 11 digits
        // 09xxx format

        // auto convert 639xx to 09xx format
    // [6] username
        // cannot start with number or whitespace
        // must only contain numbers and letters
        // limit of 45 char max, min of 3
    // [7] password
        // must contain at least Uppercase and lowercase
        // minimum 8 characters
        // maximum of 128 char
        // must contain 1 special character
        // must not be the same as username or contain username

    // check the empty inputs
    // check the minimum/max length
    let first_name = document.getElementById("first_name").value;
    let last_name = document.getElementById("last_name").value;
    let middle_name = document.getElementById("middle_name").value;
    let birth = document.getElementById("birthday").value;
    let gender = document.getElementById("gender").value;

    let address_code = Brgy_Code;
    let address_string = document.getElementById("address_string").value;

    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone_number").value;
    
    let user_name = document.getElementById("user_name").value;
    let password = document.getElementById("password").value;

}

function submitData(){
    client_side_validation();

    if (data_valid == true){
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "php/submit_data.php", true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                if (xhr.responseText == "1111"){
                    setTimeout(function () {
                        alert("You have successfully registered!");
                        window.location.href = "../index.html";
                        
                    }, 500);
                }
                else{
                    alert(xhr.responseText);
                }
            } else {
                alert("Server side error");
            }
        };  
        
        xhr.send(JSON.stringify(createObjectFromInputs()));
    }
    else{

    } 
}


function sayHi(){
    alert("hi");
}

function showValues(data, data){
    alert(data + " " + data);
}