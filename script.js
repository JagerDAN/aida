function Calendar2(id, year, month) {
  var Dlast = new Date(year,month+1,0).getDate(),
      D = new Date(year,month,Dlast),
      DNlast = new Date(D.getFullYear(),D.getMonth(),Dlast).getDay(),
      DNfirst = new Date(D.getFullYear(),D.getMonth(),1).getDay(),
      calendar = '<tr>',
      month=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];

      div = document.createElement('div');
      div.className += ' fill';    
      document.querySelector('.container').appendChild(div);

      div1 = document.createElement('div');
      //div1[0].setAttribute('id', 'div1');
      div1.className += 'fill point';    
      div.appendChild(div1);
      
      div2 = document.createElement('div');
      //div2[0].setAttribute("id", 'div2');
      div2.className += 'fill point';    
      div.appendChild(div2);
      
      div3 = document.createElement('div');
      //div3[0].setAttribute('id', 'div3');
      div3.className += 'fill point';    
      div.appendChild(div3);
      var elem = document.getElementsByClassName('fill');
      for (var i = 0; i < elem.length; i++) {
        elem[i].setAttribute('draggable', true);
      }
      
  if (DNfirst != 0) {
    for(var  i = 1; i < DNfirst; i++) calendar += '<td>';
  }else{
    for(var  i = 0; i < 6; i++) calendar += '<td>';
  }
  for(var  i = 1; i <= Dlast; i++) {
    if (i == new Date().getDate() && D.getFullYear() == new Date().getFullYear() && D.getMonth() == new Date().getMonth()) {
      calendar += '<td class="today empty">'+ i;
    }else{
      calendar += '<td class="empty">'+ i;
    }
    if (new Date(D.getFullYear(),D.getMonth(),i).getDay() == 0) {
      calendar += '<tr>';
    }
  }

  for(var  i = DNlast; i < 7; i++) calendar += '<td>&nbsp;';
  document.querySelector('#'+id+' tbody').innerHTML = calendar;
  document.querySelector('#'+id+' thead th:nth-child(2)').innerHTML = month[D.getMonth()] +' '+ D.getFullYear() +'<button id="today_btn" onclick="onToday()">Today</button>';
  document.querySelector('#'+id+' thead th:nth-child(2)').dataset.month = D.getMonth();
  document.querySelector('#'+id+' thead th:nth-child(2)').dataset.year = D.getFullYear();
  if (document.querySelectorAll('#'+id+' tbody tr').length < 6) {  
      document.querySelector('#'+id+' tbody').innerHTML += '<tr><td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp;<td>&nbsp';
  }

  /*var div = document.createElement('div');
  div.className += ' fill';    
  document.querySelector('.container').appendChild(div);
  var elem = document.getElementsByClassName('fill');
  elem[0].setAttribute('draggable', true);*/
  /*if(jd === 1) {
    var div = document.createElement('div');
    div.className += ' fill';    
    document.querySelector('#calendar2 tbody tr:nth-child(1) td:nth-child(1)').appendChild(div);
    var elem = document.getElementsByClassName('fill');
    elem[0].setAttribute('draggable', true);
  }*/

  var cellId = document.getElementsByTagName('td');
  for (var i = 0; i < cellId.length; i++) {
    cellId[i].setAttribute('id', i+1);
  }

  dad();
}
var div, div1, div2, div3;

/*div = document.createElement('div');
div.className += ' fill';    
document.querySelector('.container').appendChild(div);

div1 = document.createElement('div');
//div1[0].setAttribute('id', 'div1');
div1.className += 'fill point';    
div.appendChild(div1);

div2 = document.createElement('div');
//div2[0].setAttribute("id", 'div2');
div2.className += 'fill point';    
div.appendChild(div2);

div3 = document.createElement('div');
//div3[0].setAttribute('id', 'div3');
div3.className += 'fill point';    
div.appendChild(div3);
var elem = document.getElementsByClassName('fill');
for (var i = 0; i < elem.length; i++) {
  elem[i].setAttribute('draggable', true);
}*/

Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
//dad(1);
//newDiv();

function newDiv() {
  var div = document.createElement('div');
  div.className += ' fill';    
  document.querySelector('#calendar2 tbody tr:nth-child(1) td:nth-child(1)').appendChild(div);
  var elem = document.getElementsByClassName('fill');
  elem[0].setAttribute('draggable', true);
}
 
document.querySelector('#calendar2 thead tr:nth-child(1) th:nth-child(1)').onclick = function() {
  arrowLeft();
}

document.querySelector('#calendar2 thead tr:nth-child(1) th:nth-child(3)').onclick = function() {
  arrowRight();
}

function onToday() {
  Calendar2("calendar2", new Date().getFullYear(), new Date().getMonth());
}

function arrowLeft() {
  Calendar2("calendar2", document.querySelector('#calendar2 thead th:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead th:nth-child(2)').dataset.month)-1);
  div.parentNode.removeChild(div);
  //dad(2);
}

function arrowRight() {
  Calendar2("calendar2", document.querySelector('#calendar2 thead th:nth-child(2)').dataset.year, parseFloat(document.querySelector('#calendar2 thead th:nth-child(2)').dataset.month)+1);
  div.parentNode.removeChild(div);
  //dad(2);
}



//D&D
function dad() {

  /*if (v == 1) {
    var div = document.createElement('div');
    div.className += ' fill';    
    document.querySelector('#calendar2 tbody tr:nth-child(1) td:nth-child(1)').appendChild(div);
    var elem = document.getElementsByClassName('fill');
    elem[0].setAttribute('draggable', true);
  }*/

  var fill = document.querySelector('.fill');
  var empties = document.querySelectorAll('.empty');

  // Fill listeners
  fill.addEventListener('dragstart', dragStart);
  fill.addEventListener('dragend', dragEnd);

  // Loop through empty boxes and add listeners
  for (var empty of empties) {
    empty.addEventListener('dragover', dragOver);
    empty.addEventListener('dragenter', dragEnter);
    empty.addEventListener('dragleave', dragLeave);
    empty.addEventListener('drop', dragDrop);
  }

  // Drag Functions

  function dragStart() {
    this.className += ' hold';
    setTimeout(() => (this.className = 'invisible'), 0);
  }

  function dragEnd() {
    this.className = 'fill';  
  }

  function dragOver(e) {
    e.preventDefault();
    id1 = this.id;
    id2 = parseInt(id1) + 1;
    id3 = parseInt(id1) - 1;
    td2 = document.getElementById(id2);
    td3 = document.getElementById(id3);
    td2.className += ' hovered';
    td3.className += ' hovered';
    this.className += ' hovered';
    /*if (td2.claasList.contains('today')) {
      td2.className += ' today hovered';
    }else {
      td2.className += ' hovered';
    }
    if (td3.claasList.contains('today')) {
      td2.className += ' today hovered';
    }else {
      td3.className += ' hovered';
    }
    if (this.claasList.contains('today')) {
      this.className += ' today hovered';
    }else {
      this.className += ' hovered';
    }*/
  }

  var timer1;
  var timer2;

  function dragEnter(e) {
    e.preventDefault();
      if (this.classList.contains('arrowLeft')) {
        setTimeout(arrowLeft, 1000);
        //document.getElementsByTagName('td').className = 'empty';
      } else if(this.classList.contains('arrowRight')){ 
        setTimeout(arrowRight, 1000);
        //document.getElementsByTagName('td').className = 'empty';
      }
  }

  function dragLeave() {
    if (this.classList.contains('today')) {
      this.className = 'today empty';
    } else if(this.classList.contains('arrowLeft')) {
      this.className = 'empty arrowLeft';
      //clearTimeout(timer1);
    }
    else if(this.classList.contains('arrowRight')) {
      this.className = 'empty arrowRight';
      //clearTimeout(timer2);
    }
    else {
        id1 = this.id;
        id2 = parseInt(id1) + 1;
        id3 = parseInt(id1) - 1;
        td2 = document.getElementById(id2);
        td3 = document.getElementById(id3);
        td2.className = 'empty';
        td3.className = 'empty';
        this.className = 'empty';
       /*setTimeout(() => (this.className = 'empty'), 0);
        setTimeout(() => (td2.className = 'empty'), 0);
        setTimeout(() => (td3.className = 'empty'), 0);*/
    }
  }

  var id1, id2, td2, id3, td3;

  function dragDrop() {
      if (this.classList.contains('today')) {
      this.className = 'today empty';
      this.append(fill);
    } else if(this.classList.contains('arrowLeft')) {
      this.className = 'empty arrowLeft';
      //clearTimeout(timer1);
    }
    else if(this.classList.contains('arrowRight')) {
      this.className = 'empty arrowRight';
      //clearTimeout(timer2);
    }
    else {
      this.className = 'empty';
      this.append(div1);
      id1 = this.id;
      id2 = parseInt(id1) + 1;
      id3 = parseInt(id1) - 1;
      td2 = document.getElementById(id2);
      td3 = document.getElementById(id3);
      td2.className = 'empty';
      td3.className = 'empty';
      td2.append(div2);
      td3.append(div3);
    }  
  }

}