import React from 'react'
import plans from '../../service/data/Plan.json'

export default function Plan() {

    const isCompany: any = null

    const IncludePlan = ({ include }) => {
        return (
            <li className="inline-flex items-center !m-0 w-full mb-2 ml-5 font-semibold text-left border-solid">
                <svg className="w-5 h-5 mr-2 font-semibold leading-7 text-blue-600 sm:h-5 sm:w-5 md:h-6 md:w-6"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7">
                    </path>
                </svg>
                {include}
            </li>
        )
    }

    const CardPlan = ({plan}) => {
        return (
                <div
                    className={`relative z-10 flex flex-col items-center max-w-md p-4
                    mx-3 my-0 border border-solid rounded-lg
                    ${plan.id == isCompany?.plan ? 'border-blue-500 border-2' : ''}`}
                >
                    <h3
                        className="m-0 text-2xl font-semibold leading-tight tracking-tight text-black border-0 border-gray-200 sm:text-3xl md:text-4xl">
                        {plan.name}
                    </h3>
                    <div className="flex items-end mt-6 leading-7 text-gray-900 border-0 border-gray-200">
                        <p className="box-border m-0 text-6xl font-semibold leading-none border-solid">
                            {plan.price.month}
                        </p>
                        <p className="box-border m-0 border-solid" >
                            / mes
                        </p>
                    </div>
                    <ul className="flex-1 p-0 mt-4 ml-5 leading-7 text-gray-900 border-0 border-gray-200">
                        {
                            plan.includes.map(include => <IncludePlan include={include} />)
                        }
                    </ul>
                    <a  href="#"
                        className={`inline-flex justify-center w-full px-4 py-3 mt-8 font-sans text-sm
                        leading-none text-center text-blue-600 no-underline bg-transparent border border-blue-600
                        rounded-md cursor-pointer hover:bg-blue-700 hover:border-blue-700 hover:text-white
                        focus-within:bg-blue-700 focus-within:border-blue-700 focus-within:text-white sm:text-base md:text-lg
                        ${plan.id == isCompany?.plan ? '!bg-blue-500 !text-white' : ''}`}
                    >
                        {plan.id != isCompany?.plan ? 'Iniciar Ahora' : 'Actualmente'}
                    </a>
                </div>
        )
    }

    return (
        <section className="py-6 leading-7 text-gray-900 bg-white sm:py-12 md:py-16">
            <div className="box-border px-4 mx-auto border-solid sm:px-6 md:px-6 lg:px-0 max-w-7xl">

                <div className="flex flex-col items-center leading-7 text-center text-gray-900 border-0 border-gray-200">
                    <h2 id="pricing"
                        className="box-border m-0 text-3xl font-semibold leading-tight tracking-tight text-black border-solid sm:text-4xl md:text-5xl">
                        Mi Plan
                    </h2>
                    <p className="box-border mt-2 text-xl text-gray-900 border-solid sm:text-2xl">
                    </p>
                </div>


                <div id="pricing"
                    className="grid grid-cols-1 gap-4 mt-4 leading-7 text-gray-900 border-0 border-gray-200 sm:mt-6 sm:gap-6 md:mt-8 md:gap-0 lg:grid-cols-3">
                    {
                        plans.map(plan => <CardPlan plan={plan} />)
                    }
                </div>
            </div>
        </section>
    )
}
