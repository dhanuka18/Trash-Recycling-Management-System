// Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize form elements
    const profileForm = document.getElementById('profileForm');
    const avatarUploadBtn = document.querySelector('.user-avatar .btn');
    const passwordUpdateBtn = document.querySelector('.btn-primary[type="button"]');

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle profile form submission
    profileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        updateProfile();
    });

    // Handle avatar upload
    avatarUploadBtn.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = handleAvatarUpload;
        input.click();
    });

    // Handle password update
    passwordUpdateBtn.addEventListener('click', function() {
        updatePassword();
    });

    // Update profile information
    function updateProfile() {
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value
        };

        // TODO: Send formData to backend
        console.log('Updating profile:', formData);
        showSuccessMessage('Profile updated successfully!');
    }

    // Handle avatar upload
    function handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.querySelector('.user-avatar img');
                img.src = e.target.result;
                // TODO: Send image to backend
                showSuccessMessage('Profile picture updated successfully!');
            };
            reader.readAsDataURL(file);
        }
    }

    // Update password
    function updatePassword() {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!currentPassword || !newPassword || !confirmPassword) {
            showErrorMessage('Please fill in all password fields');
            return;
        }

        if (newPassword !== confirmPassword) {
            showErrorMessage('New passwords do not match');
            return;
        }

        // TODO: Send password update to backend
        console.log('Updating password');
        showSuccessMessage('Password updated successfully!');
        clearPasswordFields();
    }

    // Show success message
    function showSuccessMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
    }

    // Show error message
    function showErrorMessage(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger alert-dismissible fade show position-fixed top-0 end-0 m-3';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alert);
        setTimeout(() => alert.remove(), 5000);
    }

    // Clear password fields
    function clearPasswordFields() {
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        document.getElementById('confirmPassword').value = '';
    }

    // Add input validation
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
            } else {
                this.classList.remove('is-valid');
                this.classList.add('is-invalid');
            }
        });
    });
});