import React,{Component}  from 'react';
import '../CSS/PatientDetails.css';
import { AddPatient } from './AddPatients';


//This Component Contains the PatientDtails 
export class PatientDetails extends Component{
    constructor(props){
        super(props);
        this.state={PatientData:[],CurrentPage:1,PatientPerPage:10,PageNumbers:[],IsModalOpen:false,patientSelected:{}};
        this.UpdatePatientDetails=this.UpdatePatientDetails.bind(this);
        this.patientDetailsUpdate={};
        this.handlePatient=this.handlePatient.bind(this);
    }
  

    //Before the component it is necessary to fetch the details of the PatientDetails 
    componentWillMount(){
        const RenderPageNumbers=[];
        fetch('http://localhost:8080/patients',{
            method : 'GET'
        }).then((response)=>{
                response.json().then(data=>this.setState({PatientData:data},()=>{console.log(this.state);
                    for(let i=1;i<=Math.ceil(this.state.PatientData.length/this.state.PatientPerPage);i++){
                        RenderPageNumbers.push(i);
                    }
                    this.setState({PageNumbers:RenderPageNumbers},()=>{console.log('PageNumber ',this.state);});
                    }));
        });
    }
   

    //responsible for hanlding the userData **Improved the way of re-rendering the component by not directly updating the state at each Change just push all the details in an temporary object and when the user finally submits the details then only use setState copy the whole object in state **
    handlePatient(event){
        event.persist();
        const name=event.target.name;
        this.patientDetailsUpdate={...this.patientDetailsUpdate,    
            [name] : event.target.value
        }
        }
    
    //Logic to update the patientDetails 
    UpdatePatientDetails(event){
        this.closeModal();
        var id=this.patientDetailsUpdate.id;
        var object={"PatientName":this.patientDetailsUpdate.PatientName,"PatientAge":this.patientDetailsUpdate.PatientAge,"PatientProblem":this.patientDetailsUpdate.PatientProblem,"PatientPrescription":this.patientDetailsUpdate.PatientPrescription}
        fetch('http://localhost:8080/patients/'+id,{
            method: 'PUT',
            headers :{
                'Content-Type': 'application/json' 
                },
            body : JSON.stringify(object)
        }).then((response)=>{
            this.componentWillMount();
            

        })
    }
    render(){
        const indexOfLastData=this.state.CurrentPage*this.state.PatientPerPage;
        const indexOfFirstData=indexOfLastData-this.state.PatientPerPage;
        const currentPagePatient=this.state.PatientData.slice(indexOfFirstData,indexOfLastData);
        
    return(
        <div>
            <table>
                <thead>
                <tr>
                <th>Sno</th>
                <th>PatientName</th>
                <th>PatientAge</th>
                <th>PatientProblem</th>
                <th>PatientPrescription</th>
                <th>PatientHealthTracking</th>
                </tr>
                </thead>
                <tbody>
                {currentPagePatient.map((patient)=>{return (
                    <tr>
                        <td>{patient.id}</td>
                        <td>{patient.PatientName}</td>
                        <td>{patient.PatientAge}</td>
                        <td>{patient.PatientProblem}</td>
                        <td>{patient.PatientPrescription}</td>
                        <td>{patient.PatientHealthTracking}</td>
                        <td><button id={patient.id} onClick={this.openModal}>Update Details</button></td>
                    </tr>
                    
                );})}
             
                </tbody>
            </table>
            <ul className='PaginationList'>
                {this.state.PageNumbers.map(number=>{
                 return(
                    <li id={number} key={number} className="Pagination" onClick={this.handlePage}>{number}</li>
            )
            })}
            
            </ul>
        </div>
    )
    }
}