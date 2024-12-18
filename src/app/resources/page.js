"use client" 
import React, { useState } from 'react';

import { FaHeart, FaDownload } from 'react-icons/fa';
import { TbNotes as Notes } from 'react-icons/tb';
import { CgMoreVertical as More } from 'react-icons/cg'
import { PiDownloadBold as Download2 , PiFiles as PQ , PiPencilLine as Assign} from 'react-icons/pi';
import MainLayout from '../../components/MainLayout.jsx'
// import { LuHardDriveDownload as Download } from 'react-icons/lu'

const resourcesData = [
	  { category: 'all'},
  { category: 'notes', items: [
      { title: 'Resource 1', description: 'Brief overview of the resource.', link: '#' },
      { title: 'Resource 2', description: 'Another helpful resource.', link: '#' },
      { title: 'Resource 3', description: 'Yet another resource description.', link: '#' },
      { title: 'Resource 4', description: 'Resource description goes here.', link: '#' },
      { title: 'Resource 5', description: 'Description for the fifth resource.', link: '#' },
    ]
  },
  { category: 'assignments', items: [
      { title: 'Resource 6', description: 'Description for the sixth resource.', link: '#' },
      { title: 'Resource 7', description: 'Description for the seventh resource.', link: '#' },
      { title: 'Resource 8', description: 'Description for the eighth resource.', link: '#' },
      { title: 'Resource 9', description: 'Description for the ninth resource.', link: '#' },
      { title: 'Resource 10', description: 'Description for the tenth resource.', link: '#' },
    ]
  },
  { category: 'past questions'},
  { category: 'others'},

];

const icons = {
	'notes':<Notes className="text-green-500"/>,
	'past questions':<PQ className="text-lg text-green-500"/>,
	'assignments':<Assign className="text-green-500"/>,
	'others': <More className="text-green-500"/>
}

const ResourcesCard = () => {
	return (
		<div className="bg-black relative w-full h-48 max-h-52 rounded-xl">
			<div className=" absolute -top-2 -right-1 flex flex-col justify-center gap-2 w-ful h-48 bg-gray-50 rounded-xl shadow p-2 py-3 border border-black">
				<div className="flex gap-1 flex-wrap">
					<div className="bg-green-500 flex justify-center items-center text-white font-semibold py-[.1rem] px-2 rounded-lg">Note</div>
					<div className="bg-blue-500 flex justify-center items-center text-white font-semibold py-[.1rem] px-2 rounded-lg">STAT 160</div>
				</div>

				<p className="text-sm font-medium text-gray-700">This is the STAT 160 note and it is a compulsery to have </p>
				
				<div className="flex flex-col gap-1 items-start justify-between">
   				<p className="text-sm font-medium">
   					<b>By :  </b>
   					<span className="underline underline-offset-2">QittHQ</span>
   				</p>
   				<p className="text-sm font-medium">
   					<b>Date : </b>
   					<span className="underline underline-offset-2">18/2/2024</span>
   				</p>
				</div>

			<Download2 className="text-xl absolute bottom-2 right-2 text-green-600"/>
				
			</div>	
		</div>
	)
}

const Resources = ({ className }) => {

	const [resourceName,setResource] = useState('all')

    return (
        <MainLayout route="Resources">
   			<section className="flex flex-col gap-10 w-full h-full ">
	   			 <div className="w-full  h-14 overflow-x-auto flex justify-start sm:justify-center gap-2">
	   				{  
	   					resourcesData.map((item,index)=>{
	   						return <div key={index} onClick={() => setResource(item.category)} className={`p-3 ${item.category == resourceName ? 'px-4 font-bold border ':""} flex gap-1 items-center rounded-xl bg-gray-50 `}>
	   								{icons[item.category]} <p className=" whitespace-nowrap capitalize">{item.category}</p>
			   					  </div>
	   					})
	   				}
  
	   			</div>

				{/*
	   			<div className="w-full bg-green-4000 gap-6 h-full grid grid-cols-2 ">
	   				<ResourcesCard/>
	   				<ResourcesCard/>
	   				<ResourcesCard/>
	   				<ResourcesCard/>
	   				<ResourcesCard/>
	   			</div> */}
				<div className="flex items-center justify-center">
					<p className="text-lg text-gray-600 text-center">
						Oops! It looks like <strong>we're all out of resources</strong> for now. <br />
						Don't worry, new content is on the way! 🚀 Check back later. ⏰
					</p>
				</div>

   			</section>
        </MainLayout>
    );
};

export default Resources;
