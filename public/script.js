document.addEventListener("DOMContentLoaded", function() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    darkModeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
    });
  });
 

  


  document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.querySelector(".control-prev");
    const nextBtn = document.querySelector(".control-next");
    const slides = document.querySelector(".image-container .controls");
    const imageContainer = document.querySelector(".image-container");
    const image = document.querySelector(".image");
    const controlBtns = document.querySelectorAll(".control-btn");
  
    let currentSlide = 0;
  
    // Fonction pour changer l'image en fonction du bouton cliqué
    function changeSlide(index) {
      image.src = controlBtns[index].getAttribute("data-src");
      currentSlide = index;
      updateActiveControl();
    }
  
    // Met à jour le bouton de contrôle actif
    function updateActiveControl() {
      controlBtns.forEach((btn, index) => {
        btn.classList.remove("active");
        if (index === currentSlide) {
          btn.classList.add("active");
        }
      });
    }
  
    // Initialisation
    changeSlide(0);
  
    // Écouteurs d'événements pour les boutons précédent et suivant
    prevBtn.addEventListener("click", function () {
      currentSlide = (currentSlide - 1 + controlBtns.length) % controlBtns.length;
      changeSlide(currentSlide);
    });
  
    nextBtn.addEventListener("click", function () {
      currentSlide = (currentSlide + 1) % controlBtns.length;
      changeSlide(currentSlide);
    });
  
    // Écouteurs d'événements pour les boutons de contrôle individuels
    controlBtns.forEach((btn, index) => {
      btn.addEventListener("click", function () {
        changeSlide(index);
      });
    });
  });


  document.addEventListener('DOMContentLoaded', function () {
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});
document.addEventListener('DOMContentLoaded', function() {
  const steps = document.querySelectorAll('.step');

  function animateSteps() {
      const windowHeight = window.innerHeight;

      steps.forEach(step => {
          const stepTop = step.getBoundingClientRect().top;

          if (stepTop < windowHeight - 100) {
              step.classList.add('animate');
          }
      });
  }

  window.addEventListener('scroll', animateSteps);
  animateSteps(); // Pour l'initialisation
});


// PLANTATION 
function animateBox(element) {
  element.classList.toggle('animated');
}


// agenda 
document.addEventListener('DOMContentLoaded', () => {
  const details = {
    janvier: {
      cycle_vegetatif: "Repos végétatif (Décembre-Janvier) : Activités de l’arbre ralentissent, parfois arrêtées.",
      image: "/img/rv.jpg" // Remplacez par le chemin réel de l'image
    },
    fevrier: {
      cycle_vegetatif: "Réveil végétatif (Février) : Développement des fruits et nouvelles branches claires.",
      image: "/img/FEVRIR.jpg"
    },
    mars: {
      cycle_vegetatif: "Apparition de boutons floraux (Mi-mars) : Inflorescences vertes, apparition des boutons floraux.",
      image: "/img/MARS.jpg"
    },
    avril: {
      fertilisation: "20% Azote , 40% Phosphore , 25% potassium",
      image: "img/AVRIL.jpg"
    },
    mai: {
      cycle_vegetatif: "Floraison (Mai) : Fleurs ouvertes, période de pollinisation et fécondation.",
      fertilisation: "Fructification (Mai-Juin) : Chute des pétales, fruits en développement, 30% Azote, 30% Phosphore",
      image: "/img/MAI.jpg"
    },
    juin: {
      cycle_vegetatif: "Développement des fruits – Nouaison (Juin) : Apparition des fruits, début de leur formation.",
      fertilisation: "25% Azote , 30% Phosphore , 25% potassium",
      image: "/img/JUIN.jpg"
    },
    juillet: {
      cycle_vegetatif: "Durcissement du noyau (Juillet) : Fruits plus résistants à la coupe et section.",
      fertilisation: "25% Azote  , 25% potassium",
      image: "/img/JUILLET.jpg"
    },
    aout: {
      cycle_vegetatif: "Croissance des fruits (Août) : Augmentation de taille, apparition des lenticelles.",
      fertilisation: "25% potassium",
      image: "/img/AOUT.jpg"
    },
    septembre: {
      cycle_vegetatif: "",
      fertilisation: "",
      image: "/img/SEM.jpg"
    },
    octobre: {
      cycle_vegetatif: "Début de la maturation du fruit (Octobre-Décembre) : Fruits verts virant au violet à mi-octobre.",
      image: "/img/OCT.jpg"
    },
    novembre: {
      fertilisation: "Maturation (Fin octobre-Décembre) : Fruits deviennent violacés, maturation complète.",
      image: "/img/NOV.jpg"
    },
    decembre: {
      cycle_vegetatif: "Repos végétatif (Décembre-Janvier) : Activités de l’arbre ralentissent, parfois arrêtées.",
      image: "/img/DEC.jpg"
    }
  };

  const monthButtons = document.querySelectorAll('.month');
  const cycleVegetatif = document.getElementById('cycle-vegetatif');
  const fertilisation = document.getElementById('fertilisation');
  const monthImage = document.getElementById('month-image');

  monthButtons.forEach(button => {
    button.addEventListener('click', () => {
      const month = button.getAttribute('data-month');
      const detail = details[month];
      cycleVegetatif.textContent = detail.cycle_vegetatif || "Aucune information disponible.";
      fertilisation.textContent = detail.fertilisation || "Aucune information disponible.";
      monthImage.src = detail.image || "";
      monthImage.alt = detail.cycle_vegetatif || "Image du Mois";
    });
  });

  const form = document.getElementById('add-event-form');

  document.getElementById('add-event').addEventListener('click', () => {
    sendRequest('add');
  });

  document.getElementById('delete-event').addEventListener('click', () => {
    sendRequest('delete');
  });

  document.getElementById('update-event').addEventListener('click', () => {
    sendRequest('update');
  });

  document.getElementById('view-event').addEventListener('click', () => {
    sendRequest('view');
  });

  function sendRequest(action) {
    const formData = new FormData(form);
    fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        month: formData.get('month'),
        title: formData.get('title'),
        description: formData.get('description'),
        date: formData.get('date'),
        action: action
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data); // Handle success
      if (action === 'view') {
        // Assuming data is an array with one or more events
        if (data.length > 0) {
          alert(`Event Details:\nTitle: ${data[0].titre}\nDescription: ${data[0].description}\nDate: ${data[0].date}`);
        } else {
          alert('No event found.');
        }
      } else {
        alert(`Event ${action}d successfully.`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('An error occurred.');
    });
  }
});

//


