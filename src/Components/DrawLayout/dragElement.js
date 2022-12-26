function dragElement(elmnt) {
    if(elmnt==null | typeof(elmnt)=='undefined'){
        return
    }
    // if(elmnt.getAttribute("myattribute")=="true"){
    //     return 
    // }
    // else{
    //     elmnt.setAttribute("myattribute","true")
    // }
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    // document.onmousedown = dragMouseDown;
    document.addEventListener('mousedown',dragMouseDown)
    function dragMouseDown(e) {
        e = e || window.event;
        pos3 = e.pageX;
        pos4 = e.pageY;
        document.addEventListener('mouseup',closeDragElement)
        // document.onmouseup = closeDragElement;
        // document.onmousemove = elementDrag;
        
    }
    function elementDrag(e) {
        e = e || window.event;
        pos1 = pos3 - e.pageX;
        pos2 = pos4 - e.pageY;
        pos3 = e.pageX;
        pos4 = e.pageY;
        let x = elmnt.getAttribute('x')
        let y = elmnt.getAttribute('y')
        // let x2 = elemnt2.getAttribute('x')
        // let y2 = elemnt2.getAttribute('y')
        x = parseFloat(x)
        y = parseFloat(y)
        elmnt.setAttribute('x',x - pos1)
        elmnt.setAttribute('y',y - pos2)
        // elemnt2.setAttribute('x',x2 - pos1)
        // elemnt2.setAttribute('y',y2 - pos2)

    }
    function closeDragElement(e) {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
function makeResizableDiv(div) {
    const element = document.querySelector(div);
    const resizers = document.querySelectorAll(div + ' .resizer')
    // const element = div
    // const resizers = div2
    console.log(resizers)
    const minimum_size = 20;
    let original_width = 0;
    let original_height = 0;
    let original_x = 0;
    let original_y = 0;
    let original_mouse_x = 0;
    let original_mouse_y = 0;
    for (let i = 0;i < resizers.length; i++) {
      const currentResizer = resizers[i];
      currentResizer.addEventListener('mousedown', function(e) {
        e.preventDefault()
        original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
        original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
        original_x = element.getBoundingClientRect().left;
        original_y = element.getBoundingClientRect().top;
        original_mouse_x = e.pageX;
        original_mouse_y = e.pageY;
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
      })
  
      function resize(e) {
        if (currentResizer.classList.contains('right')) {
          const width = original_width + (e.pageX - original_mouse_x);
          
          if (width > minimum_size) {
            element.style.width = width + 'px'
          }
        }
        else if (currentResizer.classList.contains('left')) {
          const width = original_width - (e.pageX - original_mouse_x)
          if (width > minimum_size) {
            element.style.width = width + 'px'
            element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
          }
        }
        else if (currentResizer.classList.contains('top')) {
          
          const height = original_height - (e.pageY - original_mouse_y)
          if (height > minimum_size) {
            element.style.height = height + 'px'
            element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
          }
        }
        
        else if (currentResizer.classList.contains('bottom'))       {
          const height = original_height + (e.pageY - original_mouse_y)
          if (height > minimum_size) {
            element.style.height = height + 'px'
          }
          
        }
      }
  
      function stopResize() {
        window.removeEventListener('mousemove', resize)
      }
    }
  }

export {makeResizableDiv}
export default dragElement