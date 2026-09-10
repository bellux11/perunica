/* =========================================================
   PERUNICA TOURS — MAIN JS
========================================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* -----------------------------------------
       ELEMENTS
    ----------------------------------------- */

    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    const heroMedia = document.querySelector(".hero-media");

    const cursor = document.querySelector(".cursor");



    /* -----------------------------------------
       HEADER ON SCROLL
    ----------------------------------------- */

    const updateHeader = () => {

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });



    /* -----------------------------------------
       MOBILE MENU
    ----------------------------------------- */

    if (menuToggle && mobileMenu) {

        menuToggle.addEventListener("click", () => {

            const open = mobileMenu.classList.toggle("open");

            document.body.classList.toggle("menu-open", open);

            menuToggle.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );

        });


        mobileMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

                document.body.classList.remove("menu-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }



    /* -----------------------------------------
       REVEAL ON SCROLL
    ----------------------------------------- */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }

    );


    revealElements.forEach(element => {
        revealObserver.observe(element);
    });



    /* -----------------------------------------
       HERO PARALLAX
       Desktop only
    ----------------------------------------- */

    const parallaxHero = () => {

        if (!heroMedia) return;

        if (window.innerWidth <= 760) {
            heroMedia.style.transform = "scale(1.02)";
            return;
        }

        const scroll = window.scrollY;

        if (scroll < window.innerHeight) {

            heroMedia.style.transform =
                `scale(1.04) translateY(${scroll * 0.08}px)`;

        }

    };


    window.addEventListener(
        "scroll",
        parallaxHero,
        { passive: true }
    );



    /* -----------------------------------------
       CUSTOM CURSOR
       Desktop pointer devices only
    ----------------------------------------- */

    const supportsPointer =
        window.matchMedia("(pointer: fine)").matches;


    if (cursor && supportsPointer) {

        window.addEventListener("mousemove", event => {

            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;

        });


        const interactive =
            document.querySelectorAll(
                "a, button, .experience-card, .stay-card"
            );


        interactive.forEach(element => {

            element.addEventListener("mouseenter", () => {
                cursor.classList.add("hover");
            });

            element.addEventListener("mouseleave", () => {
                cursor.classList.remove("hover");
            });

        });

    }



    /* -----------------------------------------
       IMAGE SUBTLE PARALLAX
    ----------------------------------------- */

    const parallaxImages =
        document.querySelectorAll(
            ".rome-photo img, .cart-image img"
        );


    let ticking = false;


    const updateImages = () => {

        if (window.innerWidth <= 760) {
            ticking = false;
            return;
        }


        parallaxImages.forEach(image => {

            const parent = image.parentElement;

            const rect =
                parent.getBoundingClientRect();


            if (
                rect.bottom > 0 &&
                rect.top < window.innerHeight
            ) {

                const center =
                    rect.top + rect.height / 2;

                const viewportCenter =
                    window.innerHeight / 2;

                const distance =
                    center - viewportCenter;

                const movement =
                    distance * -0.025;


                image.style.transform =
                    `scale(1.04) translateY(${movement}px)`;

            }

        });


        ticking = false;

    };


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateImages
                );

                ticking = true;

            }

        },
        { passive: true }
    );


});
