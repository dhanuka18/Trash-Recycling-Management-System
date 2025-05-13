// Waste History JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize elements
    const filterButtons = document.querySelectorAll('.btn-group .btn');
    const exportBtn = document.querySelector('.btn-outline-secondary:first-child');
    const printBtn = document.querySelector('.btn-outline-secondary:nth-child(2)');
    const dateRangeBtn = document.querySelector('.btn-outline-secondary.dropdown-toggle');
    const viewDetailsButtons = document.querySelectorAll('.btn-outline-primary');

    // Initialize tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Handle filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter table rows based on status
            filterTableRows(this.textContent.trim());
        });
    });

    // Handle export button
    exportBtn.addEventListener('click', function() {
        exportToCSV();
    });

    // Handle print button
    printBtn.addEventListener('click', function() {
        window.print();
    });

    // Handle view details buttons
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            showPickupDetails(row);
        });
    });

    // Filter table rows
    function filterTableRows(status) {
        const rows = document.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const rowStatus = row.querySelector('.badge').textContent.trim();
            if (status === 'All' || rowStatus === status) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Export to CSV
    function exportToCSV() {
        const rows = document.querySelectorAll('tbody tr');
        let csv = 'Date,Type,Weight,Items,Points,Status\n';

        rows.forEach(row => {
            const cells = row.querySelectorAll('td');
            const rowData = Array.from(cells)
                .slice(0, -1) // Exclude the last cell (Actions)
                .map(cell => {
                    const text = cell.textContent.trim();
                    return text.includes(',') ? `"${text}"` : text;
                });
            csv += rowData.join(',') + '\n';
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'waste-history.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    // Show pickup details
    function showPickupDetails(row) {
        const date = row.cells[0].textContent;
        const type = row.cells[1].textContent;
        const weight = row.cells[2].textContent;
        const items = row.cells[3].textContent;
        const points = row.cells[4].textContent;
        const status = row.cells[5].querySelector('.badge').textContent;

        // Create modal content
        const modalContent = `
            <div class="modal fade" id="pickupDetailsModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Pickup Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row mb-3">
                                <div class="col-6">
                                    <p class="mb-1 text-muted">Date</p>
                                    <p class="mb-0">${date}</p>
                                </div>
                                <div class="col-6">
                                    <p class="mb-1 text-muted">Type</p>
                                    <p class="mb-0">${type}</p>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-6">
                                    <p class="mb-1 text-muted">Weight</p>
                                    <p class="mb-0">${weight}</p>
                                </div>
                                <div class="col-6">
                                    <p class="mb-1 text-muted">Items</p>
                                    <p class="mb-0">${items}</p>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="col-6">
                                    <p class="mb-1 text-muted">Points</p>
                                    <p class="mb-0">${points}</p>
                                </div>
                                <div class="col-6">
                                    <p class="mb-1 text-muted">Status</p>
                                    <p class="mb-0"><span class="badge bg-success">${status}</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal to document
        document.body.insertAdjacentHTML('beforeend', modalContent);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('pickupDetailsModal'));
        modal.show();

        // Remove modal from document after it's hidden
        document.getElementById('pickupDetailsModal').addEventListener('hidden.bs.modal', function() {
            this.remove();
        });
    }

    // Update timeline
    function updateTimeline() {
        // TODO: Fetch and update timeline data from backend
        console.log('Updating timeline...');
    }

    // Update statistics
    function updateStats() {
        // TODO: Fetch and update statistics from backend
        console.log('Updating statistics...');
    }

    // Initialize updates
    updateTimeline();
    updateStats();

    // Set up periodic updates
    setInterval(updateTimeline, 300000); // Update every 5 minutes
    setInterval(updateStats, 300000); // Update every 5 minutes
});