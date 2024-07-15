function gamingToggles(){
  if(document.querySelector('.gaming-button').classList.contains('is-toggled')){
    document.querySelector('.gaming-button').classList.remove('is-toggled');
  }else {
    document.querySelector('.gaming-button').classList.add('is-toggled');
  }
  
}

function musicToggles(){
  if(document.querySelector('.music-button').classList.contains('is-toggled')){
    document.querySelector('.music-button').classList.remove('is-toggled');
  }else {
    document.querySelector('.music-button').classList.add('is-toggled');
  }
  
}

function techToggles(){
  if(document.querySelector('.tech-button').classList.contains('is-toggled')){
    document.querySelector('.tech-button').classList.remove('is-toggled');
  }else {
    document.querySelector('.tech-button').classList.add('is-toggled');
  }
  
}