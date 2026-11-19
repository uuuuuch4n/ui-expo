/**
 * Showcase UI Utilities
 * - Light/Dark theme toggle
 * - Pin-open inspector per pattern
 * - HTML / CSS / JS code snippets & clipboard copy
 * - Action toast feedback
 */
(function () {
  const SNIPPETS = {
    dropdown: {
      html: `<div class="ui-dropdown ui-menu-root" data-menu-root>
  <button type="button" class="ui-btn" data-menu-trigger aria-haspopup="menu" aria-expanded="false">
    アカウント
    <svg class="ui-caret" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
    </svg>
  </button>
  <div class="ui-dropdown__panel">
    <div class="ui-dropdown__surface" role="menu">
      <button type="button" class="ui-item" role="menuitem">プロフィール編集</button>
      <button type="button" class="ui-item" role="menuitem">通知設定</button>
      <button type="button" class="ui-item" role="menuitem">プランと請求</button>
      <hr class="ui-divider" />
      <button type="button" class="ui-item ui-item--danger" role="menuitem">ログアウト</button>
    </div>
  </div>
</div>`,
      css: `.ui-dropdown { position: relative; display: inline-block; }

.ui-dropdown__panel {
  position: absolute;
  top: 100%;
  left: 0;
  padding-top: 8px; /* カーソル移動時の隙間を埋めるホバーブリッジ */
  min-width: 220px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px);
  transition: opacity 150ms ease, transform 160ms ease, visibility 150ms ease;
}

.ui-dropdown.is-open > .ui-dropdown__panel {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}`,
      js: `// scripts/patterns.js を読み込むだけで動作します
// - pointerenter / pointerleave でホバー開閉（120msの遅延付き）
// - クリック / タップでのトグル開閉
// - ArrowDown / ArrowUp / Home / End / Escape キー操作`
    },

    mega: {
      html: `<nav class="ui-mega-bar" aria-label="ショップナビゲーション">
  <span class="ui-mega-bar__brand">ATELIER</span>
  <div class="ui-mega ui-menu-root" data-menu-root>
    <button type="button" class="ui-btn ui-btn--sm" data-menu-trigger aria-haspopup="true" aria-expanded="false">
      カテゴリ一覧
    </button>
    <div class="ui-mega__panel">
      <div class="ui-mega__surface">
        <div>
          <h3 class="ui-mega__heading">デスク・PC</h3>
          <ul class="ui-mega__list">
            <li><a href="#mega">モニター</a></li>
            <li><a href="#mega">キーボード</a></li>
            <li><a href="#mega">デスクライト</a></li>
          </ul>
        </div>
        <div>
          <h3 class="ui-mega__heading">生活雑貨</h3>
          <ul class="ui-mega__list">
            <li><a href="#mega">キッチン用品</a></li>
            <li><a href="#mega">収納グッズ</a></li>
            <li><a href="#mega">ファブリック</a></li>
          </ul>
        </div>
        <div class="ui-mega__feature">
          <div>
            <p class="ui-mega__feature-title">季節の特集</p>
            <p class="ui-mega__feature-copy">対象アイテムが最大30%OFF</p>
          </div>
          <button type="button" class="ui-btn ui-btn--sm">特集を見る</button>
        </div>
      </div>
    </div>
  </div>
</nav>`,
      css: `.ui-mega-bar { position: relative; }
.ui-mega { position: static; }

.ui-mega__panel {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding-top: 10px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(6px);
  transition: opacity 160ms ease, transform 180ms ease, visibility 160ms ease;
}

.ui-mega.is-open > .ui-mega__panel {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.ui-mega__surface {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  padding: 20px;
}`,
      js: `// data-menu-root と data-menu-trigger を付けるだけで
// ホバー開閉・クリックトグル・Escape / 外側クリック終了に対応します。`
    },

    flyout: {
      html: `<div class="ui-flyout ui-menu-root" data-menu-root>
  <button type="button" class="ui-btn" data-menu-trigger aria-haspopup="menu" aria-expanded="false">
    ファイル操作
  </button>
  <div class="ui-flyout__panel">
    <div class="ui-flyout__surface" role="menu">
      <button type="button" class="ui-item" role="menuitem">新規作成</button>
      <div class="ui-flyout__branch">
        <button type="button" class="ui-item" role="menuitem" data-sub-trigger aria-haspopup="menu" aria-expanded="false">
          <span>書き出し</span>
          <span class="ui-flyout__chevron" aria-hidden="true">▸</span>
        </button>
        <div class="ui-flyout__subpanel">
          <div class="ui-flyout__surface" role="menu">
            <button type="button" class="ui-item" role="menuitem">PDF 形式</button>
            <button type="button" class="ui-item" role="menuitem">CSV 形式</button>
            <button type="button" class="ui-item" role="menuitem">PNG 画像</button>
          </div>
        </div>
      </div>
      <button type="button" class="ui-item" role="menuitem">リンクをコピー</button>
    </div>
  </div>
</div>`,
      css: `.ui-flyout__branch { position: relative; }

.ui-flyout__subpanel {
  position: absolute;
  top: -6px;
  left: 100%;
  padding-left: 8px; /* 横方向のホバーブリッジ */
  min-width: 190px;
  opacity: 0;
  visibility: hidden;
  transform: translateX(-6px);
  transition: opacity 140ms ease, transform 160ms ease, visibility 140ms ease;
}

.ui-flyout__branch.is-sub-open > .ui-flyout__subpanel {
  opacity: 1;
  visibility: visible;
  transform: translateX(0);
}`,
      js: `// .ui-flyout__branch に pointerenter / pointerleave を紐付け、
// キーボード操作では ArrowRight でサブメニュー展開、ArrowLeft で親階層へ戻ります。`
    },

    popover: {
      html: `<div class="ui-popover ui-menu-root" data-menu-root>
  <button type="button" class="ui-btn" data-menu-trigger aria-haspopup="dialog" aria-expanded="false">
    プラン詳細を見る
  </button>
  <div class="ui-popover__panel" role="dialog" aria-label="Proプラン詳細">
    <div class="ui-popover__surface">
      <div class="ui-popover__head">
        <h3 class="ui-popover__title">Pro プラン</h3>
        <span class="ui-popover__price">¥980 / 月</span>
      </div>
      <p class="ui-popover__body">
        チーム共有・履歴無制限・優先サポートがすべて含まれます。
      </p>
      <div class="ui-popover__actions">
        <button type="button" class="ui-btn ui-btn--sm">無料で試す</button>
        <button type="button" class="ui-btn ui-btn--ghost ui-btn--sm">比較表</button>
      </div>
    </div>
  </div>
</div>`,
      css: `.ui-popover { position: relative; display: inline-block; }

.ui-popover__panel {
  position: absolute;
  top: 100%;
  left: 50%;
  padding-top: 10px;
  width: 290px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, 6px);
  transition: opacity 160ms ease, transform 180ms ease, visibility 160ms ease;
}

.ui-popover.is-open > .ui-popover__panel {
  opacity: 1;
  visibility: visible;
  transform: translate(-50%, 0);
}`,
      js: `// リスト以外の自由なコンテンツ（説明文・価格・CTAボタンなど）を浮かせて表示。
// Escapeキー・外側クリック・フォーカス移動で自動的に閉じます。`
    },

    speeddial: {
      html: `<div class="ui-speeddial ui-menu-root" data-menu-root>
  <div class="ui-speeddial__actions" role="menu" aria-label="クイックアクション">
    <button type="button" class="ui-speeddial__item" role="menuitem">
      <span class="ui-speeddial__label">メモを作成</span>
      <span class="ui-speeddial__mini" aria-hidden="true">✎</span>
    </button>
    <button type="button" class="ui-speeddial__item" role="menuitem">
      <span class="ui-speeddial__label">画像を添付</span>
      <span class="ui-speeddial__mini" aria-hidden="true">🖼</span>
    </button>
    <button type="button" class="ui-speeddial__item" role="menuitem">
      <span class="ui-speeddial__label">リンクを共有</span>
      <span class="ui-speeddial__mini" aria-hidden="true">↗</span>
    </button>
  </div>
  <button type="button" class="ui-speeddial__fab" data-menu-trigger aria-haspopup="menu" aria-expanded="false" aria-label="アクションを展開">
    <span class="ui-speeddial__plus" aria-hidden="true">+</span>
  </button>
</div>`,
      css: `.ui-speeddial { position: relative; display: inline-flex; flex-direction: column; align-items: flex-end; }

.ui-speeddial__actions {
  position: absolute;
  bottom: 100%;
  right: 0;
  padding-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  pointer-events: none;
}

.ui-speeddial.is-open .ui-speeddial__actions { pointer-events: auto; }
.ui-speeddial.is-open .ui-speeddial__item { opacity: 1; transform: translateY(0) scale(1); }
.ui-speeddial.is-open .ui-speeddial__plus { transform: rotate(45deg); }`,
      js: `// 展開時にFABの「+」が45度回転して「×」になり、
// 各アクションボタンが30msずつ時間差（stagger）で出現します。`
    }
  };

  // Theme toggle
  const themeBtn = document.getElementById('themeToggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let currentTheme = localStorage.getItem('ui-showcase-theme') || (prefersDark ? 'dark' : 'light');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeBtn) {
      themeBtn.textContent = theme === 'dark' ? 'ライト表示' : 'ダーク表示';
    }
  }
  applyTheme(currentTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('ui-showcase-theme', currentTheme);
      applyTheme(currentTheme);
    });
  }

  // Toast feedback
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('is-visible');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('is-visible'), 2200);
  }

  document.querySelectorAll('[data-demo-action]').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showToast(`選択: ${el.getAttribute('data-demo-action')}`);
    });
  });

  // Pin-open toggles
  document.querySelectorAll('[data-pin-target]').forEach((checkbox) => {
    const targetId = checkbox.getAttribute('data-pin-target');
    const root = document.getElementById(targetId);
    if (!root) return;

    checkbox.addEventListener('change', () => {
      const pinned = checkbox.checked;
      root.classList.toggle('is-pinned', pinned);
      const trigger = root.querySelector('[data-menu-trigger]');
      if (trigger) {
        trigger.setAttribute('aria-expanded', String(pinned || root.classList.contains('is-open')));
      }
    });
  });

  // Code viewer boxes
  document.querySelectorAll('[data-code-box]').forEach((box) => {
    const key = box.getAttribute('data-code-box');
    const pre = box.querySelector('pre code');
    const tabs = box.querySelectorAll('.code-tab');
    const toggleBtn = box.querySelector('.code-toggle');
    const copyBtn = box.querySelector('.copy-btn');
    let activeLang = 'html';

    function renderCode() {
      if (pre && SNIPPETS[key]) {
        pre.textContent = SNIPPETS[key][activeLang] || '';
      }
      tabs.forEach((t) => {
        t.classList.toggle('is-active', t.getAttribute('data-lang') === activeLang);
      });
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        activeLang = tab.getAttribute('data-lang');
        box.classList.add('is-open');
        if (toggleBtn) toggleBtn.textContent = 'コードを隠す';
        renderCode();
      });
    });

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const opened = box.classList.toggle('is-open');
        toggleBtn.textContent = opened ? 'コードを隠す' : 'コードを見る';
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener('click', async () => {
        const text = (SNIPPETS[key] && SNIPPETS[key][activeLang]) || '';
        try {
          await navigator.clipboard.writeText(text);
        } catch {
          const area = document.createElement('textarea');
          area.value = text;
          document.body.appendChild(area);
          area.select();
          document.execCommand('copy');
          document.body.removeChild(area);
        }
        copyBtn.textContent = 'コピーしました';
        copyBtn.classList.add('is-copied');
        setTimeout(() => {
          copyBtn.textContent = 'コピー';
          copyBtn.classList.remove('is-copied');
        }, 1600);
      });
    }

    renderCode();
  });
})();
