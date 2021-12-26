import React ,{useEffect, useState}from "react";
import io from 'socket.io-client';

let socket;

const Chat = () => {

    let [sender, setSender] = useState("");
    let [receiver, setReceiver] = useState('');
    let [group, setGroup] = useState('');
    let [message, setMessage] = useState('');
    // let receiver;
    // let sender;
    // let group;

    useEffect(() => {

        const ENDPOINT = 'localhost:5000';

            socket = io(ENDPOINT);
             socket.on('connection',()=>{});

            socket.on('userConnect' , function (userName)  {

                let li = document.createElement("li");
                let btn = document.createElement("button");
                btn.innerHTML = userName;

                btn.addEventListener("click",() => {
                    
                //    console.log("receiver--",userName);
                   setReceiver(userName);
                   btn.innerHTML = `-->${receiver}`;
               })
               
                li.append(btn);

 
                let users = document.querySelector(".users");
                users.append(li);

            })


            socket.on("newMessage", (data) => {
                let message = `<li>Sender: ${data.sender} says ${data.message}</li>`;

                document.querySelector(".messages").innerHTML += message;
            })
          
            
            
            socket.on("handIn",(name, gp)=>{
                console.log(name, gp);
            });


            socket.on("Send",(data) => {
                console.log(data);
            })
    },[socket])
    

    
        const handleClick =(e) =>{
            e.preventDefault();
            console.log(sender+"--sender");

            socket.emit("userConnected",sender);
        }

        const handleSend =(e) =>{
            e.preventDefault();
            
            console.log(message, sender, receiver);

            socket.emit("send_message",{
                sender, receiver, message              
            })
        }
       const handleGroup =(e) => {
           e.preventDefault();

           socket.emit("handleGroup",sender, group);
       }


       const handleSendG =(e) => {
            e.preventDefault();
            setMessage(document.querySelector(".message").value);

            console.log(message, sender, group);

            socket.emit("sendGroup",{
                sender, group,message 
            })
        }

    return(
        <>
            <form>
                <input className="name" type="text" />

                <input type ="submit" value="Sender" onClick={handleClick}/><br/>
                <input className="group" type="text" onChange={(e)=>setGroup(e.target.value)}/>
                <input type ="submit" value="Group"  onClick={handleGroup}/>
            </form>

            <ul className="users"></ul>

            <form>
                <input className="message" type="text" />
                <input type ="submit" value="Private" onClick={handleSend}/>
                <input type ="submit" value="Group" onClick={handleSendG}/>
            </form>

            <ul className="messages"></ul>

        </>
    )
}

export default Chat;