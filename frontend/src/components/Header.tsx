import Cookies from 'js-cookie';
function Header() {
    const switch_theme = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (e.target.textContent === "light") {
            document.documentElement.setAttribute("theme", "dark");
            Cookies.set('theme', 'dark')
            e.target.innerHTML = '<a class="link">dark</a>';
        } else {
            document.documentElement.setAttribute("theme", "light");
            Cookies.set('theme', 'light')
            e.target.innerHTML = '<a class="link">light</a>';
        }
    }
    return (
        <>
            <div className="container" id="header">
                <div className="item left w-50">
                    <h1>git server</h1>
                </div>
                <div className="item right w-50">
                    <h1 className="text-button" id="theme-switch"><a className="link" onClick={(e) => switch_theme(e)}>{Cookies.get('theme') || "light"}</a></h1>
                </div>
            </div>
        </>
    )
}
export default Header;