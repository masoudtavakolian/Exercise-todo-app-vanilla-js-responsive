"use strict";
class Menu {
  constructor(divId) {
    this.divId = divId;
  }
  static Focus() {}
}


let v=new Array()
let inputText = document.querySelector(".searchinput");
let searchIcon = document.querySelector(".searchicon");
let menubotton = document.querySelector(".menu");
let menubottonclose = document.querySelector(".closemenu");
let sherror=document.querySelector('.showerror');
let showitemcontainer=document.querySelector(".showitemcontainer");
let alltask=document.querySelector(".showalltask");
let aic=document.querySelector("allitemscontent");
let ain=document.querySelector("allitemsnumber");
let taskpanel=document.querySelector('.addnewpanel');
let newtask=document.querySelector('.newtask');
let input=document.querySelector(".newitembox");
let completedtask=document.querySelector(".completedtask");
let notcompletedtask=document.querySelector(".notcompletedtask");
let menupanel=document.querySelector(".menupanel");
let stateshow="all";
let tasklist=[];
(() => {
  updatelist("all");
})();

function Focus_search_box(state) {
  if (state) {
    searchBox.style.width = "0";
    let width = 0;
    let t = setInterval(() => {
      searchBox.style.width = ++width + "%";
      if (width >= 30) clearInterval(t);
    }, 11);
    searchBox.style.backgroundColor = "aliceblue";
  } else {
    let width = 30;
    let t2 = setInterval(() => {
      searchBox.style.width = --width + "%";
      if (width <= 0) clearInterval(t2);
    }, 11);
    width = 30;
    searchBox.style["width"] = "30%";
    // searchBox.style.width = width + "%";
    console.log(searchBox.style["width"]);
  }
}
function show_menu_animation(value) {
  let menu = document.querySelector(".menupanel");
  let mainpanel = document.querySelector(".mainpanel");
  if (value) {
    menu.classList.add("showmenu");
    mainpanel.classList.remove("mainpanelcheck");
  }
  else {
    menu.classList.remove("showmenu");
    mainpanel.classList.add("mainpanelcheck");
    menu.classList.remove("firststatepanel");
  }
}
menubotton.addEventListener("click", () => {
  menupanel.style.opacity="1"
  show_menu_animation(true);
  menubotton.style.display = "none";
  menubottonclose.style.display = "inline-flex";
  men
});
menubottonclose.addEventListener("click", () => {
  menupanel.style.opacity="0"
  show_menu_animation(false);
  menubotton.style.display = "inline-flex";
  menubottonclose.style.display = "none";
});
searchIcon.addEventListener("click", () => {
  if(inputText.value=="")
    inputText.focus();
  else
    searchitems(inputText.value);
});
inputText.addEventListener("focus", () => {
  searchIcon.style.backgroundColor = "aliceblue";
});
inputText.addEventListener("focusout", () => {
  //inputText.value = null;
  searchIcon.style.backgroundColor = "";
});
inputText.addEventListener('keyup',(e)=>{
  if(e.keyCode===13){
    e.preventDefault();
    if(e.target.value==""){
    //alert("Enter Value To search!");
      e.target.placeholder="Enter Value To search!"
    }
    else{
      searchitems(inputText.value);
      e.target.placeholder="Search..."
    }
  }
})

//search items
function searchitems(value){
  Makeotherdefalut();
  inputText.value=""; 
  updatelist("search",value);
}
//remove successfull message
input.addEventListener('keydown',()=>{
  sherror.innerHTML="";
  console.log('change')
})

//toggle task
let toggle=false;
newtask.addEventListener('click',()=>{
  if(toggle){
  taskpanel.style.display="none";
  sherror.innerHTML=null;
}
  else{
  taskpanel.style.display="block"
  input.focus();}
  toggle=!toggle;
});

//add new item
function mytask(value,state){
  this.value=value;
  this.state=state;
}
let ok=document.querySelector(".okbutton");
ok.addEventListener('click',(e)=>{
  e.preventDefault();
  if(input.value==''){
    sherror.innerHTML='Please Fill Input!';
    sherror.style.color="red";
  }
    else{
    tasklist.push(new mytask(input.value.replace(/<[^>]*>/g, ''),'wait'));
    sherror.style.color="green";
    sherror.innerHTML="";
    sherror.innerHTML="Successfully Add Task.";
    input.value="";
    updatelist(stateshow);
    for(let itm of tasklist)
      console.log(itm)
  }
  });


//cancel new item
let cancel=document.querySelector(".cancelbutton");
cancel.addEventListener('click',(e)=>{
e.preventDefault();
taskpanel.style.display="none";
sherror.innerHTML=null; 
toggle=!toggle;
});


//update list item
function updatelist(wh,args){
  let message=document.querySelector('.message');
  for(let io=0;io<v.length;io++){
    v[io].remove();
    }
    let itt=0;
  if(tasklist.length!=0)
  {
  message.innerHTML="";
  for(let ii=0;ii<tasklist.length;ii++)
  {
    if((wh=="wait")){
    if(tasklist[ii].state=="wait"){
        itt++;
        CreateItems(wh,itt,ii);
    }}
    else if((wh=="done")){
      if(tasklist[ii].state=="done"){
          itt++;
          CreateItems(wh,itt,ii);
      }}
    else if(wh=="search"){
      let res=tasklist[ii].value.search(args);
      if(res!=-1){
        itt++;
        let wh2=tasklist[ii].state;
        CreateItems(wh2,itt,ii,wh);
      }
    }
    else{
      itt++
      CreateItems(tasklist[ii].state,itt,ii);
    }
    
  }
  
  function CreateItems(wh,itt,items,wh2)
    {v.push(document.createElement('div'));
    let pp=v[v.length-1];
    v[v.length-1].classList.add('parentitem');

    v.push(document.createElement('div'));
    v[v.length-1].classList.add('allitemsnumber');
    v[v.length-1].innerHTML=itt;
    pp.appendChild(v[v.length-1]);

    v.push(document.createElement('div'));
    v[v.length-1].classList.add('allitemscontent');

    if(tasklist[items].state=='done')
    v[v.length-1].classList.add('deletedtask');

    if(wh2=="search")
    v[v.length-1].innerHTML=colorsearchresult(args,tasklist[items].value);
    else
      v[v.length-1].innerHTML=tasklist[items].value;
    pp.appendChild(v[v.length-1]);

    if(wh!="done"){
    v.push(document.createElement('div'));
    v[v.length-1].classList.add('doneitem');
    v[v.length-1].addEventListener('click',()=>{
      TaskDone(items,itt);
    })
    v[v.length-1].innerHTML=
    '<button type="submit" style="width:50px" class="okbutton">Done</button>';
    pp.appendChild(v[v.length-1]);
    }

    v.push(document.createElement('div'));
    v[v.length-1].classList.add('deleteitem');
    v[v.length-1].addEventListener('click',()=>{
      DeleteTask(items,itt);
    })
    v[v.length-1].innerHTML=
    '<button type="submit" style="width:50px" class="cancelbutton"><svg class="svg-icon" viewBox="0 0 20 20"><path fill="CurrentColor" d="M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z"></path></svg></button>';
    pp.appendChild(v[v.length-1]);

    showitemcontainer.appendChild(pp);

    v.push(document.createElement('div'));
    v[v.length-1].innerHTML="<br>";
    showitemcontainer.appendChild(v[v.length-1]);

  }
  showitemcontainer.scrollTop = showitemcontainer.scrollHeight;
}
else if(tasklist.length==0 && wh!="search")
message.innerHTML="No Task Here! Add new Task :)";
else if(tasklist.length==0 && wh=="search")
  message.innerHTML="Can't Search! No Task Defined!";

if(tasklist.length!=0 && itt==0)
{
  if(wh=="search")
  message.innerHTML="Not Find Result :(";
  else if(stateshow=="all")
  message.innerHTML="No Task! Add new Task :)";
  else if(stateshow=="done")
  message.innerHTML="Oops! No Task Completed :(";
  else if(stateshow=="wait")
  message.innerHTML="Wow! All Task Completed, You Are Awesome!";
}
else if(tasklist.length!=0 && itt!=0){
  if(wh=="search")
  message.innerHTML=`Search Result(${itt}):`;
  else if(stateshow=="all")
  message.innerHTML="All Task:";
  else if(stateshow=="done")
  message.innerHTML="Completed Task:";
  else if(stateshow=="wait")
  message.innerHTML="Not Completed Task:";
}
}

//color search result
function colorsearchresult(find,value){
  
  let all="";
  let lastindex;
  //while(value.length>=find.length){
  lastindex=value.search(find);
  while(lastindex!=-1){
  all=all+`${value.slice(0,lastindex)}<span style='text-align:left;color:yellow'>${value.slice(lastindex,lastindex+find.length)}</span>`;
  // if(lastindex+find.length-1)
  if((lastindex+find.length)==value.length){
  value="";lastindex=-1;
  }
  else{
  value=value.slice(lastindex+find.length,value.length);
  lastindex=value.search(find);
  }
}
  
  all+=value;
  all.replace(" ","&nbsp;");
  // firstindex=lastindex+find.length;
  // value=value.substr(firstindex,v.length-1);
  /* value=value.substr(find.length,value.length-1);
  lastindex=value.search(find); */
// }
//console.log(all)
return all
}

//done task
function TaskDone(items,itt){
  let outmessage=confirm(`Complete this item?\r\nItem: ${itt}\r\nTask: ${tasklist[items].value}`);
  if(outmessage){
  tasklist[items].state="done";
  updatelist(stateshow);
  }
}

//delete task
function DeleteTask(items,itt){
 let outmessage=confirm(`Do You Want Delete this item?\r\nItem: ${itt}\r\nTask: ${tasklist[items].value}`);
  if(outmessage){
  tasklist.splice(items,1);
  console.log(tasklist)
  updatelist(stateshow);}
}

 //category
let temp_coll="azure";
let temp_coll2="var(--cal-backpanels)";
function Makeotherdefalut(ev){
  alltask.style.backgroundColor=temp_coll2;
  completedtask.style.backgroundColor=temp_coll2;
  notcompletedtask.style.backgroundColor=temp_coll2;
  if(ev!=undefined)
  ev.style.backgroundColor=temp_coll;
}

 alltask.addEventListener('click',(event)=>{
  stateshow="all"; updatelist("all","");
   Makeotherdefalut(event.currentTarget);
   });

 completedtask.addEventListener('click',(event)=>{
  stateshow="done"; updatelist("done","");
  Makeotherdefalut(event.currentTarget);
  });

 notcompletedtask.addEventListener('click',(event)=>{
  stateshow="wait"; updatelist("wait","");
  Makeotherdefalut(event.currentTarget);
  });
 
