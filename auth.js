document.addEventListener("DOMContentLoaded", () => {

  const session =
    localStorage.getItem("geopoliso-session");

  const currentPage =
    window.location.pathname.toLowerCase();


  /* =====================================================
     PÁGINAS QUE PODEM SER ACESSADAS SEM LOGIN
     ===================================================== */

  const publicPages = [

    "/login/login.html",

    "/cadastro/cadastro.html"

  ];


  const isPublicPage =
    publicPages.some(page =>
      currentPage.endsWith(page)
    );


  /* =====================================================
     SEM LOGIN = VOLTA PARA LOGIN
     ===================================================== */

  if (!session && !isPublicPage) {

    window.location.replace(
      "../LOGIN/login.html"
    );

    return;

  }


  /* =====================================================
     SE JÁ ESTÁ LOGADO E TENTA ABRIR LOGIN/CADASTRO
     ===================================================== */

  if (session && isPublicPage) {

    window.location.replace(
      "../index.html"
    );

    return;

  }

});