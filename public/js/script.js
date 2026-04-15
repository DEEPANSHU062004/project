// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
//for desriptoon in new.ejs
document.querySelector("form").addEventListener("submit", function(e) {
  const desc = document.getElementById("description");
  if (desc.value.length < 20) {
    desc.setCustomValidity("Description must be at least 20 characters long.");
  } else {
    desc.setCustomValidity("");
  }
});
//edit for using
document.querySelector("form").addEventListener("submit", function(e) {
  const descField = document.querySelector("textarea[name='listing[description]']");
  descField.value = descField.value.trim();
});