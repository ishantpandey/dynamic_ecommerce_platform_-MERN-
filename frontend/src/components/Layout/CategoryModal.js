import React,{useState} from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FormCategory from './FormCategory';

const CategoryModal = ({showModal,names,setNames ,handleSubmit}) => {
    

   
  return (
    <>
   

      <Modal show={showModal} >
         
        <Modal.Body><FormCategory handleSubmit={handleSubmit} names={names} setNames={setNames} />
        </Modal.Body>
       
      </Modal>
    </>
  );
}


export default CategoryModal