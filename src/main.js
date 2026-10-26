// 1. DOM Element Selectors 
const allJobs = document.getElementById('all-jobs');
const statusFilterContainer = document.querySelector('.status-filter');
const topTotalCounter = document.getElementById('top-total');
const middleTotalCounter = document.getElementById('available-jobs');

// Smart selectors for the top stat cards (Interview and Rejected)
const counterContainer = document.querySelector('.job_counter_container');
const topInterviewCounter = counterContainer ? counterContainer.children[1].querySelector('h3') : null;
const topRejectedCounter = counterContainer ? counterContainer.children[2].querySelector('h3') : null;

// =========================================================================
// 2. DYNAMIC COUNTER MANAGEMENT FUNCTION
// =========================================================================
function updateCounters() {
    // Determine which tab filter is active based on the Tailwind highlight background class
    const activeTab = document.querySelector('.status-filter .bg-blue-600');
    const currentTabStatus = activeTab ? activeTab.dataset.status : 'all';

    const allJobCards = document.querySelectorAll(".single-job");
    
    // Global tracking states across the whole app
    let totalUnassigned = 0;
    let totalInterview = 0;
    let totalRejected = 0;
    let currentTabMatchCount = 0;

    allJobCards.forEach(card => {
        const jobStatus = card.dataset.status; // 'interview', 'rejected', or undefined

        // Calculate absolute overall numbers for the top stat panels
        if (jobStatus === 'interview') {
            totalInterview++;
        } else if (jobStatus === 'rejected') {
            totalRejected++;
        } else {
            totalUnassigned++;
        }

        // Calculate the specific sub-count for whichever tab view is active
        if (currentTabStatus === 'all') {
            if (!jobStatus || jobStatus === 'all') {
                currentTabMatchCount++;
            }
        } else if (jobStatus === currentTabStatus) {
            currentTabMatchCount++;
        }
    });

    // Update the Upper Panel Counters (Stays constant relative to data sets)
    if (topTotalCounter) topTotalCounter.innerText = totalUnassigned;
    if (topInterviewCounter) topInterviewCounter.innerText = totalInterview;
    if (topRejectedCounter) topRejectedCounter.innerText = totalRejected;

    // Update the Middle Subtitle Context Counter ("X Jobs Available" changes per tab)
    if (middleTotalCounter) middleTotalCounter.innerText = currentTabMatchCount;
}

// =========================================================================
// 3. VISUAL DISPLAY FILTERS
// =========================================================================
function applyCurrentFilter(forcedStatus) {
    const activeTab = statusFilterContainer.querySelector('.bg-blue-600');
    const filterValue = forcedStatus || (activeTab ? activeTab.dataset.status : 'all');
    
    const allJobCards = document.querySelectorAll('.single-job');

    allJobCards.forEach(card => {
        const jobStatus = card.dataset.status;

        if (filterValue === 'all') {
            // Unassigned jobs display inside 'All'
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

    // Toggle active tab visual layout structures
    const allTabs = statusFilterContainer.querySelectorAll('.status-btn');
    allTabs.forEach(tab => {
        tab.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
        tab.classList.add('bg-white', 'text-brand-secondary', 'border-gray-200');
    });
    
    // Highlight selected item
    clickedTab.classList.remove('bg-white', 'text-brand-secondary', 'border-gray-200');
    clickedTab.classList.add('bg-blue-600', 'text-white', 'border-blue-600');

    // Run view filter updates and match context numbers
    applyCurrentFilter(clickedTab.dataset.status);
    updateCounters();
});

// =========================================================================
// 5. JOBS INTERACTION LIFECYCLE (Delete / Move Statuses)
// =========================================================================
function jobsTrackerLifecycle() {
  // Execute calculations immediately when the application bootstraps
  updateCounters();

  allJobs.addEventListener("click", function(e){
      const singleJobCard = e.target.closest(".single-job");
      if (!singleJobCard) return;
      
      // Target elements securely using .closest to defend against inner text click variations
      
      // A. Delete Operation
      if (e.target.closest(".delete-button")) {
          singleJobCard.remove();
          updateCounters();
          return;
      }

      // B. Shift Node state to Interview Array
      if (e.target.closest('.status-interview-btn')) {
          singleJobCard.dataset.status = 'interview'; 
          applyCurrentFilter(); 
          updateCounters(); 
          return;
      }

      // C. Shift Node state to Rejected Array
      if (e.target.closest('.status-rejected-btn')) {
          singleJobCard.dataset.status = 'rejected';
          applyCurrentFilter(); 
          updateCounters(); 
          return;
      }
  });
}

// Initialize Application Loop
jobsTrackerLifecycle();
