async function submitSignup(payload) {
  const item = OfflineDemo.createRegistration(payload || {});
  OfflineDemo.toast('提交成功（离线）');
  return { code: 0, data: item };
}
async function updateSignup(id, patch) {
  return { code: 0, data: OfflineDemo.updateRegistration(id, patch) };
}
async function deleteSignup(id) {
  OfflineDemo.deleteRegistration(id);
  return { code: 0 };
}
