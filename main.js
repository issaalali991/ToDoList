const aside = document.getElementById("aside");
const input = document.getElementById("newitemtxt");
const addlistitembtn = document.getElementById("addlistitembtn");
const setpriobtn = document.getElementById("setpriobtn");
const todolist = document.getElementById("todolist");
const todoitem = document.getElementById("todoitem");
const htmldata1= '<li class="todoitem" id="todoitem"><div class="midli" id="midli"><p class="litx" id="litxt">';
const htmldata2='</p><div class="libuttons" id="libuttons"><button class="editbtn" id="editbtn"><img src="/icons/pen-to-square-regular.svg" alt=""></button><button class="delbtn" id="delbtn"><img src="/icons/trash-solid.svg" alt=""></button><button class="donebtn" id="donebtn">Done</button></div></div></li>';

addlistitembtn.addEventListener('click', () => {
  const task=input.value;
  if(task){
    todolist.innerHTML +=  htmldata1+task+htmldata2;
    input.value ="";
  } else {
    alert('no Item');
  }

  const eddev = document.getElementsByClassName('editbtn');
Array.from(eddev).forEach((el) => {el.addEventListener('click', function (ev2){
  let parent= ev2.target.parentElement.parentElement.parentElement.firstChild;
  if(ev2.target.parentElement.innerHTML!="<span>save</span>"){
 
 parent.innerText=""
 ev2.target.parentElement.innerHTML="<span>save</span>";
 input.focus()}
    else{
      const newTxt=input.value;
      parent.innerText=newTxt;
      ev2.target.parentElement.innerHTML="<img src='icons/pen-to-square-regular.svg' alt=''>"
      input.value=""
      save()
    }
 
 

//EX added to update LC status to Delbtn
  
  })
});



  const addev = document.getElementsByClassName('delbtn');
  Array.from(addev).forEach((el) => {el.addEventListener('click', function (ev2){
    let parent= ev2.target.parentElement.parentElement.parentElement.parentElement;
    parent.remove();
//EX added to update LC status to Delbtn
    save();
    })
  });
//EX to update LC live
  save();



}





);

  
// function save
function save(){
  const texts_el=document.querySelectorAll('.litx')
  const items=[];
  texts_el.forEach((text) => {
    const item_text= text.innerText;
    items.push(item_text);
  })
  if(items.length===0){
    localStorage.removeItem('Tasks List');
  }else{
    localStorage.setItem('Tasks List',JSON.stringify(items));
  }
}


// function load

function loadList(){
  const items=JSON.parse(localStorage.getItem('Tasks List'));
    items.forEach((item) => todolist.innerHTML +=  htmldata1+item+htmldata2);
//Ex add Event to Delbtn
    const addev = document.getElementsByClassName('delbtn');
  Array.from(addev).forEach((el) => {el.addEventListener('click', function (ev2){
    let parent= ev2.target.parentElement.parentElement.parentElement.parentElement;
    parent.remove();
//EX added to update LC status to Delbtn
    save();
    })
//EX to update LC live
    save();
  });
      
  const eddev = document.getElementsByClassName('editbtn');
Array.from(eddev).forEach((el) => {el.addEventListener('click', function (ev2){
  let parent= ev2.target.parentElement.parentElement.parentElement.firstChild;
  if(ev2.target.parentElement.innerHTML!="<span>save</span>"){
 
 parent.innerText=""
 ev2.target.parentElement.innerHTML="<span>save</span>";
 input.focus()}
    else{
      const newTxt=input.value;
      parent.innerText=newTxt;
      ev2.target.parentElement.innerHTML="<img src='icons/pen-to-square-regular.svg' alt=''>"
      input.value=""
      save()
    }
 
 

//EX added to update LC status to Delbtn
  
  })
});
     

}

loadList()
