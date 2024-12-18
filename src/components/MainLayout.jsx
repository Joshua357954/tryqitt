import React from 'react';
import SideBar from '../components/SideBar.jsx';
import Navbar from '../components/NavBar.jsx';
// import { Link } from 'react-router-dom';
import { FiSend as SendIcon } from 'react-icons/fi';
import { HiHome as Home } from 'react-icons/hi';
import PageNav from '../components/PageNav.jsx';

const MainLayout = ({ children, route }) => {
  return (
    <main className="flex sm:shadow-lg font-aeonik transition-shadow duration-300 ease-in-out h-full w-full select-none">

      {/* Sidebar */}
      {<SideBar route={route} />}

      {/* Homepage & Timetable */}
      <section className="w-full h-full flex flex-col overflow-y-auto">

        {/* Navbar */}
        {route.trim() ? <PageNav url={route} /> : <Navbar route={route} />}

        <section className="w-full flex h-full bg- px-2 pt-2 sm:pt-4 overflow-y-auto">

          {/* HomePage*/}
          {children}

        </section>

        {/* Sharrade Div*/}
        <div className="w-full h-[70px] sm:h-0"></div>

      </section>

    </main>
  );
};

export default MainLayout;
