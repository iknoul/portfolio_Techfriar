let slideIndex = [1,1,1,1]; // Track current slide index for each slideshow
let slideId = ["mySlides1", "mySlides2", "mySlides3", "mySlides4"] // Class names of slide containers


// Initialize first slide for each slideshow
showSlides(1, 0);
showSlides(1, 1);
showSlides(1, 2)
showSlides(1, 3)


function plusSlides(n, no) {
  showSlides(slideIndex[no] += n, no); // Update slide index and display corresponding slide
}

function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {slideIndex[no] = 1}    // Loop back to the first slide if index exceeds length
  if (n < 1) {slideIndex[no] = x.length}    // Loop to the last slide if index is less than 1
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  // Hide all slides
  }
  x[slideIndex[no]-1].style.display = "block";  // Display the current slide
}
