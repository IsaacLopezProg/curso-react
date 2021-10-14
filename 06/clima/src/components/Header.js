import React from 'react';



const Header = ({titulo}) => {
    return ( 
        // <nav className="navbar navbar-dark bg-primary">
        //     <ul class="nav justify-content-center">
        //         <li className="nav-item">
        //             <a href="!#" className="nav-link">{titulo}</a>
        //         </li>
        //     </ul>
        // </nav>
        
        <div >
            <nav className="navbar  navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid d-flex justify-content-center">
                    <a  className="navbar-brand fs-1" href="!#">{titulo}</a>
                </div>
            </nav>
      </div>
     );
}
 
export default Header;