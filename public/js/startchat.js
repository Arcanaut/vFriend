
const startchat = async (event, id) => {
    var gameInput = document.querySelector("#inputGroupSelect01");
    event.preventDefault();
    var element = event.target;
    var player_id = id.valueOf();
    console.log(player_id);
    var game = gameInput.options[gameInput.selectedIndex].value.trim();
    if (game !== "Choose a game...") {
        console.log(game);
        if(element.parentNode.id == "btnOneOnOne"){
            //work in progress
        }else if(element.parentNode.id == "btnGroup"){
            const response = await fetch('/api/players/'+player_id, {
                method: 'put',
                body: JSON.stringify({
                    game,
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            if(response.ok){
            document.location.replace('/chat/groupchat');
            } else {
                alert(response.statusText);
            }
        }else{
            console.log()
            return;
        }
        console.log(`Run ${element.parentNode.id}`);
    }else{
        alert("Please select a game before selecting a chatroom.")
    }
    
};

module.exports = startchat;

