(function(){
document.addEventListener('DOMContentLoaded', function() {
  //Implement getParameterByName()
	function getParameterByName(name) {
	var res = new RegExp(
		// Parameter names always start after a ? or &.
		'[\?&]' +
	
		// Make sure any [ or ] are escaped in the name.
		name.replace(/\[/g, '\\\[').replace(/\]/g, '\\\]') +
	
		// Either match a =... or match an empty value.
		// Values can be terminated by an & a # or the end of the string ($).
		'(?:=([^&#]*))?(?:[&#]|$)'
	).exec(window.location.search);
	
	return res ?
		(res[1] ? // res[1] will be undefined for a parameter without value.
		decodeURIComponent(res[1].replace(/\+/g, ' ')) : ''
		) : null;
	}
  
  // Get the action to complete.
  var mode = getParameterByName('mode');
  // Get the one-time code from the query parameter.
  var actionCode = getParameterByName('oobCode');
  // (Optional) Get the API key from the query parameter.
  var apiKey = getParameterByName('apiKey');
  // (Optional) Get the continue URL from the query parameter if available.
  var continueUrl = getParameterByName('continueUrl');
  // (Optional) Get the language code if available.
  var lang = getParameterByName('lang') || 'en';

  // Configure the Firebase SDK.
  // This is the minimum configuration required for the API to be used.
  var config = {
    'apiKey': apiKey  // This key could also be copied from the web
                      // initialization snippet found in the Firebase console.
  };
  var app = firebase.initializeApp(config);
  var auth = app.auth();

  // Handle the user management action.
  switch (mode) {
    case 'resetPassword':
      // Display reset password handler and UI.
      //document.getElementById("reset_passbtn").onclick = handleResetPassword(auth, actionCode, continueUrl, lang);
      break;
    default:
      // Error: invalid mode.
	  document.getElementById("reset_passbtn").disabled = true;
  }
  document.getElementById("reset_passbtn").addEventListener("click", e => {
  var newPassword = document.getElementById("confirmpass").value;
  // Verify the password reset code is valid.
  auth.verifyPasswordResetCode(actionCode).then(function() {
    // Save the new password.
    auth.confirmPasswordReset(actionCode, newPassword).then(function(resp) {
      // Password reset has been confirmed and new password updated.
    }).catch(function(error) {
      // Error occurred during confirmation. The code might have expired or the
      // password is too weak.
    });
  }).catch(function(error) {
    // Invalid or expired action code. Ask user to try to reset the password
    // again.
  });
});
}, false);
})()
function check_passwords(){

	if(document.getElementById("password").value != document.getElementById("confirmpass").value)
	{
		document.getElementById("reset_passbtn").value = "Passwords Don't Match";
		document.getElementById("reset_passbtn").disabled = true;
	}
	else
	{
		document.getElementById("reset_passbtn").value = "Reset Access Code";
		document.getElementById("reset_passbtn").disabled = false;
	}
}
