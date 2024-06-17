import {
    Popover,
    PopoverButton,
    PopoverPanel,
    Transition,
} from '@headlessui/react'
import { Link } from 'react-router-dom'

export default function C_Popover({ title, body, children }) {
    return (
        <Popover>
            <PopoverButton className="data-[active]:text-white data-[focus]:text-gray-300 data-[open]:text-gray-300">
                {title}
            </PopoverButton>
            <Transition
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
            >
                <PopoverPanel
                    anchor="bottom"
                    className="max-w-xs rounded-lg bg-black/90 text-xs shadow-lg"
                >
                    <div className="p-3">
                        {body.map((item) => (
                            <Link
                                key={item.title}
                                className="block rounded-lg px-3 py-2 transition hover:bg-white/5"
                                to={item.link}
                            >
                                <p className="font-semibold text-white">
                                    {item.title}
                                </p>
                                <p className="text-white/50">{item.body}</p>
                            </Link>
                        ))}
                        {/*<a
                            className="block rounded-lg px-3 py-2 transition hover:bg-white/5"
                            href="#"
                        >
                            <p className="font-semibold text-white">Insights</p>
                            <p className="text-white/50">
                                Measure actions your users take
                            </p>
                        </a>
                        <a
                            className="block rounded-lg px-3 py-2 transition hover:bg-white/5"
                            href="#"
                        >
                            <p className="font-semibold text-white">
                                Automations
                            </p>
                            <p className="text-white/50">
                                Create your own targeted content
                            </p>
                        </a>
                        <a
                            className="block rounded-lg px-3 py-2 transition hover:bg-white/5"
                            href="#"
                        >
                            <p className="font-semibold text-white">Reports</p>
                            <p className="text-white/50">
                                Keep track of your growth
                            </p>
                        </a> */}
                        {children}
                    </div>
                    {/* <div className="p-3">
                        <a
                            className="block rounded-lg px-3 py-2 transition hover:bg-white/5"
                            href="#"
                        >
                            <p className="font-semibold text-white">
                                Documentation
                            </p>
                            <p className="text-white/50">
                                Start integrating products and tools
                            </p>
                        </a>
                    </div> */}
                </PopoverPanel>
            </Transition>
        </Popover>
    )
}
