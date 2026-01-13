// console.log("i'm linked!");

// creating async / await function to fetch json
async function loadJSON() {
    const foobar = await fetch("/assets/data/content.json");
    return await foobar.json();
}

// create function to load sidebar data
async function loadSidebar(data) {

    // defining sidebar variables
    const sidebar = document.getElementById("sidebar");
    const brand = data.sidebar.brand;

    // creating logo and sidebar header section
    sidebar.innerHTML = `
        <section class="row">
            <img class="img-fluid col-2" src="${brand.logo}" alt="Logo" />
            <p class="col fw-semibold fs-5">${brand.title}</p>
        </section>
        <ul id="sidebar-main"></ul>
        <ul id="sidebar-bottom"></ul>
    `;

    // defining top and bottom sections in sidebar area
    const mainList = document.getElementById("sidebar-main");
    const bottomList = document.getElementById("sidebar-bottom");

    // create forEach loop to populate each sidebar link in top section using innerHTML
    data.sidebar.main.forEach(item => {
        mainList.innerHTML += `
            <li class="row p-2">
                <a class="icon-link text-decoration-none text-reset" href="${item.link}">
                    <img src="${item.icon}" height="16" width="16"> ${item.pagename}
                </a>
            </li>`;
    });

    // create forEach loop to populate each sidebar link in bottom section using innerHTML
    data.sidebar.bottom.forEach(item => {
        bottomList.innerHTML += `
            <li class="row p-2">
                <a class="icon-link text-decoration-none text-reset" href="${item.link}">
                    <img src="${item.icon}" height="16" width="16"> ${item.pagename}
                </a>
            </li>`;
    });
}

// creating function to load top header content (title, user info)
function loadHeader(data) {
    document.getElementById("header-title").textContent = data.header.title;
    document.getElementById("header-user").innerHTML = `
        <p class="col fs-6"><small>${data.header.user.name}</small></p>
        <img class="img col-4" src="${data.header.user.photo}" alt="User">
    `;
}

// creating function to load overview statistics (section 1)
function loadOverviewCounters(data) {
    const container = document.getElementById("overview-counters");

    // using forEach loop to fill innerHTML for unresolved, overdue, open, and on hold ticket stats
    data.overviewCounters.forEach(item => {
        container.innerHTML += `
            <section class="container-fluid m-2 col-sm text-center bg-body border border-2 border-light-subtle rounded tickets">
                <p class="text-black-50">${item.label}</p>
                <h2>${item.value}</h2>
            </section>`;
    });
}

// creating function to load today's trend graph (section 2)
function loadTrends(data) {
    // load date and graph image into html structure using textContent and src
    document.getElementById("trend-date").textContent = data.trends.date;
    document.getElementById("trend-img").src = data.trends.image;
}

// creating function to create container for trend graph statistics section
function loadStatistics(data) {
    // locate load point for trend statistics in html
    const container = document.getElementById("stats");
    // use forEach loop to load statistics into each row
    data.statistics.forEach(item => {
        container.innerHTML += `
            <section class="row p-3 border-bottom border-light-subtle">
                <h6 class="fw-semibold">${item.label}</h6>
                <p>${item.value}</p>
            </section>`;
    });
}

// create functions to populate info card sections (section 3)
// loading unresolved ticket stats
function loadTickets(data) {
    // locate load point for info card stats in html
    const container = document.getElementById("tickets-list");
    // using forEach loop to populate each row with label and number
    data.tickets.forEach(item => {
        container.innerHTML += `
            <section class="row row-cols-auto justify-content-between p-2 border-bottom border-dark-subtle">
                <p class="col-9 text-light-emphasis">${item.label}</p>
                <p class="col text-light-emphasis">${item.value}</p>
            </section>`;
    });
}

// loading tasks info card
function loadTasks(data) {
    // locate load point for info card stats in html
    const container = document.getElementById("tasks-list");
    // using forEach loop to populate each row with label and number
    data.tasks.forEach(item => {
        container.innerHTML += `
            <section class="row row-cols-auto justify-content-between p-2 border-bottom border-dark-subtle">
                <p class="col-9 text-light-emphasis">${item.label}</p>
                <p class="col text-light-emphasis ${item.class} rounded">${item.status}</p>
            </section>`;
    });
}

// consolidate functions
async function getData() {
    const data = await loadJSON();
    await loadSidebar(data);
    loadHeader(data);
    loadOverviewCounters(data);
    loadTrends(data);
    loadStatistics(data);
    loadTickets(data);
    loadTasks(data);
} 

// call function
getData();
