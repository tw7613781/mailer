#Recerve two form of data, once email address is received, server will send a HYCON KYC confirmation email to the address.

##application/x-www/form-rulencoded
##application/json

##application/x-www/form-rulencoded
HTTP POST FORM 
keypair
    name : "",
    email : ""

jQuery AJAX EXAMPLE
$.ajax(
{
    url:'http://localhost:3000/mailer',
    type:'POST',
    data:{
            name: "Max Tang",
            email: "maxtang@glosfer.com" 
        },
    success: function(msg) {
            alert("sent");
        }
});

##application/json
{
	"name" : "Max Tang",
	"email" : "maxtang@glosfer.com"
}




