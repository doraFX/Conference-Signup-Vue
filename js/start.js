function initSessionDefault() {
  if (!localStorage.getItem('exh_session_key')) localStorage.setItem('exh_session_key', 'JN');
}
initSessionDefault();
