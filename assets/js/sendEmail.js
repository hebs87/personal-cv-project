//CREATE sendEmail() FUNCTION
//parameter of contactForm, as we're passing in the form as a parameter
function sendMail(contactForm) {
    //call the emailjs.send() method
    //1st argument is the service ID, which is gmail in this instance
    //2nd argument is the template ID, which is sunny in this instance
    //3rd argument is the object that contains the parameters - the values are equal to the names we gave the fields in the contact.html form
    emailjs.send("gmail", "sunny", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "project_request": contactForm.projectsummary.value
    })
    //next, we supply the then() method for our promise
    //first argument is going to be a function for success
    .then(
        function(response) {
            alert(`Thank you ${contactForm.name.value}, your request has been sent!`, response);
        },
        //second argument is going to be an error function
        function(error) {
            alert(`FAILED`, error);
        });
        return false; //stop from loading a new page
}