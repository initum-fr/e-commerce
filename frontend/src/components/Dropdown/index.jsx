import {
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react'

import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Link } from 'react-router-dom'

export default function Dropdown({ options }) {
    return (
        <Menu>
            <MenuButton className="inline-flex items-center gap-2 rounded-md bg-black px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                Options
                <ChevronDownIcon className="size-4 fill-white/60" />
            </MenuButton>
            <Transition
                enter="transition ease-out duration-75"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <MenuItems
                    anchor="bottom end"
                    className="w-52 origin-top-right rounded-xl border border-white/5 bg-black p-1 text-sm/6 text-white"
                >
                    {options.map((link) => (
                        <MenuItem
                            key={link.to}
                            className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-[focus]:bg-white/10"
                        >
                            <Link onClick={link.onclick} to={link.to}>
                                {link.label}
                            </Link>
                        </MenuItem>
                    ))}
                </MenuItems>
            </Transition>
        </Menu>
    )
}
