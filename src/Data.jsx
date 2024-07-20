import { fetchData } from "./fetchData";

const apiData = fetchData("https://jsonplaceholder.typicode.com/todos");

function Data() {
    const data = apiData.read();

    return (
        <ul className="card">
            {data?.map((item) => (
                <li key={item.id}>{item.title}</li>
            ))}
        </ul>
    );
}

export { Data };
