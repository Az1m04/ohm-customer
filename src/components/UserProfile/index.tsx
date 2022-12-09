import React from 'react';
import User from 'src/assets/svg/user.svg';

const UserProfile = () => {
  return (
    <div className='mx-96 my-10 grid grid-flow-row grid-cols-2 rounded-md border-2 bg-gray-50 px-4 py-10 text-center drop-shadow-md'>
      {/* <div className=''>
        <User className='mx-auto h-40 w-40 rounded-full bg-white p-4 drop-shadow-md'></User>
      </div>
      <div className='my-10 grid grid-flow-row grid-cols-2'>
        <div className=''>
          <div className='text-[20px] font-semibold text-gray-600'>Name</div>
          <div className='font-regular text-[18px] text-gray-600'>
            Navneet kaur
          </div>
          <div className='text-[20px] font-semibold text-gray-600'>Address</div>
          <div className='font-regular text-[18px] text-gray-600'>
            #123 new building, amritsar
          </div>
        </div>
        <div className=''>
          <div className='text-[20px] font-semibold text-gray-600'>Email</div>
          <div className='font-regular text-[18px] text-gray-600'>
            kaurnavneet0370@gmial.com
          </div>
          <div className='text-[20px] font-semibold text-gray-600'>Role</div>
          <div className='font-regular text-[18px] text-gray-600'>Admin</div>
        </div>
      </div> */}

      <div>
        <User className='mx-auto mt-20 h-48 w-48 rounded-full bg-white p-4 drop-shadow-md'></User>
      </div>
      <div className='my-10'>
        <div className='text-left text-[18px] font-normal text-[#666276]'>
          Navneet kaur
        </div>
        <div className='text-left text-[18px] font-normal text-[#666276]'>
          navneet@gmail.com
        </div>
        <div className='text-left text-[18px] font-normal text-[#666276]'>
          #123, new building amritsar
        </div>
        <div className='text-left text-[18px] font-normal text-[#666276]'>
          555588998
        </div>
        <div className='text-left text-[16px] font-normal text-[#666276]'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          eum provident distinctio ipsum asperiores numquam doloremque similique
          aliquid recusandae obcaecati rem accusamus ipsa assumenda fugit
          quisquam nemo atque quasi illo, harum maxime architecto doloribus
          quae, cumque laboriosam. Praesentium fugit placeat odio itaque
          molestiae, iste doloribus id ullam ratione? Deserunt, esse!
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
