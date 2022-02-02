var gameInput = document.querySelector("#inputGroupSelect01");
var chatType = document.querySelector("#chatType");

chatType.addEventListener("click", function(event) {
    var element = event.target;
    var game = gameInput.options[gameInput.selectedIndex];
    if (game !== "Choose a game...") {
        console.log(game);
        if(element.parentNode.id == "btnOneOnOne"){
            //work in progress
        }else if(element.parentNode.id == "btnGroup"){
            document.location.replace('/room');
        }else{
            console.log()
            return;
        }
        
        
        console.log(`Run ${element.parentNode.id}`);
    }else{
        alert("Please select a game before selecting a chatroom.")
    }
    
});

