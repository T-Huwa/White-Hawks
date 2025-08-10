// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in-left, .slide-in-right"
  );
  animatedElements.forEach((el) => observer.observe(el));

  // Counter animation
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute("data-count"));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          counter.textContent = Math.ceil(current);
        }, 20);
        counterObserver.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => counterObserver.observe(counter));

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    const scrollToTopBtn = document.getElementById("scrollToTop");

    if (window.scrollY > 100) {
      navbar.classList.add("bg-white");
      navbar.classList.remove("bg-white/95");
      scrollToTopBtn.classList.remove("opacity-0", "pointer-events-none");
    } else {
      navbar.classList.add("bg-white/95");
      navbar.classList.remove("bg-white");
      scrollToTopBtn.classList.add("opacity-0", "pointer-events-none");
    }
  });

  // Scroll to top functionality
  document.getElementById("scrollToTop").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.createElement("div");
  mobileMenu.className =
    "md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-2";
  mobileMenu.innerHTML = `
          <a href="#home" class="block text-gray-700 hover:text-primary transition-colors duration-300 font-medium py-2">Home</a>
          <a href="#properties" class="block text-gray-700 hover:text-primary transition-colors duration-300 font-medium py-2">Properties</a>
          <a href="#services" class="block text-gray-700 hover:text-primary transition-colors duration-300 font-medium py-2">Services</a>
          <a href="#about" class="block text-gray-700 hover:text-primary transition-colors duration-300 font-medium py-2">About</a>
          <a href="#contact" class="block text-gray-700 hover:text-primary transition-colors duration-300 font-medium py-2">Contact</a>
      `;
  mobileMenu.style.display = "none";

  mobileMenuBtn.addEventListener("click", () => {
    if (mobileMenu.style.display === "none") {
      mobileMenu.style.display = "block";
      document.querySelector("nav .container").appendChild(mobileMenu);
    } else {
      mobileMenu.style.display = "none";
    }
  });

  // Contact form handler
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simple form validation
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector("textarea").value;

    if (name && email && message) {
      // Show success message
      const successMsg = document.createElement("div");
      successMsg.className =
        "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mt-4";
      successMsg.innerHTML =
        "Thank you for your message! We will get back to you within 24 hours.";
      contactForm.appendChild(successMsg);

      // Reset form
      contactForm.reset();

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 5000);
    } else {
      alert("Please fill in all required fields.");
    }
  });

  // Newsletter form handler
  const newsletterBtn = document.getElementById("newsletterBtn");
  const newsletterEmail = document.getElementById("newsletterEmail");

  newsletterBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const email = newsletterEmail.value;

    if (email && email.includes("@")) {
      // Show success message
      const successMsg = document.createElement("div");
      successMsg.className =
        "bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mt-4 text-center";
      successMsg.innerHTML =
        "Thank you for subscribing! You will receive our latest property updates.";
      newsletterEmail.parentElement.appendChild(successMsg);

      // Clear email input
      newsletterEmail.value = "";

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMsg.remove();
      }, 5000);
    } else {
      alert("Please enter a valid email address.");
    }
  });

  // Property search handler
  const heroSearchBtn = document.querySelector(".hero-bg .bg-secondary");
  heroSearchBtn.addEventListener("click", () => {
    alert(
      "Search functionality coming soon! Call us at +265 1 234 567 for immediate assistance finding your perfect property."
    );
  });

  // Property view details handlers
  const propertyButtons = document.querySelectorAll(
    ".bg-white.rounded-2xl button"
  );
  propertyButtons.forEach((btn) => {
    if (btn.textContent.includes("View Details")) {
      btn.addEventListener("click", () => {
        alert(
          "Property details page coming soon! Contact us for more information about this property and to schedule a viewing."
        );
      });
    }
  });

  // Add parallax effect to hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector(".hero-bg");
    if (hero) {
      const rate = scrolled * -0.3;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  // Add hover effects to property cards
  const propertyCards = document.querySelectorAll(
    "#properties .bg-white.rounded-2xl"
  );
  propertyCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
      card.style.boxShadow = "0 20px 40px rgba(0, 0, 0, 0.15)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
      card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    });
  });

  // Add typing effect to hero title (delayed)
  setTimeout(() => {
    const heroTitle = document.querySelector(".hero-bg h1");
    const titleText = heroTitle.innerHTML;
    heroTitle.innerHTML = "";
    let i = 0;

    function typeWriter() {
      if (i < titleText.length) {
        heroTitle.innerHTML += titleText.charAt(i);
        i++;
        setTimeout(typeWriter, 30);
      }
    }
    typeWriter();
  }, 500);

  // Add smooth reveal animation to sections
  const sections = document.querySelectorAll("section");
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 0.8s ease-out";
    sectionObserver.observe(section);
  });

  // Add interactive button effects
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.addEventListener("mousedown", () => {
      btn.style.transform = "scale(0.95)";
    });
    btn.addEventListener("mouseup", () => {
      btn.style.transform = "scale(1)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
  });

  // Add loading animation for map
  const mapContainer = document.querySelector(".bg-gray-200.rounded-2xl");
  const loadingDiv = document.createElement("div");
  loadingDiv.className =
    "absolute inset-0 bg-gray-200 flex items-center justify-center";
  loadingDiv.innerHTML = `
          <div class="text-center">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p class="text-gray-600">Loading map...</p>
          </div>
      `;
  mapContainer.style.position = "relative";
  mapContainer.appendChild(loadingDiv);

  // Remove loading animation after 3 seconds
  setTimeout(() => {
    loadingDiv.style.opacity = "0";
    setTimeout(() => {
      loadingDiv.remove();
    }, 500);
  }, 3000);

  // Add search functionality to hero search
  const searchForm = document.querySelector(".hero-bg .bg-white\\/10");
  const propertyType = searchForm.querySelector("select:first-child");
  const location = searchForm.querySelector("select:last-child");

  heroSearchBtn.addEventListener("click", () => {
    const type = propertyType.value;
    const loc = location.value;

    if (type || loc) {
      let searchMsg = "Searching for ";
      if (type) searchMsg += `${type} properties `;
      if (loc) searchMsg += `in ${loc}`;
      searchMsg += "... Please contact us for current availability!";
      alert(searchMsg);
    } else {
      alert("Please select property type or location to search.");
    }
  });

  // Add dynamic year to footer
  const currentYear = new Date().getFullYear();
  const copyrightText = document.querySelector("footer p");
  copyrightText.innerHTML = copyrightText.innerHTML.replace(
    "2025",
    currentYear
  );
});

// Additional interactive features
document.addEventListener("DOMContentLoaded", () => {
  // Add testimonial carousel functionality
  const testimonials = document.querySelectorAll("#testimonials .bg-white");
  let currentTestimonial = 0;

  // Auto-rotate testimonials every 5 seconds
  setInterval(() => {
    testimonials.forEach((testimonial, index) => {
      if (index === currentTestimonial) {
        testimonial.style.transform = "scale(1.05)";
        testimonial.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.2)";
      } else {
        testimonial.style.transform = "scale(1)";
        testimonial.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
      }
    });
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  }, 5000);

  // Add property filtering functionality
  const propertyCards = document.querySelectorAll(
    "#properties .bg-white.rounded-2xl"
  );

  // Add filter buttons
  const filterContainer = document.createElement("div");
  filterContainer.className = "flex justify-center space-x-4 mb-8 fade-in";
  filterContainer.innerHTML = `
          <button class="filter-btn active bg-primary text-white px-6 py-2 rounded-full font-semibold transition-all duration-300" data-filter="all">All Properties</button>
          <button class="filter-btn bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded-full font-semibold transition-all duration-300" data-filter="featured">Featured</button>
          <button class="filter-btn bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded-full font-semibold transition-all duration-300" data-filter="new">New</button>
          <button class="filter-btn bg-gray-200 text-gray-700 hover:bg-gray-300 px-6 py-2 rounded-full font-semibold transition-all duration-300" data-filter="hot">Hot Deals</button>
      `;

  const propertiesSection = document.querySelector("#properties .text-center");
  propertiesSection.appendChild(filterContainer);

  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach((b) => {
        b.classList.remove("active", "bg-primary", "text-white");
        b.classList.add("bg-gray-200", "text-gray-700");
      });
      btn.classList.add("active", "bg-primary", "text-white");
      btn.classList.remove("bg-gray-200", "text-gray-700");

      // Filter properties (for demo purposes, just show animation)
      propertyCards.forEach((card) => {
        card.style.opacity = "0.3";
        card.style.transform = "scale(0.9)";
        setTimeout(() => {
          card.style.opacity = "1";
          card.style.transform = "scale(1)";
        }, 200);
      });
    });
  });

  // Add property quick view functionality
  propertyCards.forEach((card) => {
    const quickViewBtn = document.createElement("button");
    quickViewBtn.className =
      "absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full opacity-0 transition-all duration-300";
    quickViewBtn.innerHTML = `
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
          `;

    const imageDiv = card.querySelector("div:first-child");
    imageDiv.style.position = "relative";
    imageDiv.appendChild(quickViewBtn);

    card.addEventListener("mouseenter", () => {
      quickViewBtn.style.opacity = "1";
    });

    card.addEventListener("mouseleave", () => {
      quickViewBtn.style.opacity = "0";
    });

    quickViewBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const propertyName = card.querySelector("h3").textContent;
      alert(
        `Quick view for ${propertyName} - Full gallery and virtual tour coming soon!`
      );
    });
  });

  // Add WhatsApp floating button
  const whatsappBtn = document.createElement("a");
  whatsappBtn.href = "https://wa.me/265991234567";
  whatsappBtn.target = "_blank";
  whatsappBtn.className =
    "fixed bottom-8 left-8 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50";
  whatsappBtn.innerHTML = `
          <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
          </svg>
      `;
  document.body.appendChild(whatsappBtn);

  // Add floating animation to WhatsApp button
  whatsappBtn.style.animation = "float 3s ease-in-out infinite";

  // Add click tracking for analytics (placeholder)
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "A") {
      console.log("Button clicked:", e.target.textContent);
    }
  });

  // Add form validation styling
  const inputs = document.querySelectorAll("input, textarea, select");
  inputs.forEach((input) => {
    input.addEventListener("focus", () => {
      input.style.borderColor = "#1e3a8a";
      input.style.boxShadow = "0 0 0 3px rgba(30, 58, 138, 0.1)";
    });

    input.addEventListener("blur", () => {
      input.style.borderColor = "#d1d5db";
      input.style.boxShadow = "none";
    });
  });
});

// Performance optimization - lazy load images when they come into view
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.style.opacity = "1";
      imageObserver.unobserve(img);
    }
  });
});

// Initialize lazy loading for property card backgrounds
document.addEventListener("DOMContentLoaded", () => {
  const propertyImages = document.querySelectorAll("#properties .h-64");
  propertyImages.forEach((img) => {
    img.style.opacity = "0";
    img.style.transition = "opacity 0.5s ease-in-out";
    imageObserver.observe(img);
  });
});
