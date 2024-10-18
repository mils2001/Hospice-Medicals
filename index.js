const apiUrl = "http://localhost:3000/Patients"; // JSON-server endpoint
const patientList = document.getElementById('patientList');
const patientForm = document.getElementById('patientForm');

// Fetch and render patients on page load
async function fetchPatients(query = "") {
    const url = query ? `${apiUrl}?name_like=${query}` : apiUrl;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch patients");
        const data = await response.json();
        renderPatients(data);
    } catch (error) {
        console.error("Error fetching patients:", error);
    }
}

// Render patients as cards with delete buttons
function renderPatients(patients) {
    if (patients.length === 0) {
        patientList.innerHTML = `<p class="text-center text-gray-500">No patients found.</p>`;
        return;
    }

    patientList.innerHTML = patients.map(patient => `
        <div class="bg-white p-4 shadow-md rounded-md mb-4">
            <h3 class="text-xl font-bold text-gray-800">${patient.name}</h3>
            <p class="text-gray-600">Age: ${patient.age}</p>
            <p class="text-gray-600">Diagnosis: ${patient.diagnosis}</p>
            <p class="text-gray-600">Prescription: ${patient.prescription}</p>
            <button data-id="${patient.id}" 
                class="delete-btn mt-2 text-red-500 hover:underline font-semibold">
                Delete
            </button>
        </div>
    `).join("");

    // Attach delete button event listeners
    attachDeleteListeners();
}

// Attach listeners to delete buttons
function attachDeleteListeners() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const patientId = e.target.getAttribute('data-id');
            const confirmDelete = confirm("Are you sure you want to delete this patient?");
            if (confirmDelete) {
                await deletePatient(patientId);
            }
        });
    });
}

// Delete patient from server and refresh list
async function deletePatient(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error(`Failed to delete patient with ID ${id}`);
        alert('Patient deleted successfully!');
        fetchPatients(); // Refresh the list after deletion
    } catch (error) {
        console.error('Error deleting patient:', error);
        alert('Could not delete patient. Please try again.');
    }
}

// Handle form submission to add a new patient
patientForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const diagnosis = document.getElementById('diagnosis').value;
    const prescription = document.getElementById('prescription').value;

    const newPatient = { name, age, diagnosis, prescription };

    try {
        await postPatient(newPatient);
        patientForm.reset(); // Clear form after submission
        fetchPatients(); // Refresh list
    } catch (error) {
        console.error("Error adding patient:", error);
    }
});

// POST request to add a new patient
async function postPatient(patient) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(patient),
        });
        if (!response.ok) throw new Error('Failed to add patient');
        console.log('Patient successfully added');
    } catch (error) {
        console.error('Error adding patient:', error);
    }
}

// Fetch patients on page load
fetchPatients();
