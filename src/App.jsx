import React, { Suspense } from "react";
import { useFetch } from "./useFetch";
import { Data } from "./Data";

import "./App.css";

// useFetch hook version
// function App() {
//   const { data, loading, error, handleCancelRequest } = useFetch(
//     "https://jsonplaceholder.typicode.com/todos"
//   );

//   return (
//     <div className="App">
//       <h1>Fetch like a Pro</h1>

//       <button onClick={handleCancelRequest}>Cancel Request</button>
//       <ul className="card">
//         {error && <li>Error: {error}</li>}
//         {loading && <li>Loading...</li>}
//         {data?.map((item) => (
//           <li key={item.id}>{item.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
// --------------------------------------------
// Pro Version - Render as you fetch

function App() {

  return (
    <div className="App">
      <h1>Fetch like a Pro</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Data />
      </Suspense>
    </div>
  );
}
export default App;
