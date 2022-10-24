import React from 'react';
import { Route, Routes } from "react-router-dom";
import {HomePage} from './Home.js';
import {AddPatient} from './AddPatients.js';
import {PatientDetails} from './PatientDetails.js';

//This Component is responsible for Handling the routes of the application
export const MainContent =(props)=>{
    
        return (
            <div className='col-md-8'>
               <Routes>
               <Route path='/' exact component={HomePage}/>
               <Route path='/AddPatient' exact element={<AddPatient></AddPatient>}/>
                   <Route path='/PatientDetails' exact element={<PatientDetails></PatientDetails>} />
                   {/* <Route path='/AddPatients' exact render={()=> <AddPatient formName='Add Patient' handlerInput={props.handlerInput}  addDetails={props.addPatient}/>} />    */}
               </Routes>
            </div>
        )
    }