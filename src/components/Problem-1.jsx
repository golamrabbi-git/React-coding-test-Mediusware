import React, {useState} from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    //const [active,setActive] = useState({});
    // const [completed,setCompleted] = useState([]);
    const [data,setData] = useState([]);

    const dataObj = {};

    const handleAddTask = (e) =>{
        e.preventDefault();
        const taskName = e.target.name.value;
        const status = e.target.status.value;
        
        if(status === 'Active' || status === 'active'){
            let myArray = JSON.parse(localStorage.getItem('Active')) || [];
            myArray.push(taskName);
            const updatedArray = JSON.stringify(myArray);
            localStorage.setItem('Active',updatedArray);
        }

        if(status === 'Completed' || status === 'completed'){
            let myArray = JSON.parse(localStorage.getItem('Completed')) || [];
            myArray.push(taskName);
            const updatedArray = JSON.stringify(myArray);
            localStorage.setItem('Completed',updatedArray);
        }
        else{
            let myArray = JSON.parse(localStorage.getItem(status)) || [];
            myArray.push(taskName);
            const updatedArray = JSON.stringify(myArray);
            localStorage.setItem(status,updatedArray);
        }

        
    }
    const handleClick = (val) =>{
        setShow(val);
        if(val === 'active'){
          const activeObj =  JSON.parse(localStorage.getItem('Active'));
          setData(Object.values(activeObj));
        }
        if(val === 'completed'){
            const completedObj =  JSON.parse(localStorage.getItem('Completed'));
            setData(Object.values(completedObj));  
        }

        if(val === 'all'){
            Object.keys(localStorage).forEach(key => {
              const allObj = JSON.parse(localStorage.getItem(key));
              const combinedArray = [].concat(...Object.values(allObj));
              setData(combinedArray);
              //console.log(x);
              //console.log(typeof Object.values(allObj));
              //setData(Object.values(allObj));
            });
            
        }


       


    }

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                    <form className="row gy-2 gx-3 align-items-center mb-4" onSubmit={handleAddTask}>
                        <div className="col-auto">
                            <input type="text" name='name' className="form-control" placeholder="Name"/>
                        </div>
                        <div className="col-auto">
                            <input type="text" name='status' className="form-control" placeholder="Status"/>
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        
                        <tbody>
                    
                         {data.map((element, index) => (
                          <tr key={index}>
                            <td>{element}</td>
                            <td>{show}</td>
                             
                         </tr>
                        ))}

                    
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;