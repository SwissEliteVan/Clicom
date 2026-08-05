import { trackForm } from './analytics';

const form = document.querySelector<HTMLFormElement>('[data-contact-form]');

if (form) {
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const status = form.querySelector<HTMLElement>('[data-form-status]');
  const idleLabel = button?.textContent ?? 'Envoyer';
  let started = false;

  form.addEventListener('focusin', () => {
    if (!started) { started = true; trackForm('start', form.id || undefined); }
  }, { once: true });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!button || !status || !form.reportValidity()) return;

    button.disabled = true;
    button.textContent = 'Envoi...';
    status.textContent = '';
    status.className = 'form-status';

    try {
      const payload = Object.fromEntries(new FormData(form).entries());
      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null) as { success?: boolean; message?: string } | null;

      if (!response.ok || !result?.success) throw new Error(result?.message || 'Request failed');

      form.reset();
      status.textContent = 'Merci. Votre demande a bien été envoyée.';
      status.classList.add('is-success');
      trackForm('submit', form.id || undefined);
      try { sessionStorage.setItem('clicom_converted', '1'); } catch {}
    } catch {
      status.textContent = 'Une erreur est survenue. Vous pouvez aussi nous écrire à hello@clicom.ch.';
      status.classList.add('is-error');
      trackForm('error', form.id || undefined);
    } finally {
      button.disabled = false;
      button.textContent = idleLabel;
    }
  });
}
