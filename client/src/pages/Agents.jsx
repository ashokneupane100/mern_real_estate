import { useEffect, useState } from "react";
import axios from "axios";
import UserCard from "../components/cards/UserCard";

export default function Agents() {

  // State
  const [agents, setAgents] = useState();
  const[loading,setLoading]=useState(true);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const { data } = await axios.get("/agents");
      setAgents(data)
      setLoading(false)
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if(loading){
    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
        <div className='display-1'>Loading...</div>
        </div>
    )
}

  return (
    <div className="bg-slate-950 d-flex flex-column min-vh-100">
       <h1 className="text-5xl font-bold bg-blue-600 hover:bg-sky-900 text-white p-4 w-full text-center">Agents</h1>

      <div className="container flex-grow-1">
        <div className="row">
        {agents?.map((agent) => ( 
            <UserCard user={agent} key={agent._id}/>
))}

        </div>
      </div>
      </div>
  );
}
