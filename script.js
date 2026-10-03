// Precision Landscape & Hardscape: small progressive enhancements.
// Everything works without JS: the estimate buttons link to #estimate and the form posts to Web3Forms.
(function () {
  "use strict";

  var PLACEHOLDER_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ----- Estimate pop-up -----
  var dialog = document.getElementById("estimate-dialog");
  var sourceForm = document.getElementById("estimate-form");

  if (dialog && sourceForm && typeof dialog.showModal === "function") {
    var dialogForm = sourceForm.cloneNode(true);
    dialogForm.removeAttribute("id");
    // Give cloned fields unique ids so labels still point at the right input
    dialogForm.querySelectorAll("[id]").forEach(function (el) {
      var oldId = el.id;
      el.id = "d-" + oldId;
      var label = dialogForm.querySelector('label[for="' + oldId + '"]');
      if (label) label.setAttribute("for", el.id);
    });
    dialog.querySelector(".dialog-body").appendChild(dialogForm);

    document.querySelectorAll(".js-open-estimate").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        dialog.showModal();
        var first = dialog.querySelector('input[name="name"]');
        if (first) first.focus();
      });
    });

    dialog.querySelector(".dialog-close").addEventListener("click", function () { dialog.close(); });
    // Close when clicking the backdrop
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  }

  // ----- Form submission (Web3Forms, via fetch so the visitor stays on the page) -----
  var today = new Date();
  var minDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);

  document.querySelectorAll(".estimate-form").forEach(function (form) {
    var dateInput = form.querySelector('input[type="date"]');
    if (dateInput) dateInput.min = minDate;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var button = form.querySelector('button[type="submit"]');
      var key = form.querySelector('input[name="access_key"]').value;

      status.className = "form-status";

      if (!key || key === PLACEHOLDER_KEY) {
        status.classList.add("is-error");
        status.textContent = "Our online form isn't connected yet. Please call 231-740-8131 or email precisionlandscapeandhardscape@gmail.com.";
        return;
      }

      var data = new FormData(form);
      data.delete("redirect"); // only used for the no-JavaScript fallback

      button.disabled = true;
      var label = button.textContent;
      button.textContent = "Sending…";

      fetch(form.action, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) { return res.json(); })
        .then(function (json) {
          if (json && json.success) {
            form.reset();
            status.classList.add("is-success");
            status.textContent = "Thanks! Your request was sent. We'll be in touch within one business day.";
          } else {
            throw new Error((json && json.message) || "Submission failed");
          }
        })
        .catch(function () {
          status.classList.add("is-error");
          status.textContent = "Sorry, something went wrong sending your request. Please call 231-740-8131 or email us directly.";
        })
        .finally(function () {
          button.disabled = false;
          button.textContent = label;
        });
    });
  });

  // ----- Before / after sliders -----
  document.querySelectorAll(".ba-frame").forEach(function (frame) {
    var range = frame.querySelector(".ba-range");
    if (!range) return;
    var update = function () { frame.style.setProperty("--pos", range.value + "%"); };
    range.addEventListener("input", update);
    update();
  });

  // ----- Highlight the current section in the nav -----
  var navLinks = document.querySelectorAll(".site-nav a");
  if ("IntersectionObserver" in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute("href").slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove("is-active"); });
        if (byId[entry.target.id]) byId[entry.target.id].classList.add("is-active");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    // The hero has no nav link; observing it clears the highlight at the top of the page
    observer.observe(document.getElementById("top"));
    Object.keys(byId).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) observer.observe(section);
    });
  }
})();
