const apiUrl = "http://localhost:3000/Patients"; // JSON-server endpoint
const patientList = document.getElementById('patientList');
const patientForm = document.getElementById('patientForm');

// Fetch and render patients on page load
async function fetchPatients() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch patients");
        const data = await response.json();
        renderPatients(data);
    } catch (error) {
        console.error("Error fetching patients:", error);
    }
}

// Render patient list
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
            <button onclick="deletePatient(${patient.id})" 
                class="mt-2 text-red-500 hover:underline font-semibold">Delete</button>
        </div>
    `).join("");
}

// Handle form submission
patientForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form reload

    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const diagnosis = document.getElementById('diagnosis').value;
    const prescription = document.getElementById('prescription').value;

    const newPatient = { name, age, diagnosis, prescription };

    try {
        await postPatient(newPatient);
        patientForm.reset(); // Clear form after submission
        fetchPatients(); // Refresh patient list
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

// Delete patient from server and refresh list
async function deletePatient(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete patient');
        console.log('Patient deleted successfully');
        fetchPatients(); // Refresh patient list
    } catch (error) {
        console.error('Error deleting patient:', error);
    }
}

// Initialize by fetching patients on page load
fetchPatients();


