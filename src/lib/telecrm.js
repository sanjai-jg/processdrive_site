// Sends a lead to TeleCRM from the browser (no backend).
// Set VITE_TELECRM_WEBHOOK_URL in .env. If it is empty the form runs in demo mode
// (logs to the console and shows success) so the site can be reviewed before wiring TeleCRM.
//
// Payload keys are flat and readable. Map them to your TeleCRM lead fields in TeleCRM's
// webhook/field-mapping screen (name, phone, email, message, form, page, job, resume_link ...).
const URL = import.meta.env.VITE_TELECRM_WEBHOOK_URL

export const isDemo = !URL

export async function submitLead(form, fields) {
  const payload = {
    ...fields,
    form, // 'contact' | 'career' | 'ai-readiness'
    source: 'processdrive.com',
    page: typeof location !== 'undefined' ? location.pathname : '',
    submitted_at: new Date().toISOString(),
  }
  if (!URL) {
    console.info('[TeleCRM demo mode] would send:', payload)
    await new Promise((r) => setTimeout(r, 700))
    return { ok: true, demo: true }
  }
  const body = JSON.stringify(payload)
  try {
    const res = await fetch(URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body })
    if (!res.ok) throw new Error('TeleCRM responded ' + res.status)
    return { ok: true }
  } catch (err) {
    // If the webhook does not send CORS headers the browser blocks the first request before it is sent.
    // Retry as a "simple" request (text/plain, no-cors); the lead is delivered, the response is just unreadable.
    if (err instanceof TypeError) {
      await fetch(URL, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain' }, body })
      return { ok: true, opaque: true }
    }
    throw err
  }
}
