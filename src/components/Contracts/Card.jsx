import React from 'react';
import { DocumentAddIcon } from '@heroicons/react/outline';
import { Button } from '@windmill/react-ui';
export function ContractDetailCard({ companyLogoUrl, subject, dateCreated, customer, project, contractValue, startDate, endDate }) {
  return (
    <div className="p-8 border rounded-md">
      <div className="flex justify-between items-center mb-8">
        <CompanyLogo imageUrl={companyLogoUrl} />
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Print</button>
      </div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">{subject}</h1>
        <div className="border-b w-24 mx-auto mt-4"></div>
        <p className="mt-4 text-black-500 font-semibold">Date created: {dateCreated}</p>
      </div>
      <div className="flex justify-between">
        <div>
          <h2 className="text-lg font-bold mb-4">Customer</h2>
          <div className="flex items-center mb-2">
            <div className="w-1/2 font-semibold">Name:</div>
            <div className="w-1/2 border-b border-gray-400 font-semibold">{customer.name}</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-1/2 font-semibold" >Email:</div>
            <div className="w-1/2 border-b border-gray-400 font-semibold">{customer.email}</div>
          </div>

          <div className="flex items-center mb-2">
            <div className="w-1/2 font-semibold" >Project:</div>
            <div className="w-1/2 border-b border-gray-400 font-semibold">{'sdfasdfsadfasdf'}</div>
          </div>
          
        </div>
        <div>
          <h2 className="text-lg font-bold mb-4">Contract Details</h2>
         
          <div className=" flex items-center mb-2">
            <div className=" ml-0 w-1/2 font-semibold" >Contract:</div>
            <div className="w-1/2 border-b border-gray-400 font-semibold">{contractValue}</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-1/2 font-semibold">Start Date:</div>
            <div className="w-1/2 border-b border-gray-400 font-semibold">{startDate}</div>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-1/2 font-semibold">End Date:</div>
            <div className="w-1/2 border-b border-gray-400 font-semibold">{endDate}</div>
          </div>
        </div>
      </div>
      

      <div className="py-8 px-4">
      <h2 className="text-lg font-bold mb-4">Attachments</h2>
      <div className="bg-grey border border-gray-300 p-4 rounded-md">
        <div className="flex items-center mb-2">
          <DocumentAddIcon className="w-6 h-6 text-gray-500 mr-2" />
          <input type="file" id="file" className="hidden" />
          <Button htmlFor="file"  size="small" layout="outline">
           Upload File
            
          </Button>
        </div>
        <ul className="space-y-2">
          <li className="flex items-center">
            <Link to="#" className="text-blue-500 hover:underline flex-1">
              Document 1.pdf
            </Link>
            <span className="text-gray-500 text-sm">10 MB</span>
          </li>
         
          <li className="flex items-center">
            <Link to="#" className="text-blue-500 hover:underline flex-1">
              Document 3.pdf
            </Link>
            <span className="text-gray-500 text-sm">3 MB</span>
          </li>
        </ul>
      </div>
    </div>

    

    </div>

    
  );
}



function CompanyLogo({ imageUrl }) {
    return (
      <div className="flex items-center">
        <img className="w-12 h-12 rounded-full" src={imageUrl} alt="Company logo" />
        <h2 className="ml-4 font-bold text-xl">Company Name</h2>
      </div>
    );
  }
