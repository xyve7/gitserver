import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import Header from "./Header";

const backend_host = 'localhost';
const backend_port = 5000;

function Home() {
    const [items, setItems] = useState<string[]>([]);
    const [tofetch, setToFetch] = useState(false);

    const getItems = async () => {
        const response = await fetch(
            `http://${backend_host}:${backend_port}/api/repositories`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        return await response.json();
    };

    useEffect(() => {
        if (!tofetch) {
            getItems().then((json) => {
                json.repositories.forEach((item: string) => {
                    setItems((prev) => prev.concat(item))
                })
            }).catch((err) => console.log(err));
            setToFetch(true);
        }
    }, [items, fetch]);

    return (
        <>
            <div className="content">
                <Header></Header>
                {items.map((item) => <Link to={`/${item}`} className="link"><div className="container border card"><h3>{item}</h3></div></Link>)}
            </div >
            <footer className="footer">
                <p>2024 © xyve | <a className="link" target="_blank" href="https://www.github.com/xyve7">github</a></p>
            </footer>
        </>
    )
}
export default Home;