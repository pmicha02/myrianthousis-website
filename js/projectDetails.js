const projectGalleryImages = document.querySelectorAll('[role="project-tabpanel"] img');
const projectTabNavigation = document.getElementById('project-tab');
const projectDetail = document.getElementById('project-detail');
const projectDetailBack = document.getElementById('project-detail-back');
const projectDetailTitle = document.getElementById('project-detail-title');
const projectDetailImage = document.getElementById('project-detail-image');
const projectDetailCopy = document.getElementById('project-detail-copy');

let projectGalleryScrollPosition = 0;
let activeProjectImage = null;

function getProjectFileName(image) {
    return image.src.split('/').pop();
}

async function showProjectText(image) {
    const textFileName = getProjectFileName(image).replace(/\.[^.]+$/, '.txt');

    try {
        const response = await fetch(`./text/${textFileName}`);
        if (!response.ok) throw new Error(`Could not load ${textFileName}`);

        const textBlocks = (await response.text()).trim().split(/\r?\n\s*\r?\n/);
        const [title, ...paragraphs] = textBlocks;
        projectDetailTitle.textContent = title || image.alt || 'Project';

        const paragraphElements = paragraphs.map(text => {
            const paragraph = document.createElement('p');
            paragraph.textContent = text;
            return paragraph;
        });

        projectDetailCopy.replaceChildren(...paragraphElements);
    } catch (error) {
        projectDetailTitle.textContent = image.alt || 'Project';
        const paragraph = document.createElement('p');
        paragraph.textContent = 'Project information could not be loaded.';
        projectDetailCopy.replaceChildren(paragraph);
        console.error(error);
    }
}

function openProjectDetail(image) {
    projectGalleryScrollPosition = window.scrollY;
    activeProjectImage = image;

    document.querySelectorAll('[role="project-tabpanel"]').forEach(panel => {
        panel.hidden = true;
    });
    projectTabNavigation.hidden = true;

    projectDetailTitle.textContent = image.alt || 'Project';
    projectDetailImage.src = image.src;
    projectDetailImage.alt = image.alt;
    projectDetailCopy.textContent = '';
    showProjectText(image);
    projectDetail.hidden = false;

    window.scrollTo({ top: document.getElementById('panel-projects').offsetTop });
    projectDetailBack.focus();
}

function resetProjectDetail() {
    if (projectDetail.hidden) return;

    projectDetail.hidden = true;
    projectTabNavigation.hidden = false;

    const selectedProjectTab = document.querySelector('[role="project-tab"][aria-selected="true"]');
    const selectedPanel = document.getElementById(selectedProjectTab.getAttribute('aria-controls'));
    selectedPanel.hidden = false;
}

// Allow both tab controllers to close the detail view as part of switching tabs.
window.resetProjectDetail = resetProjectDetail;

function closeProjectDetail() {
    resetProjectDetail();

    window.scrollTo({ top: projectGalleryScrollPosition });
    activeProjectImage.focus();
}

projectGalleryImages.forEach(image => {
    image.tabIndex = 0;
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `View ${image.alt || 'project'}`);

    image.addEventListener('click', () => openProjectDetail(image));
    image.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            openProjectDetail(image);
        }
    });
});

projectDetailBack.addEventListener('click', closeProjectDetail);
