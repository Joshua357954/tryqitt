import React, { useState } from 'react';

const Selection = ({ className }) => {
	const [year,setYear] =  useState(1)
	const years =[1,2,3,4]
	const courses = ['Maths & Stats','IT','Computer & Statics','Computer Science']
	const faculties = ['Science','Computing','SSLT']

	function chooseYear ($year) {
		setYear($year)
	}

    return (
        <div className="flex w-full gap-x-6  items-center"> 
        	<label className='flex flex-col'>Faculty
        		<select className="border-[1px] border-black rounded px-1 py-[1px] bg-white w-fit flex focus:outline-none" name="course">
					{ faculties.map((item) => {
						return <option value={item}>{item}</option>
						})
					}
				</select>
        	</label>
        	
        	<label className='flex flex-col'>Course
        		
        		<select className="border-[1px] border-black rounded px-1 py-[1px] bg-white w-fit flex focus:outline-none" name="course">
					{ courses.map((item) => {
						return <option value={item}>{item}</option>
						})
					}
				</select>

        	</label>

        	<label className='flex flex-col'>Year

        		<div className="flex gap-x-2">
        			{ years.map((item) => {
        				return <div onClick={()=> chooseYear(item)} className={`py-1 px-2 rounded ${item == year ? 'bg-blue-200 font-bold' : "" }`}>{item}</div>
	        			})
	        		}
        		</div>
        	</label>

        </div>
    );
};

export default Selection;
