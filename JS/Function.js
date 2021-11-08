var nom;
var arr=[];  


function play(){
    
    const swalWithBootstrapButtons = Swal.mixin({
        backdrop: `
      rgba(0,0,123,0.4)
      url("Images/nyan-cat-nyan.gif")
      left top
      no-repeat
    `,
        customClass: {
        confirmButton: 'btn btn-success' ,
        cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Voulez-vous jouer?',
       
        imageUrl: 'Images/playpng.png',
        imageWidth: 100,
        imageHeight: 100,
        showCancelButton: true,
        confirmButtonText: 'OUI, on y va',
        cancelButtonText: 'NON, au revoir',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            
            swalWithBootstrapButtons.fire({
                
                title: 'Ecrivez votre surnom svp',
                input: 'text',
                inputAttributes: {
                  autocapitalize: 'off'
                },  preConfirm: (login) => {
                    return fetch(`//api.github.com/users/${login}`)
                      .then(response => {
                        if (!response.ok) {
                          throw new Error(response.statusText)
                        }
                        return response.json()
                      })
                      .catch(error => {
                        Swal.showValidationMessage(
                          `Request failed: ${error}`
                        )
                      })
                  },
                
                confirmButtonText: 'jouer',
                showLoaderOnConfirm: true,
                inputValidator: (value) => {
                    if (!value) {
                      return 'Vous devez ecrire un surnom!'
                    }},
                
                allowOutsideClick: () => !Swal.isLoading()
              }).then((result)=>{
                nom=result.value.login;
                document.querySelector('#nom1').innerText = nom;
                document.querySelector('#nomJouer').innerText = nom;
                if (result.isConfirmed) {
                    Swal.fire({
                      title: `${result.value.login}'s avatar`,
                      imageUrl: result.value.avatar_url
                    })
                  }
                class Joueur{
                    constructor(surnom,nbPoints){
                        this.surnom=surnom;
                        this.nbPoints=nbPoints;
                
                    }

                    llenarTabla(){
                        $("table").find('tbody')
                        .append($('<tr>')
                        .append($('<td>')
                        .text($('#nomJouer').val()))
                        .append($('<td>')
                        .text($('#pointsJouer').val()))
                        
                                );
                                 
                                $('#nomJouer').val('');
                                $('#pointsJouer').val('');
                            
                        
                             
                            $("#table").find('tbody tr').each(function(index,item){
                            
                                var surnom=$(item).find('td').eq(1).text();
                                var nbPoints=$(item).find('td').eq(2).text();
                                
                                arr.push(new Joueur(surnom,nbPoints));
                                
                            });
                                    
                            
                            localStorage.setItem("Joueur",arr);
                            
                          
                           
                                }

                               
                    
                    puntuacion(jugador) {

                                
                            
                            if(jugador==='empate'){
                                puntuacionJugador++;
                                puntuacionPC++;
                                puntJugador.innerText = puntuacionJugador;
                                puntPC.innerText = puntuacionPC;
                                localStorage.setItem("puntuaje", puntuacionJugador);
                                var puntuaje =0;
                                puntuaje= localStorage.getItem("puntuaje");
                                document.getElementById("puntuaciones").innerHTML=puntuaje;
                                
                               
                                
                                



                            }else if(jugador === 'humano'){
                                puntuacionJugador=puntuacionJugador+3;
                                puntJugador.innerText = puntuacionJugador;
                                localStorage.setItem("puntuaje", puntuacionJugador);
                                var puntuaje =0;
                                puntuaje= localStorage.getItem("puntuaje");
                                document.getElementById("puntuaciones").innerHTML=puntuaje;
                                
                               
                               

                            }else if(jugador === 'pc'){
                                puntuacionPC=puntuacionPC+3;
                                puntPC.innerText = puntuacionPC;

                            }
                    }
                    
                
                        narracion(resultado, mano1 = jugadaHumano, mano2 = jugadaPC) {



                                        if (resultado == "Vous avez gagné!") {
                                            narrativa.innerHTML =
                                            `<h1>${resultado}</h1>
                                            <p><span>${mano1}</span> ganez a <span>${mano2}</span>.`;
                                        } else if (resultado == "Match nul!") {
                                            narrativa.innerHTML =
                                            `<h1>${resultado}</h1>
                                            <p><span>${mano1}</span> Match nul avec <span>${mano2}</span>.`;
                                
                                        } else {
                                
                                            narrativa.innerHTML =`<h1>${resultado}</h1>
                                            <p><span>${mano1}</span> Vous avez perdu contre<span> ${mano2}</span>.`;
                                        }
                            }

                    
                                mostrarPiedra(jugador) {

                                        jugador == "humano" ? tiroJugador.innerHTML = ' <img src="Images/piedra.png" alt="pierre" width="90px"  style=margin:20px />' : tiroPc.innerHTML = ' <img src="Images/piedra.png" alt="pierre"   width="90px"  style=margin:20px />';
                                
                                    }
                                mostrarPapel(jugador) {

                                        jugador == "humano" ? tiroJugador.innerHTML = '<img src="Images/papel.png" alt="papel"  width="90px" style=margin:20px />' : tiroPc.innerHTML = '<img src="Images/papel.png" alt="papel"  width="90px"  style=margin:20px />';
                                    }
                                
                                mostrarTijera(jugador) {
                                
                                        jugador == "humano" ? tiroJugador.innerHTML = '<img src="Images/tijera.png" alt="tijera" width="90px" style=margin:20px />' : tiroPc.innerHTML = '<img src="Images/tijera.png" alt="tijera"  width="90px"  style=margin:20px />';
                                    }
                
                    }   
                class Ordinateur extends Joueur{
                    
                   constructor(surnom,nbPoints,heure){
                    super(surnom,nbPoints); 
                    this.heure=heure;
                   } 
                }
                
                class JoueurHumain extends Joueur{
                        constructor(surnom,nbPoints,avatar){
                            super(surnom,nbPoints); 
                            this.avatar=avatar;
                        }
                        
                        

                }

             

                    var puntuacionOridnador;
                    var puntJugador;
                   

                    puntJugador = document.querySelector('#pointsJouer');
                    puntPC = document.querySelector('#PointsOrdinateur');
                    const tiroJugador = document.querySelector('#tiroJugador');
                    const tiroPc = document.querySelector('#tiroPc');
                    const narrativa = document.querySelector('.narracion');

                        let jugadas = [];
                        let jugadaHumano = '';
                        let jugadaPC = '';

                        let puntuacionJugador = 0;
                        let puntuacionPC = 0;
                        
                        const j =new Joueur();

                        document.getElementById("piedra").addEventListener("click", function() {
                            document.getElementById("tiroJugador").innerHTML = "<img src=\"Images/piedra.png\" width=\"90px\" style=\"margin:10px\" >"
                            juego(jugadas[0]);
    
                           });
                            document.getElementById("papel").addEventListener("click", function() {
                            document.getElementById("tiroJugador").innerHTML = "<img src=\"Images/papel.png\" width=\"90px\" style=\"margin:10px\">"
                            juego(jugadas[1]);;
                            });
                            document.getElementById("tijera").addEventListener("click", function() {
                            document.getElementById("tiroJugador").innerHTML = "<img src=\"Images/t.png\" width=\"90px\" style=\"margin:10px\" >"
                            juego(jugadas[2]);;
                            });

                            const ordi = new Ordinateur("Ordinateur",puntuacionOridnador);
                            const humano= new JoueurHumain(nom,puntJugador);
                            const contador=0;
                            
                            document.getElementById("indice").innerHTML=contador+1;
                            if (typeof(Storage) !== "undefined") {
                                // Store
                                localStorage.setItem("surnom", nom);
                               n= document.getElementById("nombres").innerHTML = localStorage.getItem("surnom");
                              
                                
                                
                              } else {
                                document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
                              }
                              
                              console.log(localStorage.length);
                              
                            
                           

                        
                            puntJugador.innerText = puntuacionJugador;
                            puntPC.innerText = puntuacionPC;
                            jugadas = ["pierre", "feuille", "ciseaux"];
                            reiniciarContadores();
                           
                            

                           

                          
                            function juego(opcion) {

                                const j =new Joueur();
                                jugadaHumano = opcion;
                        
                                let computadora = Math.floor(Math.random() * jugadas.length);
                        
                                jugadaPC = jugadas[computadora];
                        
                                let comparacion = jugadaHumano + jugadaPC;
                        
                        
                                switch (comparacion) {
                        
                        
                        
                                    case 'pierrepierre':
                        
                                        j.mostrarPiedra('humano');
                                        j.mostrarPiedra('pc');
                                        j.narracion('Match nul!');
                                        j.puntuacion('empate');
                                        
                                        break;
                        
                                    case 'pierrefeuille':
                        
                                        j.mostrarPiedra('humano');
                                        j.mostrarPapel('pc');
                                        j.puntuacion('pc');
                                        
                                        j.narracion('Vous avez perdu!');

                                        break;
                        
                                    case 'pierreciseaux':
                        
                                        j.mostrarPiedra('humano');
                                        j.mostrarTijera('pc');
                                        j.puntuacion('humano')
                                        
                                        j.narracion('Vous avez gagné!');
                                        break;
                        
                                   
                        
                        
                        
                                    case 'feuillepierre':
                                        j.mostrarPapel('humano');
                                        j.mostrarPiedra('pc');
                                        
                                        j.puntuacion('humano')
                                        
                                        j.narracion('Vous avez gagné!');
                                        break;
                        
                                    case 'feuillefeuille':
                                        j.mostrarPapel('humano');
                                        j.mostrarPapel('pc');
                                        j.puntuacion('empate');
                                        
                                        j.narracion('Match nul!');
                                        break;
                                    case 'feuilleciseaux':
                                        j.mostrarPapel('humano');
                                        j.mostrarTijera('pc');
                                        j.puntuacion('pc');
                                       
                                        j.narracion('Vous avez perdu!');
                                        break;
                        
                        
                                    case 'ciseauxpierre':
                                        j.mostrarTijera('humano');
                                        j.mostrarPiedra('pc');
                                        j.puntuacion('pc');
                                       
                                        j.narracion('Vous avez perdu!');
                                        break;
                        
                                    case 'ciseauxfeuille':
                                        j.mostrarTijera('humano');
                                        j.mostrarPapel('pc');
                                        j.puntuacion('humano');
                                        
                                        j.narracion('Vous avez gagné!');
                                        break;
                        
                                    case 'ciseauxciseaux':
                                        j.mostrarTijera('humano');
                                        j.mostrarTijera('pc');
                                        j.puntuacion('empate');
                                       
                                        j.narracion('Match nul!');
                                        break;
                        
                                    
                        
                        
                                    default:
                        
                                        break;
                                }
                        
                            }



              })
               




        } else if (
          window.close()
        ) {
          
        }
      })
}

         
