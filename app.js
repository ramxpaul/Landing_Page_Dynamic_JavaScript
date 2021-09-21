/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const fragment = document.createDocumentFragment();
const navUL = document.querySelector('#navbar__list');
const sections = document.querySelectorAll('section');


/**
 * End Global Variables
 */




//styling the navbar
navUL.style.margin = '20px';


// Build NavBar Menu

for (let i = 1; i <= sections.length; i++) {
    //navbar items 
    const newLi = document.createElement('li');
    const newListAnchor = document.createElement('a');
    newListAnchor.textContent = "Section " + i;
    newListAnchor.setAttribute('href', '#section' + i);
    newListAnchor.className = "anchor-style";
    newLi.appendChild(newListAnchor);
    fragment.appendChild(newLi);

    // Scrolling behavior
    newListAnchor.addEventListener('click', function scrollBehavior(event) {
        event.preventDefault();
        for (let x = 0; x <= sections.length; x++) {
            sections[i - 1].scrollIntoView({ behavior: 'smooth' });
        }
    });
}
navUL.appendChild(fragment);


// Set sections as active
const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(function(section) {
        if (section.isIntersecting === true) {
            section.target.classList.add('active')
        } else {
            section.target.classList.remove('active')
        }
    });
}, { root: null, rootMargin: '0px', threshold: '0.75' });

sections.forEach(function(section) {
    observer.observe(section);
});

// Hiding the NavBar After Certain time and on mouse leave
const topButton = document.querySelector('.at-top-div');
topButton.style.display = 'none';

window.setTimeout(function() {
    navUL.classList.add('hide')
}, 3000);

document.addEventListener('mouseleave', function() {
    navUL.classList.add('hide')
})

window.addEventListener('scroll', function() {
    navUL.classList.remove('hide');

    //showing the At Top Button on Scroll
    if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
        topButton.style.display = "flex";
    } else {
        topButton.style.display = "none";
    }
});

// At Top Button Smooth Behavior
const topBehave = document.querySelector('#header');
const topAnchor = document.querySelector('#top');
topAnchor.addEventListener('click', function(event) {
    event.preventDefault();
    topBehave.scrollIntoView({ behavior: 'smooth' });
});