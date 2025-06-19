document.getElementById("formulario").addEventListener("submit", function (event) {
    event.preventDefault();

    const abdomen = document.getElementById("abdomen").value;
    const antena = document.getElementById("antena").value;

    fetch("https://flask-pvn9.onrender.com/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `abdomen=${abdomen}&antena=${antena}`,
    })
        .then(response => response.json())
        .then(data => {
            const resultado = document.getElementById("resultado");
            resultado.classList.remove("resultado-exito", "resultado-error");

            if (data.error) {
                resultado.innerText = '⚠️ Error: ' + data.error;
                resultado.classList.add("resultado-error");
            } else {
                resultado.innerText = '✅ El insecto es un/a ' + data.categoria;
                resultado.classList.add("resultado-exito");
            }

            resultado.style.display = "block";

        })
        .catch(error => {
            document.getElementById("resultado").innerText = 'Error en la solicitud.';
            console.error("Error:", error);
        });
});
