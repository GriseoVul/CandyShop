import React, {useState, useEffect} from 'react';
import { putCategoryUrlApi } from '../GeneralModules/urlAPIs';
import { updateItem } from '../GeneralModules/FetchFunctions';

const AdminCategoryListItem = ({item}) => {
    const [editName, setEditName] = useState(item.name)
    const [toggleEdit, setToggleEdit] = useState(false)

    const toggleEditCategory = () => {
        setToggleEdit(!toggleEdit)
    }

    const handleInputNewCategoryName = (e) =>{
        setEditName(e.target.value)
    }

    const confirmEditCategory = () =>{
        const data = {
            ...item, name:editName,
        }
        console.log(data);
        updateItem(putCategoryUrlApi, data)
    }

    return (
        <>
        <div className='CategorysListItemBox'>
            <div className='CategorysListItem'>
                {!toggleEdit? (<div className='CategoryItemLeftSide'><span>{item.name}</span></div> )
                : (<><div className='CategoryItemLeftSide'><input className='input-public' type="text" value={editName} onChange={handleInputNewCategoryName}/>
                <div className='iconBox' onClick={confirmEditCategory}><IconTick/></div></div></>)}

                <div className='iconBox' onClick={toggleEditCategory}>
                    {!toggleEdit?(<IconPencilPlus/>):(<IconPencilMinus/>)}
                </div>
                {/* <input className='input-public'type="text" value={item.name} /> */}

            </div>
        </div>
        </>
    );
}

export default AdminCategoryListItem;

function IconPencilPlus(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="30px"
        width="30px"
        {...props}
      >
        <path d="M20.7 7c.4-.4.4-1 0-1.4l-2.3-2.3c-.4-.4-1-.4-1.4 0l-1.8 1.8L19 8.9M3 17.2V21h3.8l11-11.1-3.7-3.8L3 17.2M7 2v3h3v2H7v3H5V7H2V5h3V2h2z" />
      </svg>
    );
  }

  function IconPencilMinus(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="30px"
        width="30px"
        {...props}
      >
        <path d="M20.7 7c.4-.4.4-1 0-1.4l-2.3-2.3c-.4-.4-1-.4-1.4 0l-1.8 1.8L19 8.9M3 17.2V21h3.8l11-11.1-3.7-3.8L3 17.2M10 5v2H2V5h8z" />
      </svg>
    );
  }

  function IconTick(props) {
    return (
      <svg
        baseProfile="tiny"
        viewBox="0 0 24 24"
        fill="currentColor"
        height="30px"
        width="30px"
        {...props}
      >
        <path d="M16.972 6.251a1.999 1.999 0 00-2.72.777l-3.713 6.682-2.125-2.125a2 2 0 10-2.828 2.828l4 4c.378.379.888.587 1.414.587l.277-.02a2 2 0 001.471-1.009l5-9a2 2 0 00-.776-2.72z" />
      </svg>
    );
  }