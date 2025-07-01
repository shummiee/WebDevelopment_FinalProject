const mainImage = document.getElementById('mainProductImage');
  const thumbnails = document.querySelectorAll('.thumbnails img');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('mouseover', () => {
      const newSrc = thumbnail.getAttribute('data-full');
      
      // Fade out
      mainImage.style.opacity = 0;

      // After fade out, change image and fade in
      setTimeout(() => {
        mainImage.src = newSrc;
        mainImage.style.opacity = 1;
      }, 300); // Match this to CSS transition duration
    });
  });