const Modal = ({ setShowModal, store }) => {
  return (
    <>
      <div className=' fixed inset-0 z-50 flex items-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none'>
        <div className='relative my-6 mx-auto w-96 max-w-3xl'>
          <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
            <div className='flex  justify-between  rounded-t border-b border-solid border-slate-200 p-1'>
              <h3 className='mx-3 text-2xl font-semibold  text-gray-700 '>
                items in inventory
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                }}
                className='m-2 cursor-pointer text-red-600'
              >
                ok
              </button>
            </div>
            <div className=' p-2  '>
              <div className='    flex justify-around'>
                <br />

                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='fixed inset-0 z-40 bg-black opacity-25'></div>
    </>
  );
};
export default Modal;
