/**
 * Accessible Hover & Expandable Menu Controller
 * Supports hover with close delay, click/tap fallback, ARIA sync,
 * Escape/outside-click dismissal, and Arrow-key navigation.
 */
(function () {
  const CLOSE_DELAY_MS = 120;
  const menuRoots = Array.from(document.querySelectorAll('[data-menu-root]'));

  function setExpanded(root, open) {
    const trigger = root.querySelector('[data-menu-trigger]');
    root.classList.toggle('is-open', open);
    if (trigger) {
      trigger.setAttribute('aria-expanded', String(open || root.classList.contains('is-pinned')));
    }
    if (!open) {
      root.querySelectorAll('.ui-flyout__branch.is-sub-open').forEach((branch) => {
        branch.classList.remove('is-sub-open');
        const btn = branch.querySelector('[data-sub-trigger]');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    }
  }

  function closeAllExcept(exceptRoot) {
    menuRoots.forEach((root) => {
      if (root !== exceptRoot && !root.classList.contains('is-pinned')) {
        setExpanded(root, false);
      }
    });
  }

  menuRoots.forEach((root) => {
    const trigger = root.querySelector('[data-menu-trigger]');
    if (!trigger) return;

    let closeTimer = null;

    const cancelClose = () => {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
    };

    const scheduleClose = () => {
      if (root.classList.contains('is-pinned')) return;
      cancelClose();
      closeTimer = setTimeout(() => setExpanded(root, false), CLOSE_DELAY_MS);
    };

    // Hover interaction (mouse/pen)
    root.addEventListener('pointerenter', (e) => {
      if (e.pointerType === 'touch') return;
      cancelClose();
      closeAllExcept(root);
      setExpanded(root, true);
    });

    root.addEventListener('pointerleave', (e) => {
      if (e.pointerType === 'touch') return;
      scheduleClose();
    });

    // Click / tap fallback
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      cancelClose();
      const willOpen = !root.classList.contains('is-open');
      closeAllExcept(root);
      setExpanded(root, willOpen);
    });

    // Keyboard: open with ArrowDown / Enter / Space on trigger
    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setExpanded(root, true);
        const firstItem = root.querySelector('[role="menuitem"]');
        if (firstItem) firstItem.focus();
      } else if (e.key === 'Escape') {
        setExpanded(root, false);
      }
    });

    // Keyboard navigation within [role="menu"]
    root.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (root.classList.contains('is-open')) {
          e.stopPropagation();
          setExpanded(root, false);
          trigger.focus();
        }
        return;
      }

      const active = document.activeElement;
      if (!active || active.getAttribute('role') !== 'menuitem') return;

      const currentMenu = active.closest('[role="menu"]');
      if (!currentMenu) return;

      const items = Array.from(currentMenu.children)
        .map((child) => (child.getAttribute('role') === 'menuitem' ? child : child.querySelector(':scope > [role="menuitem"]')))
        .filter(Boolean);

      const idx = items.indexOf(active);
      if (idx === -1) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        items[(idx + 1) % items.length].focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        items[(idx - 1 + items.length) % items.length].focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        items[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (e.key === 'ArrowRight') {
        const branch = active.closest('.ui-flyout__branch');
        if (branch && active.hasAttribute('data-sub-trigger')) {
          e.preventDefault();
          branch.classList.add('is-sub-open');
          active.setAttribute('aria-expanded', 'true');
          const firstSub = branch.querySelector('.ui-flyout__subpanel [role="menuitem"]');
          if (firstSub) firstSub.focus();
        }
      } else if (e.key === 'ArrowLeft') {
        const subpanel = active.closest('.ui-flyout__subpanel');
        if (subpanel) {
          e.preventDefault();
          const branch = subpanel.closest('.ui-flyout__branch');
          if (branch) {
            branch.classList.remove('is-sub-open');
            const parentTrigger = branch.querySelector('[data-sub-trigger]');
            if (parentTrigger) {
              parentTrigger.setAttribute('aria-expanded', 'false');
              parentTrigger.focus();
            }
          }
        }
      }
    });

    // Focus leaving the entire component
    root.addEventListener('focusout', (e) => {
      if (root.classList.contains('is-pinned')) return;
      if (!root.contains(e.relatedTarget)) {
        setExpanded(root, false);
      }
    });

    // Nested flyout branches
    root.querySelectorAll('.ui-flyout__branch').forEach((branch) => {
      const subTrigger = branch.querySelector('[data-sub-trigger]');
      let subTimer = null;

      branch.addEventListener('pointerenter', (e) => {
        if (e.pointerType === 'touch') return;
        if (subTimer) clearTimeout(subTimer);
        branch.classList.add('is-sub-open');
        if (subTrigger) subTrigger.setAttribute('aria-expanded', 'true');
      });

      branch.addEventListener('pointerleave', (e) => {
        if (e.pointerType === 'touch') return;
        subTimer = setTimeout(() => {
          branch.classList.remove('is-sub-open');
          if (subTrigger) subTrigger.setAttribute('aria-expanded', 'false');
        }, CLOSE_DELAY_MS);
      });

      if (subTrigger) {
        subTrigger.addEventListener('click', (e) => {
          e.preventDefault();
          const open = branch.classList.toggle('is-sub-open');
          subTrigger.setAttribute('aria-expanded', String(open));
        });
      }
    });
  });

  // Dismiss on outside click
  document.addEventListener('click', (e) => {
    menuRoots.forEach((root) => {
      if (!root.contains(e.target) && !root.classList.contains('is-pinned')) {
        setExpanded(root, false);
      }
    });
  });
})();
