import React, { useState } from 'react';
import { Button, Modal } from 'antd';


const ContructionModel = ({ openModel, setOpenModel }) => {


    const handleCancel = () => {
        setOpenModel(false);
        // toast.success("Login Success! Welcome " + response.data.name)
    };

    return (
        <Modal className='ConstructionModel' title="UNDER CONSTRUCTION!" okText="Close" onCancel={handleCancel} open={openModel} onOk={handleCancel}>
            <img src='/images/UnderConstruction.png' alt='Under Construction' />
            <div>
                <p>The website is still under construction, there are many unfinished features. You can view the data but do not have permission to change them
                </p>

                <p>Hope you like my website</p>
                <p>Have a nice day
                    <br /><b>Kien</b>.</p>
            </div>
        </Modal>
    );
};

export default ContructionModel;