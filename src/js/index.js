index();

async function index() {
    await include_script("/exploration-game.github.io/src/js/consoleInfo.js");
    console.info("Loading website");
    await Metadata(); 
    await pages();
}

async function includes() {
    await styles();

    console.info("Loading includes");

    await include_html("/exploration-game.github.io/src/html/include/header.html", "body", false);

    await include_html("/exploration-game.github.io/src/html/include/anchor.html", "body", false);
    await setIconTheme();

    await include_html("/exploration-game.github.io/src/html/include/contentTopModule.html", "header", false)
    await include_script("/exploration-game.github.io/src/js/contentTopmodule.js");

    await include_html("/exploration-game.github.io/src/html/include/content.html", "body", false);

    await include_html("/exploration-game.github.io/src/html/include/searchbar.html", "body", false);

    await include_html("/exploration-game.github.io/src/html/include/footer.html", "body", false);
}

async function styles() {
    console.info("Loading style");

    await include_css("/exploration-game.github.io/src/css/theme.css");
    await include_script("/exploration-game.github.io/src/js/theme.js");
    await include_css("/exploration-game.github.io/src/css/font.css");
    await include_css("/exploration-game.github.io/src/css/user-agent.css");
    await include_css("/exploration-game.github.io/src/css/header.css");
    await include_css("/exploration-game.github.io/src/css/header-navbar.css");
    await include_css("/exploration-game.github.io/src/css/anchor.css");

    await include_css("/exploration-game.github.io/src/css/content.css");
    await include_css("/exploration-game.github.io/src/css/contentTopmodule.css");

    await include_css("/exploration-game.github.io/src/css/footer.css");
    await include_css("/exploration-game.github.io/src/css/scrollbar.css");
    await include_css("/exploration-game.github.io/src/css/searchbar.css");
}

async function Metadata() {
    var title = getShortPathname().replaceAll("/", " ");
    document.title = "GHub 📰 " + title;

    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/x-icon";
    link.href = "/assets/icon/icone.png";
    document.head.appendChild(link);
}

async function pages() {
    console.info("Loading custom page");

    if (pathNameMatchPage("/", true) || pathNameMatchPage("/index", true)) {
        await includes();

        await include_html("/exploration-game.github.io/src/html/content/welcome.html", "contentArticle", true);
        await include_css("/exploration-game.github.io/src/css/welcome.css");
    }

    else if (pathNameMatchPage("/settings", true)) {
        await includes();

        await include_css("/exploration-game.github.io/src/css/settings.css");
        await include_html("/exploration-game.github.io/src/html/content/settings.html", "contentArticle", true);
        await include_script("/exploration-game.github.io/src/js/settings.js");
    }

    else if (pathNameMatchPage("/github", false) && await pageGithub()) { }
    else if (pathNameMatchPage("/cours", false) && await pageCours()) { }
    else if (pathNameMatchPage("/outils", false) && await pageOutils()) { }
    else if (pathNameMatchPage("/admin", false) && await pageAdmin()) { }
    else if (pathNameMatchPage("/games", false) && await pageGames()) { }
    else if (pathNameMatchPage("/discord", false) && await pageDiscord()) { }

    else {
        await includes();

        await include_css("/exploration-game.github.io/src/css/404.css");
        await include_html("/exploration-game.github.io/src/html/content/404.html", "contentArticle", true);
        console.warn("Erreur : 404");

        if (pathNameMatchPage("/404", true)) {
            await include_html("/exploration-game.github.io/src/html/content/404-custom.html", "erreur", true);
        }
    }

    await include_script("/exploration-game.github.io/src/js/viewcount.js");
    await devFooter();
    await include_script("/exploration-game.github.io/src/js/cursor.js");
    await include_script("/exploration-game.github.io/src/js/date.js");
    await include_script("/exploration-game.github.io/src/js/searchbar.js");
}

async function pageGithub() {
    if (pathNameMatchPage("/github/statistiques", true)) {
        await includes();

        await include_script("/exploration-game.github.io/src/js/gather.js");

        await include_css("/exploration-game.github.io/src/css/github-update.css");
        await include_html("/exploration-game.github.io/src/html/content/github-update.html", "content", true);
        await include_script("/exploration-game.github.io/src/js/github-update.js");

        await include_css("/exploration-game.github.io/src/css/github-commits.css");
        await include_html("/exploration-game.github.io/src/html/content/github-commits.html", "content", true);
        await include_script("/exploration-game.github.io/src/js/github-commits.js");

        await include_css("/exploration-game.github.io/src/css/github-events.css");
        await include_html("/exploration-game.github.io/src/html/content/github-events.html", "content", true);
        await include_script("/exploration-game.github.io/src/js/github-events.js");
    }

    else if (pathNameMatchPage("/github/contributeur", true)) {
        await includes();

        await include_script("/exploration-game.github.io/src/js/gather.js");

        await include_html("/exploration-game.github.io/src/html/content/contributeur.html", "content", true);
        await include_script("/exploration-game.github.io/src/js/contributeur.js");
    }

    else if (pathNameMatchPage("/github/issues", true)) {
        await includes();

        await include_script("/exploration-game.github.io/src/js/gather.js");

        await include_html("/exploration-game.github.io/src/html/content/issues.html", "content", true);
        await include_css("/exploration-game.github.io/src/css/issues.css");
        await include_script("/exploration-game.github.io/src/js/issues.js");
    }

    else if (pathNameMatchPage("/github/readme", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'profile/README.md', false, true); });
    }

    else if (pathNameMatchPage("/github/contribuer", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'CONTRIBUTING.md', false, true); });
    }

    else if (pathNameMatchPage("/github/support", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'SUPPORT.md', false, true); });
    }

    else if (pathNameMatchPage("/github/security", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'SECURITY.md', false, true); });
    }

    else if (pathNameMatchPage("/github/license", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'LICENSE.md', false, true); });
    }

    else if (pathNameMatchPage("/github/code_of_conduct", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'CODE_OF_CONDUCT.md', false, true); });
    }
        
    else if (pathNameMatchPage("/github/GHub-fr.github.io", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/GHub-fr.github.io', 'README.md', false, true); });
    }
        
    else if (pathNameMatchPage("/github/.github", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'README.md', false, true); });
    }
        
    else if (pathNameMatchPage("/github/plugin", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/plugin', 'README.md', false, true); });
    }
        
    else if (pathNameMatchPage("/github/resourcePack", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/resourcePack', 'README.md', false, true); });
    }
        
    else if (pathNameMatchPage("/github/bot", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/bot', 'README.md', false, true); });
    }
        
    else if (pathNameMatchPage("/github/server", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/server', 'README.md', false, true); });
    }

    else {
        return false;
    }
    return true;
}

async function pageCours() {
    if (pathNameMatchPage("/cours/readme", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/README.md', false, true); });
    }

    else if (pathNameMatchPage("/cours/markdown", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Github/Markdown/Learning.md', false, true); });
    }

    else if (pathNameMatchPage("/cours/github-readme", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('github/.github', 'profile/README.md', false, true); });
    }

    else if (pathNameMatchPage("/cours/fibre", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Network/Fibre/README.md', false, true); });
    }

    else if (pathNameMatchPage("/cours/html", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Code/Web/HTML/learning.md', false, false); });

        addHRChapter();

        await addMarkdown('GHub-fr/.github', 'note/Code/Web/HTML/liste.md', false, false);

        addHRChapter();

        await addMarkdown('GHub-fr/.github', 'note/Code/Web/HTML/boilerplate.md', false, true);
    }

    else if (pathNameMatchPage("/cours/css", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Code/Web/CSS/learning.md', false, false); });
       
        addHRChapter();

        await addMarkdown('GHub-fr/.github', 'note/Code/Web/CSS/media-queries.md', false, false);

        addHRChapter();
        
        await addMarkdown('GHub-fr/.github', 'note/Code/Web/CSS/liste.md', false, true);
    }
        
    else if (pathNameMatchPage("/cours/js", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Code/Web/JS/learning.md', false, true); });
    }

    else if (pathNameMatchPage("/cours/binaire", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Code/Web/Binaire/learning.md', false, true); });
    }
        
    else if (pathNameMatchPage("/cours/lm-studio", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/IA/learning.md', false, true); });
    }
        
    else if (pathNameMatchPage("/cours/retraite", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', 'note/Retraite/learning.md', false, true); });
    }

    else {
        return false;
    }
    return true;
}

async function pageOutils() {
    if (pathNameMatchPage("/outils/matrice", true)) {
        await include_html("/exploration-game.github.io/src/html/include/content.html", "body", false);
        await include_css("/exploration-game.github.io/src/css/theme.css");
        await include_multiple("matrice", "contentArticle");
    }

    else if (pathNameMatchPage("/outils/cube", true)) {
        await include_html("/exploration-game.github.io/src/html/include/content.html", "body", false);
        await include_html("/exploration-game.github.io/src/html/content/cube.html", "contentArticle", true);
        await include_css("/exploration-game.github.io/src/css/cube.css");
        await include_css("/exploration-game.github.io/src/css/theme.css");
    }

    else if (pathNameMatchPage("/outils/rss", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/rss.js");
    }

    else if (pathNameMatchPage("/outils/logger", true)) {
        await includes();
        await include_css("/exploration-game.github.io/src/css/logger.css");
        await include_html("/exploration-game.github.io/src/html/content/logger.html", "contentArticle", true);
        await include_script("/exploration-game.github.io/src/js/logger.js");
    }

    else if (pathNameMatchPage("/outils/caesar", true)) {
        await includes();
        await include_multiple("caesar", "contentArticle");
    }

    else if (pathNameMatchPage("/outils/liens", true)) {
        await includes();
        await include_script("/exploration-game.github.io/src/js/markdown.js").then(async () => { await addMarkdown('GHub-fr/.github', '/note/Liens.md', false, true); });
    }

    else {
        return false;
    }
    return true;
}

async function pageAdmin() {
    if (pathNameMatchPage("/admin/film", true)) {
        await includes();

        await include_css("/exploration-game.github.io/src/css/film.css");
        await include_html("/exploration-game.github.io/src/html/content/film.html", "contentArticle", true);
    }

    else if (pathNameMatchPage("/admin/music", true)) {
        await includes();

        await include_css("/exploration-game.github.io/src/css/music.css");
        await include_script("/exploration-game.github.io/src/js/music.js");
        await include_html("/exploration-game.github.io/src/html/content/music.html", "contentArticle", true);
    }

    else if (pathNameMatchPage("/admin/contact", true)) {
        await includes();

        await include_css("/exploration-game.github.io/src/css/contact.css");
        await include_html("/exploration-game.github.io/src/html/content/contact.html", "contentArticle", true);
    }

    else {
        return false;
    }
    return true;
}

async function pageGames() {
    if (pathNameMatchPage("/games/fruits", true)) {
        await include_css("/exploration-game.github.io/src/css/user-agent.css");
        await include_css("/exploration-game.github.io/src/css/font.css");
        await include_css("/exploration-game.github.io/src/css/theme.css");

        await include_css("/exploration-game.github.io/src/css/fruits.css");
        await include_html("/exploration-game.github.io/src/html/content/fruits.html", "body", false);
        await include_script("/exploration-game.github.io/src/js/fruits.js");
    }

    else if (pathNameMatchPage("/games/shopTitans", true)) {
        await includes();

        await include_html("/exploration-game.github.io/src/html/content/shopTitans.html", "content", true);
        await include_css("/exploration-game.github.io/src/css/shopTitans.css");
        await include_script("/exploration-game.github.io/src/js/gather.js");
        await include_script("/exploration-game.github.io/src/js/math.js");
        await include_script("/exploration-game.github.io/src/js/shopTitans.js");
    }

    else {
        return false;
    }
    return true;
}

async function pageDiscord() {
    if (pathNameMatchPage("/discord/login", true)) {
        await includes();

        await include_css("/exploration-game.github.io/src/css/discord.css");
        await include_html("/exploration-game.github.io/src/html/content/discord-login.html", "contentArticle", true);
    }

    else if (pathNameMatchPage("/discord/tools", true)) {
        await includes();

        await include_css("/exploration-game.github.io/src/css/discord.css");
        await include_script("/exploration-game.github.io/src/js/discord-login.js");
    }

    else if (pathNameMatchPage("/discord", true)) {
        await includes();
        await include_html("/exploration-game.github.io/src/html/content/redirect.html", "contentArticle", true);
        await include_css("/exploration-game.github.io/src/css/redirect.css");
        await include_script("/exploration-game.github.io/src/js/redirect.js");
        redirect("discord.gg/rF25kjuv4v");
    }

    else {
        return false;
    }
    return true;
}

function getShortPathname() {
    var path = window.location.pathname;
    path = path.replace(".html", "");
    return path;
}

function pathNameMatchPage(path, strict) {
    var pathname = getShortPathname();
    if (strict === true) {
        if (path.toLowerCase() === pathname.toLowerCase()) {
            console.info("Loading : " + pathname);
            return true;
        }
    }
    else if (strict === false) {
        var lowerCasePath = path.toLowerCase();
        if (pathname.startsWith(lowerCasePath.toLowerCase())) {
            console.info("Finding : " + lowerCasePath + "/...");
            return true;
        }
    }
    return false;
}

function devMode() {
    if (window.location.hostname === "127.0.0.1") {
        return true;
    }
    if (localStorage.getItem('devMode') === "true") {
        return true;
    }
    else {
        return false;
    }
}

async function devFooter() {
    if (devMode()) {
        var devFooter = document.getElementById("devFooter");
        if (devFooter != null) {
            devFooter.style = "";
        }

        await devTest();
    }
}

async function devTest() {
    console.info("Dev mode ON : " + window.location.hostname);
    //Test module ⏬
}