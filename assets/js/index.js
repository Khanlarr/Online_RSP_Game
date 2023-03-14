import { db } from "./connection.js";
import { get,set,ref,push,onValue,remove } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";
const ply1=document.querySelector('#player1');
const ply2=document.querySelector('#player2');
const input=document.querySelector('#input');
const btn=document.querySelector('#btn');
const choices1=document.querySelector('.choices1');
const choices2=document.querySelector('.choices2');
const winns=document.querySelectorAll('.wins');
const lossses=document.querySelectorAll('.losses');
const cho1=document.querySelector('.choices1 span');
const cho2=document.querySelector('.choices2 span');
const user_add=document.querySelector('.user_add');
const user=document.querySelector('.user');
const ply1_chc=document.querySelectorAll('.ply1_chc');
const ply2_chc=document.querySelectorAll('.ply2_chc');
const card2=document.querySelector('.card2');
let chat_arr=[];
// const rank=document.querySelectorAll('.rank');
const txtarea_chat=document.querySelector('#txtarea_chat');
const input_chat=document.querySelector('#input_chat');
const btn_chat=document.querySelector('#btn_chat');
const person={
    person1:{
    name:'',
    wins:0,
    losses:0
},
person2:{
    name:'',
    wins:0,
    losses:0
}
}
const result={
    person1:{
        wins:0,
        losses:0
    },
    person2:{
        wins:0,
        losses:0
    }
}

function DataGoster1(obj){
    if(obj?.name){
    localStorage.setItem("playerr",obj?.name);
    ply1.innerHTML = obj?.name || 'Player1';
    winns[0].innerHTML= (typeof(obj?.wins)==='number')?('wins: '+obj?.wins): '';
    lossses[0].innerHTML=(typeof(obj?.losses)==='number')?('losses: '+obj?.losses) :''
    }
    else{
        ply1.innerHTML ='Player1';
        winns[0].innerHTML=''
        lossses[0].innerHTML=''
    }
}
function DataGoster2(obj){
    if(obj?.name){
    if(!localStorage.getItem("playerr"))localStorage.setItem("playerr",obj?.name);
    ply2.innerHTML = obj?.name || 'Player2';
    winns[1].innerHTML=(typeof(obj?.wins)==='number')?('wins: '+obj?.wins): ''
    lossses[1].innerHTML=(typeof(obj?.losses)==='number')?('losses: '+obj?.losses): ''
    }
    else{
        ply2.innerHTML ='Player2';
        winns[1].innerHTML=''
        lossses[1].innerHTML=''
    }
}
onValue(ref(db,'/game/players'),async snap=>{
    var obj = await snap.val() || {};
    console.log(obj);
    if(obj){
    if(obj?.[1]?.choice!=='' && obj?.[2]?.choice!==''){
    
     if(obj?.[1]?.choice=='Scissors'&&obj?.[2]?.choice=='Paper'){
        result.person1.wins++;
        result.person2.losses++;
        card2.innerHTML=`${obj?.[1]?.name} Wins`
        card2.classList.add('active');
     }
     else if(obj?.[1]?.choice=='Paper'&&obj?.[2]?.choice=='Scissors'){
        result.person1.losses++;
        result.person2.wins++;
        card2.innerHTML=`${obj?.[2]?.name} Wins`
        card2.classList.add('active');
       }
     else if(obj?.[1]?.choice=='Rock'&&obj?.[2]?.choice=='Scissors'){
        result.person1.wins++;
        result.person2.losses++;
        card2.innerHTML=`${obj?.[1]?.name} Wins`
        card2.classList.add('active');
       }
    else if(obj?.[1]?.choice=='Scissors'&&obj?.[2]?.choice=='Rock'){
        result.person1.losses++;
        result.person2.wins++;
        card2.innerHTML=`${obj?.[2]?.name} Wins`
        card2.classList.add('active');
       }
    else if(obj?.[1]?.choice=='Paper'&&obj?.[2]?.choice=='Rock'){
        result.person1.wins++;
        result.person2.losses++;
        card2.innerHTML=`${obj?.[1]?.name} Wins`
        card2.classList.add('active');
       }
    else if(obj?.[1]?.choice=='Rock'&&obj?.[2]?.choice=='Paper'){
        result.person1.losses++;
        result.person2.wins++;
        card2.innerHTML=`${obj?.[2]?.name} Wins`
        card2.classList.add('active');
       } 
    else if(obj?.[1]?.choice &&obj?.[2]?.choice){
        card2.innerHTML=`You made the same choice`
        card2.classList.add('active');
    } 
    } 
    setTimeout(()=>{
    if(obj?.[1]?.choice && obj?.[2]?.choice){
        obj[1].losses=result.person1.losses;
        obj[1].wins=result.person1.wins;
        obj[2].losses=result.person2.losses;
        obj[2].wins=result.person2.wins;
        if(obj?.[1]?.choice){
            obj[1].choice='';
            cho1.innerHTML=''
            set(ref(db,`/game/players`),obj)
        }
        if(obj?.[2]?.choice){
              obj[2].choice='';
              cho2.innerHTML=''
              set(ref(db,`/game/players`),obj)
         } 
    }
    DataGoster1(obj?.[1]);
    DataGoster2(obj?.[2]);
    },1000)
    console.log(obj);
}
})

btn.addEventListener('click',(e)=>{
    let val=input.value;
    if(ply1.innerHTML==='Player1'){
        person.person1.name=val;
         set(ref(db,`/game/players/1`),person.person1)
         user_add.classList.add('active')
         choices1.classList.add('active')
         user.innerHTML=person.person1.name ?`Hi ${person.person1.name}` : ""
         ply1_chc.forEach((ply1)=>{
            ply1.addEventListener('click',()=>{
                cho1.innerHTML=ply1.innerHTML;
                person.person1.choice=ply1.innerHTML;
                person.person1.wins=result.person1.wins
                person.person1.losses=result.person1.losses
                set(ref(db,`/game/players/1`),person.person1)
            })
         })
         DataGoster1(person.person1);
    }
    else if(ply2.innerHTML==='Player2'){
        person.person2.name=val;
         set(ref(db,`/game/players/2`),person.person2)
         user_add.classList.add('active')
         choices2.classList.add('active')
         user.innerHTML=person.person2.name ?`Hi ${person.person2.name}` : ""
         DataGoster2(person.person2);
        
         ply2_chc.forEach(async(ply2)=>{
            let getim=await get(ref(db,'/game/players/1'));
            let getim_data=await getim.val()
            ply2.addEventListener('click',()=>{
                if(getim_data.choice){
                cho2.innerHTML=ply2.innerHTML;
                person.person2.choice=ply2.innerHTML;
                set(ref(db,`/game/players/2`),person.person2)
                }
            })  
         })
    }  
    input.value='';
    e.preventDefault();
})
const Chat_Goster=(arr)=>{
    txtarea_chat.value=''
    if(arr){for (const [key, value] of Object.entries(arr)) {
        txtarea_chat.value+=value;
    }      }
}
onValue(ref(db,'/game/chats'),async snap=>{
    var obj = await snap.val() || {};
    if(user.innerHTML.includes(localStorage.getItem('playerr'))){Chat_Goster(obj?.[0]);}
    else {Chat_Goster(obj?.[1]);}
})
btn_chat.addEventListener('click',(e)=>{
    let vl=input_chat.value;
    let ad=user.innerHTML.split(' ')[1] || "Salam"
    chat_arr.push(`${ad}: ${vl} \n`)    
    var t=push(ref(db,'/game/chats')).key;
    set(ref(db,`/game/chats/0/${t}`),`${ad}: ${vl} \n`)
    set(ref(db,`/game/chats/1/${t}`),`${ad}: ${vl} \n`)
    Chat_Goster(chat_arr);
    input_chat.value='';
    e.preventDefault();
})
window.addEventListener('beforeunload',(e)=>{
    if(user.innerHTML.includes(localStorage.getItem('playerr'))){
    remove(ref(db,`/game/players/1`));
    remove(ref(db,`/game/chats/0`));
    }
    else{
    remove(ref(db,`/game/players/2`));
    remove(ref(db,`/game/chats/1`));
    }

    
    e.preventDefault()
})