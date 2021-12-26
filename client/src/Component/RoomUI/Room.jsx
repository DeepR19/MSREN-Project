import React, {useState, useEffect ,useRef} from 'react';
import {NavLink}from "react-router-dom";
import Swal from "sweetalert2";
import Message from "../RoomUI/message/Message";
import Conversation from "../RoomUI/conversations/Conversation";
import "./Room.css";

const Room = () => {

    const [allUser, setAllUser] = useState([]);
    let _isMounted = useRef(true);

    const [sender, setSender] = useState({
        userId: '',
        email: '',
        name: '',
        img: ''
    });
    const [mount, setMount] = useState(false);
    const [receiver, setReceiver] = useState(null);
    const [conversation, setConversation] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [messages , setMessages] = useState([]);
    const scrollRef = useRef();

useEffect(()=>{
    const message =async ()=>{
        const res = await fetch("/users",{
            method: "POST",
            headers: {
                "Content-Type":" application/json"
            },
            body: JSON.stringify({sender, receiver})
        });
        
        const mess = await res.json();
        setMessages(mess)
    };
    message();
},[receiver, messages, sender])


// get sender Conversation from DB
useEffect(() => {


    Swal.fire({
        position: "center",
        title: `Hello ${sender.name}`,
        confirmButtonText: "Start Chatting",
        background: "./",
        showLoaderOnConfirm: true,
        showConfirmButton: true,
        confirmButtonColor: "royalblue"
    })

    // setImgSrc(Math.floor(Math.random()*5000));


    const handleConversation = async ()  => {
        try{
            const rese = await fetch("/conversation",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                } 
            });

            const data = await rese.json();
            setConversation(data);

        }catch(e){
            console.log(e);
        }      
    };

    
    for(var i=0; i<=100; i++)
    {
        const blocks = document.createElement("div");
        blocks.classList.add("block");
        blocks.style.cssText= `transform: translateX(${Math.random()*1500}px)  translateY(${Math.random()*1800}px) scale(${Math.random()*5}); transition: 3s; transition-delay: 3s; `;
      document.querySelector(".feather").appendChild(blocks);
    }
    handleConversation();
},[sender.userId, sender.name]);



const renderUser  = async() => {
        try{
            setMount(!mount);
            
        // get current user data
            const rese = await fetch("/getdata",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                } 
            });

            const data = await rese.json();
            
            if(_isMounted){
                setSender({ userId:data._id, email:data.email, name: data.firstname , img: `https://avatars.dicebear.com/api/human/${Math.floor(Math.random()*5000)}.svg`});
            }

            if(!rese.status === 200){
                const error = new Error(rese.error);
                throw error;
            }
            
           
        }catch(e){
            console.log(e);
        }
    };
    
useEffect(() => {
    renderUser();
    
    return(()=>{
        _isMounted.current = false;
    })
},[]);

useEffect(()=>{
    const fun = async()=>{
        try{
             const res = await fetch("/conversation",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                } 
            });

            const conv = await res.json();
            setConversation(conv);

            
        }catch(e){
            console.log(e);
        }
   
};
fun();
},[conversation,sender])




// make a link b/w sender and receiver
const handleUsers = async (e) => {
let userId = e.target.getAttribute("data-id");
let name = e.target.getAttribute("data-name");
let userInfo = {userId, name};

const res = await fetch("/conversation",{
        method: "POST",
        headers: {
            "Content-Type":" application/json"
        },
        body: JSON.stringify({sender, userInfo})
    });

    await res.json();
 
}

// send message to DB
const handleSend = async (e)=>{
    e.preventDefault();

    const res = await fetch("/message",{
        method: "POST",
        headers: {
            "Content-Type":" application/json"
        },
        body: JSON.stringify({sender, receiver, text:newMessage})
    })
    const conv = await res.json();

    setMessages(conv);
    setNewMessage("")
};



// get message from DB
const handleMessages= async (e) => {

    let userId = e.target.getAttribute("data-id");
    let name = e.target.getAttribute("data-name");
    let img = e.target.getAttribute("data-img");

    let userInfo = {userId, name, img};
    
    setReceiver(userInfo);

    const res = await fetch("/users",{
        method: "POST",
        headers: {
            "Content-Type":" application/json"
        },
        body: JSON.stringify({sender, receiver})
    });
    
    const mess = await res.json();
    setMessages(mess)

}

const handleCurrentUser = async() => {
    try {
        const responce = await fetch("/register",{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            } 
        });

        const data = await responce.json();

        setAllUser(data);

        document.querySelector("#all1").style.cssText = "transform: translateX(0)"
        document.querySelector(".dark").classList.add("active");

        // console.log("user",typeof(allUser[1]._id));
    } catch (error) {
        console.log(error)
    }
}
const closeDiv =() => {
     document.querySelector("#all1").style.cssText = "transform: translateX(100%)"
    document.querySelector(".dark").classList.remove("active");

}

const searchUser = (e) => {
    
        let name = document.querySelectorAll(".area .conversation")
        name.forEach(user=>{
            let tr = user.childNodes[1]
            let name =user.childNodes[1].innerHTML.toLowerCase();
            let side = e.target.value.toLowerCase();
            let check = name.indexOf(side);

            if(check){
                tr.parentElement.style.display = "none"; 
            }
            else{
                tr.parentElement.style.display = ""; 
            }
        })
}

// this done for smooth scroll of messages
useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

const styled = {
    color: "#fff",
    textDecoration: "none"
}
  
    return (
       
       <>
       {/* <div className="feather">
           <div className="block"></div>
        </div> */}
        <div className="feather">
    
            
        </div>
        
        
       




       <div className="roomPage">
       <div className="containers">
            <div className="sideChat">
                <header>
                    <div className="detail">
                     <img src={sender.img} className="sendImg" alt='userImg'/>

                        <div className="userInfo">
                            <h5>{sender.name}</h5>
                        </div>

                    </div>
                </header>
                <section>
            <div className="area">
                   
                    {conversation && conversation.length>0 ? 
                    conversation.map(user=><Conversation  handleMess={handleMessages} conversation={user} currentUser={sender}/>)
                    
                    : <h2>Loading...</h2>}  
            </div>  

                </section>
                <footer>
                    <input type="text" id="search" placeholder="Search for User..." onChange={searchUser}/> 
                </footer>
            </div>
       
            <div className="mainChat">
            <header>
                <div className="detail">
                    {/* <button id="main" onClick={handleMain}>C-</button> */}
                {receiver ? <img src={receiver.img} className="revImg" alt='friendImg'/>:null}

                    <div className="userInfo">
                        {receiver ? <h5>{receiver.name}</h5>:""}
                       
                    </div>
            <button className="online" title="Contact Here" onClick={handleCurrentUser}>👨‍👩‍👧‍👦</button>

                </div>

                       
            </header>

            <section>
                <div className="chatArea">

                    {messages && messages.length> 0 ?messages.map((m) => (
                        <div ref={scrollRef} className="ref">
                            <Message message={m} own={m.sender === sender.userId} senderImg={sender.img} receiverImg={receiver.img}/>
                        </div>
                    )):<div className="blocks">Start Chatting with your Friends😊🤗</div>}                 

                </div>
            </section>
            
            <footer> 
                <input type="text" className="message" id="message"
                     onChange ={(e)=>setNewMessage(e.target.value)} placeholder="Type Your Message..."
                     value={newMessage}/> 

                <form method="POST" className="chatSend">
                    <input type="submit" id="send"value="Send" onClick={handleSend}/>
                </form>
            </footer>

        </div>
        </div>
        </div>
      
            <button className="btn btn-success exit">
                <NavLink to="/home" style={styled}>EXIT</NavLink>
            </button>
            
               
        <form id="all1" method="POST" >
        <h1 className="close" onClick={closeDiv}>X</h1>

            <ul className="ki" onClick={closeDiv}>
                {allUser.map((user) =>user._id !== sender.userId? <li key={user.email} data-id={user._id} data-name={user.firstname} onClick={handleUsers}>{user.firstname}</li>:console.log())}
            </ul>
            <h1>MSREN</h1>

        </form>
                  
        <div className="dark"></div>

       </>
    )
}

export default Room
