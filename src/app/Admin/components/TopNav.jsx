import React, { PropTypes } from 'react';
import { Link } from 'react-router-dom'
import Selection from './Selection.jsx'

const TopNav = ({title,selection,$return}) => {
    return (
       <nav className="w-full h-36 bg-gray-100 flex  items-center">
       		<div className="w-full h-full flex shadow-md flex-col gap-y-3 pl-10 py-4">

	       		<div className="w-[80%] h-full bg-transparent  flex items-center">
		       		{/*<Link to={$return}>Back</Link>*/}
		       		<h2 className="text-4xl font-bold text-black">{title}</h2>
	       		</div>

	       		{ selection }
				
			</div>
       </nav> 
    );
};


export default TopNav;
