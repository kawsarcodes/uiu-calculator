document.addEventListener('DOMContentLoaded', function () {
    const sidebars = [document.getElementById('sidebar'), document.querySelector('.sidebar-t')];
    const toggle = document.getElementById('sidebar-toggle');
    const mainContent = document.querySelector('.flex1');
    const accordionHeaders = document.querySelectorAll('.sidebar-accordion-header, .sidebar-t-accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');
            document.querySelectorAll('.sidebar-accordion-item, .sidebar-t-accordion-item').forEach(item => {
                item.classList.remove('active');
            });
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
    toggle.addEventListener('click', function () {
        sidebars.forEach(sb => sb.classList.toggle('collapsed'));
        mainContent.classList.toggle('shifted');
        const toggleIcon = toggle.querySelector('.toggle-icon');
        if (toggleIcon) {
            toggleIcon.classList.toggle('rotated');
        }
    });
});