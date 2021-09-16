const hamburgerBtn = document.querySelector(".hamburger");
const hamburgerLine = document.querySelectorAll(".hamburger-line");
const navList = document.querySelector(".nav-list");
const skills = document.querySelector(".skills");
const skillsDescription = document.querySelector(".skills-description");
const skillsContent = document.querySelector(".skills-content");
const skillsBar = document.querySelectorAll(".skills-content-bar");
const clearBtn = document.querySelector(".btn-clear");

function toggleHamburger(toggle = true) {
    if (toggle) {
        hamburgerLine[1].style.transform = "rotate(-45deg) translateX(-6.5px)";
        hamburgerLine[2].style.transform = "rotate(45deg) translateX(-6.5px)";
    } else {
        hamburgerLine[1].style.transform = "";
        hamburgerLine[2].style.transform = "";
    }
}

if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", function () {
        hamburgerLine[0].classList.toggle("hidden");

        if (navList.classList.contains("hidden")) {
            toggleHamburger();
        } else {
            toggleHamburger(false);
        }
        navList.classList.toggle("hidden");
    });
}

window.addEventListener("hashchange", function () {
    hamburgerLine[0].classList.toggle("hidden");
    toggleHamburger(false);
    navList.classList.add("hidden");
});

const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    skillsDescription.classList.remove("slide-bottom");
    skillsContent.classList.remove("slide-left");

    var styleElem = document.head.appendChild(document.createElement("style"));
    const bar = `.skills-content-bar`;
    styleElem.innerHTML = `${bar}::after {animation: fill 3s; animation-fill-mode: forwards;}`;
};

const skillsDescriptionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0,
});

skillsDescriptionObserver.observe(skills);
