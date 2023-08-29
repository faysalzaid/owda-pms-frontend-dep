import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import './invoice.css';
import {  Badge,Button} from  '@windmill/react-ui'
import { Link } from 'react-router-dom';
function NewInvoice({invoiceData,mode,project}) {


const printSectionRef = useRef(null);

const printSection = () => {
  const printContents = printSectionRef.current.innerHTML;

  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          @media print {
            body * {
              visibility: hidden;
            }
            #print-section, #print-section * {
              visibility: visible;
            }
            #print-section {
              position: absolute;
              left: 0;
              top: 0;
            }
          }
        </style>
      </head>
      <body>
        <div id="print-section">${printContents}</div>
      </body>
    </html>
  `);
  printWindow.document.close();
  printWindow.print();
  printWindow.close();
};





    return (<>
          
   
      <div ref={printSectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-8">Invoice #{invoiceData?.id}</h1><div className=''> <FaPrint onClick={printSection}/></div>

      <hr className="my-8" />

      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold mb-2">Owda- Organization for welfare and development in action</h2>
          <img src='https://iphce.org/wp-content/uploads/2021/04/OWDA-.png'/>
        </div>
      
      </div>

      <hr className="my-8" />

      <div>
        <h2 className="text-xl font-bold mb-2">Payment Info</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Invoiced Amount</th>
              <th className="px-4 py-2 border">Created By</th>
             
            </tr>
          </thead>
          <tbody>
          
              <tr>
                <td className="px-4 py-2 border">{invoiceData?.date}</td>
                <td className="px-4 py-2 border">ETB {parseFloat(invoiceData?.amount)?.toLocaleString()}</td>
                <td className="px-4 py-2 border">{invoiceData?.addedBy}</td>
             
              </tr>
  
          </tbody>
        </table>
      </div>

      <hr className="my-8" />

      <div className="flex justify-between">
        <div>
          <h2 className="text-sm font-bold mb-2">Project Name | <Link to={`/app/projects/${invoiceData?.owda_project?.id}`}>{invoiceData?.owda_project?.name}</Link></h2>
          <h2 className="text-sm font-bold mb-2">Account |  <Link to={`/app/accounts/${invoiceData?.owda_account?.id}`}>{invoiceData?.owda_account?.name}</Link></h2>
          <p>{project.map((pr)=>pr.id===invoiceData.ProjectId?pr.name:"")}</p>
        </div>
        <div>
          <h2 className="text-sm font-bold mb-2">B.Line Code |  <Link to={`/app/budgetLines/${invoiceData?.owda_budget_line?.id}`}>{invoiceData?.owda_budget_line?.code}</Link></h2>
          <h2 className="text-sm font-bold mb-2">AcitivityID |  <Link to={`/app/activity/${invoiceData?.owda_activity?.id}`}>{invoiceData?.owda_activity?.id}</Link></h2>
        
        </div>
      </div>
    </div>
    
    
    
    </>  );
}

export default NewInvoice;