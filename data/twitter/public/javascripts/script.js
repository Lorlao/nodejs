const form = document.getElementById('form-tweet');
console.log(form);
 
form.addEventListener('submit', function(event){ //on écoute le form
    event.preventDefault();
    //console.log(event);
    let post = document.querySelector("input").value;
    //console.log(post.length);
 
    if (post.length > 280) { //Vérifier la longueur du post
        alert("Trop de caractères"); //si post trop long
    } else { //sinon on traite le post
        // '/tweet'=chemin 
        fetch('/tweets', {
            method: 'POST', //method pour le crud
            body: JSON.stringify({message: post}), //tranformer en string le contenu de post
            headers: {
                'Content-Type':'application/json' //indication du type
            },
        })
        //pour refresh la page automatiquement une fois qu'on a une réponse du serveur
        //.then(function(){window.location.reload()});
    }
})
