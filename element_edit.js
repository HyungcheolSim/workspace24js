function makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    element.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        element.style.top = (element.offsetTop - pos2) + "px";
        element.style.left = (element.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function addTextBox() {
        const textBox = document.createElement('div');
        textBox.className = 'text-box';
        textBox.style.left = '10px';
        textBox.style.top = '50px';
        
        const editorContainer = document.createElement('div');
        textBox.appendChild(editorContainer);
        
        document.getElementById('editor').appendChild(textBox);        
        makeDraggable(textBox);
    }



    function setDrag() {
        console.log("기본 요소에 대해 drag 기능 활성화");
        const editor = document.getElementById("editor");
        //const draggables = editor.getElementsByClassName('draggable');
        const draggables = editor.childNodes;
        console.log(draggables);
  
        let isDragging = false;
        let currentDraggable = null;
        let startX, startY, startLeft, startTop;
  
        for (let draggable of draggables) {
          draggable.addEventListener("drag", startDrag);
          draggable.addEventListener("mousemove", drag);
          draggable.addEventListener("mouseup", stopDrag);
        }
    }
    function startDrag(e) {
      console.log("dblclicked");
      isDragging = true;
      currentDraggable = e.target;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseInt(window.getComputedStyle(currentDraggable).left, 10);
      startTop = parseInt(window.getComputedStyle(currentDraggable).top, 10);

      // 드래그 중인 요소를 최상위로 가져오기
      currentDraggable.style.zIndex = "1000";
    }

    function drag(e) {
      console.log("in dragging");
      if (!isDragging) return;

      e.preventDefault();

      let newX = e.clientX;
      let newY = e.clientY;

      let deltaX = newX - startX;
      let deltaY = newY - startY;

      let newLeft = startLeft + deltaX;
      let newTop = startTop + deltaY;

      // 에디터 영역을 벗어나지 않도록 제한
      const editorRect = editor.getBoundingClientRect();
      const draggableRect = currentDraggable.getBoundingClientRect();

      newLeft = Math.max(0, Math.min(newLeft, editorRect.width - draggableRect.width));
      newTop = Math.max(0, Math.min(newTop, editorRect.height - draggableRect.height));

      currentDraggable.style.left = newLeft + "px";
      currentDraggable.style.top = newTop + "px";
    }

    function stopDrag(e) {
      
      if (!isDragging) return;

      isDragging = false;
      // 드래그가 끝난 후 z-index 초기화
      currentDraggable.style.zIndex = "";
      currentDraggable = null;
    }
    document.addEventListener("DOMContentLoaded", (event) => {
      const editorDiv = document.getElementById("editor");
      if (editorDiv) {
        const allElements = editorDiv.getElementsByTagName("*");
        for (let element of allElements) {
          element.draggable = true;
          setDragEventListners(element);
        }
      }
    });


    function dragStart(e) {
      console.log("dragstart"+ initialX+" "+initialY);
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }

    if (e.target === dragItem) {
      active = true;
    }
  }

  function dragEnd(e) {
    initialX = currentX;
    initialY = currentY;

    active = false;
  }

  function drag(e) {
    if (active) {
      e.preventDefault();

      if (e.type === "touchmove") {
        currentX = e.touches[0].clientX - initialX;
        currentY = e.touches[0].clientY - initialY;
      } else {
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;
      }

      xOffset = currentX;
      yOffset = currentY;
    }
  }
container.addEventListener("dblclick", setXY, false);
container.addEventListener("touchend", dragEnd, false);
container.addEventListener("touchmove", drag, false);

container.addEventListener("mousedown", dragStart, false);
container.addEventListener("mouseup", dragEnd, false);
container.addEventListener("mousemove", drag, false);
