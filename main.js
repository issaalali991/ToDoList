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
});
  
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
      
     /*  const todoitem=document.createElement('li');
      todoitem.classList.add('todoitem');
       const midli=document.createElement('div');
       midli.classList.add('midli');
       todoitem.appendChild(midli);
   
       const litx=document.createElement('P');
       litx.classList.add('litx');
       litx.innerText=item;
       midli.appendChild(litx);
   
       const libuttons=document.createElement('div');
       libuttons.classList.add('libuttons');
   // add button 1
       const editbtn=document.createElement('button');
       editbtn.classList.add('editbtn');
       const img1=document.createElement('img');
       img1.src='/icons/pen-to-square-regular.svg';
   
       editbtn.appendChild(img1);
       libuttons.appendChild(editbtn);
   // add button 2
   
       const delbtn=document.createElement('button');
       delbtn.classList.add('delbtn');
       const img2=document.createElement('img');
       img2.src='/icons/trash-solid.svg';
   
       delbtn.appendChild(img2);
       libuttons.appendChild(delbtn);
   
       // add button 3
       const donebtn=document.createElement('button');
       donebtn.classList.add('donebtn');
       donebtn.innerText='Done';
   
       
   
       
       libuttons.appendChild(donebtn);
   
   
       midli.appendChild(libuttons);
   
       todolist.appendChild(todoitem);
      input.value=""
      delbtn.addEventListener('click', () => {
        todolist.removeChild(todoitem);
        save();
      })
   */

}

loadList()
