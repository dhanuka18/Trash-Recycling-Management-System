// Pickup Request Form JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form elements
    const form = document.getElementById('pickupRequestForm');
    const wasteTypeCheckboxes = document.querySelectorAll('input[name="wasteType"]');
    const quantityInput = document.getElementById('quantity');
    const weightInput = document.getElementById('weight');
    const pickupDateInput = document.getElementById('pickupDate');
    const pickupTimeSelect = document.getElementById('pickupTime');
    const addressInput = document.getElementById('address');
    const cityInput = document.getElementById('city');
    const stateInput = document.getElementById('state');
    const zipCodeInput = document.getElementById('zipCode');
    const instructionsTextarea = document.getElementById('instructions');
    const termsCheckbox = document.getElementById('terms');

    // Set minimum date for pickup to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    pickupDateInput.min = tomorrow.toISOString().split('T')[0];

    // Handle waste type selection
    wasteTypeCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            updateWasteTypeSelection();
        });
    });

    // Handle quantity and weight validation
    quantityInput.addEventListener('input', validateQuantity);
    weightInput.addEventListener('input', validateWeight);

    // Handle ZIP code validation
    zipCodeInput.addEventListener('input', validateZipCode);

    // Form submission handler
    form.addEventListener('submit', handleFormSubmit);

    // Functions
    function updateWasteTypeSelection() {
        const selectedTypes = Array.from(wasteTypeCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        // Update UI based on selection
        wasteTypeCheckboxes.forEach(checkbox => {
            const option = checkbox.closest('.custom-option');
            if (checkbox.checked) {
                option.style.backgroundColor = 'rgba(46, 204, 113, 0.1)';
                option.style.borderColor = 'var(--primary-color)';
            } else {
                option.style.backgroundColor = 'var(--light-color)';
                option.style.borderColor = 'var(--border-color)';
            }
        });

        // Validate at least one waste type is selected
        if (selectedTypes.length === 0) {
            form.classList.add('was-validated');
            return false;
        }

        return true;
    }

    function validateQuantity() {
        const value = parseInt(quantityInput.value);
        if (value < 1) {
            quantityInput.setCustomValidity('Quantity must be at least 1');
        } else {
            quantityInput.setCustomValidity('');
        }
    }

    function validateWeight() {
        const value = parseFloat(weightInput.value);
        if (value < 0.1) {
            weightInput.setCustomValidity('Weight must be at least 0.1 kg');
        } else {
            weightInput.setCustomValidity('');
        }
    }

    function validateZipCode() {
        const zipCode = zipCodeInput.value;
        if (!/^\d{5}$/.test(zipCode)) {
            zipCodeInput.setCustomValidity('Please enter a valid 5-digit ZIP code');
        } else {
            zipCodeInput.setCustomValidity('');
        }
    }

    function validateForm() {
        let isValid = true;

        // Validate waste type selection
        if (!updateWasteTypeSelection()) {
            isValid = false;
        }

        // Validate quantity and weight
        validateQuantity();
        validateWeight();

        // Validate ZIP code
        validateZipCode();

        // Validate required fields
        if (!pickupDateInput.value) {
            pickupDateInput.setCustomValidity('Please select a pickup date');
            isValid = false;
        }

        if (!pickupTimeSelect.value) {
            pickupTimeSelect.setCustomValidity('Please select a time slot');
            isValid = false;
        }

        if (!addressInput.value.trim()) {
            addressInput.setCustomValidity('Please enter your street address');
            isValid = false;
        }

        if (!cityInput.value.trim()) {
            cityInput.setCustomValidity('Please enter your city');
            isValid = false;
        }

        if (!stateInput.value.trim()) {
            stateInput.setCustomValidity('Please enter your state');
            isValid = false;
        }

        if (!termsCheckbox.checked) {
            termsCheckbox.setCustomValidity('You must agree to the terms and conditions');
            isValid = false;
        }

        return isValid;
    }

    function handleFormSubmit(event) {
        event.preventDefault();

        if (!validateForm()) {
            form.classList.add('was-validated');
            return;
        }

        // Collect form data
        const formData = {
            wasteTypes: Array.from(wasteTypeCheckboxes)
                .filter(checkbox => checkbox.checked)
                .map(checkbox => checkbox.value),
            quantity: quantityInput.value,
            weight: weightInput.value,
            pickupDate: pickupDateInput.value,
            pickupTime: pickupTimeSelect.value,
            address: addressInput.value.trim(),
            city: cityInput.value.trim(),
            state: stateInput.value.trim(),
            zipCode: zipCodeInput.value,
            instructions: instructionsTextarea.value.trim()
        };

        // Here you would typically send the data to your backend
        console.log('Form data:', formData);

        // Show success message
        showSuccessMessage();
    }

    function showSuccessMessage() {
        // Create success alert
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show';
        alert.role = 'alert';
        alert.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            Your pickup request has been scheduled successfully!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;

        // Insert alert before the form
        form.parentNode.insertBefore(alert, form);

        // Reset form
        form.reset();
        form.classList.remove('was-validated');

        // Remove success message after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
});