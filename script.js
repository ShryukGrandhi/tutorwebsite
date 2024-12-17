function register(courseName) {
    alert(`You have chosen to register for the ${courseName} package. We will contact you soon!`);
  }
  
  document.getElementById("contact-form").addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Thank you for reaching out! We will get back to you shortly.");
  });
  