"use client"
import MainLayout from '../../../components/MainLayout.jsx'
import { FaChevronLeft as Arrow,FaChevronDown as ArrowD } from 'react-icons/fa'
import { CgFileDocument as Doc } from 'react-icons/cg' 
import PageNav from '../../../components/PageNav.jsx'
import { useSearchParams } from 'next/navigation.js'



const AssignmentDetails = ({ className }) => {

	const searchParams = useSearchParams();

	const course = searchParams.get('course');
	const dateGiven = searchParams.get('dateGiven');
	const deadline = searchParams.get('deadline');
	const content = searchParams.get('content');

    return (
        <MainLayout route={course}>
    		<div className="flex justify-center w-full flex-col h-[91%] sm:h-[87%]">
    			{/*<PageNav url='/assignment' name={course}/>*/}

                <div className="w-full sm:w-[60%] h-full px-2">
    				
    				<div className="flex items-center gap-x-2 pt-3">
    					<p className="font-light text-black"> Course : </p> <h2 className="text-xl  font-semibold text-gray-800">{course}</h2>
    				</div>
    				
    				<div className="flex items-center gap-x-2 pt-3 ">
    					<p className="font-light text-black"> Date Given : </p> <h2 className="text-xl font-semibold text-gray-800">{dateGiven.split(' ').slice(-2).join(' ')} {'('+dateGiven.split(' ')[0]+')'}</h2>
    				</div>

                    <div className="flex items-center gap-x-2 pt-3 ">
                        <p className="font-light text-black"> Submission Date : </p> <h2 className="text-xl font-semibold text-gray-800">{deadline.split(' ').slice(-2).join(' ')} {'('+deadline.split(' ')[0]+')'}</h2>
                    </div>

    				
    				<div className="w-full pr-4 mt-4 rounded h-14 bg-gray-200 justify-between flex items-center px-1">
    					<div className="flex gap-x-3 items-center">
        					<Doc className="text-2xl font-bold text-sky-900"/>
        					<p className="text-xl font-bold text-gray-800"> Files</p>
    					</div>

    					<ArrowD className="text-gray-700"/>
    				</div>
    			</div>

				<p className='px-2 text-semibold mt-3'>{content}</p>
    		</div>
        </MainLayout>
    );
};


export default AssignmentDetails;
