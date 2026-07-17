# Myrianthousis Architects Website

A responsive portfolio website for Myrianthousis Architects, built with HTML, CSS, and vanilla JavaScript.

## Pages and tabs

### Home

Displays a full-width carousel of featured projects. Images slowly pan from right to left and transition to the next image every six seconds. The carousel adapts its height for mobile screens.

### Projects

Displays projects in a responsive grid with filters for:

- All projects
- Residential
- Commercial
- Interior

Selecting an image opens its project-detail view with a sticky title and Back button, a larger project image, and text loaded from the matching file in the `text` directory.

### Info

Contains information about the architecture practice and employment.

## File structure

```text
myrianthousis-website/
├── index.html                  Main website markup and tab content
├── css/
│   ├── general.css             Global typography and element styles
│   └── home-screen.css         Layout, responsive rules, galleries, and carousel styles
├── js/
│   ├── tabs.js                 Switches between Home, Projects, and Info
│   ├── projectTabs.js          Switches between project categories
│   ├── projectDetails.js       Opens project details and loads matching text files
│   └── homeCarousel.js         Controls the featured-image carousel
├── images/
│   ├── logo/                   Black and white logo files
│   ├── commercial/             Commercial project images
│   ├── residential/            Residential project images
│   └── interior/               Interior project images
├── text/                       Project titles and descriptions
│   ├── sample_building_002.txt
│   ├── sample_building_001.txt
│   ├── renders_maquette_001.txt
│   ├── renders_maquette_002.txt
│   ├── renders_maquette_003.txt
│   ├── interior_001.txt
│   ├── interior_002.txt
│   └── interior_003.txt
└── README.md                   Project documentation
```

## Adding or editing project text

Each project text file must have the same base filename as its image:

```text
images/interior/interior_001.jpg
text/interior_001.txt
```

The first block in the text file is used as the project title. Each subsequent block, separated by a blank line, is displayed as a paragraph:

```text
Project Title

First project paragraph.

Second project paragraph.
```

Because project text is loaded with `fetch()`, the website should be viewed through a local or remote web server rather than opening `index.html` directly with a `file://` URL.
