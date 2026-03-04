document.addEventListener('DOMContentLoaded', function () {
  const sidebars = [
    document.getElementById('sidebar'),
    document.querySelector('.sidebar-t')
  ].filter(Boolean);

  const toggle = document.getElementById('sidebar-toggle');
  const mainContent = document.querySelector('.flex1');
  const toggleIcon = toggle?.querySelector('.toggle-icon');
  const STORAGE_KEY = 'sidebarCollapsed';
  function setCollapsed(collapsed) {
    sidebars.forEach(sb => sb.classList.toggle('collapsed', collapsed));
    mainContent?.classList.toggle('shifted', collapsed);
    toggleIcon?.classList.toggle('rotated', collapsed);
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  const collapsed = saved === 'true';
  setCollapsed(collapsed);
  const accordionHeaders = document.querySelectorAll(
    '.sidebar-accordion-header, .sidebar-t-accordion-header'
  );
  
  accordionHeaders.forEach(header => {
    header.addEventListener('click', function () {
      const accordionItem = this.parentElement;
      const isActive = accordionItem.classList.contains('active');
      document.querySelectorAll('.sidebar-accordion-item, .sidebar-t-accordion-item')
        .forEach(item => item.classList.remove('active'));
      if (!isActive) accordionItem.classList.add('active');
    });
  });

  toggle?.addEventListener('click', function () {
    const nowCollapsed = !sidebars[0]?.classList.contains('collapsed');
    setCollapsed(nowCollapsed);
    localStorage.setItem(STORAGE_KEY, String(nowCollapsed));
  });
});