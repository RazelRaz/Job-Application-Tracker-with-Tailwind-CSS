// 1. Core DOM Element Selectors from your HTML structure
const allJobs = document.getElementById('all-jobs');
const statusFilterContainer = document.querySelector('.status-filter');
const topTotalCounter = document.getElementById('top-total');
const middleTotalCounter = document.getElementById('available-jobs');

// Select the top panel cards for Interview and Rejected relative to their wrapper container
const counterContainer = document.querySelector('.job_counter_container');
const topInterviewCounter = counterContainer ? counterContainer.children[1].querySelector('h3') : null;
const topRejectedCounter = counterContainer ? counterContainer.children[2].querySelector('h3') : null;

// =========================================================================
// 2. DYNAMIC COUNTER MANAGEMENT FUNCTION
// =========================================================================
function updateCounters() {
    // Detect which global navigation tab is active by checking for the Tailwind blue background
    const activeTab = document.querySelector('.status-filter .bg-blue-600');
    const currentTabStatus = activeTab ? activeTab.dataset.status : 'all';

    const allJobCards = document.querySelectorAll(".single-job");
    
    // Tracking variables for dashboard statistics
    let totalUnassigned = 0;
    let totalInterview = 0;
    let totalRejected = 0;
    let currentTabMatchCount = 0;

    allJobCards.forEach(card => {
        const jobStatus = card.dataset.status; // 'interview', 'rejected', or undefined

        // Calculate data sets for the upper overall panel blocks
        if (jobStatus === 'interview') {
            totalInterview++;
        } else if (jobStatus === 'rejected') {
            totalRejected++;
        } else {
            totalUnassigned++; // No status means it remains in the active inbox ("All")
        }

        // Calculate active subtitle counter ("X Jobs Available" updates contextually)
        if (currentTabStatus === 'all') {
            if (!jobStatus || jobStatus === 'all') {
                currentTabMatchCount++;
            }
        } else if (jobStatus === currentTabStatus) {
            currentTabMatchCount++;
        }
    });

    // Update the UI text values safely across elements
    if (topTotalCounter) topTotalCounter.innerText = totalUnassigned;
    if (topInterviewCounter) topInterviewCounter.innerText = totalInterview;
    if (topRejectedCounter) topRejectedCounter.innerText = totalRejected;
    if (middleTotalCounter) middleTotalCounter.innerText = currentTabMatchCount;
}

// =========================================================================
// 3. VISUAL ELEMENT FILTERS
// =========================================================================
function applyCurrentFilter(forcedStatus) {
    const activeTab = statusFilterContainer.querySelector('.bg-blue-600');
    const filterValue = forcedStatus || (activeTab ? activeTab.dataset.status : 'all');
    
    const allJobCards = document.querySelectorAll('.single-job');

    allJobCards.forEach(card => {
        const jobStatus = card.dataset.status;

        if (filterValue === 'all') {
            // "All" view strictly acts as the active box container (shows items without a state)
            if (!jobStatus || jobStatus === 'all') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none'; 
            }
        } else if (jobStatus === filterValue) {
            card.style.display = 'block'; 
        } else {
            card.style.display = 'none';  
        }
    });
}

// =========================================================================
// 4. TAB NAVIGATION INTERACTION
// =========================================================================
statusFilterContainer.addEventListener('click', function(e) {
    const clickedTab = e.target.closest('.status-btn');
    if (!clickedTab) return;

    // Reset Tailwind layout selections for the navigation items
    const allTabs = statusFilterContainer.querySelectorAll('.status-btn');
    allTabs.forEach(tab => {
        tab.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
        tab.classList.add('bg-white', 'text-brand-secondary', 'border-gray-200');
    });
    
    // Apply layout background highlight on selected navigation item
    clickedTab.classList.remove('bg-white', 'text-brand-secondary', 'border-gray-200');
    clickedTab.classList.add('bg-blue-600', 'text-white', 'border-blue-600');

    // Run structural views and update text nodes
    applyCurrentFilter(clickedTab.dataset.status);
    updateCounters();
});

// =========================================================================
// 5. JOBS ACTION LIFECYCLE (Delete / Update Statuses)
// =========================================================================
function jobsTrackerLifecycle() {
  // Run calculation immediately on window boot sequence to display defaults
  updateCounters();

  allJobs.addEventListener("click", function(e){
      const singleJobCard = e.target.closest(".single-job");
      if (!singleJobCard) return;

      // Case A: Delete Operation
      if (e.target.closest(".delete-button")) {
          singleJobCard.remove();
          updateCounters();
          return;
      }

      // Case B: Clicked card's internal "Interview" status button
      if (e.target.closest('.status-interview-btn')) {
          singleJobCard.dataset.status = 'interview'; 
          
          applyCurrentFilter(); // Instantly hides it from "All" or drops out mismatch items
          updateCounters();     // Recalculates panels immediately
          return;
      }

      // Case C: Clicked card's internal "Rejected" status button
      if (e.target.closest('.status-rejected-btn')) {
          singleJobCard.dataset.status = 'rejected';
          
          applyCurrentFilter(); // Instantly hides it from "All" or drops out mismatch items
          updateCounters();     // Recalculates panels immediately
          return;
      }
  });
}

// Launch application lifecycle listener tracking
jobsTrackerLifecycle();


// Modal Area

// 1. Target Modal Form DOM Elements
const jobModal = document.getElementById('job-modal');
const openModalBtn = document.getElementById('open-modal-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cancelModalBtn = document.getElementById('cancel-modal-btn');
const addJobForm = document.getElementById('add-job-form');

// =========================================================================
// 2. MODAL TOGGLE SHOW / HIDE FUNCTIONS
// =========================================================================
function toggleModal() {
    if (jobModal) {
        jobModal.classList.toggle('hidden');
        if (!jobModal.classList.contains('hidden')) {
            addJobForm.reset(); // Reset form text inputs if opened fresh
        }
    }
}

if (openModalBtn) openModalBtn.addEventListener('click', toggleModal);
if (closeModalBtn) closeModalBtn.addEventListener('click', toggleModal);
if (cancelModalBtn) cancelModalBtn.addEventListener('click', toggleModal);

// Close overlay modal automatically if clicked anywhere directly on dark backdrop area
window.addEventListener('click', (e) => {
    if (e.target === jobModal) toggleModal();
});

// =========================================================================
// 3. INTERACTIVE TEMPLATE CREATION & DOM INJECTION ON FORM SUBMIT
// =========================================================================
if (addJobForm) {
    addJobForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop standard page refreshing parameters

        // Read specific text values from input fields
        const company = document.getElementById('form-company').value.trim();
        const role = document.getElementById('form-role').value.trim();
        const details = document.getElementById('form-details').value.trim();
        const description = document.getElementById('form-description').value.trim() || 'No description provided for this tracking card.';
        const uniqueId = Date.now(); // Highly unique structural timeline tracking integer code

        // Create the clean string structure template exactly matching your markup design
        const newJobHtml = `
            <div data-id="${uniqueId}" class="single-job bg-white rounded-sm p-6 shadow mb-4">
                <div class="job_title_box flex justify-between items-center h-full">
                    <div>
                        <h2 class="font-roboto text-brand-primary font-bold text-[22px]">${company}</h2>
                        <p class="text-[20px] text-brand-secondary">${role}</p>
                    </div>
                    <div>
                        <button class="delete-button cursor-pointer">
                            <img src="/src/images/delete.svg" alt="delete-button" class="pointer-events-none">
                        </button>
                    </div>
                </div>
                <div class="mt-5">
                    <p class="text-brand-secondary text-lg font-medium">${details}</p>
                </div>
                <button class="bg-[#EEF4FF] px-4 py-3 uppercase font-medium text-brand-primary rounded-lg mt-5">Not Applied</button>
                <p class="text-[#323B49] text-xl mt-2">${description}</p>
                <div class="flex gap-3 mt-5">
                    <button class="status-interview-btn border-2 border-brand-success px-4 py-3 text-brand-success uppercase text-sm font-semibold rounded-lg">interview</button>
                    <button class="status-rejected-btn border-2 border-brand-danger px-4 py-3 text-brand-danger uppercase text-sm font-semibold rounded-lg">Rejected</button>
                </div>
            </div>
        `;

        // Inject the newly generated element structure straight into the top of the job feed container
        if (allJobs) {
            allJobs.insertAdjacentHTML('afterbegin', newJobHtml);
        }

        // Hide overlay model and immediately trigger dashboard stat recount updates!
        toggleModal();
        if (typeof updateCounters === 'function') updateCounters();
    });
}
