const hamburgerBtn = document.querySelector(".hamburger");
const hamburgerLine = document.querySelectorAll(".hamburger-line");
const navList = document.querySelector(".nav-list");
const skills = document.querySelector(".skills");
const skillsDescription = document.querySelector(".skills-description");
const skillsContent = document.querySelector(".skills-content");
const skillsBar = document.querySelectorAll(".skills-content-bar");
const clearBtn = document.querySelector(".btn-clear");
const form = document.querySelector(".contact-form");

const success = "#23C586";
const successBg = "#d3f3e7";
const dangerBg = "#f0cdcd";
const danger = "#B40404";

/* Functions */
function toggleHamburger(toggle = true) {
  if (toggle) {
    hamburgerLine[1].style.transform = "rotate(-45deg) translateX(-6.5px)";
    hamburgerLine[2].style.transform = "rotate(45deg) translateX(-6.5px)";
  } else {
    hamburgerLine[1].style.transform = "";
    hamburgerLine[2].style.transform = "";
  }
}

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

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.querySelector(".contact-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Thanks for your submission!";
        status.style.backgroundColor = successBg;
        status.style.color = success;
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
            status.style.backgroundColor = dangerBg;

            status.style.color = danger;
          } else {
            status.innerHTML = "Oops! There was a problem submitting your form";
            status.style.backgroundColor = dangerBg;
            status.style.color = danger;
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
      status.style.backgroundColor = dangerBg;
      status.style.color = danger;
    });
}

/* Events */

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

form.addEventListener("submit", handleSubmit);

/* Observers */
skillsDescriptionObserver.observe(skills);
