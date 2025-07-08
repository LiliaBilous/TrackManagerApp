<template>
  <footer class="footer">
    <div class="footer__container">
      <p class="footer__text">Test task from Genesis Academy</p>
      <div class="footer__copyright">
        Made by
        <a href="https://github.com/LiliaBilous" target="_blank" class="footer__link">
          LiliiaBilous
        </a>
        in 2025
      </div>
    </div>
  </footer>
</template>

<style>
.footer {
  min-height: 3rem;
  max-width: 86rem;
  width: 90%;
  padding: 1rem 2rem;
  background: var(--color-bg-glass);
  border-radius: var(--border-radius-1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--color-glow-soft);
  box-shadow: var(--box-shadow-main);
  container-type: inline-size;
  /* margin-bottom: 1rem; */
}

.footer__container {
  min-height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer__text {
  color: var(--color-text-base);
}

.footer__copyright {
  color: var(--color-text-muted);
}

.footer__link {
  color: var(--color-primary-cyan);
  transition: var(--transition);
}

.footer__link:hover {
  color: var(--color-primary-blue);
}

@container (max-width: 800px) {
  .footer {
    padding: 1rem;
  }

  .footer__container {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
}
</style>
