// Script para añadir funcionalidades interactivas al perfil

document.addEventListener("DOMContentLoaded", () => {
    // Initialize particles.js
    // Check if particlesJS is defined, if not, you might need to include the particles.js library in your HTML
    if (typeof particlesJS !== "undefined") {
      particlesJS("particles-js", {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#ff416c",
          },
          shape: {
            type: "circle",
            stroke: {
              width: 0,
              color: "#000000",
            },
            polygon: {
              nb_sides: 5,
            },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: {
              enable: false,
              speed: 1,
              opacity_min: 0.1,
              sync: false,
            },
          },
          size: {
            value: 3,
            random: true,
            anim: {
              enable: false,
              speed: 40,
              size_min: 0.1,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ff416c",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
              enable: false,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: "grab",
            },
            onclick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 140,
              line_linked: {
                opacity: 1,
              },
            },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
            push: {
              particles_nb: 4,
            },
            remove: {
              particles_nb: 2,
            },
          },
        },
        retina_detect: true,
      })
    } else {
      console.warn("particlesJS is not defined. Make sure to include the particles.js library.")
    }
  
    // Custom cursor
    const cursor = document.querySelector(".cursor-dot")
    const cursorOutline = document.querySelector(".cursor-outline")
  
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = e.clientX + "px"
      cursor.style.top = e.clientY + "px"
  
      // Add a slight delay to the outline for a trailing effect
      setTimeout(() => {
        cursorOutline.style.left = e.clientX + "px"
        cursorOutline.style.top = e.clientY + "px"
      }, 50)
    })
  
    // Make cursor grow when hovering over links and buttons
    const links = document.querySelectorAll("a, button, .tab-btn, .project-card, .skill-card, .tag-cloud-item")
  
    links.forEach((link) => {
      link.addEventListener("mouseenter", () => {
        cursorOutline.style.width = "60px"
        cursorOutline.style.height = "60px"
        cursor.style.opacity = "0"
      })
  
      link.addEventListener("mouseleave", () => {
        cursorOutline.style.width = "40px"
        cursorOutline.style.height = "40px"
        cursor.style.opacity = "1"
      })
    })
  
    // Theme switcher
    const themeIcons = document.querySelectorAll(".theme-icon")
    const body = document.body
  
    themeIcons.forEach((icon) => {
      icon.addEventListener("click", () => {
        const theme = icon.getAttribute("data-theme")
        body.setAttribute("data-theme", theme)
  
        // Save theme preference to localStorage
        localStorage.setItem("theme", theme)
      })
    })
  
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      body.setAttribute("data-theme", savedTheme)
    }
  
    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle")
    const navLinks = document.querySelector(".nav-links")
  
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active")
  
      // Toggle hamburger animation
      const hamburger = menuToggle.querySelector(".hamburger")
      hamburger.classList.toggle("active")
  
      if (hamburger.classList.contains("active")) {
        hamburger.style.background = "transparent"
        hamburger.style.transform = "rotate(45deg)"
        hamburger.style.transition = "var(--transition)"
  
        // Adjust pseudo-elements
        document.documentElement.style.setProperty("--hamburger-before", "rotate(90deg)")
        document.documentElement.style.setProperty("--hamburger-after", "rotate(0)")
      } else {
        hamburger.style.background = "var(--text-color)"
        hamburger.style.transform = "rotate(0)"
  
        // Reset pseudo-elements
        document.documentElement.style.setProperty("--hamburger-before", "translateY(-10px)")
        document.documentElement.style.setProperty("--hamburger-after", "translateY(10px)")
      }
    })
  
    // Close mobile menu when clicking on a link
    const navLinkItems = document.querySelectorAll(".nav-link")
  
    navLinkItems.forEach((link) => {
      link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
          navLinks.classList.remove("active")
          menuToggle.querySelector(".hamburger").classList.remove("active")
          menuToggle.querySelector(".hamburger").style.background = "var(--text-color)"
          menuToggle.querySelector(".hamburger").style.transform = "rotate(0)"
        }
      })
    })
  
    // Typing effect
    const typedTextSpan = document.querySelector(".typed-text")
    const cursorSpan = document.querySelector(".cursor")
  
  const textArray = ["PHP", "Laravel", "Node.js", "React", "Python", "Java"]
    const typingDelay = 100
    const erasingDelay = 50
    const newTextDelay = 2000
    let textArrayIndex = 0
    let charIndex = 0
  
    function type() {
      if (charIndex < textArray[textArrayIndex].length) {
        if (!cursorSpan.classList.contains("typing")) {
          cursorSpan.classList.add("typing")
        }
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex)
        charIndex++
        setTimeout(type, typingDelay)
      } else {
        cursorSpan.classList.remove("typing")
        setTimeout(erase, newTextDelay)
      }
    }
  
    function erase() {
      if (charIndex > 0) {
        if (!cursorSpan.classList.contains("typing")) {
          cursorSpan.classList.add("typing")
        }
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1)
        charIndex--
        setTimeout(erase, erasingDelay)
      } else {
        cursorSpan.classList.remove("typing")
        textArrayIndex++
        if (textArrayIndex >= textArray.length) {
          textArrayIndex = 0
        }
        setTimeout(type, typingDelay + 1100)
      }
    }
  
    if (textArray.length) {
      setTimeout(type, newTextDelay + 250)
    }
  
    // Animate skill progress bars when in viewport
    const progressBars = document.querySelectorAll(".progress")
  
    const animateProgressBars = () => {
      progressBars.forEach((bar) => {
        const width = bar.style.width
        bar.style.width = "0"
  
        setTimeout(() => {
          bar.style.width = width
        }, 100)
      })
    }
  
    // Tabs functionality
    const tabBtns = document.querySelectorAll(".tab-btn")
    const tabPanes = document.querySelectorAll(".tab-pane")
  
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        tabBtns.forEach((b) => b.classList.remove("active"))
  
        // Add active class to clicked button
        btn.classList.add("active")
  
        // Show corresponding tab pane
        const tabId = btn.getAttribute("data-tab")
  
        tabPanes.forEach((pane) => {
          pane.classList.remove("active")
          if (pane.id === tabId) {
            pane.classList.add("active")
            // Animate progress bars in the active tab
            animateProgressBars()
          }
        })
      })
    })
  
    // Initialize first tab
    animateProgressBars()
  
    // Timeline navigation
    const timelineTrack = document.querySelector(".timeline-track")
    const timelineItems = document.querySelectorAll(".timeline-item")
    const prevArrow = document.querySelector(".prev-arrow")
    const nextArrow = document.querySelector(".next-arrow")
    let currentIndex = 0
  
    // Set initial active item
    timelineItems[currentIndex].classList.add("active")
  
    prevArrow.addEventListener("click", () => {
      if (currentIndex > 0) {
        timelineItems[currentIndex].classList.remove("active")
        currentIndex--
        timelineItems[currentIndex].classList.add("active")
        updateTimelinePosition()
      }
    })
  
    nextArrow.addEventListener("click", () => {
      if (currentIndex < timelineItems.length - 1) {
        timelineItems[currentIndex].classList.remove("active")
        currentIndex++
        timelineItems[currentIndex].classList.add("active")
        updateTimelinePosition()
      }
    })
  
    function updateTimelinePosition() {
      const itemWidth = timelineItems[0].offsetWidth + 50 // item width + gap
      timelineTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`
    }
  
    // Project filtering
    const filterBtns = document.querySelectorAll(".filter-btn")
    const projectCards = document.querySelectorAll(".project-card")
  
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"))
  
        // Add active class to clicked button
        btn.classList.add("active")
  
        // Filter projects
        const filter = btn.getAttribute("data-filter")
  
        projectCards.forEach((card) => {
          if (filter === "all" || card.getAttribute("data-category") === filter) {
            card.style.display = "block"
          } else {
            card.style.display = "none"
          }
        })
      })
    })
  
    // Counter animation for stats
    const counters = document.querySelectorAll(".counter")
  
    const animateCounter = (counter, target) => {
      let count = 0
      const speed = 200 // Lower is faster
      const increment = target / speed
  
      const updateCount = () => {
        if (count < target) {
          count += increment
          counter.textContent = Math.ceil(count)
          setTimeout(updateCount, 1)
        } else {
          counter.textContent = target
        }
      }
  
      updateCount()
    }
  
    // Animate counters when they come into view
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target
            const target = Number.parseInt(counter.getAttribute("data-target"))
            animateCounter(counter, target)
            counterObserver.unobserve(counter)
          }
        })
      },
      { threshold: 0.5 },
    )
  
    counters.forEach((counter) => {
      counterObserver.observe(counter)
    })
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80, // Adjust for fixed header
            behavior: "smooth",
          })
        }
      })
    })
  
    // Back to top button
    const backToTopBtn = document.getElementById("back-to-top")
  
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        backToTopBtn.classList.add("visible")
      } else {
        backToTopBtn.classList.remove("visible")
      }
    })
  
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // Highlight active nav link based on scroll position
    const sections = document.querySelectorAll("section")
  
    window.addEventListener("scroll", () => {
      let current = ""
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.clientHeight
  
        if (pageYOffset >= sectionTop) {
          current = section.getAttribute("id")
        }
      })
  
      navLinkItems.forEach((link) => {
        link.classList.remove("active")
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active")
        }
      })
    })
  
    // Form submission
    const contactForm = document.getElementById("contact-form")
  
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Get form data
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value
  
      // Here you would typically send the data to a server
      // For demo purposes, we'll just log it and show a success message
      console.log("Form submitted:", { name, email, subject, message })
  
      // Show success message
      const submitBtn = contactForm.querySelector(".submit-btn")
      const originalBtnText = submitBtn.innerHTML
  
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Mensaje Enviado'
      submitBtn.style.background = "var(--success-color)"
  
      // Reset form
      contactForm.reset()
  
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText
        submitBtn.style.background = ""
      }, 3000)
    })
    // Animación de entrada para las secciones
    const sectionsEntrance = document.querySelectorAll("section")
  
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
  
    sectionsEntrance.forEach((section) => {
      section.style.opacity = "0"
      section.style.transform = "translateY(20px)"
      section.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      observer.observe(section)
    })
  
    // Clase para la animación
    document.head.insertAdjacentHTML(
      "beforeend",
      `
          <style>
              .fade-in {
                  opacity: 1 !important;
                  transform: translateY(0) !important;
              }
          </style>
      `,
    )
  
    // Funcionalidad para filtrar habilidades
    const skillTags = document.querySelectorAll(".skill-tag")
  
    skillTags.forEach((tag) => {
      tag.addEventListener("click", function () {
        const skill = this.textContent.trim()
  
        // Resaltar proyectos y experiencias que usan esta habilidad
        highlightRelatedContent(skill)
      })
    })
  
    function highlightRelatedContent(skill) {
      // Resetear todos los highlights
      document.querySelectorAll(".highlight-related").forEach((el) => {
        el.classList.remove("highlight-related")
      })
  
      // Añadir estilo para el highlight
      if (!document.querySelector("#highlight-style")) {
        const style = document.createElement("style")
        style.id = "highlight-style"
        style.textContent = `
                  .highlight-related {
                      box-shadow: 0 0 0 2px var(--primary-color) !important;
                      transform: translateY(-5px);
                      transition: all 0.3s ease;
                  }
                  .timeline-item.highlight-related .timeline-dot {
                      background-color: var(--accent-color);
                      transform: scale(1.2);
                  }
              `
        document.head.appendChild(style)
      }
  
      // Buscar y resaltar elementos relacionados
      const techTags = document.querySelectorAll(".tech-tag")
      techTags.forEach((tag) => {
        if (tag.textContent.trim() === skill) {
          // Encontrar el elemento padre (proyecto o experiencia)
          const parent = tag.closest(".project-card") || tag.closest(".timeline-item")
          if (parent) {
            parent.classList.add("highlight-related")
          }
        }
      })
    }
  
    // Botón para volver arriba
    const scrollButton = document.createElement("button")
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>'
    scrollButton.className = "scroll-top-btn"
    document.body.appendChild(scrollButton)
  
    // Estilo para el botón
    const scrollButtonStyle = document.createElement("style")
    scrollButtonStyle.textContent = `
          .scroll-top-btn {
              position: fixed;
              bottom: 20px;
              right: 20px;
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: var(--primary-color);
              color: white;
              border: none;
              cursor: pointer;
              display: flex;
              align-items: center;
              justify-content: center;
              opacity: 0;
              visibility: hidden;
              transition: all 0.3s ease;
              z-index: 1000;
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          }
          
          .scroll-top-btn.visible {
              opacity: 1;
              visibility: visible;
          }
          
          .scroll-top-btn:hover {
              background-color: var(--primary-dark);
              transform: translateY(-3px);
          }
      `
    document.head.appendChild(scrollButtonStyle)
  
    // Mostrar/ocultar botón según el scroll
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollButton.classList.add("visible")
      } else {
        scrollButton.classList.remove("visible")
      }
    })
  
    // Funcionalidad del botón
    scrollButton.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  })
  
  