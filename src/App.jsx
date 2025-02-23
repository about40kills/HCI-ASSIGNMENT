import './App.css'
import { useState } from 'react'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1", completed: true, datetime: "2024-03-10 10:00" },
    { id: 2, text: "Task 2", completed: true, datetime: "2024-03-11 11:00" },
    { id: 3, text: "Task 3", completed: false, datetime: "2024-03-12 12:00" },
    { id: 4, text: "Task 4", completed: false, datetime: "2024-03-13 13:00" },
    { id: 5, text: "Task 5", completed: false, datetime: "2024-03-14 14:00" }
  ]);

  const [inputText, setInputText] = useState("");
  const [inputDateTime, setInputDateTime] = useState("");

  const handleAddTask = () => {
    if (!inputText || !inputDateTime) return;
    
    const newTask = {
      id: Date.now(),
      text: inputText,
      completed: false,
      datetime: inputDateTime
    };
    
    setTasks(prev => [...prev.slice(0, 2), newTask, ...prev.slice(3)]);
    setInputText("");
    setInputDateTime("");
  };

  const handleCheckTask = (taskId) => {
    setTasks(prev => {
      const updatedTasks = prev.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      );
      return [
        ...updatedTasks.filter(t => t.completed),
        ...updatedTasks.filter(t => !t.completed)
      ];
    });
  };


  return (
    <div style={{
      // backgroundColor: 'red',
      alignItems: "center",
      // width: '100%',
      display: 'flex',
      flexDirection : 'column',
      gap : 160,
      // alignItems : 'flex-start',
      marginTop : 50
    }}>


    <div style={{
      display : 'flex',
      justifyContent : 'space-between',
      alignItems : 'center',
      width : 900
    }}>
      <p style={{
        fontSize : 30,
        margin : 0
      }}>BETTER.DO</p>

      <div style={{
        display : 'flex',
        alignItems : 'center',
        gap : 12
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className='add' >
        <path d="M7.78668 9.74671L9.49335 8.04004L7.78668 6.33337" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2.66669 8.04004H9.44669" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 2.66663C10.9467 2.66663 13.3333 4.66663 13.3333 7.99996C13.3333 11.3333 10.9467 13.3333 8 13.3333" stroke="currentColor" stroke-opacity="0.6" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
        
      <p style={{
          margin : 0
      }}>Log Out</p>
      </div>
    </div>

    <div style={{
      display : 'flex',
      flexDirection : 'column',
      // marginInline : 30,
      gap : 12
    }}> 

     <div style={{
          display : 'flex',
          alignItems : 'center',
          gap : 12
        }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path d="M15 1.46582L8 8.53407L1 1.46582" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p style={{
              margin : 0,
              fontSize : 20
            }}>Today</p>
      </div>

      <div style={{
        display : 'flex',
        alignItems : 'center',
        gap : 12
      }}>
      <div style={{
        display: 'flex',
        gap: 8,
      }}>
          <input 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
            placeholder="let's do this"
            style={{
              padding: 12,
              borderRadius: 12,
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              width: 261
            }}
          />
          <input 
          value={inputDateTime}
          onChange={(e) => setInputDateTime(e.target.value)}
            type="datetime-local"
            style={{
              padding: 12,
              borderRadius: 12,
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              width: 200,
              color: 'currentColor'
            }}
          />
        </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19" fill="none" className='add-icon' onClick={handleAddTask}>
                <path d="M9 1.3009V17.699M17 9.49996H1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
      </div>    

      <div style={{
        display : 'flex',
        flexDirection : 'column',
        gap : 16,
        alignItems: 'flex-start'
      }}>

        <p>Today's Task</p>
        <div style={{
          display : 'flex',
          justifyContent : 'space-between',
          backgroundColor : 'var(--bg-container)',
          alignItems : 'center',
          width : '100%',
          border : '1px solid var(--border-color)',
          padding : 12,
          borderRadius : 12
        }}>
          <p style={{
            margin : 0
          }}>Task 1</p>

          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className='checked' onClick={() => handleCheckTask(1)}>
              <path d="M8.00001 1.33337C4.32668 1.33337 1.33334 4.32671 1.33334 8.00004C1.33334 11.6734 4.32668 14.6667 8.00001 14.6667C11.6733 14.6667 14.6667 11.6734 14.6667 8.00004C14.6667 4.32671 11.6733 1.33337 8.00001 1.33337ZM11.1867 6.46671L7.40668 10.2467C7.31334 10.34 7.18668 10.3934 7.05334 10.3934C6.92001 10.3934 6.79334 10.34 6.70001 10.2467L4.81334 8.36004C4.62001 8.16671 4.62001 7.84671 4.81334 7.65337C5.00668 7.46004 5.32668 7.46004 5.52001 7.65337L7.05334 9.18671L10.48 5.76004C10.6733 5.56671 10.9933 5.56671 11.1867 5.76004C11.38 5.95337 11.38 6.26671 11.1867 6.46671Z" fill="currentColor"/>
          </svg>

        </div>

        <div style={{
          display : 'flex',
          justifyContent : 'space-between',
          alignItems : 'center',
          width : '100%',
          border : '1px solid var(--border-color)',
          backgroundColor : 'var(--bg-container)',
          padding : 12,
          borderRadius : 12
        }}>
          <p style={{
            margin : 0
          }}>Task 2</p>

          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className='checked'>
              <path d="M8.00001 1.33337C4.32668 1.33337 1.33334 4.32671 1.33334 8.00004C1.33334 11.6734 4.32668 14.6667 8.00001 14.6667C11.6733 14.6667 14.6667 11.6734 14.6667 8.00004C14.6667 4.32671 11.6733 1.33337 8.00001 1.33337ZM11.1867 6.46671L7.40668 10.2467C7.31334 10.34 7.18668 10.3934 7.05334 10.3934C6.92001 10.3934 6.79334 10.34 6.70001 10.2467L4.81334 8.36004C4.62001 8.16671 4.62001 7.84671 4.81334 7.65337C5.00668 7.46004 5.32668 7.46004 5.52001 7.65337L7.05334 9.18671L10.48 5.76004C10.6733 5.56671 10.9933 5.56671 11.1867 5.76004C11.38 5.95337 11.38 6.26671 11.1867 6.46671Z" fill="currentColor"/>
          </svg>

        </div>

        <div style={{
          display : 'flex',
          justifyContent : 'space-between',
          alignItems : 'center',
          width : '100%',
          border : '1px solid var(--border-color)',
          backgroundColor : 'var(--bg-pending)',
          padding : 12,
          borderRadius : 12
        }}>
          <p style={{
            margin : 0
          }}>Task 3</p>

         <div className='unchecked' style={{
          width : 16,
          height : 16,
          borderRadius : 60,
          border : '1px solid var(--border-color)',
          backgroundColor : 'var(--bg-checkbox)'
         }}>

         </div>

        </div>

        <div style={{
          display : 'flex',
          justifyContent : 'space-between',
          alignItems : 'center',
          width : '100%',
          border : '1px solid var(--border-color)',
          backgroundColor : 'var(--bg-pending)',
          padding : 12,
          borderRadius : 12
        }}>
          <p style={{
            margin : 0
          }}>Task 4</p>

         <div className='unchecked' style={{
          width : 16,
          height : 16,
          borderRadius : 60,
          border : '1px solid var(--border-color)',
          backgroundColor : 'var(--bg-checkbox)'
         }}>

         </div>

        </div>

        <div style={{
          display : 'flex',
          justifyContent : 'space-between',
          alignItems : 'center',
          width : '100%',
          border : '1px solid var(--border-color)',
          backgroundColor : 'var(--bg-pending)',
          padding : 12,
          borderRadius : 12
        }}>
          <p style={{
            margin : 0
          }}>Task 5</p>

         <div className='unchecked' style={{
          width : 16,
          height : 16,
          borderRadius : 60,
          border : '1px solid var(--border-color)',
          backgroundColor : 'var(--bg-checkbox)'
         }}>

         </div>

        </div>

      </div>

    </div>

      
    </div>
  )
}

export default App