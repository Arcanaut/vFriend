
const startchat = async (event, id) => {
    var gameInput = document.getElementById('inputGroupSelect01');
    event.preventDefault();
    var game = gameInput.options[gameInput.selectedIndex].value.trim();
    if (game !== "Choose a group...") {
            const response = await fetch('/api/games/'+game, {
                method: 'get',
                headers: { 'Content-Type': 'application/json' }
            });
            if(response){
            document.location.replace('/chat/groupchat');
            } else {
                alert(response.statusText);
            }
    }else{
        alert("Please select a game before selecting a chatroom.");
    }
};

module.exports = { startchat };

