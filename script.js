// Initialize on document ready
$(document).ready(function() {
    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        const target = $(this.getAttribute('href'));
        if(target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });

    // Handle enrollment button clicks
    $('.enroll-btn').click(function(e) {
        e.preventDefault();
        const courseName = $(this).closest('.course-card').find('h3').text();
        const coursePrice = $(this).closest('.course-content').find('.price').text();
        
        // Show enrollment form
        showEnrollmentForm(courseName, coursePrice);
    });

    // Mobile menu toggle
    $('.mobile-menu-btn').click(function() {
        $('.nav-links').toggleClass('active');
    });

    // Handle form submissions
    $('#enrollment-form').submit(function(e) {
        e.preventDefault();
        handleEnrollmentSubmission();
    });
});

// Function to show enrollment form
function showEnrollmentForm(courseName, price) {
    // Create modal if it doesn't exist
    if (!$('#enrollment-modal').length) {
        const modalHTML = `
            <div id="enrollment-modal" class="modal">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h2>Enroll in <span class="course-name"></span></h2>
                    <form id="enrollment-form">
                        <div class="form-group">
                            <label for="parent-name">Parent's Name</label>
                            <input type="text" id="parent-name" required>
                        </div>
                        <div class="form-group">
                            <label for="student-name">Student's Name</label>
                            <input type="text" id="student-name" required>
                        </div>
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" required>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone</label>
                            <input type="tel" id="phone" required>
                        </div>
                        <div class="form-group">
                            <label>Selected Course</label>
                            <p class="selected-course"></p>
                            <p class="selected-price"></p>
                        </div>
                        <button type="submit" class="submit-btn">Complete Enrollment</button>
                    </form>
                </div>
            </div>
        `;
        $('body').append(modalHTML);

        // Handle modal close button
        $('.close-modal').click(function() {
            $('#enrollment-modal').hide();
        });
    }

    // Update modal content and show it
    $('#enrollment-modal .course-name').text(courseName);
    $('#enrollment-modal .selected-course').text(courseName);
    $('#enrollment-modal .selected-price').text(price);
    $('#enrollment-modal').show();
}

// Handle form submission
function handleEnrollmentSubmission() {
    const formData = {
        parentName: $('#parent-name').val(),
        studentName: $('#student-name').val(),
        email: $('#email').val(),
        phone: $('#phone').val(),
        course: $('.selected-course').text(),
        price: $('.selected-price').text()
    };

    // Show loading state
    $('.submit-btn').prop('disabled', true).text('Processing...');

    // Simulate API call (replace with actual API endpoint)
    setTimeout(() => {
        // Show success message
        $('#enrollment-modal .modal-content').html(`
            <div class="success-message">
                <i class="fas fa-check-circle"></i>
                <h3>Enrollment Successful!</h3>
                <p>Thank you for enrolling. We'll send you an email with next steps.</p>
                <button class="btn" onclick="$('#enrollment-modal').hide()">Close</button>
            </div>
        `);

        // Send email notification (implement with your backend)
        sendEmailNotification(formData);
    }, 1500);
}

// Function to send email notification
function sendEmailNotification(formData) {
    // Replace with your actual email sending logic
    console.log('Sending enrollment notification for:', formData);
    
    // Example: You could make an API call to your backend here
    // fetch('/api/send-enrollment-email', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(formData)
    // });
}

// Add these styles to your CSS file for the modal
const modalStyles = `
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 1000;
}

.modal-content {
    background: white;
    max-width: 500px;
    margin: 50px auto;
    padding: 2rem;
    border-radius: 8px;
    position: relative;
}

.close-modal {
    position: absolute;
    right: 1rem;
    top: 1rem;
    font-size: 1.5rem;
    cursor: pointer;
}

.success-message {
    text-align: center;
    padding: 2rem;
}

.success-message i {
    font-size: 3rem;
    color: var(--primary);
    margin-bottom: 1rem;
}
`;

// Add scroll-based animations
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.benefit-card, .course-card');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        // If element is in viewport
        if(position.top >= 0 && position.bottom <= window.innerHeight) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});