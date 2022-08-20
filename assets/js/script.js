let respuesta = prompt("¡Bienvenido a la sumadora básica!\nIngresa 1 si quieres sumar. Cualquier otra cosa si quieres salir.")

if (respuesta == "1") {
    let cantidad_numeros = parseInt(prompt("¿Cuantos números quieres intentar sumar?"))
    let resultado = 0
    for (i = 0; i < cantidad_numeros; i++) {
        resultado += parseInt(prompt("Ingresa el número " + (i + 1) + ":"))
    }
    alert("El resultado es: " + resultado)
}
else {
    alert("¡Hasta la próxima!")
}