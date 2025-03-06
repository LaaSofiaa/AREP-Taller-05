document.getElementById('propertyForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const property = {
        address: document.getElementById('address').value,
        price: parseFloat(document.getElementById('price').value),
        size: parseFloat(document.getElementById('size').value),
        description: document.getElementById('description').value
    };

    fetch('http://localhost:8080/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property)
    })
    .then(response => response.json())
    .then(() => {
        showMessage('Propiedad agregada correctamente.', 'success');
        loadProperties();
    })
    .catch(() => showMessage('Error al agregar la propiedad.', 'error'));
});

function loadProperties() {
    fetch('http://localhost:8080/api/properties')
    .then(response => response.json())
    .then(properties => {
        const propertyList = document.getElementById('propertyList');
        propertyList.innerHTML = '';
        properties.forEach(property => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${property.address}</strong><br>
                    Precio: $${property.price} | Tamaño: ${property.size}m²<br>
                    ${property.description}
                </div>
                <button onclick="deleteProperty(${property.id})">Eliminar</button>
            `;
            propertyList.appendChild(li);
        });
    });
}

function deleteProperty(id) {
    fetch('http://localhost:8080/api/properties${id}', {
        method: 'DELETE'
    })
    .then(() => {
        showMessage('Propiedad eliminada correctamente.', 'success');
        loadProperties();
    })
    .catch(() => showMessage('Error al eliminar la propiedad.', 'error'));
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.className = `message ${type}`;
}

// Cargar propiedades al iniciar
loadProperties();