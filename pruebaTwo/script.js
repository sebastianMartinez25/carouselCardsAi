    const carousel = document.querySelector('.carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const numSlides = slides.length;
    
    let currentIndex = 0;
    let slideWidth = 200 + 20; // Ancho de la diapositiva + margen derecho
    let slidesToShow = calculateSlidesToShow();

    // Establecer el ancho total del carrusel
    carousel.style.width = `${(slideWidth + 20) * numSlides}px`;

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % numSlides;
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + numSlides) % numSlides;
        updateCarousel();
    });

    window.addEventListener('resize', () => {
        slidesToShow = calculateSlidesToShow();
        updateCarousel();
    });

    function calculateSlidesToShow() {
        const viewportWidth = (window.innerWidth)*0.8;
        
        return Math.floor(viewportWidth / slideWidth);
    }

    function updateCarousel() {
        const translateXValue = -currentIndex * slideWidth;
        carousel.style.transition = 'transform 0.5s ease-in-out';
       
        for (let i = 0; i < numSlides; i++) {
            const slideOffset = (i - currentIndex + numSlides) % numSlides;
            console.log(slideOffset);
            console.log(slidesToShow);
            let slideTransform;
            if (slideOffset < slidesToShow) {
                slideTransform = `translateX(${(slideOffset * slideWidth)-(i*slideWidth)}px)`;
                slides[i].classList.remove('hidden-slide');
            }
            else{
                slideTransform=`translateX(${(slideOffset*slideWidth)}px)`;
                slides[i].classList.add('hidden-slide');
            }
            slides[i].style.transform = slideTransform;
        }
        
        updateDots();  
    }
    updateCarousel();
  

    function moveToSlide(index) {
        currentIndex = index;
        updateCarousel();
        updateDots();
    }
    
    function updateDots() {
        for (let i = 0; i < numSlides; i++) {
            if (i === currentIndex) {
                dots[i].classList.add('active'); // Marca el dot actual como activo
            } else {
                dots[i].classList.remove('active'); // Desmarca los otros dots
            }
        }
    }
    