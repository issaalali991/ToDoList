const aside = document.getElementById("aside");
const input = document.getElementById("newitemtxt");
const addlistitembtn = document.getElementById("addlistitembtn");
const setpriobtn = document.getElementById("setpriobtn");
const todolist = document.getElementById("todolist");
const todoitem = document.getElementById("todoitem");
const donebutton = document.getElementById("donebtn");
const libuttons = document.getElementById("libuttons");
const htmldata1= '<li class="todoitem" id="todoitem"><div class="midli" id="midli"><p class="litx" id="litxt">';
const htmldata2='</p><div class="libuttons" id="libuttons"><button class="editbtn" id="editbtn"><img src="/icons/pen-to-square-regular.svg" alt=""></button><button class="delbtn" id="delbtn"><img src="/icons/trash-solid.svg" alt=""></button><button class="donebtn" id="donebtn" data-done="">Done</button></div></div></li>';

addlistitembtn.addEventListener('click', () => {
  const task=input.value;
  if(task){
    todolist.innerHTML +=  htmldata1+task+htmldata2;
    input.value ="";
  } else {
    alert('no Item');
  }
  const addev2 = document.getElementsByClassName('delbtn');
  const addev1 = document.getElementsByClassName('donebtn');
  //add event in Delbtn to remove item 
  Array.from(addev2).forEach((el) => {el.addEventListener('click', function (ev2){
    let parent= ev2.target.parentElement.parentElement.parentElement.parentElement;
    parent.remove();
    save();
  })
});
  //add event in Donebtn to Done item
  Array.from(addev1).forEach((el) => {el.addEventListener('click', function (ev1){
    let parent= ev1.target.parentElement.parentElement.parentElement;
    done(parent);
//EX added to update LS status in Delbtn
    save();
    savedone();
    })
  });
//EX to update LS live

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
    localStorage.removeItem('Done List');
  }else{
    localStorage.setItem('Tasks List',JSON.stringify(items));
    savedone();
  }
}
// function savedone
function savedone(){
  const texts_el=document.querySelectorAll('.donebtn')
  const items=[];
  texts_el.forEach((doneNum) => {
    let doneval = doneNum.dataset.done;
    items.push(doneval);
  })
  if(items.length===0){
    localStorage.removeItem('Done List');
  }else{
    localStorage.setItem('Done List',JSON.stringify(items));
  }
}


// function load

function loadList(){
  const items=JSON.parse(localStorage.getItem('Tasks List'));
  const doneitems=JSON.parse(localStorage.getItem('Done List'));
  const addev1 = document.getElementsByClassName('donebtn');
    items.forEach((item) => todolist.innerHTML +=  htmldata1+item+htmldata2);
//Ex add Event in Delbtn
  const addev3 = document.getElementsByClassName('delbtn');
  Array.from(addev3).forEach((el) => {el.addEventListener('click', function (ev3){
    let parent= ev3.target.parentElement.parentElement.parentElement.parentElement;
    parent.remove();
    save();
  })
});
     //add event in Donebtn to Done item
  Array.from(addev1).forEach((el) => {el.addEventListener('click', function (ev1){
    let parent= ev1.target.parentElement.parentElement.parentElement;
    done(parent);
//EX added to update LS status in Delbtn
    save();
    })
//EX to update LS live
    save();
  });
 
      //retrieve Done items

      let index = 0;
      Array.from(doneitems).forEach((ev4) => {
        if(ev4==='1'){
          
          addev1[index].parentElement.parentElement.parentElement.style.color='gray';
          addev1[index].parentElement.parentElement.parentElement.style.textDecoration='line-through';
          addev1[index].style.color='gray';
          addev1[index].dataset.done='1';

      } 
      index++;
    //EX added to update LS status in Delbtn
        save();
        })
    //EX to update LS live
        save();
      
     

}


function done(ev){
  const element = ev.style;
  const donebtn = ev.children[0].children[1].children[2];
  element.textDecoration = element.textDecoration ?  '': 'line-through'  ;
  ev.style.color = ev.style.color ==='gray' ?  '': 'gray'  ;
  donebtn.style.color = donebtn.style.color ==='gray' ?  '#66B7F1': 'gray'  ;
  donebtn.dataset.done = donebtn.dataset.done ?  '': '1'  ;
  console.log(donebtn.dataset.done);
  save();

}

// donebutton.addEventListener('click',done);
loadList()
