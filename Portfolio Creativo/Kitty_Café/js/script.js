var tutorial = document.getElementById('pantalla_tutorial');
var camarera = document.getElementById('camarera');
var cliente = document.getElementById('cliente');
var mesa = document.getElementById('mesa');
var coffee = document.getElementById('coffee');
var chocolate = document.getElementById('chocolate');
var croissant = document.getElementById('croissant');
var dinero = document.getElementById('dinero');
var showDinero = document.getElementById('showDinero');
var mesamejorada = document.getElementById('mesamejorada');
var mesa = document.getElementById('mesa');
var mejoraRRSS = document.getElementById('mejoraRRSS');
var mejoraBarista = document.getElementById('mejoraBarista');
var mejoraIngred = document.getElementById('mejoraIngred');
var textoMesa = document.getElementById('textoMesa');
var textoRRSS = document.getElementById('textoRRSS');
var textoBarista = document.getElementById('textoBarista');
var textoIngred = document.getElementById('textoIngred');
var botonMesa = document.getElementById('botonMesa');
var botonRRSS = document.getElementById('botonRRSS');
var botonBarista = document.getElementById('botonBarista');
var botonIngred = document.getElementById('botonIngred');
var prodCof = document.getElementById('prodCof');
var prodChoco = document.getElementById('prodChoco');
var prodCrois = document.getElementById('prodCrois');
var openimg = document.getElementById('openimg');
var back = document.getElementById('back');
var pantalla_end = document.getElementById('pantalla_end');
var img_end = document.getElementById('img_end');
var texto_end = document.getElementById('texto_end');
var restart = document.getElementById('restart');
var song = document.getElementById('song');
var fakebutton = document.getElementById('fakebutton');

//por defecto
var producto = 3; 
var acierto = false;
//inicializa el dinero a 0, para probrar el juego cambiar a 39 y realizar una compra
var paga = 0; 
var clienteHere = false;
var mejora1 = false;
var mejora2 = false;
var mejora3 = false;
var mejora4 = false;

//Para el clic de la música, si la canción está sonando el botón tiene color
//Si no está sonando está en gris
function playSong()
{
    if (song.paused)
    {
        song.play();
        fakebutton.style.filter = 'grayscale(0%)';
    }
    else
    {
        song.pause();
        fakebutton.style.filter = 'grayscale(100%)';
    }
}

function escondeTutorial()
{
    tutorial.style.display = 'none';
}

//Cuando se llega a la página desde la de inicio pone la música automáticamente
window.onload = function() 
{
    song.play();
};

//Si la canción acaba la vuelve a poner desde el principio
song.addEventListener('ended', function()
{
    song.currentTime = 0;
    song.play();
})

//timer de llegada de cliente
setTimeout(function()
{   
    cliente.style.display ='block';
    clienteHere = true;
    producto = Math.floor(Math.random() * 3);//cuando el cliente llega hace el random de que producto quiere
    setTimeout(function()
    {
        if(producto == 0)
        {
            coffee.style.display ='block';
        }
        else if(producto == 1)
        {
            choco.style.display ='block';
        }
        else if(producto == 2)
        {
            croissant.style.display ='block';
        }
    }, 1000)
}, 2000);

//reset del cliente
function Reseteo()
{
    acierto = false;
    cliente.style.display = 'none';
    coffee.style.display = 'none';
    choco.style.display = 'none';
    croissant.style.display = 'none';
    setTimeout(function()
    {
        cliente.style.display = 'block';
        clienteHere = true;
        producto = Math.floor(Math.random() * 3); //cuando el cliente llega hace el random de que producto quiere
        setTimeout(function()
        {
            if(producto == 0)
            {
                coffee.style.display ='block';
            }
            else if(producto == 1)
            {
                choco.style.display ='block';
            }
            else if(producto == 2)
            {
                croissant.style.display ='block';
            }
        }, 1000)
    }, 2000);
}

//función que comprueba si el producto que se ha dado click es correcto o no
//Si es así se añade dinero
function Compra(num){
    if (producto == num && clienteHere == true)
    {
        acierto = true;
        if (producto == 0)
            {    
                paga += 1.8;
                checkMejora(1.8);
                coffee.style.display = 'none';
            }
        else if (producto == 1)
            {
                paga += 1.5;
                checkMejora(1.5);
                choco.style.display = 'none';
            }
        else if (producto == 2)
            {
                paga += 2.25;
                checkMejora(2.25);
                croissant.style.display = 'none';
            }
        dinero.value = paga;
        dinero.value = parseFloat(dinero.value).toFixed(2);
    }
    //si no se acierto se resetea el cliente
    else
    {
        acierto = false;
        coffee.style.display = 'none';
        choco.style.display = 'none';
        croissant.style.display = 'none';
    }
    clienteHere = false;
    Reseteo();    
    muestraBoton();
}

//función de las mejoras
function Mejora(upgrade)
{
    if (dinero.value >= 10 && upgrade == 1 && mejora1 == false)
    {
        mesa.style.display = 'none';
        mesamejorada.style.display = 'block';
        paga -= 10;
        dinero.value = paga;
        dinero.value = parseFloat(dinero.value).toFixed(2);
        mejora1 = true;
        escondeBoton();    
    }
    else if (dinero.value >= 5 && upgrade == 2 && mejora2 == false)
    {
        mejoraRRSS.style.filter = 'grayscale(0%)';
        paga -= 5;
        dinero.value = paga;
        dinero.value = parseFloat(dinero.value).toFixed(2);
        mejora2 = true;
        escondeBoton();    
    }
    else if (dinero.value >= 8 && upgrade == 3 && mejora3 == false)
    {
        mejoraBarista.style.filter = 'grayscale(0%)';
        paga -= 8;
        dinero.value = paga;
        dinero.value = parseFloat(dinero.value).toFixed(2);
        mejora3 = true;
        escondeBoton();    
    }
    else if (dinero.value >= 5 && upgrade == 4 && mejora4 == false)
    {
        mejoraIngred.style.filter = 'grayscale(0%)';
        paga -= 5;
        dinero.value = paga;
        dinero.value = parseFloat(dinero.value).toFixed(2);
        mejora4 = true;
        escondeBoton();    
    }
    endGame();
}

//chequea si hay una mejora, si la hay se añadirá un porcentaje x al dinero adquirido
//En caso de tener una mejora impedirá que el botón de mejora salga
function checkMejora(prod)
{
    var cantMejora = 0;
    if (mejora1 == true)
    {
        cantMejora += 0.10;
        botonMesa.style.display = 'none';
    }
    if (mejora2 == true)
    {
        cantMejora += 0.05;
        botonRRSS.style.display = 'none';
    }
    if (mejora3 == true)
    {
        cantMejora += 0.05;
        botonBarista.style.display = 'none';
    }
    if (mejora4 == true)
    {
        cantMejora += 0.05;
        botonIngred.style.display = 'none';
    }
    prod *= cantMejora;
    paga += prod;
}

//muestra el texto si se pasa por encima del botón de mejora o por la mejora cuando ya se tiene
function muestraTexto(texto)
{
    if (texto == 1)
    {
        textoMesa.style.display = 'block';
    }
    else if (texto == 2)
    {
        textoRRSS.style.display = 'block';
    }
    else if (texto == 3)
    {
        textoBarista.style.display = 'block';
    }
    else if (texto == 4)
    {
        textoIngred.style.display = 'block';
    }
    else if (texto == 5 && mejoraRRSS.style.filter == 'grayscale(0%)')
    {
        textoRRSS.style.display = 'block';
    }
    else if (texto == 6 && mejoraBarista.style.filter == 'grayscale(0%)')
    {
            textoBarista.style.display = 'block';
    }
    else if (texto == 7 && mejoraIngred.style.filter == 'grayscale(0%)')
    {
            textoIngred.style.display = 'block';
    }
}

//esconde el texto cuando ya no se pasa por encima
function escondeTexto (texto)
{
    if (texto == 1)
    {
        textoMesa.style.display = 'none';
    }
    else if (texto == 2)
    {
        textoRRSS.style.display = 'none';
    }
    else if (texto == 3)
    {
        textoBarista.style.display = 'none';
    }
    else if (texto == 4)
    {
        textoIngred.style.display = 'none';
    }
}

//si se tiene la cantidad de dinero necesaria y no se tiene la mejora muestra el botón de mejora
function muestraBoton()
{
    if (paga >= 10 && mejora1 == false)
    {
        botonMesa.style.display = 'block';
    }
    if (paga >= 5 && mejora2 == false)
    {
        botonRRSS.style.display = 'block';
    }
    if (paga >= 8 && mejora3 == false)
    {
        botonBarista.style.display = 'block';
    }
    if (paga >= 5 && mejora4 == false)
    {
        botonIngred.style.display = 'block';
    }
}

//si el dinero no es suficiente o se tiene la mejora no se muestra el botón
function escondeBoton()
{
    if (paga <= 10 || mejora1 == true)
    {
        botonMesa.style.display = 'none';
    }
    if (paga <= 5 || mejora2 == true)
    {
        botonRRSS.style.display = 'none';
    }
    if (paga <= 8|| mejora3 == true)
    {
        botonBarista.style.display = 'none';
    }
    if (paga <= 5 || mejora4 == true)
    {
        botonIngred.style.display = 'none';
    }
}

//Si se tienen todas las mejoras va escondiendo todo progresivamente
//Cuando solo queda el fondo pone la imagen de la cafetería mejorada y los textos
//E imagen del fin de juego, además de un botón para volver a la pantalla de inicio
function endGame()
{
    if (mejora1 == true && mejora2 == true && mejora3 == true && mejora4 == true)
    {
        setTimeout(function()
        {
            showDinero.style.display = 'none';
            dinero.style.display = 'none';
            dinero.value = "";
            openimg.style.display = 'none';
            prodChoco.style.display = 'none';
            prodCof.style.display = 'none';
            prodCrois.style.display = 'none';
            setTimeout(function()
            {
                mesamejorada.style.display = 'none';
                mejoraRRSS.style.display = 'none';
                mejoraBarista.style.display = 'none';
                mejoraIngred.style.display = 'none';
                setTimeout(function()
                {
                    clienteHere = false;
                    cliente.style.display = 'none';
                    camarera.style.display = 'none';
                    coffee.style.display = 'none';
                    choco.style.display = 'none';
                    croissant.style.display = 'none';
                    setTimeout(function()
                    {
                        back.style.display = 'none';
                        pantalla_end.style.display = 'block';
                        setTimeout(function()
                        {
                            img_end.style.display = 'block';
                            texto_end.style.display = 'block';
                            restart.style.display = 'block';
                        }, 1850);
                    }, 1800);
                }, 1500);   
            }, 1000);
        }, 500);
    }
    else
    {
        return false;
    }
}