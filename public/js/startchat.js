var gameInput = document.querySelector("#inputGroupSelect01");
var chatType = document.querySelector("#chatType");

chatType.addEventListener("click", function(event) {
    var element = event.target;
    var game = gameInput.options[gameInput.selectedIndex];
    if (game !== "Choose a game...") {
        console.log(`Run ${element.parentNode.id}`);
    }else{
        alert("Please select a game before selecting a chatroom.")
    }
    
});

