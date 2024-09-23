let slideIndex = 1;

// Display the initial slide
slideShow(slideIndex);

// Function to display the slide at the given index
function slideShow(n) {
    let i;
    let slides = document.getElementsByClassName("cover");
    let dots = document.getElementsByClassName("dot");

    // Loop back to the first slide if the index exceeds the number of slides
    if (n > slides.length) {
        slideIndex = 1;
    }
    // Loop to the last slide if the index is less than 1
    else if (n < 1) {
        slideIndex = slides.length;
    }
    // Set the current slide index
    else {
        slideIndex = n;
    }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove the active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Display the current slide and add the active class to the corresponding dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Function to move to the next slide
function next() {
    slideShow(slideIndex += 1);
}

// Function to move to the previous slide
function pre() {
    slideShow(slideIndex -= 1);
}
