function downloadTableAsCSV() {
  const table = document.getElementById("grading-table");
  let csv = [];
  for (let row of table.rows) {
    let cols = [];
    for (let cell of row.cells) {
      cols.push(cell.innerText);
    }
    csv.push(cols.join(","));
  }
  const csvFile = new Blob([csv.join("\n")], { type: "text/csv" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(csvFile);
  link.download = "UIU-Grading-System-(uiucalculator.kawsar.dev).csv";
  link.click();
}
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("commentButton").addEventListener("click", function () {
    document.getElementById("commentSection").scrollIntoView({ behavior: "smooth" });
  });
});
const toggle = document.querySelector('#commentSection .accordion-toggle');
const content = document.getElementById('commentContent');
toggle.addEventListener('click', () => {
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  content.hidden = isOpen;
});
document.addEventListener('DOMContentLoaded', () => {
  const result = document.getElementById('cgpaResult');
  const placeholder = document.getElementById('rightPlaceholder');
  const resetBtn = document.getElementById('resetCGPABtn');
  const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;
  const hasResult = () => result && result.textContent.trim().length > 0;
  function syncPlaceholder() {
    if (!placeholder) return;
    if (!isDesktop()) {
      placeholder.hidden = true;
      return;
    }
    placeholder.hidden = hasResult();
  }
  syncPlaceholder();
  if (result) {
    const obs = new MutationObserver(syncPlaceholder);
    obs.observe(result, { childList: true, subtree: true, characterData: true });
  }
  resetBtn?.addEventListener('click', () => {
    if (result) result.textContent = '';
    syncPlaceholder();
  });
  window.addEventListener('resize', syncPlaceholder);
});
document.addEventListener('DOMContentLoaded', () => {
  const tuitionResult = document.getElementById('tuitionResult');
  const displayResult = document.getElementById('cgpaResult');
  const placeholder = document.getElementById('rightPlaceholder');
  const resetBtn = document.getElementById('resetFeeBtn');
  const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;
  function sync() {
    const hasContent = tuitionResult && tuitionResult.innerHTML.trim().length > 0;
    if (displayResult && tuitionResult) {
      displayResult.innerHTML = tuitionResult.innerHTML;
    } else if (displayResult && !tuitionResult) {
      displayResult.innerHTML = '';
    }
    if (placeholder) {
      placeholder.hidden = hasContent || !isDesktop();
    }
  }
  sync();
  if (tuitionResult) {
    const obs = new MutationObserver(sync);
    obs.observe(tuitionResult, { childList: true, subtree: true, characterData: true });
  }
  resetBtn?.addEventListener('click', () => {
    if (tuitionResult) tuitionResult.innerHTML = '';
    if (displayResult) displayResult.innerHTML = '';
    sync();
  });
  window.addEventListener('resize', sync);
});
(function () {
  function initCustomSelect(root) {
    if (!root || root.__csInited) return;
    root.__csInited = true;
    const trigger = root.querySelector('.cs-trigger');
    const native = root.querySelector('select.cs-native');
    if (!trigger || !native) return;
    const labelSpan = trigger.querySelector('.cs-label');
    const menu = document.createElement('ul');
    menu.className = 'cs-menu';
    const menuId = (native.id || 'cs') + '-menu';
    menu.id = menuId;
    menu.role = 'listbox';
    menu.hidden = true;
    document.body.appendChild(menu);
    trigger.setAttribute('aria-controls', menuId);
    function syncLabel() {
      const current =
        native.selectedOptions[0] ||
        native.options[native.selectedIndex] ||
        native.options[0];
      labelSpan && (labelSpan.textContent = current ? current.textContent : 'Select...');
    }
    function buildOptionsFromNative() {
      const currentValue = native.value;
      menu.innerHTML = '';
      Array.from(native.options).forEach(opt => {
        const li = document.createElement('li');
        li.className = 'cs-option';
        li.role = 'option';
        li.textContent = opt.textContent;
        li.dataset.value = opt.value;
        li.tabIndex = -1;
        if (opt.disabled) {
          li.setAttribute('aria-disabled', 'true');
          li.style.opacity = 0.5;
          li.style.pointerEvents = 'none';
        }
        if (opt.selected || (currentValue !== '' && opt.value === currentValue)) {
          li.setAttribute('aria-selected', 'true');
        }
        menu.appendChild(li);
      });
      syncLabel();
    }
    buildOptionsFromNative();
    let open = false;
    function placeMenu() {
      const rect = trigger.getBoundingClientRect();
      menu.style.width = rect.width + 'px';
      menu.hidden = false;
      menu.style.visibility = 'hidden';
      menu.dataset.open = 'true';
      const viewportH = window.innerHeight;
      const spaceBelow = viewportH - rect.bottom;
      const spaceAbove = rect.top;
      const desired = Math.min(menu.scrollHeight, 280);
      const openUp = spaceBelow < desired && spaceAbove > spaceBelow;
      const maxH = Math.max(120, Math.min(desired, (openUp ? spaceAbove : spaceBelow) - 8));
      menu.style.maxHeight = maxH + 'px';
      const top = openUp ? (rect.top - menu.offsetHeight) : rect.bottom;
      const padding = 8;
      let left = Math.max(padding, Math.min(rect.left, window.innerWidth - rect.width - padding));
      menu.style.left = left + 'px';
      menu.style.top = top + 'px';
      menu.dataset.direction = openUp ? 'up' : 'down';
      menu.style.visibility = 'visible';
      const selected = menu.querySelector('.cs-option[aria-selected="true"]');
      if (selected) selected.scrollIntoView({ block: 'nearest' });
    }
    function focusSelectedOption() {
      const options = Array.from(menu.children);
      const selIndex = Math.max(0, options.findIndex(li => li.getAttribute('aria-selected') === 'true'));
      options.forEach((li, i) => li.tabIndex = i === selIndex ? 0 : -1);
      if (options[selIndex]) {
        options[selIndex].focus({ preventScroll: true });
        options[selIndex].scrollIntoView({ block: 'nearest' });
      }
    }
    function openMenu() {
      if (open || native.disabled) return;
      open = true;
      trigger.setAttribute('aria-expanded', 'true');
      trigger.dataset.open = 'true';
      placeMenu();
      document.addEventListener('pointerdown', handleOutside, { capture: true });
      window.addEventListener('scroll', reposition, true);
      window.addEventListener('resize', reposition);
      focusSelectedOption();
    }
    function closeMenu() {
      if (!open) return;
      open = false;
      trigger.setAttribute('aria-expanded', 'false');
      trigger.dataset.open = 'false';
      menu.dataset.open = 'false';
      menu.hidden = true;
      document.removeEventListener('pointerdown', handleOutside, { capture: true });
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
      trigger.focus({ preventScroll: true });
    }
    function reposition() {
      if (open) placeMenu();
    }
    function handleOutside(e) {
      if (trigger.contains(e.target) || menu.contains(e.target)) return;
      closeMenu();
    }
    function selectLi(li) {
      menu.querySelectorAll('.cs-option[aria-selected="true"]').forEach(el => el.removeAttribute('aria-selected'));
      li.setAttribute('aria-selected', 'true');
      native.value = li.dataset.value;
      native.dispatchEvent(new Event('change', { bubbles: true }));
      syncLabel();
      closeMenu();
    }
    trigger.addEventListener('click', () => (open ? closeMenu() : openMenu()));
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openMenu();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        openMenu();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
      }
    });
    menu.addEventListener('keydown', (e) => {
      const options = Array.from(menu.children);
      let idx = options.findIndex(el => el.tabIndex === 0);
      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        idx = Math.min(options.length - 1, Math.max(0, idx + 1));
        options.forEach((li, i) => li.tabIndex = i === idx ? 0 : -1);
        options[idx].focus({ preventScroll: true });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        idx = Math.max(0, idx - 1);
        options.forEach((li, i) => li.tabIndex = i === idx ? 0 : -1);
        options[idx].focus({ preventScroll: true });
      } else if (e.key === 'Home') {
        e.preventDefault();
        options.forEach((li, i) => li.tabIndex = i === 0 ? 0 : -1);
        options[0].focus({ preventScroll: true });
      } else if (e.key === 'End') {
        e.preventDefault();
        options.forEach((li, i) => li.tabIndex = i === options.length - 1 ? 0 : -1);
        options[options.length - 1].focus({ preventScroll: true });
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (idx >= 0) selectLi(options[idx]);
      }
    });
    menu.addEventListener('click', (e) => {
      const li = e.target.closest('.cs-option');
      if (li) selectLi(li);
    });
    native.addEventListener('change', () => {
      const val = native.value;
      menu.querySelectorAll('.cs-option').forEach(li => {
        if (li.dataset.value === val) li.setAttribute('aria-selected', 'true');
        else li.removeAttribute('aria-selected');
      });
      syncLabel();
    });
    const observer = new MutationObserver(mutations => {
      const needsRebuild = mutations.some(m => m.type === 'childList');
      const disabledChanged = mutations.some(m => m.type === 'attributes' && m.attributeName === 'disabled');
      if (needsRebuild) buildOptionsFromNative();
      if (disabledChanged) {
        if (native.disabled) {
          trigger.setAttribute('aria-disabled', 'true');
          trigger.disabled = true;
        } else {
          trigger.removeAttribute('aria-disabled');
          trigger.disabled = false;
        }
      }
    });
    observer.observe(native, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled']
    });
    if (native.disabled) {
      trigger.setAttribute('aria-disabled', 'true');
      trigger.disabled = true;
    }
    window.addEventListener('beforeunload', () => {
      observer.disconnect();
      menu.remove();
    });
  }
  window.initCustomSelects = function (scope = document) {
    scope.querySelectorAll('[data-custom-select]').forEach(initCustomSelect);
  };
  function boot() {
    window.initCustomSelects(document);
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 0));
  } else {
    setTimeout(boot, 0);
  }
})();
