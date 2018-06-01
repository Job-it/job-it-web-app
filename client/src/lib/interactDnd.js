import interact from 'interactjs';
import axios from 'axios';

// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    //inertia: true,
    restrict: {
      //restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,
    onmove: dragMoveListener,
    // onend: function (event) {
    //   //send the x/y position to a database
    //   axios.patch('/pads', event.target.dataset)
    //     .then(() => {
    //   console.log('pad info sent');
    // });
    // },
    ignoreFrom: '.task',
  });

  function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
  interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept: '#yes-drop',
    // Require a 75% element overlap for a drop to be possible
    overlap: 0.75,
  
    // listen for drop related events:
  
    ondropactivate: function (event) {
      // add active dropzone feedback
      event.target.classList.add('drop-active');
    },
    ondragenter: function (event) {
      var draggableElement = event.relatedTarget,
          dropzoneElement = event.target;
  
      // feedback the possibility of a drop
      dropzoneElement.classList.add('drop-target');
      draggableElement.classList.add('can-drop');
    },
    ondragleave: function (event) {
      // remove the drop feedback style
      event.target.classList.remove('drop-target');
      event.relatedTarget.classList.remove('can-drop');
    },
    ondrop: function (event) {
      var draggableElement = event.relatedTarget,
          dropzoneElement = event.target;
          //update DB here!!!
          var id = draggableElement.dataset.id;
          var targetColumn = dropzoneElement.classList[dropzoneElement.classList.length - 3];
          console.log(id);
          console.log(targetColumn);
    },
    ondropdeactivate: function (event) {
      // remove active dropzone feedback
      event.target.classList.remove('drop-active');
      event.target.classList.remove('drop-target');
    }
  });
  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;

  var dropCardEvent= function() {

  }