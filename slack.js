class Slack {
  constructor() {
    this.messages = [];
  }
}

class Message {
  constructor(name, date, message) {
    this.name = name;
    this.dateCreated = date;
    this.message = message;
    this.addToDom();
  }
  addToDom() {
    let messageContainer = document.createElement("div");
    messageContainer.setAttribute("class", "message");
    let name = document.createElement("h4");
    let date = document.createElement("h3");
    let text = document.createElement("h2");

    name.innerText = this.name;
    date.innerText = this.dateCreated;
    text.innerText = this.message;
    messageContainer.appendChild(name);
    messageContainer.appendChild(date);
    messageContainer.appendChild(text);
    document.getElementById("messageBox").appendChild(messageContainer);
  }
}
let slack = new Slack();

setInterval(getMessages, 1000);

//get
function getMessages() {
  fetch("http://slack-server.elasticbeanstalk.com/messages")
    .then(response => {
      return response.json();
    })
    .then(myJSON => {
      $("#messageBox").empty();

      console.log(myJSON);

      myJSON.forEach(function(el) {
        let newMessage = new Message(el.created_by, el.created_at, el.message);
        slack.messages.push(newMessage);
      });
    });
}

document.getElementById("submitButton").addEventListener("click", postMessage);
function postMessage() {
  fetch("http://slack-server.elasticbeanstalk.com/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      created_at: Date.now(),
      created_by: document.getElementById("nameInput").value,
      message: document.getElementById("messageInput").value
    })
  })
    .then(response => {
      return response.json();
    })
    .then(myJSON => {
      console.log(myJSON);
    });
}
