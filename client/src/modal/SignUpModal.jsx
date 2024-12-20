import React, {useEffect} from 'react'
import { createPortal } from 'react-dom';
import SignUpForm from '../forms/SignUpForm';

export const SignUpModal = ({isOpenSignUpModal, setIsOpenSignUpModal, setIsOpenSignInModal}) => {
    useEffect(() => {
        if (document) {
          document.body.style.overflowY = isOpenSignUpModal ? "hidden" : "scroll";
        }
      }, [isOpenSignUpModal]);

    if(!isOpenSignUpModal) return null

    return createPortal(
        <div>
            <div onClick={() => setIsOpenSignUpModal(false)} className='bg-[#171717bf] fixed inset-0 z-[100]'></div>
            <div className=''>
                <SignUpForm setIsOpenSignUpModal={setIsOpenSignUpModal} setIsOpenSignInModal={setIsOpenSignInModal}/>
            </div>
        </div>,
        document.querySelector(".showMyPortal")
    )
}
