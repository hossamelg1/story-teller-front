var line = {
    id: '',
    content: ''
  }
  var idLine = 0
  var id = 0
  var article = document.getElementsByClassName('article')[0];
  var placeholder = document.getElementsByClassName('placeholder')[0];
  var newP = document.getElementById('addP')
  newP.addEventListener('click', function(){
    newParagraph(id);
    console.log(id);
  });
  //var latestParagraph = undefined;
  // add new paragraph function 
  function newParagraph(idParagraph){
    var p = document.createElement('p');
    p.setAttribute('contenteditable', 'true');
    id++
    p.id = idParagraph.toString()
    article.appendChild(p);
    p.focus();
  }
  placeholder.addEventListener('click', function() {
    newParagraph(id);
    article.removeChild(placeholder);
    console.log(id, idLine);
  }); 
  article.addEventListener('keydown', function(e){
    if(event.keyCode == 13){
      idLine++
      if(idLine  == 10 ){
        idLine = 1
        newParagraph(id)
        console.log(id)
      }
    }
  })
  // image manipulation  
  var image = document.getElementById('image');
  image.addEventListener('change', (event) => {
    var file = document.querySelector('#image').files[0];
    var img = document.createElement('img');
    getBase64(file).then( data => {
      img.src = data;
      img.height = 400;
      article.appendChild(img);
      var newp = document.createElement('p')
      newp.setAttribute('contenteditable', 'true');
      article.appendChild(newp)
      newp.focus();
      });
  });
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  //end image manipulation 

  //misc:
  function toggleChoices() {
    var choices = document.getElementsByClassName("add-choices")[0];
    if(choices.style.visibility === 'visible')
    {
      choices.style.visibility = 'hidden';
    }
    else {
      choices.style.visibility = 'visible';
    }
  }
  function getResult() {
    var post = {};
    var output = [];
    var paragraphs = article.getElementsByTagName('p');
    var linecount = 0;
    for(var i = 0; i< paragraphs.length; i++) {
      var lines = paragraphs[i]
        .innerText
        .split('\n')
        .filter(x => x !== "");

      for (var j=0; j < lines.length; j++) {
        output.push({content: lines[j], id:linecount++});
      }
    }
    localStorage.setItem("data", json);
    post = {title: h.innerHTML, lines: output};
    var json = JSON.stringify(post);
    localStorage.setItem("data", json);
    console.log(localStorage.getItem("data")); 
    $.post('http://localhost:8000/sharing/addpost/', post,
    function(data, status, xhr){
      console.log('The data has been sent successfully ');
      console.log(data);
    }
  );     
}
  var header = document.getElementsByClassName('header')[0]
  var _title = document.getElementById('title')
  var h = document.createElement('h4')
      _title.addEventListener('click', function(){
      console.log('fire')
      h.setAttribute('contenteditable', 'true');
      header.appendChild(h)
      header.removeChild(_title)
      h.focus()
      h.addEventListener('keydown', function(event){
          if(event.which == 13){
            event.preventDefault();
            event.stopPropagation();
            return false;
          }
      })
  })