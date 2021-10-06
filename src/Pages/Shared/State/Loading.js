import {MoonLoader} from "react-spinners";
import {useState} from "react";

export const Loading = () =>{
    let color = useState("#00ccfc");

    return(
      <div className="loading">
          <MoonLoader  color={color} loading={true} size={100}/>
      </div>
    );
}