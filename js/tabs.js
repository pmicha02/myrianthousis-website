// Find all elements that act as tabs in the tab list.
const tabs = document.querySelectorAll('[role="tab"]');

// Find all tab panel containers that correspond to tabs.
const panels = document.querySelectorAll('[role="tabpanel"]');

// Switch the visible panel and update ARIA state for keyboard/screen reader users.
function switchTab(selectedTab) {
    // Leaving or reselecting a main tab must close any open project detail view.
    window.resetProjectDetail?.();

    // Only the home screen is locked to one viewport. Content-heavy tabs scroll normally.
    document.body.classList.toggle('home-active', selectedTab.id === 'home-button');

    tabs.forEach(tab => {
        const panel = document.getElementById(tab.getAttribute('aria-controls'));
        const isSelected = tab === selectedTab;

        // Mark the selected tab for screen readers.
        tab.setAttribute('aria-selected', isSelected ? 'true' : 'false');

        // Only the active tab should be focusable in the tab sequence (select it when pressing tab).
        tab.tabIndex = isSelected ? 0 : -1;

        // Show the panel controlled by the selected tab and hide others.
        panel.hidden = !isSelected;
    });
}

// Start with the tab that is already marked as selected, or default to the first tab.
switchTab(document.querySelector('[role="tab"][aria-selected="true"]') || tabs[0]);

// Attach click handlers to each tab so the UI updates when a user activates one.
tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab));
});
