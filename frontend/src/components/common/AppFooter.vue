<template>
  <footer class="footer">
    <div class="footer__container">
      Test task from Genesis Academy
      <div class="footer__copyright">
        Made by
        <a href="https://github.com/LiliaBilous" target="_blank" class="footer__link">LiliiaBilous</a>
        in 2025
      </div>
    </div>
  </footer>
</template>
<style>
.footer {
  width: 90%;

}

.footer__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.footer__link {
  color: var(--primary-color);
  transition: color 0.3s ease-in-out;
}

.footer__link:hover {
  color: var(--secondary-color);
}

@media screen and (max-width: 50rem) {
  .footer {
    width: 100%;
  }

  .footer__container {
    flex-direction: column;
    padding: 0.5rem;
    gap: 0.5rem;
  }

}
</style>