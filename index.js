const apiUrl = "http://localhost:3000/Patients"; // JSON-server endpoint

const patientList = document.getElementById("patientList");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const patientForm = document.getElementById("patientForm");

let globalId = 10001; // Consider fetching latest ID dynamically if necessary

// Add Patient Functionality
async function addPatient(event) {
    event.preventDefault();
    console.log("Registering patient...");

    const name = document.getElementById("name").value;
    const age = parseInt(document.getElementById("age").value); // Parse age to number
    const prescription = document.getElementById("prescription").value;
    const diagnosis = document.getElementById("diagnosis").value;

    const data = {
        id: globalId,
        name,
        age,
        prescription,
        diagnosis,
    };

    console.log("globalId before:", globalId);
    globalId += 1;
    console.log("globalId after:", globalId);

    await postPatient(JSON.stringify(data)); // Ensure post is completed before resetting
    patientForm.reset(); // Clear form after submission
}

// Attach the event listener once
patientForm.addEventListener("submit", addPatient);

// Fetch and Display Patients
async function fetchPatients() {
    console.log("Fetching patients...");
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch patients");
        const patients = await response.json();
        console.log("Patients fetched:", patients);
        renderPatients(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
    }
}

// Render Patients as Cards
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

// Search Functionality
searchBtn.addEventListener("click", async () => {
    const query = searchInput.value.toLowerCase();
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch patients");
        const patients = await response.json();
        const filteredPatients = patients.filter(patient =>
            patient.name.toLowerCase().includes(query)
        );
        renderPatients(filteredPatients);
    } catch (error) {
        console.error("Error during search:", error);
    }
});

// Delete Patient
async function deletePatient(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
        if (!response.ok) throw new Error("Failed to delete patient");
        fetchPatients(); // Refresh the list after deletion
    } catch (error) {
        console.error("Error deleting patient:", error);
    }
}

// Add Patient to Database
async function postPatient(data) {
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: data,
        });
        if (!response.ok) throw new Error("Failed to post patient");
        console.log("Patient successfully added");
        fetchPatients(); // Refresh the list after adding
    } catch (error) {
        console.error("Error adding patient:", error);
    }
}

// Initialize App by Fetching Patients
fetchPatients();
