document.addEventListener('DOMContentLoaded', () => {
    const injectionType = document.getElementById('injectionType');
    const syringeFields = document.getElementById('syringeFields');
    const penFields = document.getElementById('penFields');
    const form = document.getElementById('peptideForm');
    const resultDisplay = document.getElementById('result');

    injectionType.addEventListener('change', (event) => {
        if (event.target.value === 'syringe') {
            syringeFields.style.display = 'block';
            penFields.style.display = 'none';
        } else {
            syringeFields.style.display = 'none';
            penFields.style.display = 'block';
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // This is a placeholder for sending data to a server.
        // You would need a backend server (e.g., with Python/Flask) to run the calculation.
        const formData = {
            injectionType: injectionType.value,
            compoundMg: parseFloat(document.getElementById('compoundMg').value),
            desiredDoseMcg: parseFloat(document.getElementById('desiredDoseMcg').value),
            bacWaterMl: injectionType.value === 'syringe' ? parseFloat(document.getElementById('bacWaterMl').value) : null,
            penUnits: injectionType.value === 'pen' ? parseFloat(document.getElementById('penUnits').value) : null
        };

        // Here's where you would call your Python function on the server.
        // For demonstration purposes, we'll use a simplified, hardcoded calculation.
        // In a real application, this would be an API call to your backend.
        if (formData.injectionType === 'syringe') {
            const concentration_mcg_ml = (formData.compoundMg * 1000) / formData.bacWaterMl;
            const needed_ml = formData.desiredDoseMcg / concentration_mcg_ml;
            const needed_units = needed_ml * 100;
            resultDisplay.textContent = `For a dose of ${formData.desiredDoseMcg} mcg, draw up ${needed_units.toFixed(2)} units with a 1ml syringe. This corresponds to ${needed_ml.toFixed(2)} ml.`;
        } else {
            const concentration_mcg_unit = (formData.compoundMg * 1000) / formData.penUnits;
            const needed_units = formData.desiredDoseMcg / concentration_mcg_unit;
            resultDisplay.textContent = `For a dose of ${formData.desiredDoseMcg} mcg, turn the pen to ${needed_units.toFixed(2)} units.`;
        }
    });
});
