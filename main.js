function selectCard(card) {
    // code goes here to select a car
    let cls = document.getElementsByClassName(card);
    let cards = document.getElementsByName('cardSelected');
    cards.forEach(element => {
        
        if (element.checked) {
            n=0;
            element.parentElement.id = "selected";
        } else {
            element.parentElement.id = "none";
        }
    });
    document.getElementById('selected').appendChild(document.createElement('ul'));
    // if(cls.childNodes[1].checked){
    //     cls.setAttribute('id','selected'); 
    // }else{
    //     cls.setAttribute('id',''); 
    // }
}
// console.log(toString(document.getElementById('selected').children[0]));
document.getElementById('selected').appendChild(document.createElement('ul'));
var n=0;
function addWork() {
    // code goes here for add work mode
    
    let list = document.getElementById('selected').children[2];
    if(document.getElementById('work').value==""){
    list.innerHTML = `<li><button class="delbtn"id="deleteBtn${n+=1}" style="display:none;"onclick=deleteWork("deleteBtn${n}")>-</button></li>`
    console.log(document.querySelectorAll('.card1 ul li').length)
    }else{
    list.innerHTML += `<li><button class="delbtn"id="deleteBtn${n+=1}" style="display:none;"onclick=deleteWork("deleteBtn${n}")>-</button>${document.getElementById('work').value}</li>`
    // console.log(list);
    }
    document.getElementById('work').value="";
}
function deleteWork(id) {
    let checklist=document.querySelectorAll(`#selected ul li button`);
    checklist.forEach(element=>{
        if(element.id==id){
            element.parentElement.style.display='none';
        }
    })
}
function update() {
    // document.querySelector('#selected h2').value=document.querySelector('#selected h2').innerText;
    // code goes here to update card title
    
    if(document.getElementById('cardTitle').value!=""){
        document.querySelector('#selected h2').value = document.getElementById('cardTitle').value;
        document.querySelector('#selected h2').innerText=document.getElementById('cardTitle').value;
    }
    // console.log(document.querySelector('#selected h2').value,document.getElementById('cardTitle').value);
    document.getElementById('cardTitle').value="";
    // console.log(document.getElementById('selected').childNodes);
}
function clearWorkList() {
    //code goes here to clear workList
    n=0;
    // var alltask=document.getElementsByClassName('delbtn');
    // for(let i=0;i<alltask.length;i++){
    //     alltask[i].parentElement.style.display="block";
    //     alltask[i].parentElement.style+='list-style:disc;';
    //     console.log(alltask[i].parentElement.parentElement);
    // }
    var l1=document.querySelector('.card1').children;
    l1[0].removeChild(l1[2]);
    // document.querySelector('.card2').pop()
    // document.querySelector('.card3').pop();
    // document.querySelectorAll('ul').forEach(e=>{
    //   e.innerHTML='';
    // })
    // for (let i=0;i<clrlist.length;i++){
    //     clrlist[i].innerHTML="";
    // }
    // clrlist.forEach(element=>{
    //   element.lastChild.innerHTML=""
    // })
    console.log(l1);
    console.log(document.querySelectorAll('.card1 ul').length);
    
}
function changeMode() {
    // code goes here switch between add work, update card title and delete work
    let mode = document.getElementsByName('mode');
    var delBtn = document.getElementsByClassName('delbtn');
    mode.forEach(element => {
        if (element.checked) {
            // console.log(element.value);
            switch (element.value) {
                case "edit":
                    document.getElementById('add').style.display='none';
                    document.getElementById('edit').style.display='block';
                    
                    for (let i = 0; i < delBtn.length; i++) {
                        delBtn[i].style.display='none';
                    }  
                    break;
                case "delete":
                  document.getElementById('edit').style.display='none';
                  document.getElementById('add').style.display='none';
                    for (let i = 0; i < delBtn.length; i++) {
                        delBtn[i].style.display='none';
                    }                         
                    deleteMode();
                    break;
                case "add":
                    document.getElementById('add').style.display='block';
                    document.getElementById('edit').style.display='none';
                    
                    for (let i = 0; i < delBtn.length; i++) {
                        delBtn[i].style.display='none';
                    }   
                    break;
                default:
                    addWork();
                    break;
            }
        }
    });
}
function deleteMode() {
    // code goes here for delete Mode
    var selcDelBtn = document.querySelectorAll('#selected ul li');
    // for(let j=0;j< document.querySelector('#selected ul li' ).length;j++){
    //     selcDelBtn[j]=document.querySelector('selected ul li');
    //     // console.log(document.getElementById('selected').children[2].children[j].children[0]);
    // }
// console.log(selcDelBtn);
    for (let i = 0; i < selcDelBtn.length; i++) {
        selcDelBtn[i].firstChild.style.display='block'
    }
    // console.log(document.querySelectorAll('#selected ul li'));
}
