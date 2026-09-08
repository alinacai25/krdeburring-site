/* ============================================================
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("active");
      nav.classList.toggle("open");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("active");
        nav.classList.remove("open");
      });
    });
  }

  const header = document.querySelector(".header");
  const topBtn = document.querySelector(".float-btn.top");

  window.addEventListener("scroll", function () {
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }

    if (topBtn) {
      if (window.scrollY > 400) {
        topBtn.classList.add("show");
      } else {
        topBtn.classList.remove("show");
      }
    }
  });

  if (topBtn) {
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("visible");
    });
  }

  const tabs = document.querySelectorAll(".series-tab");
  if (tabs.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("active");
        });
        tab.classList.add("active");

        const target = tab.getAttribute("data-series");
        const panels = document.querySelectorAll("[data-series-panel]");
        panels.forEach(function (panel) {
          if (panel.getAttribute("data-series-panel") === target) {
            panel.style.display = "block";
          } else {
            panel.style.display = "none";
          }
        });
      });
    });
  }

  const inquiryForm = document.getElementById("inquiryForm");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("inqName").value.trim();
      const email = document.getElementById("inqEmail").value.trim();
      const country = document.getElementById("inqCountry").value.trim();
      const model = document.getElementById("inqModel").value;
      const message = document.getElementById("inqMessage").value.trim();

      if (!name || !email || !message) {
        alert("Please fill in your name, email and message.");
        return;
      }

      const waText = [
        "Hello KR Machinery,",
        "",
        "I am " + name + " from " + (country || "—") + ".",
        "Email: " + email,
        model ? "Interested model: " + model : "",
        "",
        message,
      ]
        .filter(Boolean)
        .join("\n");

      const waNumber = "8618769706863";
      const waUrl =
        "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(waText);

      window.open(waUrl, "_blank");
    });
  }
});
