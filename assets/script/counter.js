const hostname = window.location.hostname;
const counterHtml = `
    <a href="https://hits.sh/uiucalculator.kawsar.dev/">
        <img alt="Hits" src="https://hits.sh/uiucalculator.kawsar.dev.svg?style=flat-square&label=Total%20Views&color=009500" />
    </a>
`;

if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
    const counterContainer = document.getElementById('view-counter');
    if (counterContainer) {
        counterContainer.innerHTML = counterHtml;
    }
} else {
    console.log("View counter disabled on localhost");
}