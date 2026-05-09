// portfolio script - S. Lokesh Reddy
// i wrote this to learn JS, comments explain each part!

// wait for the page HTML to fully load before running anything
document.addEventListener('DOMContentLoaded', function() {

  // ---- 1. FADE IN THE PAGE ----
  // the page starts invisible (CSS sets opacity:0)
  // adding "visible" triggers a CSS transition that fades it in
  var page = document.querySelector('.page-content');
  if (page) {
    setTimeout(function() { page.classList.add('visible'); }, 50);
  }


  // ---- 2. HIGHLIGHT THE ACTIVE NAV LINK ----
  // look at the current URL and add "active" class to the matching link
  var currentPage = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    var href = link.getAttribute('href');
    if (currentPage.endsWith(href)) {
      link.classList.add('active');
    }
    // special case: mark HOME active when on index.html or "/"
    if (href.includes('index.html') && (currentPage === '/' || currentPage.endsWith('index.html'))) {
      link.classList.add('active');
    }
  });


  // ---- 3. TYPED TEXT EFFECT (home page only) ----
  // types out the tagline character by character, 60ms between each
  var typedEl = document.getElementById('typed-text');
  if (typedEl) {
    var text = 'MCA Student · Web Developer · AI Enthusiast';
    var i = 0;
    var timer = setInterval(function() {
      typedEl.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(timer); // stop when done
    }, 60);
  }


  // ---- 4. SCROLL REVEAL ----
  // any element with class "reveal" fades in when it scrolls into view
  // IntersectionObserver fires when the element enters the viewport
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // only animate once
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(function(el) { observer.observe(el); });
  }


  // ---- 5. CONTACT FORM FAKE SUBMIT ----
  // intercepts the form, shows a "sending..." message, then resets
  var form = document.getElementById('contact-form');
  var status = document.getElementById('form-status');
  if (form && status) {
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // stop the browser from actually submitting
      status.textContent = '> sending...';
      setTimeout(function() {
        status.textContent = '> message sent! i\'ll reply soon :)';
        setTimeout(function() {
          form.reset();
          status.textContent = '';
        }, 2500);
      }, 1200);
    });
  }

}); // end DOMContentLoaded
