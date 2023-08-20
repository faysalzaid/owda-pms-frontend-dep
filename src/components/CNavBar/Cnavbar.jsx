import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon } from '@heroicons/react/outline';
import {
  FiActivity,
  FiShoppingCart,
  FiFileText,
  FiTruck,
  FiClipboard,
  FiDollarSign,
} from 'react-icons/fi';
import {FcShop,FcMoneyTransfer,FcPackage,FcShipped,FcRules,FcBullish,FcCableRelease} from "react-icons/fc";
import { Transition } from '@headlessui/react';

class CNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.transitionRef = React.createRef();

    this.state = {
      isOpen: false,
      currentURL: window.location.pathname,
    };
  }

  toggleNavbar = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };



  
  navLinks = [
    { to: '/app/purchaseRequest', label: 'Purchase Request', icon: FcCableRelease },
    { to: '/app/purchaseGroup', label: 'GroupPR', icon: FcShop },
      { to: '/app/quotation', label: 'Request for Quotation', icon: FcBullish },
      { to: '/app/purchaseOrder', label: 'Purchase Order', icon: FcRules },
      { to: '/app/grn', label: 'GRN', icon: FcShipped },
      { to: '/app/siv', label: 'SIV', icon: FcPackage },
      { to: '/app/paymentRequest', label: 'Payment Request', icon: FcMoneyTransfer },
    ];
   

  render() {
    const { isOpen,currentURL } = this.state;
    // console.log(currentURL);


    return (

        <div className=" p-4 text-gray-400 dark:bg-gray-900 dark:text-gray-100 " >
        <div className="flex items-center justify-between">
          <button
            className="block md:hidden  focus:outline-none"
            onClick={this.toggleNavbar}
          >
            <MenuIcon className="h-6 w-6 text-gray-700 dark:bg-gray-900 dark:text-gray-100" />
          </button>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              {this.navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className={`p-2 flex items-center  text-gray-700 dark:text-gray-100 space-x-2 hover:text-gray-300 ${
                        currentURL === `${link.to}` ? 'p-2  text-green-600 bg-green-100 dark:bg-green-900 rounded-md  border-green-500' : ''
                      }`}
                  >
                    <link.icon className="ml-1" />
                    <span className='font-semibold active '>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div ref={this.transitionRef} className="dark:bg-gray-900">
          <Transition
            show={isOpen}
            enter="transition duration-300 ease-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-200 ease-in"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="md:hidden">
              <ul className="mt-4 space-y-2">
                {this.navLinks.map((link, index) => (
                  <li key={index}>
                   <Link
                    to={link.to}
                    className={`flex items-center  text-gray-700 dark:bg-gray-900 dark:text-gray-100 space-x-2 hover:text-gray-300 ${
                        currentURL === `${link.to}` ? 'font-bold text-green-600 border-b-2 border-green-500' : ''
                      }`}
                  >
                      <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-100">
                        <link.icon className="h-6 w-6 font-bold" />
                        <span>{link.label}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Transition>
        </div>
      </div>
    );
  }
}

export default CNavbar;
