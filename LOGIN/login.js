/* =========================================================
   GEOPOLISO — login.js
   Validação do formulário + autenticação simulada via localStorage.
   Se o e-mail não estiver cadastrado, avisa o usuário e aponta
   para a página de cadastro.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  const form       = document.getElementById('loginForm');
  const emailInput = document.getElementById('email');
  const passInput  = document.getElementById('password');
  const emailError = document.getElementById('emailError');
  const passError  = document.getElementById('passwordError');
  const formMsg    = document.getElementById('formMsg');
  const btnLogin   = document.getElementById('btnLogin');
  const forgotLink = document.getElementById('forgotLink');

  function setFieldError(input, errorEl, message) {
    input.closest('.field') && input.closest('.field').classList.toggle('has-error', !!message);
    errorEl.textContent = message || '';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function clearFormMsg() {
    formMsg.innerHTML = '';
    formMsg.className = 'form-msg';
  }

  function showFormMsg(html, type) {
    formMsg.innerHTML = html;
    formMsg.className = 'form-msg ' + type;
  }

  function getUsers() {
    return JSON.parse(localStorage.getItem('geopoliso-users') || '[]');
  }

  /* ---------------------------------------------------
     VALIDAÇÃO EM TEMPO REAL
  --------------------------------------------------- */
  emailInput.addEventListener('input', () => {
    setFieldError(emailInput, emailError,
      emailInput.value && !isValidEmail(emailInput.value) ? 'Digite um e-mail válido.' : '');
    clearFormMsg();
  });

  passInput.addEventListener('input', () => {
    setFieldError(passInput, passError,
      passInput.value && passInput.value.length < 6 ? 'A senha deve ter no mínimo 6 caracteres.' : '');
    clearFormMsg();
  });

  /* ---------------------------------------------------
     ENVIO DO FORMULÁRIO
  --------------------------------------------------- */
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearFormMsg();

    const email = emailInput.value.trim();
    const pass  = passInput.value;
    let valid = true;

    if (!isValidEmail(email)) {
      setFieldError(emailInput, emailError, 'Digite um e-mail válido.');
      valid = false;
    } else {
      setFieldError(emailInput, emailError, '');
    }

    if (pass.length < 6) {
      setFieldError(passInput, passError, 'A senha deve ter no mínimo 6 caracteres.');
      valid = false;
    } else {
      setFieldError(passInput, passError, '');
    }

    if (!valid) return;

    btnLogin.disabled = true;
    btnLogin.querySelector('.btn-text').textContent = 'Entrando...';

    /* -----------------------------------------------
       INTEGRAÇÃO COM BACKEND
       Troque o bloco simulado abaixo por uma chamada real, ex:

       fetch('/api/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email, password: pass })
       })
       .then(res => res.json())
       .then(data => { ... })
       .catch(err => { ... });
    ----------------------------------------------- */
    setTimeout(() => {
      const users = getUsers();
      const account = users.find(u => u.email === email);

      // Usuário sem cadastro: orienta a criar uma conta primeiro
      if (!account) {
        showFormMsg(
          'Não encontramos uma conta com esse e-mail. É necessário <a href="cadastro.html">fazer o cadastro</a> antes de entrar.',
          'error'
        );
        btnLogin.disabled = false;
        btnLogin.querySelector('.btn-text').textContent = 'Login';
        return;
      }

      // E-mail existe, mas a senha não confere
      if (account.password !== pass) {
        showFormMsg('Senha incorreta. Tente novamente.', 'error');
        btnLogin.disabled = false;
        btnLogin.querySelector('.btn-text').textContent = 'Login';
        return;
      }

      localStorage.setItem('geopoliso-session', JSON.stringify({
        name: account.name || email.split('@')[0],
        email,
        loggedAt: Date.now()
      }));

      showFormMsg('Login realizado! Redirecionando...', 'success');

      setTimeout(() => {
        window.location.href = 'index.html';
      }, 700);
    }, 500);
  });

  /* ---------------------------------------------------
     "ESQUECEU A SENHA?"
  --------------------------------------------------- */
  forgotLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const users = getUsers();

    if (email && isValidEmail(email) && !users.some(u => u.email === email)) {
      showFormMsg(
        'Não encontramos uma conta com esse e-mail. É necessário <a href="cadastro.html">fazer o cadastro</a>.',
        'error'
      );
      return;
    }
    showFormMsg('Enviamos um link de recuperação se o e-mail existir na base.', 'success');
  });

});
