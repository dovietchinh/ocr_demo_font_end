function dragElement(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    document.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        e = e || window.event;
        pos3 = e.pageX;
        pos4 = e.pageY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        pos1 = pos3 - e.pageX;
        pos2 = pos4 - e.pageY;
        pos3 = e.pageX;
        pos4 = e.pageY;
        let x = elmnt.getAttribute('x')
        let y = elmnt.getAttribute('y')
        x = parseFloat(x)
        y = parseFloat(y)
        elmnt.setAttribute('x',x - pos1)
        elmnt.setAttribute('y',y - pos2)
    }
    function closeDragElement(e) {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
export default dragElement