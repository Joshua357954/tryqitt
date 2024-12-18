import React from 'react';
import TopNav from './TopNav.jsx'
import SideNav from './SideNav.jsx'

const MainLayoutScreen = ({children,screen,title,$return,selection }) => {
    return (
       <main className="w-full h-full">
       	 <section className='w-full h-screen flex  bg-green-00'>
         	 	<SideNav route={screen}/>
       	
	       	 <section className="h-full w-full flex flex-col">

  	       	 	<TopNav title={title} $return={$return} selection={selection} />

  	       	 	<div className="w-full bg-gray-100 h-full">
  	       	 		{children}
  	       	 	</div>

	       	 </section>
       	 </section>
       </main>
    );
};


export default MainLayoutScreen;
