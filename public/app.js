document.addEventListener("DOMContentLoaded", event => { 
	//This listener that waits until the DOM content is loaded. Then, it creates an auth request and redirects the user to sign in 
  const appConfig = new blockstack.AppConfig()
  const userSession = new blockstack.UserSession({ appConfig: appConfig })

  document.getElementById('signin-button').addEventListener('click', event => {
    event.preventDefault()
    userSession.redirectToSignIn()
  })

  document.getElementById('signout-button').addEventListener('click', event => {
  	//This handler deletes the local user data and signs the user out: 
    event.preventDefault()
    userSession.signUserOut()
    window.location = window.location.origin
  })

  function showProfile (profile) {
    let person = new blockstack.Person(profile)
    document.getElementById('heading-name').innerHTML = person.name() ? person.name() : "Nameless Person"
		//Each getElementById() function refers to elements in the index.html file.
    if(person.avatarUrl()) {
      document.getElementById('avatar-image').setAttribute('src', person.avatarUrl())
    }
    document.getElementById('section-1').style.display = 'none'
    document.getElementById('section-2').style.display = 'block'
  }

  if (userSession.isUserSignedIn()) {
    const { profile } = userSession.loadUserData()
    showProfile(profile)
  } else if (userSession.isSignInPending()) {
    userSession.handlePendingSignIn().then(userData => {
      window.location = window.location.origin
    })
  }
})
