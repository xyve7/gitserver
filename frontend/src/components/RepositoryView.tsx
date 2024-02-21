import { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import path from "path-browserify";
import Header from "./Header";

const backend_host = 'localhost';
const backend_port = 5000;

function RepositoryView() {
    const [items, setItems] = useState<string[]>([]);
    const [tofetch, setToFetch] = useState(false);
    const [isFile, setIsFile] = useState(false);
    const [fileContent, setFileContent] = useState<string>("");

    const { id, "*": subPath } = useParams();

    const getItems = async () => {
        const response = await fetch(
            `http://${backend_host}:${backend_port}/api/repositories/${path.join(id!, subPath!)}`,
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
                if (typeof json.objects != "undefined") {
                    json.objects.forEach((item: any) => {
                        setItems((prev) => prev.concat(item.name))
                    })
                } else {
                    setFileContent(json.content);
                    setIsFile(true);
                }
            }).catch((err) => console.log(err));
            setToFetch(true);
        }
    }, [items, fetch, isFile, fileContent]);
    return (
        <>
            <div className="content">
                <Header></Header>
                <div className="container" id="repo-header">
                    <div className="item left w-50">
                        <h2>{id}</h2>
                    </div>
                    <div className="item right w-50">
                        <h3 className="text-button" id="clone"><a className="link" onClick={() => navigator.clipboard.writeText(`git@192.168.1.5:/home/git/repos/${id}`)}>clone</a></h3>
                    </div>
                </div>
                <div className="container" id="repo-header">
                    <div className="item left w-50">
                        <h3>content</h3>
                    </div>
                    <div className="item right w-50">
                        <h3>info</h3>
                    </div>
                </div>
                {
                    !isFile && <div className="container" id="repo-content">
                        <div className="item w-100 border">
                            <ul className="list">
                                <Link to={path.join('/', id!, subPath!)}><li className="list-element text-button" onClick={() => setTimeout(() => { window.location.reload(); }, 100)}>.</li></Link>
                                <Link to={path.join('/', id!, path.dirname(subPath!))}><li className="list-element text-button" onClick={() => setTimeout(() => { window.location.reload(); }, 100)}>..</li></Link>
                                {items.map((item) => <Link to={path.join('/', id!, subPath!, item)}><li className="list-element text-button" onClick={() => setTimeout(() => { window.location.reload(); }, 100)}>{item}</li></Link>)}
                            </ul>
                        </div>
                    </div>
                }
                {
                    isFile && <div className="container" id="repo-content">
                        <div className="item w-100 border">
                            <pre style={{ marginLeft: "2.5em" }}>
                                {fileContent}
                            </pre>
                        </div>
                    </div>
                }

            </div>
            <footer className="footer">
                <p>2024 © xyve | <a className="link" target="_blank" href="https://www.github.com/xyve7">github</a></p>
            </footer>
        </>
    )
}
export default RepositoryView;