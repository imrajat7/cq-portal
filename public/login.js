var userName = document.getElementById('input_username');
var passWord = document.getElementById('input_password');
var loginBtn = document.getElementById('login_button');
var github_body_div = document.getElementById('github_body_div');

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
                window.location = dataReturned[0].role + "/profile";
            }
        }
    }
});

github_body_div.addEventListener('click',function(){
    console.log('Hello');
    // var request = new XMLHttpRequest();
    // request.open('GET','/auth/github');
    // // request.setRequestHeader("Content-Type","application/json");
    // request.send();
    window.location = "/auth/github"
});
