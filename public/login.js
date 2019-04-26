var userName = document.getElementById('input_username');
var passWord = document.getElementById('input_password');
var loginBtn = document.getElementById('login_button');

loginBtn.addEventListener('click',function(event){
    if(userName.value == ""|| passWord.value == ""){
        alert("All Fields are required");
    } else {
        var userdata = new Object();
        userdata.userName = userName.value;
        userdata.passWord = passWord.value;
        console.log(userdata);
        var request = new XMLHttpRequest();
        request.open("POST",'/login');
        request.setRequestHeader("Content-Type","application/json");
        request.send(JSON.stringify(userdata));
        request.onload = function(){
            var dataReturned = JSON.parse(request.responseText);
            if(dataReturned.length==""){
                alert('User not exist');
                userName.value="";
                passWord.value="";
            } else {
                console.log(dataReturned);
                location.href = "dashboard.html"
            }
        }
    }
});