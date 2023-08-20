import React from 'react'

function ChartLegend({ legends}) {



// legends.map((legend,i)=>{
//   console.log(colors[i]);
// })
  return (
    <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
      {legends?.map((legend,i) => (
        <div className="flex items-center" key={legend.name}>
            <span style={{backgroundColor:legend.color}} className={`inline-block w-3 h-3 mr-1 rounded-full`}></span>
          <span>{legend.name?.slice(0,5)}</span>
        </div>
      ))}
    </div>
  )
}

export default ChartLegend
