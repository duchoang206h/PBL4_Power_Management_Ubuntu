window.onload = async ()=>{
  document.getElementById('brightness').innerHTML = await window.system.getCurrentBrightness();
}
