$(document).ready(function() {
  const $container = $('.imagesturn');
  const $items = $container.find('li');
  const itemCount = $items.length;

  let isDragging = false;
  let startX = 0;
  let activeIndex = 0;
  const threshold = 5;

  function updateFrame(index) {
    $items.removeClass('active');
    $items.eq(index).addClass('active');
  }

  $container.on('mousedown touchstart', function(e) {
    isDragging = true;
    startX = e.type === 'touchstart' ? e.originalEvent.touches[0].clientX : e.clientX;
    e.preventDefault();
  });

  $(document).on('mousemove touchmove', function(e) {
    if (!isDragging) return;

    const clientX = e.type === 'touchmove' ? e.originalEvent.touches[0].clientX : e.clientX;
    const deltaX = clientX - startX;

    if (Math.abs(deltaX) >= threshold) {
      if (deltaX > 0) {
        activeIndex = (activeIndex + 1) % itemCount;
      } else {
        activeIndex = (activeIndex - 1 + itemCount) % itemCount;
      }
      updateFrame(activeIndex);
      startX = clientX;
    }
  });

  $(document).on('mouseup touchend touchcancel', function() {
    isDragging = false;
  });

  // Başlangıç görseli göster
  updateFrame(activeIndex);
});