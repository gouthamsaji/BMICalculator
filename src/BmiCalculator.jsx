import React, { useState } from 'react';
import { Container,Form,Button,Image,Modal,ProgressBar } from 'react-bootstrap';
import infoImage from './assets/info.jpg'
import './BmiCalculator.css'

const BmiCalculator = () => {

    const [height,setHeight] = useState('')
    const [weight,setWeight] = useState('')
    const [bmi,setBmi] = useState(null)
    const [category, setCategory] = useState('')
    const [showModal,setShowModal] = useState(false)
    const [progressValue, setProgressValue] = useState(0)
    const [progressColor, setProgressColor] = useState('');

    const calculateBMI = () => {
        if (!weight || !height) {
            alert('Please enter both weight and height!');
            return;
        }
        const heightInMeters = parseFloat(height) / 100
        const bmiValue = (parseFloat(weight) / (heightInMeters * heightInMeters)).toFixed(2)
        setBmi(bmiValue)

        let bmiStatus = '';
        let progress=0;

        if (bmiValue < 18.5) {
            bmiStatus = 'Underweight';
            progress=bmiValue*1.5
            setProgressColor('info');
        } else if (bmiValue < 24.9) {
            bmiStatus = 'Normal weight';
            progress=bmiValue*2
            setProgressColor('success');
        } else if (bmiValue < 29.9) {
            bmiStatus = 'Overweight';
            progress=bmiValue*2.5
            setProgressColor('warning');
        } else {
            bmiStatus = 'Obese';
            progress=bmiValue*2.5
            setProgressColor('danger');
        }
        setCategory(bmiStatus);

        setProgressValue(progress);

        setShowModal(true);

        clearBMI()
    }

    const clearBMI = () => {
        setHeight('')
        setWeight('')
    }

    const handleCloseModal = () => setShowModal(false);

    return(
        <>
        <div className='bg-dark d-flex align-items-center ' style={{width:'100%', height:'100vh'}}>
            <Container className='w-50 px-5 py-4 rounded shadow bg-light'>
                <h2 className='text-center'>BMI CALCULATOR</h2>
                  <Form>
                    <Form.Group className='mt-3' controlId='formHeight'>
                      <Form.Label>Height (cm)</Form.Label>
                      <Form.Control type='number' placeholder='Enter your Height' value={height} onChange={(e)=>setHeight(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className='mt-3' controlId='formWeight'>
                      <Form.Label>Weight (kg)</Form.Label>
                      <Form.Control type='number' placeholder='Enter your Weight' value={weight} onChange={(e)=>setWeight(e.target.value)}/>
                    </Form.Group>
                    <div className="d-flex justify-content-center mt-2">
                        <Button className='mt-3 me-2' variant="warning" onClick={clearBMI}>Clear</Button>
                        <Button className='mt-3' variant="primary" onClick={calculateBMI}>Calculate</Button>
                    </div>
                  </Form>
                  <div className='d-flex justify-content-center mt-4'><Image className='infoImage' style={{width:'50%'}} src={infoImage} alt="information" thumbnail /></div>


                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Your BMI information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>BMI : {bmi}</h5>
                        <h5>Category : {category}</h5>
                        <ProgressBar now={progressValue} variant={progressColor}/>
                        <p className='mt-5'>The Body Mass Index (BMI) is only a measure of body fat based on height and weight, it does not represent the actual health of a person.</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </div>

        </>
    )
}

export default BmiCalculator;