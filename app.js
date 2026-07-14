/* Swarpanthi (राह रियाज़ की) - Client-side Interactive Logic */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initCourseTabs();
  initChecklist();
  initFaqAccordion();
  initInquiryForm();
  initPaymentModal();
});

/* --- Navigation Scroll & Mobile Toggle --- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Change header styling on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.padding = '0.5rem 0';
      header.style.boxShadow = '0 5px 20px rgba(42, 42, 42, 0.08)';
    } else {
      header.style.padding = '1rem 0';
      header.style.boxShadow = 'none';
    }
    
    // Simple scroll spy to highlight active link
    let current = '';
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile navigation menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/* --- Course Explorer Tabs --- */
function initCourseTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.course-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetLevel = tab.getAttribute('data-level');

      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      tab.classList.add('active');
      const activeContent = document.getElementById(`course-${targetLevel}`);
      if (activeContent) {
        activeContent.classList.add('active');
      }
    });
  });
}

/* --- Student Setup Checklist --- */
function initChecklist() {
  const items = document.querySelectorAll('.checklist-item');
  
  items.forEach(item => {
    const checkbox = item.querySelector('.checklist-checkbox');
    
    checkbox.addEventListener('click', () => {
      checkbox.classList.toggle('checked');
      if (checkbox.classList.contains('checked')) {
        checkbox.innerHTML = '✓';
        item.style.opacity = '0.7';
        item.style.textDecoration = 'none'; // Keep readable but styled
      } else {
        checkbox.innerHTML = '';
        item.style.opacity = '1';
      }
    });
  });
}

/* --- FAQ Accordion --- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all items
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-content').style.maxHeight = null;
      });

      // If clicked item wasn't active, open it
      if (!isActive) {
        item.classList.add('active');
        const content = item.querySelector('.faq-content');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* --- Admissions & Inquiry Form Processing --- */
function initInquiryForm() {
  const form = document.getElementById('enrollForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const phone = document.getElementById('studentPhone').value;
    const level = document.getElementById('studentLevel').value;
    const notes = document.getElementById('studentNotes').value;

    // We build a direct WhatsApp link to make connect instantaneous
    let welcomeText = `नमस्ते, My name is ${name}. I am interested in enrolling for the Swarpanthi ${level} course. %0A%0A*Details Submitted:*%0A- Phone: ${phone}%0A- Email: ${email}%0A- Message: ${notes}`;
    
    const whatsappNumber = '919579127420'; // From PDF FAQ contact number: 9579127420
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(welcomeText)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    alert('Thank you for your interest! Your details have been prepared. We are now redirecting you to WhatsApp to complete your enrollment with the Teacher.');
    form.reset();
  });
}

/* --- Mock Payment Checkout Simulator --- */
let activePaymentCourse = null;
let activePaymentAmount = 0;

function initPaymentModal() {
  const modal = document.getElementById('paymentModal');
  const closeBtn = document.getElementById('closeModal');
  const checkoutForm = document.getElementById('modalCheckoutForm');
  const detailsTable = document.getElementById('detailsTable');
  const successGraphic = document.getElementById('successGraphic');

  // Find all payment triggering buttons
  const payButtons = document.querySelectorAll('.btn-pay-trigger');
  payButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const courseName = btn.getAttribute('data-course');
      const amountStr = btn.getAttribute('data-amount');
      const amountVal = parseInt(amountStr);

      activePaymentCourse = courseName;
      activePaymentAmount = amountVal;

      // Populate details table in modal
      document.getElementById('modalCourseName').textContent = courseName;
      document.getElementById('modalCourseFee').textContent = `₹${amountVal}`;
      document.getElementById('modalAdmissionFee').textContent = `₹500`;
      document.getElementById('modalTotalFee').textContent = `₹${amountVal + 500}`;

      // Reset modal UI states
      checkoutForm.style.display = 'block';
      detailsTable.style.display = 'table';
      successGraphic.style.display = 'none';

      // Open Modal
      modal.classList.add('active');
    });
  });

  // Close button trigger
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  // Click outside card closes modal
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  // Process Mock Checkout Form
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const payName = document.getElementById('payName').value;
      const payEmail = document.getElementById('payEmail').value;
      const payPhone = document.getElementById('payPhone').value;

      // Simulate API load
      const paySubmitBtn = checkoutForm.querySelector('button[type="submit"]');
      const originalBtnText = paySubmitBtn.textContent;
      paySubmitBtn.textContent = 'Processing Secure Payment...';
      paySubmitBtn.disabled = true;

      setTimeout(() => {
        // Success State
        paySubmitBtn.textContent = originalBtnText;
        paySubmitBtn.disabled = false;

        checkoutForm.style.display = 'none';
        detailsTable.style.display = 'none';
        
        // Generate mock transaction ID
        const txId = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);
        document.getElementById('successTxId').textContent = txId;
        document.getElementById('successDetails').innerHTML = `Congratulations <strong>${payName}</strong>! You have successfully registered for <strong>${activePaymentCourse}</strong>.<br>A confirmation receipt and joining instructions have been sent to <strong>${payEmail}</strong>.`;

        successGraphic.style.display = 'flex';
        checkoutForm.reset();
      }, 2000);
    });
  }
}
