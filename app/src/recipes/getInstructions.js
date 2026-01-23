import { useEffect, useState } from "react";
import { BASE_URL } from "../config/config";


function GetInstructions({recipe_id}) {

  const [instructions, setInstructions] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/instructions`)
      .then((res) => res.json())
      .then((data) => setInstructions(data))
      .catch((err) => console.error("Failed to fetch setInstructions:", err));
  }, []);

  let filteredInstructions = instructions.filter(instructions => instructions.recipe_id === recipe_id);


  return (<>
  
    <div className="hover:bg-yellow-200 mb-4 rounded ">
      <ol className="">
        {filteredInstructions.map((instructions) =>(
            <li key={instructions.instruction_id} >{instructions.step_text}</li>
            
  ))}</ol>
    </div>
  </>
  );
}

export default GetInstructions;
