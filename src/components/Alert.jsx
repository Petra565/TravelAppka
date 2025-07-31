import { Description, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
function Alert({ setIsOpen, isOpen, setDeletePlace }) {

    return (
        <>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-800">
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/40">
                    <DialogPanel className="max-w-lg space-y-4 bg-white p-6 rounded-xl">
                        <DialogTitle className="text-lg font-semibold bg-[#faa302] text-white rounded-md text-center ">Vymazať navštívené miesto</DialogTitle>
                        <Description>Vykonané zmeny nebude možné vrátiť späť</Description>
                        <p>Ste si istý, že chcete vymazať toto navštívené miesto?</p>
                        <div className="grid grid-cols-2 ">
                            <div className="col-span-1"></div>
                            <div className="col-span-1 grid grid-cols-2 gap-4">
                                <button
                                    className="col-span-1 h-[2rem] rounded-md bg-[#ffb703] hover:bg-[#CC9200] items-center px-4 text-white cursor-pointer"
                                    onClick={() => {
                                        setIsOpen(false)
                                        setDeletePlace(true)
                                    }}
                                >
                                    Vymazať
                                </button>

                                <button
                                    className="col-span-1 h-[2rem] rounded-md bg-sky-400 hover:bg-sky-600  items-center px-4 text-white cursor-pointer"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Zrušiť
                                </button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

export default Alert;