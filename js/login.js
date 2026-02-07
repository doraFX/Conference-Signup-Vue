function validatePhone(phone) { return phone ? '' : '请输入手机号'; }
function validateEmail(email) { return email ? '' : '请输入邮箱'; }
function startCountdown(vm, sec = 3) {
  vm.codeCountdown = sec;
  vm.codeTimer && clearInterval(vm.codeTimer);
  vm.codeTimer = setInterval(() => {
    vm.codeCountdown--;
    if (vm.codeCountdown <= 0) clearCountdown(vm);
  }, 1000);
}
function clearCountdown(vm) { clearInterval(vm.codeTimer); vm.codeTimer = null; vm.codeCountdown = 0; }
async function sendPhoneCode() { return { code: 0, message: '离线验证码已发送' }; }
async function sendEmailCode() { return { code: 0, message: '离线验证码已发送' }; }
async function doRegister(payload) { return { code: 0, data: OfflineDemo.register(payload) }; }
async function doLogin(payload) { return { code: 0, data: OfflineDemo.login(payload) }; }
