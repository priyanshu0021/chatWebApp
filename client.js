const socket = io();
var send = document.querySelector(".field-box img");
var chatbox = document.querySelector(".rigth-inner");
var msginp = document.querySelector(".field-box input");
var menue= document.querySelector(".menue");
var names;
do{
   names= prompt("enter your name");
}while(!names)

//Append messages
var append = (message,position)=>{
    let div = document.createElement("div");

    if(position==='send-msg'){
        let inner = `<h6>You</h6>
                 <p>${message.masage}</p>`;
   div.classList.add(position);
   div.classList.add("msg");
   div.innerHTML=inner;
    msginp.value="";
   chatbox.appendChild(div);
    }
    else{
        let inner = `<h6>${message.user}</h6>
                     <p>${message.masage}</p>`;
       div.classList.add(position);
       div.classList.add("msg");
       div.innerHTML=inner;
        msginp.value="";
       chatbox.appendChild(div);
    }

}
//sending msg
send.addEventListener("click",()=>{
    var msg ={
        user :names,
        masage:msginp.value
    }
  
    if(msginp.value!=""){
        append(msg,'send-msg');
        socket.emit("message",msg);
    }
 })
 socket.emit("newuser-join",names);
 //reciving msg
 socket.on("message",(msg)=>{
   append(msg,"recive");
 });
 socket.on("user-join",(users)=>{
    var arr= Object.values(users);
    document.querySelector(".active-member").innerHTML='';
    for(let i=0;i<arr.length;i++){
        h = document.createElement("h4");
        h.innerHTML=arr[i];
        document.querySelector(".active-member").appendChild(h);
    }

 });


////////////////////////////////////////////////////
 ///////////////////////////////////////////////////
 var f=1;
menue.addEventListener("click",()=>{
    if(f){
        document.querySelector(".items").style.opacity=1;
        f=0;
    }else{
        document.querySelector(".items").style.opacity=0;
        f=1;
    }
})
////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

//image loader

document.querySelector("#lodader").addEventListener("click",()=>{
document.querySelector("#image-load").click();
})
function sendimage(e){
   let imagefile = e.files[0];
   if(!imagefile.type.match("image.*")){
    alert("selet image");
   }
   else{
    var result = new FileReader();
    result.addEventListener("load",()=>{
      append(result.result,'send-msg');   
    },false)
    if(imagefile){
        result.readAsDataURL(imagefile);
    }
   }
}